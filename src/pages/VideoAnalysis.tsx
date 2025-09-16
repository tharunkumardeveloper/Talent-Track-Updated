import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward, Download, RotateCcw, Zap, Trophy, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Sports analysis configuration with filename-based logic
const sportsAnalysis = {
  "vertical-jump": {
    metrics: ["Jump Height", "Takeoff Speed", "Landing Form", "Knee Bend"],
  },
  "push-ups": {
    metrics: ["Form Quality", "Rep Count", "Tempo", "Range of Motion"],
  },
  "sit-ups": {
    metrics: ["Core Engagement", "Rep Count", "Form", "Speed"],
  },
  "shuttle-run": {
    metrics: ["Agility", "Speed", "Direction Change", "Time"],
  },
  "endurance-run": {
    metrics: ["Pace", "Form", "Breathing", "Distance"],
  },
  "assisted-chin-dip": {
    metrics: ["Upper Body Strength", "Rep Count", "Form", "Assistance Level"],
  },
  "resistance-band-arm": {
    metrics: ["Resistance Level", "Rep Count", "Form", "Range of Motion"],
  },
  "seated-push-up": {
    metrics: ["Upper Body Form", "Rep Count", "Seated Stability", "Push Range"],
  },
  "modified-shuttle": {
    metrics: ["Modified Agility", "Adapted Speed", "Turn Quality", "Time"],
  }
};

// Filename-based analysis logic
const analyzeVideoByFilename = (filename: string, activityId: string) => {
  const firstLetter = filename.toLowerCase().charAt(0);
  const numberMatch = filename.match(/(\d+)$/);
  const repCount = numberMatch ? parseInt(numberMatch[1]) : 0;

  let postureStatus = "good";
  let postureValue = "Good";
  let canProceed = true;
  let message = "";

  switch (firstLetter) {
    case 'g':
      postureStatus = "excellent";
      postureValue = "Good";
      break;
    case 'b':
      postureStatus = "warning";
      postureValue = "Bad";
      break;
    case 'p':
      postureStatus = "poor";
      postureValue = "Poor";
      canProceed = false;
      message = "Video quality poor, upload another video";
      break;
    case 'a':
      postureStatus = "poor";
      postureValue = "Anomaly";
      canProceed = false;
      message = "Anomaly detected (potential deepfake), upload another video";
      break;
    default:
      postureStatus = "good";
      postureValue = "Good";
  }

  // Generate random stats for other metrics
  const generateRandomStats = () => {
    const statuses = ["excellent", "good", "warning"];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    return { status: randomStatus };
  };

  const currentAnalysis = sportsAnalysis[activityId as keyof typeof sportsAnalysis];
  if (!currentAnalysis) return null;

  const feedback: Record<string, any> = {};
  
  currentAnalysis.metrics.forEach((metric) => {
    if (metric.includes("Rep") || metric.includes("Count")) {
      feedback[metric] = {
        value: `${repCount} reps`,
        status: postureStatus === "excellent" || postureStatus === "good" ? "good" : "warning",
        target: "Target achieved"
      };
    } else if (metric.includes("Form") || metric.includes("Quality") || metric.includes("Posture")) {
      feedback[metric] = {
        value: postureValue,
        status: postureStatus,
        target: "Good form required"
      };
    } else {
      const randomStat = generateRandomStats();
      feedback[metric] = {
        value: "Good",
        status: randomStat.status,
        target: "Optimal performance"
      };
    }
  });

  return {
    canProceed,
    message,
    repCount,
    postureStatus,
    feedback,
    metrics: currentAnalysis.metrics
  };
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

  // Analyze video based on filename
  const analysis = analyzeVideoByFilename(videoFile?.name || "", activityId || "push-ups");
  const [analysisResult, setAnalysisResult] = useState(analysis);

  useEffect(() => {
    if (!videoFile || !activityName) {
      navigate("/assessment");
      return;
    }

    // Re-analyze when video file changes
    const newAnalysis = analyzeVideoByFilename(videoFile.name, activityId || "push-ups");
    setAnalysisResult(newAnalysis);

    // Simulate analysis progress
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          setIsAnalyzing(false);
          
          // Award rewards based on analysis
          if (newAnalysis?.canProceed) {
            const earnedCoins = newAnalysis.postureStatus === "excellent" ? 75 : 
                              newAnalysis.postureStatus === "good" ? 50 : 25;
            const earnedXp = newAnalysis.repCount * 2 + (earnedCoins / 2);
            
            setNewCoins(earnedCoins);
            setNewXp(earnedXp);
            setTimeout(() => {
              setCoins(prev => prev + earnedCoins);
              setXp(prev => prev + earnedXp);
              setShowRewards(true);
            }, 1000);
          }
          
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [videoFile, activityName, activityId, navigate]);

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
        ) : analysisResult && !analysisResult.canProceed ? (
          // Error State for Poor Video or Anomaly
          <Card className="glass border-glass-border/50">
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-destructive/20 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-destructive animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold text-destructive">{analysisResult.message}</h3>
              <p className="text-muted-foreground">
                Please upload a new video for proper analysis
              </p>
              <Button
                onClick={handleRedoVideo}
                className="btn-gradient"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Upload New Video
              </Button>
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
                  Video Analysis - {videoFile?.name}
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
                  {analysisResult?.metrics.map((metric) => {
                    const feedback = analysisResult.feedback[metric];
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
            </div>
          </div>
        )}

        {/* Action Buttons - Only show when analysis is complete and can proceed */}
        {!isAnalyzing && analysisResult?.canProceed && (
          <div className="flex justify-center gap-4">
            <Button
              onClick={handleSubmitToSAI}
              className="btn-gradient px-8 py-3"
            >
              <Zap className="w-4 h-4 mr-2" />
              Submit to SAI
            </Button>
            <Button
              onClick={handleDownloadReport}
              variant="outline"
              className="border-glass-border/30 px-8 py-3"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
            <Button
              onClick={handleRedoVideo}
              variant="outline"
              className="border-glass-border/30 px-8 py-3"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Redo Video
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}