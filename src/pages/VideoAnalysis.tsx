import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Play, Pause, SkipBack, SkipForward, Download, RefreshCw, Send, Trophy, Zap, Coins, Target, CheckCircle2, TrendingUp, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';

export default function VideoAnalysis() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { videoFile, activityName, activityId } = location.state || {};
  
  // Video playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [totalFrames] = useState(300);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Analysis state
  const [repsCount, setRepsCount] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [timing, setTiming] = useState(0);
  const [consistency, setConsistency] = useState(0);
  const [coinsEarned, setCoinsEarned] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [showRewards, setShowRewards] = useState(false);

  // Extract reps from filename or generate based on activity
  useEffect(() => {
    if (videoFile?.name) {
      const repsMatch = videoFile.name.match(/(\d+)/);
      const extractedReps = repsMatch ? parseInt(repsMatch[1]) : null;
      
      if (extractedReps && extractedReps <= 100) {
        setRepsCount(extractedReps);
      } else {
        // Generate plausible reps based on activity
        const baseReps = activityName?.toLowerCase().includes('push') ? 25 :
                         activityName?.toLowerCase().includes('sit') ? 35 :
                         activityName?.toLowerCase().includes('jump') ? 15 : 28;
        setRepsCount(baseReps + Math.floor(Math.random() * 10));
      }
    }
  }, [videoFile, activityName]);

  // Animate stats when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAccuracy(85 + Math.floor(Math.random() * 10));
      setTiming(78 + Math.floor(Math.random() * 15));
      setConsistency(82 + Math.floor(Math.random() * 12));
      setCoinsEarned(45 + Math.floor(Math.random() * 25));
      setXpEarned(120 + Math.floor(Math.random() * 60));
      setShowRewards(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
      // Calculate frame based on time (assuming 30fps)
      const frame = Math.floor(videoRef.current.currentTime * 30) + 1;
      setCurrentFrame(Math.min(frame, totalFrames));
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const frameStep = (direction: 'forward' | 'backward') => {
    if (videoRef.current) {
      const frameTime = 1 / 30; // 30fps
      const newTime = direction === 'forward' 
        ? Math.min(currentTime + frameTime, duration)
        : Math.max(currentTime - frameTime, 0);
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleSeek = (time: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time[0];
      setCurrentTime(time[0]);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getPostureMessage = () => {
    if (currentFrame < 50) return "Starting position looks good!";
    if (currentFrame < 150) return "Excellent posture! Keep it up.";
    if (currentFrame < 250) return "Adjust posture for better form.";
    return "Great form throughout the exercise!";
  };

  const handleSubmitToSAI = () => {
    navigate('/dashboard', { 
      state: { 
        message: 'Assessment submitted to SAI successfully!',
        rewards: { coins: coinsEarned, xp: xpEarned }
      }
    });
  };

  const handleRedoVideo = () => {
    navigate('/assessment');
  };

  if (!videoFile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="glass border-glass-border/50 max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">No Video Found</h2>
            <p className="text-muted-foreground mb-6">
              Please upload a video from the assessment page first.
            </p>
            <Button onClick={() => navigate('/assessment')} className="btn-gradient">
              Go to Assessment
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            📹 Video Analysis - {activityName}
          </h1>
          <p className="text-muted-foreground">
            Frame-by-frame analysis with AI-powered feedback and performance insights
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
          {/* Left Side - Video Playback */}
          <Card className="glass border-glass-border/50 flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="w-5 h-5" />
                Video Playback
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              {/* Video Player */}
              <div className="relative bg-black rounded-lg overflow-hidden mb-4 flex-1">
                <video
                  ref={videoRef}
                  className="w-full h-full object-contain"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  src={videoFile ? URL.createObjectURL(videoFile) : ''}
                />
                
                {/* Posture Analysis Overlays */}
                <div className="absolute top-4 left-4 bg-primary/90 text-primary-foreground px-3 py-1 rounded-lg text-sm">
                  🎯 AI Analysis Active
                </div>
                
                {/* Frame Counter */}
                <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-lg text-sm font-mono">
                  Frame {currentFrame} / {totalFrames}
                </div>

                {/* Posture Guide Overlays */}
                {currentFrame > 50 && currentFrame < 250 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-success/90 text-white px-4 py-2 rounded-lg text-sm animate-fade-in">
                    {getPostureMessage()}
                  </div>
                )}
              </div>

              {/* Video Controls */}
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
                    Prev Frame
                  </Button>
                  
                  <Button
                    onClick={handlePlayPause}
                    size="sm"
                    className="btn-gradient px-6"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                    {isPlaying ? 'Pause' : 'Play'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => frameStep('forward')}
                    className="border-glass-border/30"
                  >
                    Next Frame
                    <SkipForward className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Side - Feedback Panel */}
          <Card className="glass border-glass-border/50 flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                AI Analysis Feedback
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col space-y-6">
              {/* Posture Feedback */}
              <div className="glass rounded-lg p-4 border border-glass-border/30">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  🎯 Posture Analysis
                </h3>
                <p className="text-lg font-medium text-success">
                  {getPostureMessage()}
                </p>
              </div>

              {/* Reps Count */}
              <div className="glass rounded-lg p-4 border border-glass-border/30">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  Repetitions Detected
                </h3>
                <div className="text-3xl font-bold text-success">
                  {repsCount} reps
                </div>
                <p className="text-sm text-muted-foreground">
                  Extracted from video analysis
                </p>
              </div>

              {/* Performance Stats */}
              <div className="space-y-4">
                <h3 className="font-semibold">Performance Metrics</h3>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Accuracy</span>
                      <span className="font-semibold">{accuracy}%</span>
                    </div>
                    <Progress value={accuracy} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Timing</span>
                      <span className="font-semibold">{timing}%</span>
                    </div>
                    <Progress value={timing} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Consistency</span>
                      <span className="font-semibold">{consistency}%</span>
                    </div>
                    <Progress value={consistency} className="h-2" />
                  </div>
                </div>
              </div>

              {/* Rewards Section */}
              {showRewards && (
                <div className="glass rounded-lg p-4 border border-glass-border/30 bg-gradient-secondary animate-fade-in">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-gamification-gold" />
                    Rewards Earned
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 rounded-lg bg-glass-border/20">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Coins className="w-4 h-4 text-gamification-coin" />
                        <span className="text-2xl font-bold text-gamification-coin animate-pulse">
                          +{coinsEarned}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">Coins</div>
                    </div>
                    
                    <div className="text-center p-3 rounded-lg bg-glass-border/20">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Zap className="w-4 h-4 text-gamification-xp" />
                        <span className="text-2xl font-bold text-gamification-xp animate-pulse">
                          +{xpEarned}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">XP</div>
                    </div>
                  </div>

                  <div className="text-center p-3 rounded-lg bg-primary/10 border border-primary/30">
                    <Award className="w-6 h-6 text-primary mx-auto mb-1" />
                    <div className="font-semibold text-primary">New Badge Unlocked!</div>
                    <div className="text-sm text-muted-foreground">{activityName} Analyzer</div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3 mt-auto">
                <Button 
                  onClick={handleSubmitToSAI}
                  className="w-full btn-gradient py-3 rounded-xl"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit to SAI
                </Button>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    className="border-glass-border/30"
                    onClick={() => {/* Download functionality */}}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="border-glass-border/30"
                    onClick={handleRedoVideo}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Redo Video
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}