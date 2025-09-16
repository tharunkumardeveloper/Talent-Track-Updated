import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward, Download, RotateCcw, Zap, Trophy, Coins, AlertTriangle, CheckCircle2, Eye, Upload, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Sports analysis configuration with updated categories
const sportsAnalysis = {
  "vertical-jump": {
    metrics: ["Jump Height", "Takeoff Speed", "Landing Form", "Knee Bend"],
  },
  "shuttle-run": {
    metrics: ["Agility", "Speed", "Direction Change", "Time"],
  },
  "sit-ups": {
    metrics: ["Core Engagement", "Rep Count", "Form", "Speed"],
  },
  "push-ups": {
    metrics: ["Form Quality", "Rep Count", "Tempo", "Range of Motion"],
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

// Enhanced filename-based analysis logic
const analyzeVideoByFilename = (filename: string, activityId: string) => {
  const firstLetter = filename.toLowerCase().charAt(0);
  const numberMatch = filename.match(/(\d+)$/); // Extract number at end of filename
  const repCount = numberMatch ? parseInt(numberMatch[1]) : 0;

  let postureStatus = "good";
  let postureMessage = "";
  let canProceed = true;
  let errorType = "";
  let tips: string[] = [];
  let sampleFrames: string[] = [];

  switch (firstLetter) {
    case 'g':
      postureStatus = "excellent";
      postureMessage = `✅ Good posture detected! ${repCount} reps completed with excellent form.`;
      canProceed = true;
      tips = [
        "Maintain this excellent posture in future sessions",
        "Your form is a great example for other athletes",
        "Consider increasing intensity for next challenge"
      ];
      break;
    case 'b':
      postureStatus = "warning";
      postureMessage = `⚠️ Bad posture detected. ${repCount} reps completed but form needs improvement.`;
      canProceed = true;
      tips = [
        "Focus on aligning your shoulders and core",
        "Slow down the movement to maintain better control",
        "Consider practicing form without counting reps first",
        "Watch tutorial videos for proper technique"
      ];
      break;
    case 'p':
      postureStatus = "poor";
      postureMessage = "❌ Poor video quality – no reps could be identified. Please upload another video.";
      canProceed = false;
      errorType = "poor_quality";
      tips = [
        "Ensure good lighting without shadows",
        "Keep the camera steady and at eye level",
        "Make sure your full body is visible",
        "Avoid fast, blurry movements"
      ];
      break;
    case 'a':
      postureStatus = "anomaly";
      postureMessage = "🚨 Anomaly detected – potential deepfake content. Upload another video for accurate assessment.";
      canProceed = false;
      errorType = "anomaly";
      tips = [
        "Ensure you are recording yourself in real-time",
        "Use your device's native camera app",
        "Avoid using filters or video editing apps",
        "Record in good lighting with clear visibility"
      ];
      sampleFrames = [
        `Frame ${Math.floor(Math.random() * 50) + 20}: Inconsistent pixel patterns detected`,
        `Frame ${Math.floor(Math.random() * 50) + 60}: Unnatural movement transitions`,
        `Frame ${Math.floor(Math.random() * 50) + 100}: Digital artifacts in background`,
        `Frame ${Math.floor(Math.random() * 50) + 140}: Lighting inconsistencies detected`
      ];
      break;
    default:
      postureStatus = "neutral";
      postureMessage = `📊 Analysis complete. ${repCount} reps detected with standard form.`;
      canProceed = true;
      tips = [
        "Your form is acceptable but can be improved",
        "Focus on consistency throughout the movement",
        "Consider recording from a better angle next time"
      ];
  }

  // Generate feedback for metrics
  const currentAnalysis = sportsAnalysis[activityId as keyof typeof sportsAnalysis];
  if (!currentAnalysis) return null;

  const feedback: Record<string, any> = {};
  
  currentAnalysis.metrics.forEach((metric) => {
    if (metric.includes("Rep") || metric.includes("Count")) {
      feedback[metric] = {
        value: canProceed ? `${repCount} reps` : "Not detected",
        status: canProceed ? (postureStatus === "excellent" ? "excellent" : postureStatus === "bad" ? "warning" : "good") : "poor",
        target: "Target achieved"
      };
    } else if (metric.includes("Form") || metric.includes("Quality") || metric.includes("Posture")) {
      feedback[metric] = {
        value: canProceed ? (postureStatus === "excellent" ? "Excellent" : postureStatus === "bad" ? "Needs Work" : "Good") : "Cannot assess",
        status: postureStatus,
        target: "Good form required"
      };
    } else {
      // Generate randomized but plausible stats
      const randomValues = ["Excellent", "Good", "Needs Work"];
      const randomStatuses = ["excellent", "good", "warning"];
      const randomIndex = Math.floor(Math.random() * randomValues.length);
      
      feedback[metric] = {
        value: canProceed ? randomValues[randomIndex] : "Cannot assess",
        status: canProceed ? randomStatuses[randomIndex] : "poor",
        target: "Optimal performance"
      };
    }
  });

  return {
    canProceed,
    postureMessage,
    postureStatus,
    errorType,
    tips,
    sampleFrames,
    repCount,
    feedback,
    metrics: currentAnalysis.metrics
  };
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "excellent": return "text-success";
    case "good": return "text-success";
    case "neutral": return "text-primary";
    case "warning": return "text-warning";
    case "bad": return "text-warning";
    case "poor": return "text-destructive";
    case "anomaly": return "text-destructive";
    default: return "text-muted-foreground";
  }
};

const getStatusBg = (status: string) => {
  switch (status) {
    case "excellent": return "bg-success/10 border-success/20";
    case "good": return "bg-success/10 border-success/20";
    case "neutral": return "bg-primary/10 border-primary/20";
    case "warning": return "bg-warning/10 border-warning/20";
    case "bad": return "bg-warning/10 border-warning/20";
    case "poor": return "bg-destructive/10 border-destructive/20";
    case "anomaly": return "bg-destructive/10 border-destructive/20";
    default: return "bg-muted/10 border-muted/20";
  }
};

const getPostureIcon = (status: string) => {
  switch (status) {
    case "excellent":
    case "good":
      return <CheckCircle2 className="w-6 h-6 text-success" />;
    case "neutral":
      return <Eye className="w-6 h-6 text-primary" />;
    case "bad":
    case "warning":
      return <AlertTriangle className="w-6 h-6 text-warning" />;
    case "poor":
    case "anomaly":
      return <AlertTriangle className="w-6 h-6 text-destructive" />;
    default:
      return <Eye className="w-6 h-6 text-muted-foreground" />;
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
  const [totalFrames, setTotalFrames] = useState(300);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showRewards, setShowRewards] = useState(false);

  // Mock analysis progress
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  // Rewards state with animation
  const [coins, setCoins] = useState(150);
  const [xp, setXp] = useState(750);
  const [newCoins, setNewCoins] = useState(0);
  const [newXp, setNewXp] = useState(0);

  // Analysis result state
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  useEffect(() => {
    if (!videoFile || !activityName) {
      navigate("/assessment");
      return;
    }

    // Analyze based on filename
    const analysis = analyzeVideoByFilename(videoFile.name, activityId || "push-ups");
    setAnalysisResult(analysis);

    // Simulate analysis progress
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          setIsAnalyzing(false);
          
          // Award rewards based on analysis
          if (analysis?.canProceed) {
            const earnedCoins = analysis.postureStatus === "excellent" ? 75 : 
                              analysis.postureStatus === "good" ? 50 : 
                              analysis.postureStatus === "bad" ? 25 : 0;
            const earnedXp = analysis.repCount * 3 + earnedCoins;
            
            setNewCoins(earnedCoins);
            setNewXp(earnedXp);
            
            // Animate rewards after a delay
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
    if (currentFrame > 0) {
      const newFrame = currentFrame - 1;
      setCurrentFrame(newFrame);
      if (videoRef.current) {
        videoRef.current.currentTime = (newFrame / totalFrames) * duration;
      }
    }
  };

  const handleNextFrame = () => {
    if (currentFrame < totalFrames - 1) {
      const newFrame = currentFrame + 1;
      setCurrentFrame(newFrame);
      if (videoRef.current) {
        videoRef.current.currentTime = (newFrame / totalFrames) * duration;
      }
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
      title: "Submitted to SAI ✅",
      description: "Your analysis has been submitted for advanced processing.",
    });
  };

  const handleDownloadReport = () => {
    toast({
      title: "Report Downloaded 📄",
      description: "Your analysis report has been downloaded successfully.",
    });
  };

  const handleRedoVideo = () => {
    navigate("/assessment", { state: { activityId, activityName } });
  };

  const handleRetryUpload = () => {
    navigate("/assessment");
  };

  const handleViewHelpTips = () => {
    toast({
      title: "Help Tips 💡",
      description: "Recording guidelines have been displayed for better video quality.",
    });
  };

  if (!videoFile || !activityName) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="glass border-glass-border/50 max-w-md">
          <CardContent className="p-8 text-center">
            <AlertTriangle className="w-16 h-16 text-warning mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">No Video Found</h3>
            <p className="text-muted-foreground mb-4">
              Please upload a video to analyze your performance.
            </p>
            <Button onClick={() => navigate("/assessment")} className="btn-gradient">
              Go to Assessment
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero p-6">
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
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg glass border border-glass-border/30 transition-all duration-500 ${showRewards ? 'animate-pulse-glow' : ''}`}>
            <Coins className="w-5 h-5 text-gamification-coin" />
            <span className="font-semibold">{coins}</span>
            {newCoins > 0 && (
              <Badge className="bg-gamification-coin/20 text-gamification-coin border-gamification-coin/30 animate-fade-in">
                +{newCoins}
              </Badge>
            )}
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg glass border border-glass-border/30 transition-all duration-500 ${showRewards ? 'animate-pulse-glow' : ''}`}>
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
          // Error States for Poor Video or Anomaly
          <div className="space-y-6">
            <Card className="glass border-glass-border/50">
              <CardContent className="p-8 text-center space-y-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-destructive/20 flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8 text-destructive animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold text-destructive">{analysisResult.postureMessage}</h3>
                
                {analysisResult.errorType === "poor_quality" && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold">Tips for recording a better video:</h4>
                    <div className="grid md:grid-cols-2 gap-3 text-left max-w-3xl mx-auto">
                      {analysisResult.tips.map((tip: string, index: number) => (
                        <div key={index} className="flex items-start gap-2 p-3 rounded-lg bg-glass-border/10">
                          <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {analysisResult.errorType === "anomaly" && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold">Anomaly Detection Report:</h4>
                    <div className="space-y-2 text-left max-w-3xl mx-auto">
                      {analysisResult.sampleFrames.map((frame: string, index: number) => (
                        <div key={index} className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                          <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                          <span className="text-sm font-mono">{frame}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-4 rounded-lg bg-glass-border/10 border border-glass-border/30">
                      <h5 className="font-semibold mb-2">Why this matters:</h5>
                      <div className="grid md:grid-cols-2 gap-3 text-left">
                        {analysisResult.tips.map((tip: string, index: number) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-center gap-4">
                  <Button
                    onClick={handleRetryUpload}
                    className="btn-gradient px-6 py-3"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {analysisResult.errorType === "anomaly" ? "Upload Another Video" : "Retry Upload"}
                  </Button>
                  <Button
                    onClick={handleViewHelpTips}
                    variant="outline"
                    className="border-glass-border/30 px-6 py-3"
                  >
                    <HelpCircle className="w-4 h-4 mr-2" />
                    View Help Tips
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Analysis Results - Main Layout
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
                  
                  {/* Analysis Overlays */}
                  <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-1 rounded-lg text-sm">
                    Analyzing: {activityName}
                  </div>
                  
                  {analysisResult && (
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-lg text-sm font-medium ${
                      analysisResult.postureStatus === "excellent" ? "bg-success/90 text-white" :
                      analysisResult.postureStatus === "good" ? "bg-success/90 text-white" :
                      analysisResult.postureStatus === "bad" ? "bg-warning/90 text-black" :
                      "bg-destructive/90 text-white"
                    }`}>
                      Posture: {analysisResult.feedback?.["Form Quality"]?.value || analysisResult.feedback?.["Form"]?.value || "Analyzing..."}
                    </div>
                  )}

                  {/* Subtle posture guide overlays */}
                  <div className="absolute bottom-4 left-4 bg-primary/80 text-white px-2 py-1 rounded text-xs">
                    Focus: Maintain alignment
                  </div>
                </div>

                {/* Video Controls */}
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePrevFrame}
                      className="border-glass-border/30"
                    >
                      <SkipBack className="w-4 h-4" />
                      Previous Frame
                    </Button>
                    <Button
                      onClick={handlePlayPause}
                      className="btn-gradient"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      {isPlaying ? "Pause" : "Play"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNextFrame}
                      className="border-glass-border/30"
                    >
                      <SkipForward className="w-4 h-4" />
                      Next Frame
                    </Button>
                  </div>

                  <div className="text-center space-y-2">
                    <p className="text-sm font-medium">
                      Frame {currentFrame + 1} / {totalFrames}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Time: {currentTime.toFixed(1)}s / {duration.toFixed(1)}s
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right Side - Feedback Panel */}
            <div className="space-y-6">
              {/* Posture Feedback */}
              <Card className={`glass border-glass-border/50 ${getStatusBg(analysisResult?.postureStatus || "good")}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {getPostureIcon(analysisResult?.postureStatus || "good")}
                    AI Posture Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className={`text-lg font-semibold ${getStatusColor(analysisResult?.postureStatus || "good")}`}>
                      {analysisResult?.postureMessage || "Analyzing posture..."}
                    </p>
                    
                    {/* Show tips for good/bad posture */}
                    {analysisResult?.canProceed && analysisResult?.tips && analysisResult.tips.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <h5 className="font-semibold text-sm">
                          {analysisResult.postureStatus === "excellent" ? "Keep it up!" : "Improvement tips:"}
                        </h5>
                        <div className="space-y-1">
                          {analysisResult.tips.map((tip: string, index: number) => (
                            <div key={index} className="flex items-start gap-2 text-sm">
                              <span className={analysisResult.postureStatus === "excellent" ? "text-success" : "text-primary"}>•</span>
                              <span className="text-muted-foreground">{tip}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {analysisResult?.canProceed && (
                          {analysisResult.postureStatus === "excellent" ? "95%" :
                           analysisResult.postureStatus === "good" ? "85%" :
                           analysisResult.postureStatus === "neutral" ? "75%" :
                           analysisResult.postureStatus === "warning" ? "65%" : "45%"}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Based on filename analysis: <code className="font-mono bg-glass-border/20 px-1 rounded text-xs">{videoFile?.name}</code>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {analysisResult.repCount} reps • {analysisResult.feedback?.["Form Quality"]?.value || analysisResult.feedback?.["Form"]?.value || "Standard"} form quality
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              {analysisResult?.canProceed && (
                <Card className="glass border-glass-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="w-5 h-5" />
                      Performance Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {analysisResult?.metrics.map((metric: string) => {
                      const feedback = analysisResult.feedback[metric];
                      return (
                        <div
                          key={metric}
                          className={`p-4 rounded-lg border transition-all hover:scale-[1.02] ${getStatusBg(feedback.status)}`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{metric}</h4>
                            <Badge className={`${getStatusColor(feedback.status)} bg-transparent border-current text-xs`}>
                              {feedback.status === "excellent" ? "Excellent" :
                               feedback.status === "good" ? "Good" :
                               feedback.status === "neutral" ? "Standard" :
                               feedback.status === "warning" ? "Needs Work" :
                               feedback.status === "poor" ? "Poor" : feedback.status}
                            </Badge>
                          </div>
                          <div className="space-y-1">
                            <p className={`text-lg font-bold ${getStatusColor(feedback.status)}`}>
                              {feedback.value}
                            </p>
                            {feedback.status !== "poor" && (
                              <p className="text-sm text-muted-foreground">
                                {feedback.target}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              )}

              {/* Overall Score */}
              {analysisResult?.canProceed && (
                <Card className="glass border-glass-border/50">
                  <CardContent className="p-6 text-center">
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold">Overall Performance</h3>
                      <div className={`text-4xl font-bold ${getStatusColor(analysisResult.postureStatus)}`}>
                        {analysisResult.postureStatus === "excellent" ? "95%" :
                         analysisResult.postureStatus === "good" ? "85%" :
                         analysisResult.postureStatus === "bad" ? "65%" : "45%"}
                      </div>
                      <p className="text-muted-foreground">
                        {analysisResult.repCount} reps completed with {analysisResult.feedback?.["Form Quality"]?.value || analysisResult.feedback?.["Form"]?.value || "good"} form
                      </p>
                      
                      {/* Real-time updating stats */}
                      <div className="grid grid-cols-3 gap-4 mt-6">
                        <div className="text-center p-3 rounded-lg bg-glass-border/20">
                          <div className="text-lg font-bold text-success">
                            {Math.floor(Math.random() * 20) + 80}%
                          </div>
                          <div className="text-xs text-muted-foreground">Accuracy</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-glass-border/20">
                          <div className="text-lg font-bold text-primary">
                            {(Math.random() * 2 + 1).toFixed(1)}s
                          </div>
                          <div className="text-xs text-muted-foreground">Avg Timing</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-glass-border/20">
                          <div className="text-lg font-bold text-accent">
                            {Math.floor(Math.random() * 15) + 85}%
                          </div>
                          <div className="text-xs text-muted-foreground">Consistency</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
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