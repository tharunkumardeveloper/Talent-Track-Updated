import { Clock, Target, Award, TrendingUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ActivityDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  activity: {
    id: string;
    name: string;
    emoji: string;
    icon: any;
    description: string;
    duration: string;
    difficulty: string;
    color: string;
    instructions: string;
    videoTips: string;
  };
}

export function ActivityDetailModal({ isOpen, onClose, activity }: ActivityDetailModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass border-glass-border/50 backdrop-blur-glass max-w-2xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-primary bg-clip-text text-transparent flex items-center gap-3">
            <span className="text-3xl">{activity.emoji}</span>
            {activity.name} Details
          </DialogTitle>
        </DialogHeader>

        <div className="max-h-[70vh] overflow-y-auto space-y-6">
          {/* Activity Image */}
          <div className="w-full h-48 rounded-xl overflow-hidden bg-glass-border/20">
            <img 
              src={`/api/placeholder/600/300`} 
              alt={activity.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Activity Info */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-3 rounded-lg bg-glass-border/10">
              <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="font-medium">{activity.duration}</div>
              <div className="text-xs text-muted-foreground">Duration</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-glass-border/10">
              <Target className="w-6 h-6 mx-auto mb-2 text-primary" />
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
              <div className="text-xs text-muted-foreground mt-1">Difficulty</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-glass-border/10">
              <Award className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="font-medium">50-100 XP</div>
              <div className="text-xs text-muted-foreground">Reward Range</div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-semibold mb-2">Description</h4>
            <p className="text-muted-foreground">{activity.description}</p>
          </div>

          {/* Instructions */}
          <div>
            <h4 className="font-semibold mb-2">How to Perform</h4>
            <p className="text-muted-foreground leading-relaxed">{activity.instructions}</p>
          </div>

          {/* Video Tips */}
          <div>
            <h4 className="font-semibold mb-2">Recording Tips</h4>
            <div className="space-y-1">
              {activity.videoTips.split(' • ').map((tip, index) => (
                <div key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary">•</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Personal Best */}
          <div className="glass rounded-lg p-4 border border-glass-border/30">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-success" />
              Your Best Performance
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Best Score</div>
                <div className="font-bold text-lg text-primary">32 reps</div>
              </div>
              <div>
                <div className="text-muted-foreground">Last Improvement</div>
                <div className="font-bold text-lg text-success">+15%</div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-glass-border/30">
          <Button onClick={onClose} className="w-full">
            Got it! Let's Train
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}