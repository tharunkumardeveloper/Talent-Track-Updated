import { useState, useEffect } from "react";
import { TrendingUp, AlertTriangle, CheckCircle2, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ResultData {
  reps: number;
  mistakes: number;
  formRating: string;
  benchmarkPercentile: number;
}

interface ResultsBreakdownProps {
  activityName: string;
  onViewRewards: () => void;
  userProfile?: {
    accessibility?: {
      disabilityType: string;
      assistiveDevices: string[];
    };
  };
}

function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const increment = target / (duration / 50);
    const timer = setInterval(() => {
      setCount(prev => {
        if (prev >= target) {
          clearInterval(timer);
          return target;
        }
        return Math.min(prev + increment, target);
      });
    }, 50);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{Math.round(count)}</span>;
}

export function ResultsBreakdown({ activityName, onViewRewards, userProfile }: ResultsBreakdownProps) {
  const [showResults, setShowResults] = useState(false);
  
  // Mock results based on activity and user profile
  const results: ResultData = {
    reps: activityName.includes('Sit-Up') ? 24 : activityName.includes('Push-Up') ? 18 : 32,
    mistakes: Math.floor(Math.random() * 3) + 1,
    formRating: Math.random() > 0.5 ? "Excellent" : "Good",
    benchmarkPercentile: Math.floor(Math.random() * 40) + 60
  };

  // Generate personalized motivational messages
  const getPersonalizedMessage = () => {
    const disabilityType = userProfile?.accessibility?.disabilityType;
    const assistiveDevices = userProfile?.accessibility?.assistiveDevices || [];
    
    if (disabilityType === "wheelchair") {
      return "Outstanding upper body strength! Your form shows incredible control and power.";
    } else if (disabilityType === "limb") {
      return "Amazing adaptation! You've maximized your strength beautifully.";
    } else if (assistiveDevices.includes("Prosthetics")) {
      return "Exceptional performance! Your technique adaptation is truly inspiring.";
    } else if (disabilityType === "vision") {
      return "Remarkable spatial awareness and form consistency. Your focus is incredible!";
    }
    return "Great consistency! You maintained good rhythm throughout.";
  };

  const getSpecializedFeedback = () => {
    const disabilityType = userProfile?.accessibility?.disabilityType;
    
    if (disabilityType === "wheelchair") {
      return "Range of motion: Excellent • Breathing cycles: Steady • Core stability: Strong";
    } else if (disabilityType === "limb") {
      return "Strength index: High • Compensation patterns: Effective • Balance: Excellent";
    } else if (disabilityType === "vision") {
      return "Movement consistency: Outstanding • Spatial awareness: Excellent • Form retention: Strong";
    }
    return "Your posture and technique look solid overall.";
  };

  useEffect(() => {
    setTimeout(() => setShowResults(true), 500);
  }, []);

  if (!showResults) {
    return (
      <Card className="glass border-glass-border/50 max-w-2xl mx-auto">
        <CardContent className="py-12 text-center">
          <div className="animate-pulse">
            <h3 className="text-2xl font-bold mb-4">Preparing your results...</h3>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">🎯 Here's how you performed!</h2>
        <p className="text-muted-foreground">{activityName} Assessment Results</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Reps Count */}
        <Card className="glass border-glass-border/50 hover-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-success">
              <CheckCircle2 className="w-5 h-5" />
              Repetitions Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-success mb-2">
              <AnimatedCounter target={results.reps} />
            </div>
            <p className="text-sm text-muted-foreground">
              {getPersonalizedMessage()}
            </p>
          </CardContent>
        </Card>

        {/* Form Review */}
        <Card className="glass border-glass-border/50 hover-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <TrendingUp className="w-5 h-5" />
              Form Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary mb-2">
              {results.formRating}
            </div>
            <p className="text-sm text-muted-foreground">
              {getSpecializedFeedback()}
            </p>
          </CardContent>
        </Card>

        {/* Mistakes Detected */}
        <Card className="glass border-glass-border/50 hover-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warning">
              <AlertTriangle className="w-5 h-5" />
              Areas for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning mb-2">
              <AnimatedCounter target={results.mistakes} /> minor corrections
            </div>
            <p className="text-sm text-muted-foreground">
              Small adjustments will help optimize your form.
            </p>
          </CardContent>
        </Card>

        {/* Benchmark Comparison */}
        <Card className="glass border-glass-border/50 hover-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gamification-gold">
              <BarChart3 className="w-5 h-5" />
              Performance Ranking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-2xl font-bold text-gamification-gold">
                Top <AnimatedCounter target={100 - results.benchmarkPercentile} />%
              </div>
              <Progress value={results.benchmarkPercentile} className="h-2" />
              <p className="text-sm text-muted-foreground">
                Better than {results.benchmarkPercentile}% of users in your age group
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <button
          onClick={onViewRewards}
          className="btn-gradient text-lg px-8 py-3 rounded-xl hover-scale"
        >
          🎁 View Your Rewards
        </button>
      </div>
    </div>
  );
}