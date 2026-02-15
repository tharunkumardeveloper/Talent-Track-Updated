import { useState } from "react";
import { Trophy, Calendar, TrendingUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface RecentActivitiesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const assessmentHistory = [
  { 
    date: "2024-01-15", 
    activity: "Push-Ups", 
    result: "32 reps", 
    improvement: "+15%",
    score: 95,
    duration: "1 minute",
    emoji: "💪"
  },
  { 
    date: "2024-01-12", 
    activity: "Vertical Jump", 
    result: "24 inches", 
    improvement: "+8%",
    score: 88,
    duration: "2 minutes",
    emoji: "⬆️"
  },
  { 
    date: "2024-01-10", 
    activity: "Sit-Ups", 
    result: "45 reps", 
    improvement: "+12%",
    score: 92,
    duration: "1 minute",
    emoji: "🤸‍♀️"
  },
  { 
    date: "2024-01-08", 
    activity: "Shuttle Run", 
    result: "28.5 sec", 
    improvement: "+5%",
    score: 78,
    duration: "3 minutes",
    emoji: "🏃‍♂️"
  },
  { 
    date: "2024-01-05", 
    activity: "Endurance Run", 
    result: "2.1 km", 
    improvement: "+10%",
    score: 85,
    duration: "12 minutes",
    emoji: "🏃‍♀️"
  }
];

export function RecentActivitiesModal({ isOpen, onClose }: RecentActivitiesModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass border-glass-border/50 backdrop-blur-glass max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-primary bg-clip-text text-transparent">
            📊 Recent Activities
          </DialogTitle>
        </DialogHeader>

        <div className="max-h-[70vh] overflow-y-auto space-y-4">
          {assessmentHistory.map((entry, index) => (
            <div key={index} className="glass rounded-xl p-4 border border-glass-border/30 hover:border-primary/50 transition-all">
              <div className="flex items-center gap-4">
                {/* Activity Emoji */}
                <div className="w-20 h-16 rounded-lg bg-glass-border/20 flex items-center justify-center">
                  <span className="text-4xl">{entry.emoji}</span>
                </div>

                {/* Activity Info */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-lg">{entry.activity}</h4>
                    <Badge variant="secondary" className="bg-primary/20 text-primary border-0">
                      Score: {entry.score}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Date</div>
                      <div className="font-medium">{entry.date}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Result</div>
                      <div className="font-medium">{entry.result}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Improvement</div>
                      <div className="font-medium text-success">{entry.improvement}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Duration</div>
                      <div className="font-medium">{entry.duration}</div>
                    </div>
                  </div>
                </div>

                {/* Trend Icon */}
                <div className="text-success">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-4 border-t border-glass-border/30">
          <p className="text-muted-foreground text-sm">
            Keep up the great work! Your consistency is paying off. 🚀
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}