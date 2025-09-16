import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Play, Pause, SkipBack, SkipForward, Download, RefreshCw, Send, Trophy, Zap, Coins, Target, CheckCircle2, TrendingUp, Award, AlertTriangle, Upload, HelpCircle, Eye, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PostureAnalysis {
  type: 'good' | 'bad' | 'poor' | 'anomaly';
  message: string;
  tips?: string[];
  reps?: number;
  showSampleFrames?: boolean;
}

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
  const [postureAnalysis, setPostureAnalysis] = useState<PostureAnalysis | null>(null);
  const [accuracy, setAccuracy] = useState(0);
  const [timing, setTiming] = useState(0);
  const [consistency, setConsistency] = useState(0);
  const [coinsEarned, setCoinsEarned] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [showRewards, setShowRewards] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [sampleFrames, setSampleFrames] = useState<string[]>([]);

  // Analyze filename for posture and reps
  useEffect(() => {
    if (videoFile?.name) {
      const filename = videoFile.name.toLowerCase();
      const firstLetter = filename.charAt(0);
      const repsMatch = filename.match(/(\d+)/);
      const extractedReps = repsMatch ? parseInt(repsMatch[1]) : 0;

      let analysis: PostureAnalysis;

      switch (firstLetter) {
        case 'g':
          analysis = {
            type: 'good',
            message: 'Excellent posture! Keep it up to reach new milestones!',
            reps: extractedReps || (25 + Math.floor(Math.random() * 15)),
            tips: [
              'Your form is spot-on throughout the exercise',
              'Breathing rhythm is well-coordinated',
              'Great core stability and control',
              'Perfect alignment maintained'
            ]
          };
          break;
        
        case 'b':
          analysis = {
            type: 'bad',
            message: 'Your form needs slight adjustments. Align shoulders and core for better results.',
            reps: extractedReps || (15 + Math.floor(Math.random() * 10)),
            tips: [
              'Focus on shoulder alignment',
              'Engage your core muscles more',
              'Maintain steady breathing pattern',
              'Keep your back straight throughout'
            ]
          };
          break;
        
        case 'p':
          analysis = {
            type: 'poor',
            message: 'Video quality poor – no reps could be identified. Please upload another video.',
            tips: [
              'Ensure good lighting conditions',
              'Keep camera steady during recording',
              'Frame your full body in view',
              'Avoid blur and shaky movements',
              'Record in landscape orientation'
            ]
          };
          break;
        
        case 'a':
          analysis = {
            type: 'anomaly',
            message: 'Anomaly detected – potential deepfake content. Upload another video for accurate assessment.',
            showSampleFrames: true,
            tips: [
              'Use your device\'s native camera app',
              'Record in real-time without filters',
              'Ensure consistent lighting throughout',
              'Avoid using video editing apps',
              'Record in a single continuous take'
            ]
          };
          // Generate sample frame issues
          setSampleFrames([
            'Inconsistent lighting detected',
            'Unnatural movement patterns',
            'Frame interpolation artifacts',
            'Digital manipulation indicators'
          ]);
          break;
        
        default:
          analysis = {
            type: 'good',
            message: 'Great effort! Your technique shows good fundamentals.',
            reps: extractedReps || (20 + Math.floor(Math.random() * 15)),
            tips: [
              'Solid foundation in your technique',
              'Room for minor improvements',
              'Keep practicing for consistency',
              'Focus on controlled movements'
            ]
          };
      }

      setPostureAnalysis(analysis);
    }
  }, [videoFile]);

  // Animate stats when component mounts (only for good/bad posture)
  useEffect(() => {
    if (postureAnalysis && (postureAnalysis.type === 'good' || postureAnalysis.type === 'bad')) {
      const timer = setTimeout(() => {
        const baseAccuracy = postureAnalysis.type === 'good' ? 85 : 65;
        const baseTiming = postureAnalysis.type === 'good' ? 88 : 70;
        const baseConsistency = postureAnalysis.type === 'good' ? 90 : 75;
        
        setAccuracy(baseAccuracy + Math.floor(Math.random() * 10));
        setTiming(baseTiming + Math.floor(Math.random() * 10));
        setConsistency(baseConsistency + Math.floor(Math.random() * 8));
        setCoinsEarned(postureAnalysis.type === 'good' ? 60 : 35);
        setXpEarned(postureAnalysis.type === 'good' ? 150 : 90);
        setShowRewards(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [postureAnalysis]);

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
      const frameTime = 1 / 30;
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
    if (!postureAnalysis) return "Analyzing...";
    
    if (currentFrame < 50) return "Starting position analysis...";
    if (currentFrame < 150) return postureAnalysis.message;
    if (currentFrame < 250) return "Maintaining form assessment...";
    return "Exercise completion analysis...";
  };

  const handleRetryUpload = () => {
    navigate('/assessment');
  };

  const handleSubmitToSAI = () => {
    navigate('/dashboard', { 
      state: { 
        message: 'Assessment submitted to SAI successfully!',
        rewards: { coins: coinsEarned, xp: xpEarned }
      }
    });
  };

  const getAnalysisColor = () => {
    if (!postureAnalysis) return 'text-muted-foreground';
    
    switch (postureAnalysis.type) {
      case 'good': return 'text-success';
      case 'bad': return 'text-warning';
      case 'poor': return 'text-destructive';
      case 'anomaly': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getAnalysisIcon = () => {
    if (!postureAnalysis) return CheckCircle2;
    
    switch (postureAnalysis.type) {
      case 'good': return CheckCircle2;
      case 'bad': return AlertTriangle;
      case 'poor': return X;
      case 'anomaly': return AlertTriangle;
      default: return CheckCircle2;
    }
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

  // Special case handling for poor video or anomaly
  if (postureAnalysis && (postureAnalysis.type === 'poor' || postureAnalysis.type === 'anomaly')) {
    return (
      <div className="min-h-screen p-4 md:p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
              📹 Video Analysis - {activityName}
            </h1>
            <p className="text-muted-foreground">
              Analysis results for your uploaded video
            </p>
          </div>

          {/* Error Alert */}
          <Alert className="glass border-destructive/50 bg-destructive/10">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-destructive font-medium">
              {postureAnalysis.message}
            </AlertDescription>
          </Alert>

          {/* Sample Frames for Anomaly */}
          {postureAnalysis.showSampleFrames && sampleFrames.length > 0 && (
            <Card className="glass border-glass-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <Eye className="w-5 h-5" />
                  Detected Issues
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {sampleFrames.map((issue, index) => (
                    <div key={index} className="p-3 rounded-lg bg-destructive/10 border border-destructive/30">
                      <div className="w-full h-24 bg-gradient-to-br from-red-900/20 to-orange-900/20 rounded border-2 border-destructive/30 flex items-center justify-center mb-2">
                        <span className="text-xs text-destructive font-mono">Frame {index + 1}</span>
                      </div>
                      <p className="text-xs text-destructive">{issue}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recording Tips */}
          <Card className="glass border-glass-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                Recording Tips for Better Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {postureAnalysis.tips?.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-glass-border/10">
                    <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{tip}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleRetryUpload}
              className="btn-gradient px-8 py-3 rounded-xl"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Another Video
            </Button>
            <Button 
              variant="outline" 
              className="border-glass-border/30 px-8 py-3 rounded-xl"
              onClick={() => setShowTips(!showTips)}
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              View Help Tips
            </Button>
          </div>

          {/* Expandable Help Section */}
          {showTips && (
            <Card className="glass border-glass-border/50 animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  How to Record Perfect Assessment Videos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2 text-success">✅ Do This:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Use good lighting (natural light preferred)</li>
                        <li>• Keep camera steady and stable</li>
                        <li>• Frame your full body in view</li>
                        <li>• Record in landscape orientation</li>
                        <li>• Maintain consistent distance from camera</li>
                        <li>• Use your device's native camera app</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-destructive">❌ Avoid This:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Shaky or handheld recording</li>
                        <li>• Poor lighting or shadows</li>
                        <li>• Partial body framing</li>
                        <li>• Using filters or effects</li>
                        <li>• Recording in portrait mode</li>
                        <li>• Editing or splicing videos</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
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
                
                {/* Analysis Status Overlay */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-lg text-sm font-medium ${
                  postureAnalysis?.type === 'good' ? 'bg-success/90 text-white' :
                  postureAnalysis?.type === 'bad' ? 'bg-warning/90 text-white' :
                  'bg-primary/90 text-primary-foreground'
                }`}>
                  {postureAnalysis?.type === 'good' ? '🎯 Excellent Form' :
                   postureAnalysis?.type === 'bad' ? '⚠️ Form Needs Work' :
                   '🔍 AI Analysis Active'}
                </div>
                
                {/* Frame Counter */}
                <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-lg text-sm font-mono">
                  Frame {currentFrame} / {totalFrames}
                </div>

                {/* Dynamic Posture Feedback */}
                {currentFrame > 50 && currentFrame < 250 && postureAnalysis && (
                  <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-sm animate-fade-in ${
                    postureAnalysis.type === 'good' ? 'bg-success/90 text-white' :
                    'bg-warning/90 text-white'
                  }`}>
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
              {/* Posture Analysis */}
              {postureAnalysis && (
                <div className={`glass rounded-lg p-4 border transition-all duration-500 ${
                  postureAnalysis.type === 'good' ? 'border-success/50 bg-success/5' :
                  postureAnalysis.type === 'bad' ? 'border-warning/50 bg-warning/5' :
                  'border-glass-border/30'
                }`}>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    {React.createElement(getAnalysisIcon(), { 
                      className: `w-5 h-5 ${getAnalysisColor()}` 
                    })}
                    Posture Analysis
                  </h3>
                  <p className={`text-lg font-medium ${getAnalysisColor()} mb-3`}>
                    {postureAnalysis.message}
                  </p>
                  
                  {/* Expandable Tips */}
                  {postureAnalysis.tips && (
                    <div className="space-y-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowTips(!showTips)}
                        className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground"
                      >
                        {showTips ? 'Hide' : 'Show'} detailed feedback
                      </Button>
                      
                      {showTips && (
                        <div className="space-y-1 animate-fade-in">
                          {postureAnalysis.tips.map((tip, index) => (
                            <div key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="text-primary">•</span>
                              <span>{tip}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Reps Count */}
              {postureAnalysis?.reps && (
                <div className="glass rounded-lg p-4 border border-glass-border/30 animate-fade-in">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    Repetitions Detected
                  </h3>
                  <div className="text-3xl font-bold text-success animate-pulse">
                    {postureAnalysis.reps} reps
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Extracted from video analysis
                  </p>
                </div>
              )}

              {/* Performance Stats */}
              {showRewards && (
                <div className="space-y-4 animate-fade-in">
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
              )}

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
                    <div className="font-semibold text-primary">
                      {postureAnalysis?.type === 'good' ? 'Perfect Form Badge!' : 'Form Improver Badge!'}
                    </div>
                    <div className="text-sm text-muted-foreground">{activityName} Analyzer</div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3 mt-auto">
                {showRewards ? (
                  <>
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
                        onClick={handleRetryUpload}
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Redo Video
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-4">
                    <div className="animate-pulse text-muted-foreground">
                      Analyzing your performance...
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}