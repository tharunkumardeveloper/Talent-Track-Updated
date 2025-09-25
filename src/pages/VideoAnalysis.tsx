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
import { analyzeExerciseVideo, checkVideoQuality, generatePerformanceMetrics, calculateRewards } from '@/utils/exerciseAnalysis';

interface PostureAnalysis {
  type: 'good' | 'bad' | 'poor' | 'anomaly';
  message: string;
  tips?: string[];
  reps?: number;
  showSampleFrames?: boolean;
  confidence?: number;
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
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [performanceMetrics, setPerformanceMetrics] = useState<any>(null);
  const [rewards, setRewards] = useState<any>(null);
  const [showRewards, setShowRewards] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [sampleFrames, setSampleFrames] = useState<string[]>([]);

  // Analyze filename for posture and reps
  useEffect(() => {
    if (videoFile?.name) {
      const filename = videoFile.name.toLowerCase();
      const firstLetter = filename.charAt(0);
      
      // Use the exercise analysis utility
      const analysis = analyzeExerciseVideo(filename, activityName || 'pushups', 60);
      const qualityCheck = checkVideoQuality(filename);
      const metrics = generatePerformanceMetrics(analysis);
      const rewardData = calculateRewards(analysis, metrics);

      let postureData: PostureAnalysis;

      switch (firstLetter) {
        case 'g':
          postureData = {
            type: 'good',
            message: 'Excellent posture! Keep it up to reach new milestones!',
            reps: analysis.reps,
            tips: analysis.tips,
            confidence: analysis.confidence
          };
          break;
        
        case 'b':
          postureData = {
            type: 'bad',
            message: 'Your form needs slight adjustments. Align shoulders and core for better results.',
            reps: analysis.reps,
            tips: analysis.tips,
            confidence: analysis.confidence
          };
          break;
        
        case 'p':
          postureData = {
            type: 'poor',
            message: 'Video quality poor – no reps could be identified. Please upload another video.',
            tips: qualityCheck.recommendations,
            confidence: analysis.confidence
          };
          break;
        
        case 'a':
          postureData = {
            type: 'anomaly',
            message: 'Anomaly detected – potential deepfake content. Upload another video for accurate assessment.',
            showSampleFrames: true,
            tips: qualityCheck.recommendations,
            confidence: analysis.confidence
          };
          // Generate sample frame issues
          setSampleFrames(qualityCheck.issues);
          break;
        
        default:
          postureData = {
            type: 'good',
            message: 'Great effort! Your technique shows good fundamentals.',
            reps: analysis.reps,
            tips: analysis.tips,
            confidence: analysis.confidence
          };
      }

      setPostureAnalysis(postureData);
      setAnalysisResults(analysis);
      setPerformanceMetrics(metrics);
      setRewards(rewardData);
    }
  }, [videoFile, activityName]);

  // Animate stats when component mounts (only for good/bad posture)
  useEffect(() => {
    if (postureAnalysis && (postureAnalysis.type === 'good' || postureAnalysis.type === 'bad') && performanceMetrics) {
      const timer = setTimeout(() => {
        setShowRewards(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [postureAnalysis, performanceMetrics]);

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
        rewards: rewards
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

  const getAnalysisBorderColor = () => {
    if (!postureAnalysis) return 'border-glass-border/30';
    
    switch (postureAnalysis.type) {
      case 'good': return 'border-success/50 bg-success/5';
      case 'bad': return 'border-warning/50 bg-warning/5';
      case 'poor': return 'border-destructive/50 bg-destructive/5';
      case 'anomaly': return 'border-destructive/50 bg-destructive/5';
      default: return 'border-glass-border/30';
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
          <Alert className="glass border-destructive/50 bg-destructive/10 animate-fade-in">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-destructive font-medium">
              {postureAnalysis.message}
            </AlertDescription>
          </Alert>

          {/* Sample Frames for Anomaly */}
          {postureAnalysis.showSampleFrames && sampleFrames.length > 0 && (
            <Card className="glass border-glass-border/50 animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <Eye className="w-5 h-5" />
                  Detected Issues
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {sampleFrames.map((issue, index) => (
                    <div key={index} className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 hover:bg-destructive/15 transition-colors">
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
          <Card className="glass border-glass-border/50 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                Recording Tips for Better Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {postureAnalysis.tips?.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-glass-border/10 hover:bg-glass-border/15 transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{tip}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button 
              onClick={handleRetryUpload}
              className="btn-gradient px-8 py-3 rounded-xl hover:scale-105 transition-transform"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Another Video
            </Button>
            <Button 
              variant="outline" 
              className="border-glass-border/30 px-8 py-3 rounded-xl hover:bg-glass-border/20 transition-colors"
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
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-500 ${
                  postureAnalysis?.type === 'good' ? 'bg-success/90 text-white animate-pulse-glow' :
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

                {/* Confidence Score */}
                {postureAnalysis?.confidence && (
                  <div className="absolute bottom-4 right-4 bg-black/80 text-white px-3 py-1 rounded-lg text-sm">
                    Confidence: {Math.round(postureAnalysis.confidence * 100)}%
                  </div>
                )}

                {/* Dynamic Posture Feedback */}
                {currentFrame > 50 && currentFrame < 250 && postureAnalysis && (
                  <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-sm animate-fade-in transition-all duration-300 ${
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
                    className="border-glass-border/30 hover:bg-glass-border/20 transition-colors"
                  >
                    <SkipBack className="w-4 h-4" />
                    Prev Frame
                  </Button>
                  
                  <Button
                    onClick={handlePlayPause}
                    size="sm"
                    className="btn-gradient px-6 hover:scale-105 transition-transform"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                    {isPlaying ? 'Pause' : 'Play'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => frameStep('forward')}
                    className="border-glass-border/30 hover:bg-glass-border/20 transition-colors"
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
                <div className={`glass rounded-lg p-4 border transition-all duration-500 ${getAnalysisBorderColor()}`}>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    {React.createElement(getAnalysisIcon(), { 
                      className: `w-5 h-5 ${getAnalysisColor()}` 
                    })}
                    Posture Analysis
                  </h3>
                  <p className={`text-lg font-medium ${getAnalysisColor()} mb-3`}>
                    {postureAnalysis.message}
                  </p>
                  
                  {/* Confidence Score */}
                  {postureAnalysis.confidence && (
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Analysis Confidence</span>
                        <span className="font-semibold">{Math.round(postureAnalysis.confidence * 100)}%</span>
                      </div>
                      <Progress value={postureAnalysis.confidence * 100} className="h-2" />
                    </div>
                  )}
                  
                  {/* Expandable Tips */}
                  {postureAnalysis.tips && (
                    <div className="space-y-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowTips(!showTips)}
                        className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showTips ? 'Hide' : 'Show'} detailed feedback
                      </Button>
                      
                      {showTips && (
                        <div className="space-y-1 animate-fade-in">
                          {postureAnalysis.tips.map((tip, index) => (
                            <div key={index} className="flex items-start gap-2 text-sm text-muted-foreground p-2 rounded bg-glass-border/10 hover:bg-glass-border/15 transition-colors">
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
                <div className="glass rounded-lg p-4 border border-glass-border/30 animate-fade-in hover:shadow-glow transition-all duration-300">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    Repetitions Detected
                  </h3>
                  <div className="text-3xl font-bold text-success animate-pulse mb-2">
                    {postureAnalysis.reps} reps
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Extracted from video analysis using MediaPipe pose detection
                  </p>
                  {analysisResults?.avgRepTime && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Average: {analysisResults.avgRepTime.toFixed(1)}s per rep
                    </p>
                  )}
                </div>
              )}

              {/* Performance Stats */}
              {showRewards && performanceMetrics && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="font-semibold">Performance Metrics</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Form Accuracy</span>
                        <span className="font-semibold">{performanceMetrics.accuracy}%</span>
                      </div>
                      <Progress value={performanceMetrics.accuracy} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Timing Consistency</span>
                        <span className="font-semibold">{performanceMetrics.timing}%</span>
                      </div>
                      <Progress value={performanceMetrics.timing} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Movement Quality</span>
                        <span className="font-semibold">{performanceMetrics.consistency}%</span>
                      </div>
                      <Progress value={performanceMetrics.consistency} className="h-2" />
                    </div>

                    <div className="pt-2 border-t border-glass-border/30">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Overall Score</span>
                        <span className={`text-2xl font-bold ${
                          performanceMetrics.overallScore >= 90 ? 'text-success' :
                          performanceMetrics.overallScore >= 75 ? 'text-primary' :
                          performanceMetrics.overallScore >= 60 ? 'text-warning' :
                          'text-destructive'
                        }`}>
                          {performanceMetrics.overallScore}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Rewards Section */}
              {showRewards && rewards && (
                <div className="glass rounded-lg p-4 border border-glass-border/30 bg-gradient-secondary animate-fade-in">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-gamification-gold" />
                    Rewards Earned
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 rounded-lg bg-glass-border/20 hover:bg-glass-border/30 transition-colors">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Coins className="w-4 h-4 text-gamification-coin" />
                        <span className="text-2xl font-bold text-gamification-coin animate-pulse">
                          +{rewards.coins}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">Coins</div>
                    </div>
                    
                    <div className="text-center p-3 rounded-lg bg-glass-border/20 hover:bg-glass-border/30 transition-colors">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Zap className="w-4 h-4 text-gamification-xp" />
                        <span className="text-2xl font-bold text-gamification-xp animate-pulse">
                          +{rewards.xp}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">XP</div>
                    </div>
                  </div>

                  {/* Badges Earned */}
                  {rewards.badges && rewards.badges.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">Badges Earned:</h4>
                      <div className="flex flex-wrap gap-2">
                        {rewards.badges.map((badge: string, index: number) => (
                          <div key={index} className="text-center p-2 rounded-lg bg-primary/10 border border-primary/30 hover:bg-primary/15 transition-colors">
                            <Award className="w-4 h-4 text-primary mx-auto mb-1" />
                            <div className="text-xs font-semibold text-primary">{badge}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3 mt-auto">
                {showRewards ? (
                  <>
                    <Button 
                      onClick={handleSubmitToSAI}
                      className="w-full btn-gradient py-3 rounded-xl hover:scale-105 transition-transform"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Submit to SAI
                    </Button>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <Button 
                        variant="outline" 
                        className="border-glass-border/30 hover:bg-glass-border/20 transition-colors"
                        onClick={() => {/* Download functionality */}}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Report
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="border-glass-border/30 hover:bg-glass-border/20 transition-colors"
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