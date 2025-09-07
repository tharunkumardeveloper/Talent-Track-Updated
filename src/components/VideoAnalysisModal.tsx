import { useState, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Eye, Settings, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface VideoAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoFile?: File;
  activityName: string;
  userProfile?: {
    accessibility?: {
      subtitles: boolean;
      assistiveDevices: string[];
    };
  };
}

export function VideoAnalysisModal({ isOpen, onClose, videoFile, activityName, userProfile }: VideoAnalysisModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showOverlays, setShowOverlays] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (time: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time[0];
      setCurrentTime(time[0]);
    }
  };

  const handleSpeedChange = (speed: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      setPlaybackSpeed(speed);
    }
  };

  const frameStep = (direction: 'forward' | 'backward') => {
    if (videoRef.current) {
      const frameTime = 1 / 30; // Assuming 30fps
      const newTime = direction === 'forward' 
        ? Math.min(currentTime + frameTime, duration)
        : Math.max(currentTime - frameTime, 0);
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Generate analysis overlays based on activity and user profile
  const getAnalysisOverlays = () => {
    const assistiveDevices = userProfile?.accessibility?.assistiveDevices || [];
    
    if (assistiveDevices.includes("Wheelchair")) {
      return [
        { time: 5, text: "Focus on upper body alignment", position: "top-center" },
        { time: 15, text: "Excellent arm positioning", position: "top-right" },
        { time: 25, text: "Maintain core stability", position: "bottom-center" }
      ];
    } else if (assistiveDevices.includes("Prosthetics")) {
      return [
        { time: 5, text: "Great adaptation technique", position: "top-left" },
        { time: 15, text: "Focus on balance distribution", position: "center" },
        { time: 25, text: "Excellent movement control", position: "bottom-right" }
      ];
    }
    
    return [
      { time: 5, text: "Focus on form alignment", position: "top-center" },
      { time: 15, text: "Great posture control", position: "top-right" },
      { time: 25, text: "Maintain steady breathing", position: "bottom-center" }
    ];
  };

  const analysisOverlays = getAnalysisOverlays();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass border-glass-border/50 max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Frame-by-Frame Analysis - {activityName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Video Player */}
          <div className="relative bg-black rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              className="w-full h-64 object-contain"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              src={videoFile ? URL.createObjectURL(videoFile) : ''}
            />
            
            {/* Analysis Overlays */}
            {showOverlays && analysisOverlays.map((overlay, index) => {
              const shouldShow = Math.abs(currentTime - overlay.time) < 2;
              if (!shouldShow) return null;
              
              return (
                <div
                  key={index}
                  className={`absolute bg-primary/90 text-primary-foreground px-3 py-1 rounded-lg text-sm animate-fade-in ${
                    overlay.position === 'top-center' ? 'top-4 left-1/2 transform -translate-x-1/2' :
                    overlay.position === 'top-right' ? 'top-4 right-4' :
                    overlay.position === 'top-left' ? 'top-4 left-4' :
                    overlay.position === 'center' ? 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' :
                    overlay.position === 'bottom-center' ? 'bottom-4 left-1/2 transform -translate-x-1/2' :
                    'bottom-4 right-4'
                  }`}
                >
                  {overlay.text}
                </div>
              );
            })}

            {/* Subtitles */}
            {userProfile?.accessibility?.subtitles && (
              <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-lg text-sm">
                {currentTime < 10 ? "Starting position established" :
                 currentTime < 20 ? "Movement phase - maintain control" :
                 currentTime < 30 ? "Focus on breathing rhythm" :
                 "Excellent form throughout exercise"}
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="space-y-4">
            {/* Progress Bar */}
            <div className="space-y-2">
              <Slider
                value={[currentTime]}
                max={duration}
                step={0.1}
                onValueChange={handleSeek}
                className="cursor-pointer"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => frameStep('backward')}
                className="border-glass-border/30"
              >
                <SkipBack className="w-4 h-4" />
              </Button>
              
              <Button
                onClick={handlePlayPause}
                size="sm"
                className="btn-gradient"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => frameStep('forward')}
                className="border-glass-border/30"
              >
                <SkipForward className="w-4 h-4" />
              </Button>
            </div>

            {/* Advanced Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <label className="text-sm text-muted-foreground">Speed:</label>
                <select
                  value={playbackSpeed}
                  onChange={(e) => handleSpeedChange(Number(e.target.value))}
                  className="bg-glass border border-glass-border/30 rounded px-2 py-1 text-sm"
                >
                  <option value={0.25}>0.25x</option>
                  <option value={0.5}>0.5x</option>
                  <option value={1}>1x</option>
                  <option value={1.5}>1.5x</option>
                  <option value={2}>2x</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowOverlays(!showOverlays)}
                  className={`border-glass-border/30 ${showOverlays ? 'bg-primary/20' : ''}`}
                >
                  <Eye className="w-4 h-4" />
                  Overlays
                </Button>
              </div>
            </div>
          </div>

          {/* Analysis Text Guidance */}
          <div className="glass rounded-lg p-4 border border-glass-border/30">
            <h4 className="font-semibold mb-2">Current Analysis Focus:</h4>
            <p className="text-sm text-muted-foreground">
              {currentTime < 10 ? "Review your starting position and setup. Ensure proper alignment before beginning the movement." :
               currentTime < 20 ? "Focus on the movement execution. Notice the control and rhythm of your technique." :
               currentTime < 30 ? "Observe your breathing pattern and how it coordinates with the exercise movement." :
               "Excellent completion! Review the consistency of your form throughout the entire exercise."}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}