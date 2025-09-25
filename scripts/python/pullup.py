# pullup_counter_v4.py
import cv2
import mediapipe as mp
import numpy as np
from collections import deque
from tkinter import Tk, filedialog
import pandas as pd
import math

# -------- Utilities --------
def angle(a, b, c):
    ba = np.array([a[0]-b[0], a[1]-b[1]])
    bc = np.array([c[0]-b[0], c[1]-b[1]])
    cosang = np.clip(np.dot(ba, bc)/((np.linalg.norm(ba)*np.linalg.norm(bc))+1e-9), -1.0, 1.0)
    return float(math.degrees(math.acos(cosang)))

def lm_xy(lm, w, h):
    return (lm.x*w, lm.y*h)

# -------- Settings --------
SMOOTH_N = 3
TOP_ANGLE = 70      # elbow angle at top
BOTTOM_ANGLE = 160  # elbow angle at bottom
MIN_DIP = 0.1

# -------- File Selection --------
Tk().withdraw()
video_path = filedialog.askopenfilename(title="Select Video", filetypes=[("Video Files","*.mp4;*.avi;*.mov")])
if not video_path:
    print("No file selected, exiting...")
    exit()

# -------- Video Setup --------
cap = cv2.VideoCapture(video_path)
fps = cap.get(cv2.CAP_PROP_FPS) or 30
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
video_duration_sec = total_frames/fps

# -------- MediaPipe --------
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(min_detection_confidence=0.5, model_complexity=1)
mp_draw = mp.solutions.drawing_utils

# -------- Counter Setup --------
angle_history = deque(maxlen=SMOOTH_N)
state = "waiting"  # waiting until head goes above initial
in_dip = False
dip_start_time = None
reps = []
initial_head_y = None

frame_idx = 0

while True:
    ret, frame = cap.read()
    if not ret:
        break
    frame_idx += 1
    t = frame_idx / fps

    img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = pose.process(img_rgb)

    elbow_angle = None
    head_y = None
    if results.pose_landmarks:
        mp_draw.draw_landmarks(frame, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)
        lm = results.pose_landmarks.landmark
        try:
            # Head position
            nose = lm_xy(lm[mp_pose.PoseLandmark.NOSE], width, height)
            head_y = nose[1]

            # Initial head y
            if initial_head_y is None:
                initial_head_y = head_y

            # Elbows
            ls = lm_xy(lm[mp_pose.PoseLandmark.LEFT_SHOULDER], width, height)
            le = lm_xy(lm[mp_pose.PoseLandmark.LEFT_ELBOW], width, height)
            lw = lm_xy(lm[mp_pose.PoseLandmark.LEFT_WRIST], width, height)
            rs = lm_xy(lm[mp_pose.PoseLandmark.RIGHT_SHOULDER], width, height)
            re = lm_xy(lm[mp_pose.PoseLandmark.RIGHT_ELBOW], width, height)
            rw = lm_xy(lm[mp_pose.PoseLandmark.RIGHT_WRIST], width, height)
            ang_l = angle(ls, le, lw)
            ang_r = angle(rs, re, rw)
            elbow_angle = (ang_l + ang_r)/2

        except:
            elbow_angle = None
            head_y = None

    if elbow_angle is not None and head_y is not None:
        angle_history.append(elbow_angle)
        smoothed_angle = np.mean(angle_history)

        if state == "waiting" and head_y < initial_head_y:  # head above initial → start counting
            state = "up"
            in_dip = True
            dip_start_time = t

        elif state == "up":
            # Head is above initial → track elbows
            if smoothed_angle > BOTTOM_ANGLE:
                # head returning down
                if head_y >= initial_head_y and in_dip:
                    dip_duration = t - dip_start_time
                    if dip_duration >= MIN_DIP:
                        rep = {
                            "count": len(reps)+1,
                            "up_time": round(dip_start_time,2),
                            "down_time": round(t,2),
                            "dip_duration_sec": round(dip_duration,2),
                            "min_elbow_angle": round(smoothed_angle,2)
                        }
                        reps.append(rep)
                    in_dip = False
                    dip_start_time = None
                    state = "waiting"

    # -------- Display --------
    cv2.putText(frame, f"Pull-Ups: {len(reps)}", (10,30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,255,255),2)
    cv2.putText(frame, f"State: {state}", (10,70), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0,255,0),2)
    if in_dip and dip_start_time:
        cv2.putText(frame, f"Dip: {t-dip_start_time:.2f}s", (10,110), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255,0,0),2)
    cv2.putText(frame, f"Time: {t:.2f}s", (10,150), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (200,200,0),2)

    cv2.imshow("Pull-Up Counter", frame)
    if cv2.waitKey(int(1000/fps)) & 0xFF == 27:
        break

# -------- Cleanup --------
cap.release()
cv2.destroyAllWindows()
pose.close()

# -------- Save CSV --------
if reps:
    pd.DataFrame(reps).to_csv("pullup_log.csv", index=False)
    print(f"Saved pullup_log.csv with {len(reps)} reps")
else:
    print("No reps detected.")

print(f"Total video duration: {video_duration_sec:.2f}s")
print(f"Total pull-ups counted: {len(reps)}")
