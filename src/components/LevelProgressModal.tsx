import { Star, Trophy, Zap, Target, Award, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const levelTiers = [
  { level: 1, name: "Novice", xpRequired: 0, icon: Star, color: "text-gray-500", bgColor: "bg-gray-500/20" },
  { level: 5, name: "Explorer", xpRequired: 500, icon: Target, color: "text-gamification-bronze", bgColor: "bg-gamification-bronze/20" },
  { level: 10, name: "Athlete", xpRequired: 1200, icon: Zap, color: "text-gamification-silver", bgColor: "bg-gamification-silver/20" },
  { level: 15, name: "Champion", xpRequired: 2500, icon: Trophy, color: "text-gamification-gold", bgColor: "bg-gamification-gold/20" },
  { level: 20, name: "Elite", xpRequired: 4500, icon: Award, color: "text-primary", bgColor: "bg-primary/20" },
  { level: 25, name: "Legend", xpRequired: 7500, icon: Crown, color: "text-gamification-diamond", bgColor: "bg-gamification-diamond/20" },
];

const currentUserStats = {
  currentLevel: 12,
  totalXP: 2840,
  nextLevelXP: 3000,
};

interface LevelProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LevelProgressModal({ isOpen, onClose }: LevelProgressModalProps) {
  const currentTier = levelTiers.find(tier => currentUserStats.currentLevel >= tier.level) || levelTiers[0];
  const nextTier = levelTiers.find(tier => tier.level > currentUserStats.currentLevel);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass border-glass-border/50 backdrop-blur-glass max-w-3xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-primary bg-clip-text text-transparent">
            🌟 Level Progress System
          </DialogTitle>
          <DialogDescription>
            Track your journey through the athletic levels and unlock amazing rewards
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[70vh] overflow-y-auto space-y-6">
          {/* Current Level Status */}
          <div className="glass rounded-2xl p-6 border border-glass-border/30 bg-gradient-secondary">
            <div className="text-center mb-4">
              <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${currentTier.bgColor} ${currentTier.color} border-2 border-current shadow-glow`}>
                <currentTier.icon className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Level {currentUserStats.currentLevel}</h3>
              <p className="text-lg text-muted-foreground">{currentTier.name} Tier</p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Progress to Level {currentUserStats.currentLevel + 1}</span>
                <span className="font-semibold">{currentUserStats.totalXP} / {currentUserStats.nextLevelXP} XP</span>
              </div>
              <Progress 
                value={(currentUserStats.totalXP / currentUserStats.nextLevelXP) * 100} 
                className="h-3" 
              />
              <p className="text-center text-sm text-muted-foreground">
                {currentUserStats.nextLevelXP - currentUserStats.totalXP} XP needed for next level
              </p>
            </div>
          </div>

          {/* All Level Tiers */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold">Level Tiers & Requirements</h4>
            <div className="space-y-3">
              {levelTiers.map((tier, index) => {
                const isUnlocked = currentUserStats.currentLevel >= tier.level;
                const isCurrent = currentUserStats.currentLevel >= tier.level && 
                  (index === levelTiers.length - 1 || currentUserStats.currentLevel < levelTiers[index + 1].level);
                
                return (
                  <div 
                    key={tier.level}
                    className={`glass rounded-xl p-4 border transition-all duration-300 ${
                      isCurrent 
                        ? 'border-primary/50 bg-primary/10 shadow-glow' 
                        : isUnlocked 
                          ? 'border-success/30 bg-success/5' 
                          : 'border-glass-border/30 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${tier.bgColor} ${tier.color} ${isUnlocked ? 'border-2 border-current' : 'border border-glass-border/30'}`}>
                        <tier.icon className="w-6 h-6" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h5 className="font-semibold">Level {tier.level}+ - {tier.name}</h5>
                          {isCurrent && (
                            <Badge variant="secondary" className="bg-primary/20 text-primary border-0">
                              Current
                            </Badge>
                          )}
                          {isUnlocked && !isCurrent && (
                            <Badge variant="secondary" className="bg-success/20 text-success border-0">
                              Unlocked
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {tier.xpRequired === 0 ? 'Starting level' : `Requires ${tier.xpRequired.toLocaleString()} total XP`}
                        </p>
                      </div>

                      <div className="text-right">
                        {isUnlocked ? (
                          <div className="text-success text-sm font-semibold">✅ Achieved</div>
                        ) : (
                          <div className="text-muted-foreground text-sm">
                            {(tier.xpRequired - currentUserStats.totalXP).toLocaleString()} XP needed
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Rewards Info */}
          <div className="glass rounded-xl p-4 border border-glass-border/30">
            <h5 className="font-semibold mb-3 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              Level-Up Rewards
            </h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 100 XP bonus for each level milestone</li>
              <li>• 50 coins for every 5 levels</li>
              <li>• Exclusive tier badges at major milestones</li>
              <li>• Special animations and profile decorations</li>
              <li>• Access to premium challenges</li>
            </ul>
          </div>
        </div>

        <div className="pt-4 border-t border-glass-border/30">
          <Button onClick={onClose} className="w-full">
            Continue Your Journey!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}