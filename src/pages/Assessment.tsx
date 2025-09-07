import { useState, useEffect } from "react";
import { ArrowUp, Timer, Dumbbell, Heart, Upload, Camera, CheckCircle2, Clock, Zap, Trophy, TrendingUp, Medal, Coins, BarChart3, Target, Flame, Video, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocation, useNavigate } from "react-router-dom";
import { RecentActivitiesModal } from "@/components/RecentActivitiesModal";
import { ActivityDetailModal } from "@/components/ActivityDetailModal";
import { NewBadgePopup } from "@/components/NewBadgePopup";
import { UploadConfirmation } from "@/components/UploadConfirmation";
import { AnalysisSimulation } from "@/components/AnalysisSimulation";
import { ResultsBreakdown } from "@/components/ResultsBreakdown";
import { RewardsDisplay } from "@/components/RewardsDisplay";
import { AdaptiveTestSection } from "@/components/AdaptiveTestSection";
import { VideoAnalysisModal } from "@/components/VideoAnalysisModal";

const activities = [
  {
    id: "vertical-jump",
    name: "Vertical Jump",
    emoji: "⬆️",
    icon: ArrowUp,
    description: "Measure your explosive leg power and athletic potential",
    duration: "2 minutes",
    difficulty: "Beginner",
    color: "text-gamification-gold",
    instructions: "Stand with feet shoulder-width apart. Bend your knees and jump as high as possible, extending your arms upward. Land softly and repeat 3 times for best measurement.",
    videoTips: "Position camera 6 feet away • Frame full body in view • Ensure good lighting • Jump straight up"
  },
  {
    id: "shuttle-run", 
    name: "Shuttle Run",
    emoji: "🏃‍♂️",
    icon: Timer,
    description: "Test your agility, speed, and directional change ability",
    duration: "3 minutes",
    difficulty: "Intermediate", 
    color: "text-gamification-silver",
    instructions: "Set up two cones 20 yards apart. Sprint to the first cone, touch it, sprint back to start, then continue for the full distance. Focus on quick direction changes.",
    videoTips: "Position camera to capture both cones • Ensure clear side view • Record full sprint path • Good lighting essential"
  },
  {
    id: "sit-ups",
    name: "Sit-Ups", 
    emoji: "🤸‍♀️",
    icon: Dumbbell,
    description: "Evaluate core strength and muscular endurance",
    duration: "1 minute",
    difficulty: "Beginner",
    color: "text-gamification-bronze", 
    instructions: "Lie on your back, knees bent, feet flat on ground. Cross arms over chest. Lift shoulders off ground using core muscles, then lower back down. Maintain steady rhythm.",
    videoTips: "Position camera to side view • Frame torso and knees • Stable camera mount • Clear movement visibility"
  },
  {
    id: "push-ups",
    name: "Push-Ups",
    emoji: "💪", 
    icon: Dumbbell,
    description: "Assess upper body strength and endurance capacity",
    duration: "1 minute",
    difficulty: "Intermediate",
    color: "text-gamification-diamond",
    instructions: "Start in plank position, hands shoulder-width apart. Lower body until chest nearly touches ground, then push back up. Keep body straight throughout movement.",
    videoTips: "Position camera at side angle • Frame full body • Capture full range of motion • Ensure proper lighting"
  },
  {
    id: "endurance-run",
    name: "Endurance Run",
    emoji: "🏃‍♀️",
    icon: Heart, 
    description: "Measure cardiovascular fitness and stamina levels",
    duration: "12 minutes",
    difficulty: "Advanced",
    color: "text-primary",
    instructions: "Run at steady pace for 12 minutes, covering as much distance as possible. Maintain consistent effort throughout. Walk if needed but try to minimize walking time.",
    videoTips: "Use front-facing camera • Capture running path • Record pace and form • Stable recording essential"
  }
];

const assessmentHistory = [
  { date: "2024-01-15", activity: "Push-Ups", result: "32 reps", improvement: "+15%" },
  { date: "2024-01-12", activity: "Vertical Jump", result: "24 inches", improvement: "+8%" },
  { date: "2024-01-10", activity: "Sit-Ups", result: "45 reps", improvement: "+12%" },
  { date: "2024-01-08", activity: "Shuttle Run", result: "28.5 sec", improvement: "+5%" },
  { date: "2024-01-05", activity: "Endurance Run", result: "2.1 km", improvement: "+10%" }
];

export default function Assessment() {
  const [selectedActivity, setSelectedActivity] = useState(activities[0]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showRecentActivities, setShowRecentActivities] = useState(false);
  const [showActivityDetail, setShowActivityDetail] = useState(false);
  const [showNewBadge, setShowNewBadge] = useState(false);
  const [showVideoAnalysis, setShowVideoAnalysis] = useState(false);
  const [isAdaptiveMode, setIsAdaptiveMode] = useState(false);
  
  // Post-upload flow states
  const [uploadPhase, setUploadPhase] = useState<'initial' | 'confirming' | 'analyzing' | 'results' | 'rewards'>('initial');
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if coming from challenges page
  const challengeData = location.state?.challenge;
  const [pageTitle, setPageTitle] = useState("Video Assessment");
  const [originalPageTitle, setOriginalPageTitle] = useState("Video Assessment");

  useEffect(() => {
    if (challengeData) {
      // Find matching activity based on challenge name
      const matchingActivity = activities.find(activity => 
        challengeData.toLowerCase().includes(activity.name.toLowerCase()) || 
        challengeData.toLowerCase().includes(activity.id)
      );
      if (matchingActivity) {
        setSelectedActivity(matchingActivity);
      }
      // Set title to the challenge name instead of generic
      setPageTitle(`Challenge: ${challengeData}`);
      setOriginalPageTitle(`Challenge: ${challengeData}`);
    }
  }, [challengeData]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      setUploadPhase('confirming');
    }
  };

  const handleActivitySelect = (activity) => {
    setSelectedActivity(activity);
    setIsAdaptiveMode(false);
    if (!challengeData) {
      setPageTitle(`Video Assessment - ${activity.name}`);
    }
  };

  const handleAdaptiveExerciseSelect = (exercise) => {
    setSelectedActivity(exercise);
    setIsAdaptiveMode(true);
    setPageTitle(`Adaptive Assessment - ${exercise.name}`);
    // Scroll to upload section
    setTimeout(() => {
      document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleStartAnalysis = () => {
    setUploadPhase('analyzing');
  };

  const handleAnalysisComplete = () => {
    setUploadPhase('results');
  };

  const handleViewRewards = () => {
    setUploadPhase('rewards');
  };

  const handleSaveResults = () => {
    // Simulate badge earning when completing a challenge
    if (challengeData) {
      setShowNewBadge(true);
    }
    // Reset to initial state
    setTimeout(() => {
      setUploadPhase('initial');
      setUploadedFile(null);
    }, 2000);
  };

  const handleRedoTest = () => {
    setUploadPhase('initial');
    setUploadedFile(null);
  };

  const handleCancelUpload = () => {
    setUploadPhase('initial');
    setUploadedFile(null);
  };

  // Render different phases of the upload flow
  if (uploadPhase === 'confirming') {
    return (
      <div className="space-y-8 p-6">
        <section className="text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            🎥 {pageTitle}
          </h1>
        </section>
        <UploadConfirmation
          fileName={uploadedFile?.name || ''}
          onProceed={handleStartAnalysis}
          onCancel={handleCancelUpload}
        />
      </div>
    );
  }

  if (uploadPhase === 'analyzing') {
    return (
      <div className="space-y-8 p-6">
        <section className="text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            🎥 {pageTitle}
          </h1>
        </section>
        <AnalysisSimulation onComplete={handleAnalysisComplete} />
      </div>
    );
  }

  if (uploadPhase === 'results') {
    return (
      <div className="space-y-8 p-6">
        <ResultsBreakdown
          activityName={selectedActivity.name}
          onViewRewards={handleViewRewards}
          userProfile={{ accessibility: { disabilityType: "none", assistiveDevices: [] } }} // Mock profile
        />
      </div>
    );
  }

  if (uploadPhase === 'rewards') {
    return (
      <div className="space-y-8 p-6">
        <RewardsDisplay
          activityName={selectedActivity.name}
          onRedo={handleRedoTest}
          onSave={handleSaveResults}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
          🎥 {pageTitle}
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Upload your exercise video for AI-powered analysis and get instant feedback on your performance.
        </p>
      </section>

      {/* Assessment Stats */}
      <section className="glass rounded-2xl p-6 border border-glass-border/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="w-6 h-6" />
            Assessment History
          </h3>
          <Button 
            onClick={() => setShowRecentActivities(true)}
            className="btn-gradient"
          >
            📊 View Recent Activities
          </Button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 rounded-xl bg-glass-border/10">
            <div className="text-2xl font-bold text-primary">12</div>
            <div className="text-sm text-muted-foreground">Total Assessments</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-glass-border/10">
            <div className="text-2xl font-bold text-gamification-xp">8</div>
            <div className="text-sm text-muted-foreground">Personal Records</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-glass-border/10">
            <div className="text-2xl font-bold text-gamification-coin">2,450</div>
            <div className="text-sm text-muted-foreground">Points Earned</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-glass-border/10">
            <div className="text-2xl font-bold text-gamification-gold">85%</div>
            <div className="text-sm text-muted-foreground">Improvement Rate</div>
          </div>
        </div>
      </section>

      {/* Main Upload and Activity Selection */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Side - Upload Section */}
        <section className="space-y-6" id="upload-section">
          <Card className="glass border-glass-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload {selectedActivity.name} Video
                {isAdaptiveMode && (
                  <Badge variant="secondary" className="bg-primary/20 text-primary border-0">
                    Adaptive
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Video Instructions */}
              <div className="glass rounded-lg p-4 border border-glass-border/30">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  How to Record Your {selectedActivity.name} Video
                  {isAdaptiveMode && (
                    <Badge variant="outline" className="text-xs border-primary text-primary">
                      Adaptive Exercise
                    </Badge>
                  )}
                </h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  {selectedActivity.videoTips.split(' • ').map((tip, index) => (
                    <div key={index}>• {tip}</div>
                  ))}
                </div>
                {isAdaptiveMode && (
                  <div className="mt-3 p-2 bg-primary/10 rounded border border-primary/20">
                    <p className="text-xs text-primary font-medium">
                      💡 This is an adaptive exercise designed to accommodate different abilities and mobility levels.
                    </p>
                  </div>
                )}
              </div>


              {/* Upload Area */}
              <div className="border-2 border-dashed border-glass-border/50 rounded-xl p-8 text-center hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="video-upload"
                />
                <label htmlFor="video-upload" className="cursor-pointer">
                  <Video className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium mb-2">
                    {uploadedFile ? uploadedFile.name : `Click to upload your ${selectedActivity.name.toLowerCase()} video`}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Supports MP4, MOV, AVI files up to 100MB
                    {isAdaptiveMode && " • Adaptive exercises welcome modifications"}
                  </p>
                </label>
              </div>

              {uploadedFile && (
                <div className="flex items-center gap-2 p-3 bg-success/10 rounded-lg border border-success/20">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <span className="text-success font-medium">Video uploaded successfully!</span>
                </div>
              )}

              <Button 
                className="w-full btn-gradient" 
                disabled={!uploadedFile}
                onClick={handleStartAnalysis}
              >
                <Play className="w-4 h-4 mr-2" />
                {challengeData ? `Complete Challenge` : 
                 isAdaptiveMode ? `Start ${selectedActivity.name} Analysis` : 
                 `Start Analysis`}
              </Button>

              {uploadedFile && (
                <Button 
                  onClick={() => setShowVideoAnalysis(true)}
                  variant="outline" 
                  className="w-full mt-2 border-glass-border/30"
                >
                  📹 Frame-by-Frame Analysis
                </Button>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Right Side - Activity Selection */}
        <section>
          <Card className="glass border-glass-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Select Activity
                {isAdaptiveMode && (
                  <Badge variant="secondary" className="bg-success/20 text-success border-0">
                    Adaptive Mode Active
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activities.map((activity) => (
                    <div
                      key={activity.id}
                      className={`
                        p-4 rounded-xl cursor-pointer border transition-all
                        ${selectedActivity.id === activity.id && !isAdaptiveMode
                          ? 'border-primary bg-primary/10 shadow-glow' 
                          : 'border-glass-border/30 hover:border-primary/50'
                        }
                      `}
                      onClick={() => handleActivitySelect(activity)}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-2xl">
                          {activity.emoji}
                        </div>
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-glass-border/20 ${activity.color}`}>
                          <activity.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{activity.name}</h4>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {activity.duration}
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                activity.difficulty === 'Beginner' ? 'border-success text-success' :
                                activity.difficulty === 'Intermediate' ? 'border-warning text-warning' :
                                'border-destructive text-destructive'
                              }`}
                            >
                              {activity.difficulty}
                            </Badge>
                          </div>
                        </div>
                        {selectedActivity.id === activity.id && !isAdaptiveMode && (
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                    </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Adaptive Tests Section */}
      <AdaptiveTestSection onSelectAdaptiveExercise={handleAdaptiveExerciseSelect} />

      {/* Modals */}
      <RecentActivitiesModal 
        isOpen={showRecentActivities} 
        onClose={() => setShowRecentActivities(false)} 
      />
      
      <ActivityDetailModal 
        isOpen={showActivityDetail} 
        onClose={() => setShowActivityDetail(false)}
        activity={selectedActivity}
      />

      {/* New Badge Popup */}
      <NewBadgePopup 
        trigger={showNewBadge}
        badge={{
          name: challengeData ? "Challenge Completed!" : "Assessment Complete!",
          icon: Trophy,
          color: "text-gamification-gold",
          description: challengeData ? `Congratulations! You've completed the "${challengeData}" challenge.` : "Great job on completing your assessment!",
          rarity: "Common",
          xpReward: 100,
          coinReward: 50,
          emoji: "🏆"
        }}
      />

      {/* Video Analysis Modal */}
      <VideoAnalysisModal
        isOpen={showVideoAnalysis}
        onClose={() => setShowVideoAnalysis(false)}
        videoFile={uploadedFile}
        activityName={selectedActivity.name}
      />
    </div>
  );
}