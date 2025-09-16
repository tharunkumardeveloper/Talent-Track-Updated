import { useState } from "react";
import { Car, Heart, Hand, Play, Info, Clock, Star, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const adaptiveExercises = [
  {
    id: "assisted-chin-dip",
    name: "Assisted Chin & Dip",
    emoji: "🤝",
    icon: Hand,
    description: "Upper body strength exercise with assistance for adaptive athletes",
    duration: "3 minutes",
    difficulty: "Intermediate",
    color: "text-gamification-silver",
    instructions: "Use assistance bands or support to perform chin-ups and dips. Focus on controlled movement and proper form. Adjust assistance level as needed.",
    modifications: ["Use assistance bands", "Adjust support level", "Start with partial range"],
    benefits: ["Upper body strength", "Functional movement", "Assisted mobility"],
    subtitles: "Set up assistance properly • Control the movement • Use support as needed • Focus on form"
  },
  {
    id: "resistance-band-arm",
    name: "Resistance Band Arm Test",
    emoji: "🎯",
    icon: Hand,
    description: "Measure upper body strength using resistance bands",
    duration: "3 minutes",
    difficulty: "Intermediate",
    color: "text-gamification-silver",
    instructions: "Hold resistance band with both hands at chest level. Pull band apart by moving arms outward, engaging shoulder and back muscles. Return to starting position with control.",
    modifications: ["Choose appropriate resistance level", "Use single arm if needed", "Adjust grip for comfort"],
    benefits: ["Shoulder strength", "Back muscle development", "Grip strength"],
    subtitles: "Hold band at chest level • Pull apart smoothly • Control the return • Maintain posture"
  },
  {
    id: "seated-push-up",
    name: "Seated Push-Up",
    emoji: "💺",
    icon: Hand,
    description: "Upper body strength exercise designed for seated athletes",
    duration: "2 minutes",
    difficulty: "Beginner",
    color: "text-gamification-bronze",
    instructions: "Sit upright in chair. Place hands on armrests or chair sides. Push your body up using arm strength, lifting weight off seat. Lower back down slowly and repeat.",
    modifications: ["Use chair with armrests", "Adjust hand position for comfort", "Start with partial lifts"],
    benefits: ["Upper body strength", "Core stability", "Seated mobility"],
    subtitles: "Place hands firmly on armrests • Push up with control • Lower slowly • Breathe steadily"
  },
  {
    id: "modified-shuttle",
    name: "Modified Shuttle Exercise",
    emoji: "♿",
    icon: Car,
    description: "Agility test adapted for wheelchair users or mobility aids",
    duration: "5 minutes",
    difficulty: "Intermediate",
    color: "text-gamification-gold",
    instructions: "Navigate between two points 10 feet apart. Move as quickly as safely possible between markers. Focus on smooth turns and consistent speed.",
    modifications: ["Adjust distance as needed", "Use wider turning radius", "Allow walking aids or support"],
    benefits: ["Modified agility", "Coordination", "Adapted fitness"],
    subtitles: "Move between markers smoothly • Focus on safe turns • Maintain consistent pace • Use support as needed"
  }
];

interface AdaptiveTestSectionProps {
  userProfile?: {
    accessibility?: {
      disabilityType: string;
      assistiveDevices: string[];
      testPreferences: string[];
    };
  };
  onSelectAdaptiveExercise?: (exercise: any) => void;
}

export function AdaptiveTestSection({ userProfile, onSelectAdaptiveExercise }: AdaptiveTestSectionProps) {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleStartTest = (exercise: any) => {
    // Convert adaptive exercise to activity format
    const adaptedActivity = {
      id: exercise.id,
      name: exercise.name,
      emoji: exercise.emoji,
      icon: exercise.icon,
      description: exercise.description,
      duration: exercise.duration,
      difficulty: exercise.difficulty,
      color: exercise.color,
      instructions: exercise.instructions,
      videoTips: exercise.subtitles,
      isAdaptive: true
    };
    
    if (onSelectAdaptiveExercise) {
      onSelectAdaptiveExercise(adaptedActivity);
    }
  };

  const handleShowInstructions = (exercise: any) => {
    setSelectedExercise(exercise);
    setShowInstructions(true);
  };

  // Filter exercises based on user's accessibility needs
  const getRecommendedExercises = () => {
    if (!userProfile?.accessibility) return adaptiveExercises;
    
    const { disabilityType, assistiveDevices } = userProfile.accessibility;
    
    return adaptiveExercises.filter(exercise => {
      if (disabilityType === "wheelchair" && exercise.id.includes("seated")) return true;
      if (disabilityType === "limb" && exercise.id.includes("arm")) return true;
      if (disabilityType === "mobility" && exercise.id.includes("breathing")) return true;
      return true; // Show all by default
    });
  };

  const recommendedExercises = getRecommendedExercises();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          <Heart className="w-6 h-6 text-primary" />
          Adaptive Assessment Options
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Specially designed exercises that accommodate different abilities and mobility levels. 
          Every athlete has unique strengths - let's discover yours.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {recommendedExercises.map((exercise) => (
          <Card key={exercise.id} className="glass border-glass-border/50 hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="text-3xl">{exercise.emoji}</div>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-glass-border/20 ${exercise.color}`}>
                  <exercise.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{exercise.name}</CardTitle>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <Clock className="w-3 h-3" />
                    {exercise.duration}
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        exercise.difficulty === 'Beginner' ? 'border-success text-success' :
                        exercise.difficulty === 'Intermediate' ? 'border-warning text-warning' :
                        'border-destructive text-destructive'
                      }`}
                    >
                      {exercise.difficulty}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{exercise.description}</p>
              
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Key Benefits:</h4>
                <div className="flex flex-wrap gap-1">
                  {exercise.benefits.map((benefit) => (
                    <Badge key={benefit} variant="secondary" className="text-xs">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={() => handleStartTest(exercise)}
                  className="flex-1 btn-gradient"
                  size="sm"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Test
                </Button>
                <Button 
                  onClick={() => handleShowInstructions(exercise)}
                  variant="outline"
                  size="sm"
                  className="border-glass-border/30"
                >
                  <Info className="w-4 h-4 mr-2" />
                  How To
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Instructions Modal */}
      <Dialog open={showInstructions} onOpenChange={setShowInstructions}>
        <DialogContent className="glass border-glass-border/50 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedExercise?.emoji} {selectedExercise?.name} - Instructions
            </DialogTitle>
          </DialogHeader>
          
          {selectedExercise && (
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <h4 className="font-semibold">How to perform:</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedExercise.instructions}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Modifications available:</h4>
                <ul className="space-y-1">
                  {selectedExercise.modifications.map((mod, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <CheckCircle2 className="w-3 h-3 text-success mt-0.5 flex-shrink-0" />
                      {mod}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass rounded-lg p-4 border border-glass-border/30">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Star className="w-4 h-4 text-primary" />
                  Video Guidance (with subtitles)
                </h4>
                <p className="text-sm text-muted-foreground">
                  {selectedExercise.subtitles}
                </p>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={() => {
                    setShowInstructions(false);
                    handleStartTest(selectedExercise);
                  }}
                  className="flex-1 btn-gradient"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start This Test
                </Button>
                <Button 
                  onClick={() => setShowInstructions(false)}
                  variant="outline"
                  className="border-glass-border/30"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}