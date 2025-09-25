# shuttle_run_counter_v2.py
import cv2
import mediapipe as mp
import numpy as np
from collections import deque
from tkinter import Tk, filedialog
import pandas as pd

# -------- Settings --------
PIXEL_TO_M = 0.01   # Approximate conversion, tune according to camera setup
SMOOTH_N = 5        # smoothing for x positions
DIR_FRAMES = 3      # consecutive frames to confirm direction
THRESHOLD_PIX = 5   # min movement to consider direction change

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
video_duration_sec = total_frames / fps

# -------- MediaPipe Setup --------
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(min_detection_confidence=0.5, model_complexity=1)
mp_draw = mp.solutions.drawing_utils

# -------- Shuttle Run Variables --------
x_history = deque(maxlen=SMOOTH_N)
dir_history = deque(maxlen=DIR_FRAMES)
positions = []
run_count = 0
status = "Waiting"
direction = None  # "forward" or "backward"
start_x = None
turnaround_x = None
last_x = None

frame_idx = 0

while True:
    ret, frame = cap.read()
    if not ret:
        break
    frame_idx += 1
    t = frame_idx / fps

    img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = pose.process(img_rgb)

    if results.pose_landmarks:
        mp_draw.draw_landmarks(frame, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)
        lm = results.pose_landmarks.landmark

        # Use foot/ankle points
        keypoints_x = [
            lm[mp_pose.PoseLandmark.LEFT_ANKLE].x * width,
            lm[mp_pose.PoseLandmark.RIGHT_ANKLE].x * width,
            lm[mp_pose.PoseLandmark.LEFT_FOOT_INDEX].x * width,
            lm[mp_pose.PoseLandmark.RIGHT_FOOT_INDEX].x * width
        ]
        current_x = np.mean(keypoints_x)
        x_history.append(current_x)
        smoothed_x = np.mean(x_history)

        # Direction calculation
        if last_x is not None:
            delta = smoothed_x - last_x
            if delta > THRESHOLD_PIX:
                dir_history.append("forward")
            elif delta < -THRESHOLD_PIX:
                dir_history.append("backward")
        last_x = smoothed_x

        if len(dir_history) == DIR_FRAMES and all(d == dir_history[0] for d in dir_history):
            confirmed_dir = dir_history[0]
            if start_x is None:
                start_x = smoothed_x
                direction = confirmed_dir
                status = "Running Towards" if direction == "forward" else "Returning"
            elif direction != confirmed_dir:
                turnaround_x = last_x
                direction = confirmed_dir
                if confirmed_dir == "backward":
                    run_count += 1
                    status = "Returning"
                else:
                    status = "Running Towards"

        positions.append(smoothed_x)

    # Display
    cv2.putText(frame, f"Run Count: {run_count}", (10,30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,255,255),2)
    cv2.putText(frame, f"Status: {status}", (10,70), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0,255,0),2)
    if start_x is not None:
        distance_m = abs(smoothed_x - start_x) * PIXEL_TO_M
        cv2.putText(frame, f"Distance: {distance_m:.2f} m", (10,110), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255,0,0),2)
    cv2.putText(frame, f"Time: {t:.2f} s", (10,150), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (200,200,0),2)

    cv2.imshow("Shuttle Run Counter", frame)
    if cv2.waitKey(int(1000/fps)) & 0xFF == 27:
        break

# -------- Cleanup --------
cap.release()
cv2.destroyAllWindows()
pose.close()

# -------- Save CSV --------
if positions:
    pd.DataFrame({"frame": list(range(1,len(positions)+1)), "x_pos_px": positions}).to_csv("shuttle_run_positions.csv", index=False)
    print(f"Saved shuttle_run_positions.csv with {len(positions)} frames")
print(f"Total video duration: {video_duration_sec:.2f} s")
print(f"Total runs counted: {run_count}")
