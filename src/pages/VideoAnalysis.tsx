import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward, Download, RotateCcw, Zap, Trophy, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Mock data for different sports analysis
const sportsAnalysis = {
  "vertical-jump": {
    metrics: ["Jump Height", "Takeoff Speed", "Landing Form", "Knee Bend"],
    feedback: {
      "Jump Height": { value: "24 inches", status: "good", target: "20+ inches" },
      "Takeoff Speed": { value: "2.8 m/s", status: "excellent", target: "2.5+ m/s" },
      "Landing Form": { value: "Good", status: "good", target: "Soft landing" },
      "Knee Bend": { value: "85°", status: "warning", target: "90°+ recommended" }
    }
  },
  "push-ups": {
    metrics: ["Form Quality", "Rep Count", "Tempo", "Range of Motion"],
    feedback: {
      "Form Quality": { value: "Excellent", status: "excellent", target: "Perfect alignment" },
      "Rep Count": { value: "32 reps", status: "good", target: "25+ reps" },
      "Tempo": { value: "2.1 sec/rep", status: "good", target: "2-3 sec/rep" },
      "Range of Motion": { value: "Full", status: "good", target: "Chest to floor" }
    }
  },
  "sit-ups": {
    metrics: ["Core Engagement", "Rep Count", "Form", "Speed"],
    feedback: {
      "Core Engagement": { value: "Strong", status: "excellent", target: "Controlled movement" },
      "Rep Count": { value: "45 reps", status: "excellent", target: "30+ reps" },
      "Form": { value: "Good", status: "good", target: "No neck strain" },
      "Speed": { value: "Consistent", status: "good", target: "Steady rhythm" }
    }
  },
  "shuttle-run": {
    metrics: ["Agility", "Speed", "Direction Change", "Time"],
    feedback: {
      "Agility": { value: "Quick", status: "excellent", target: "Sharp turns" },
      "Speed": { value: "Fast", status: "good", target: "Maintain pace" },
      "Direction Change": { value: "Smooth", status: "good", target: "Efficient turns" },
      "Time": { value: "28.5 sec", status: "good", target: "< 30 sec" }
    }
  },
  "endurance-run": {
    metrics: ["Pace", "Form", "Breathing", "Distance"],
    feedback: {
      "Pace": { value: "Steady", status: "good", target: "Consistent" },
      "Form": { value: "Good", status: "good", target: "Upright posture" },
      "Breathing": { value: "Controlled", status: "excellent", target: "Rhythmic" },
      "Distance": { value: "2.1 km", status: "excellent", target: "2+ km" }
    }
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "excellent": return "text-success";
    case "good": return "text-success";
    case "warning": return "text-warning";
    case "poor": return "text-destructive";
    default: return "text-muted-foreground";
  }
};

const getStatusBg = (status: string) => {
  switch (status) {
    case "excellent": return "bg-success/10 border-success/20";
    case "good": return "bg-success/10 border-success/20";
    case "warning": return "bg-warning/10 border-warning/20";
    case "poor": return "bg-destructive/10 border-destructive/20";
    default: return "bg-muted/10 border-muted/20";
  }
};

export default function VideoAnalysis() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const { videoFile, activityName, activityId } = location.state || {};
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [totalFrames, setTotalFrames] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showRewards, setShowRewards] = useState(false);

  // Mock analysis progress
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  // Rewards state
  const [coins, setCoins] = useState(150);
  const [xp, setXp] = useState(750);
  const [newCoins, setNewCoins] = useState(0);
  const [newXp, setNewXp] = useState(0);

  const currentAnalysis = sportsAnalysis[activityId as keyof typeof sportsAnalysis] || sportsAnalysis["push-ups"];

  useEffect(() => {
    if (!videoFile || !activityName) {
      navigate("/assessment");
      return;
    }

    // Simulate analysis progress
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          setIsAnalyzing(false);
          // Award rewards
          const earnedCoins = Math.floor(Math.random() * 50) + 25;
          const earnedXp = Math.floor(Math.random() * 100) + 50;
          setNewCoins(earnedCoins);
          setNewXp(earnedXp);
          setTimeout(() => {
            setCoins(prev => prev + earnedCoins);
            setXp(prev => prev + earnedXp);
            setShowRewards(true);
          }, 1000);
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [videoFile, activityName, navigate]);

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

  const handlePrevFrame = () => {
    if (videoRef.current && currentFrame > 0) {
      const newFrame = currentFrame - 1;
      setCurrentFrame(newFrame);
      videoRef.current.currentTime = (newFrame / totalFrames) * duration;
    }
  };

  const handleNextFrame = () => {
    if (videoRef.current && currentFrame < totalFrames - 1) {
      const newFrame = currentFrame + 1;
      setCurrentFrame(newFrame);
      videoRef.current.currentTime = (newFrame / totalFrames) * duration;
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const time = videoRef.current.currentTime;
      setCurrentTime(time);
      setCurrentFrame(Math.floor((time / duration) * totalFrames));
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setTotalFrames(Math.floor(videoRef.current.duration * 30)); // Assume 30 FPS
    }
  };

  const handleSubmitToSAI = () => {
    toast({
      title: "Submitted to SAI",
      description: "Your analysis has been submitted for advanced processing.",
    });
  };

  const handleDownloadReport = () => {
    toast({
      title: "Report Downloaded",
      description: "Your analysis report has been downloaded successfully.",
    });
  };

  const handleRedoVideo = () => {
    navigate("/assessment", { state: { activityId, activityName } });
  };

  if (!videoFile || !activityName) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            🎥 {activityName} Analysis
          </h1>
          <p className="text-muted-foreground">
            Frame-by-frame analysis with real-time feedback
          </p>
        </div>

        {/* Rewards Display */}
        <div className="flex justify-center gap-6">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg glass border border-glass-border/30 transition-all duration-500 ${showRewards ? 'animate-pulse' : ''}`}>
            <Coins className="w-5 h-5 text-gamification-coin" />
            <span className="font-semibold">{coins}</span>
            {newCoins > 0 && (
              <Badge className="bg-gamification-coin/20 text-gamification-coin border-gamification-coin/30 animate-fade-in">
                +{newCoins}
              </Badge>
            )}
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg glass border border-glass-border/30 transition-all duration-500 ${showRewards ? 'animate-pulse' : ''}`}>
            <Zap className="w-5 h-5 text-gamification-xp" />
            <span className="font-semibold">{xp} XP</span>
            {newXp > 0 && (
              <Badge className="bg-gamification-xp/20 text-gamification-xp border-gamification-xp/30 animate-fade-in">
                +{newXp}
              </Badge>
            )}
          </div>
        </div>

        {isAnalyzing ? (
          // Analysis Progress
          <Card className="glass border-glass-border/50">
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-primary animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold">Analyzing Your Performance</h3>
              <p className="text-muted-foreground">
                Our AI is processing your {activityName.toLowerCase()} video...
              </p>
              <div className="max-w-md mx-auto space-y-2">
                <Progress value={analysisProgress} className="h-2" />
                <p className="text-sm text-muted-foreground">{analysisProgress}% Complete</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          // Analysis Results
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left Side - Video Player */}
            <Card className="glass border-glass-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Video Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Video Player */}
                <div className="relative rounded-lg overflow-hidden bg-black">
                  <video
                    ref={videoRef}
                    src={videoFile ? URL.createObjectURL(videoFile) : undefined}
                    className="w-full aspect-video"
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                  />
                </div>

                {/* Controls */}
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePrevFrame}
                      className="border-glass-border/30"
                    >
                      <SkipBack className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={handlePlayPause}
                      className="btn-gradient"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNextFrame}
                      className="border-glass-border/30"
                    >
                      <SkipForward className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="text-center space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Frame {currentFrame + 1} of {totalFrames}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Time: {currentTime.toFixed(1)}s / {duration.toFixed(1)}s
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right Side - Analysis Feedback */}
            <div className="space-y-6">
              {/* Performance Stats */}
              <Card className="glass border-glass-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    Performance Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentAnalysis.metrics.map((metric) => {
                    const feedback = currentAnalysis.feedback[metric];
                    return (
                      <div
                        key={metric}
                        className={`p-4 rounded-lg border transition-all hover:scale-105 ${getStatusBg(feedback.status)}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{metric}</h4>
                          <Badge className={getStatusColor(feedback.status)}>
                            {feedback.status}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <p className={`text-lg font-bold ${getStatusColor(feedback.status)}`}>
                            {feedback.value}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Target: {feedback.target}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <Card className="glass border-glass-border/50">
                <CardContent className="p-6 space-y-4">
                  <Button
                    onClick={handleSubmitToSAI}
                    className="w-full btn-gradient"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Submit to SAI
                  </Button>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      onClick={handleDownloadReport}
                      variant="outline"
                      className="border-glass-border/30"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
                    </Button>
                    <Button
                      onClick={handleRedoVideo}
                      variant="outline"
                      className="border-glass-border/30"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Redo Video
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}