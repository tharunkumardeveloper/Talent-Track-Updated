import { Trophy, Award, Star, Target, Zap, Medal, Crown, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface BadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  badge: {
    name: string;
    icon: any;
    color: string;
    description?: string;
    earnedDate?: string;
    rarity?: string;
    xpReward?: number;
    coinReward?: number;
    emoji?: string;
  };
  isNewBadge?: boolean;
}

export function BadgeModal({ isOpen, onClose, badge, isNewBadge = false }: BadgeModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`glass border-glass-border/50 backdrop-blur-glass max-w-md mx-auto ${isNewBadge ? 'animate-scale-in' : 'animate-fade-in'}`}>
        <DialogHeader className="text-center">
          <DialogTitle className={`text-2xl font-bold ${isNewBadge ? 'text-gamification-gold animate-pulse' : 'text-primary'}`}>
            {isNewBadge ? '🎉 New Badge Unlocked!' : '🏆 Badge Details'}
          </DialogTitle>
        </DialogHeader>

        <div className="text-center space-y-6 py-4">
          {/* Badge Icon with Animation */}
          <div className={`
            relative mx-auto w-32 h-32 rounded-full flex items-center justify-center
            ${badge.color} bg-gradient-radial from-background/20 to-transparent
            ${isNewBadge ? 'animate-scale-in shadow-glow animate-pulse' : 'animate-fade-in hover:scale-105 transition-transform duration-300'}
            border-4 border-current/30 cursor-pointer
          `}>
            <div className={`text-6xl ${isNewBadge ? 'animate-bounce' : ''} ${badge.color} filter drop-shadow-lg animate-pulse-glow`}>
              {badge.emoji || "🏆"}
            </div>
            
            {/* Enhanced Sparkle Animation for New Badges */}
            {isNewBadge && (
              <>
                <div className="absolute -top-4 -left-4 w-8 h-8 text-gamification-gold animate-bounce text-2xl">✨</div>
                <div className="absolute -top-4 -right-4 w-8 h-8 text-gamification-gold animate-bounce delay-150 text-2xl">✨</div>
                <div className="absolute -bottom-4 -left-4 w-8 h-8 text-gamification-gold animate-bounce delay-300 text-2xl">✨</div>
                <div className="absolute -bottom-4 -right-4 w-8 h-8 text-gamification-gold animate-bounce delay-500 text-2xl">✨</div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 w-6 h-6 text-gamification-gold animate-ping text-xl">⭐</div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4 w-6 h-6 text-gamification-gold animate-ping delay-700 text-xl">⭐</div>
              </>
            )}
          </div>

          {/* Badge Name */}
          <div>
            <h3 className={`text-2xl font-bold mb-2 ${badge.color}`}>
              {badge.name}
            </h3>
            {badge.description && (
              <p className="text-muted-foreground">
                {badge.description}
              </p>
            )}
          </div>

          {/* Badge Details */}
          <div className="space-y-3">
            {badge.rarity && (
              <div className="flex items-center justify-center gap-2">
                <Star className="w-4 h-4 text-gamification-gold" />
                <span className="text-sm font-medium">
                  Rarity: <span className="text-gamification-gold">{badge.rarity}</span>
                </span>
              </div>
            )}

            {badge.earnedDate && (
              <div className="text-sm text-muted-foreground">
                Earned on {badge.earnedDate}
              </div>
            )}

            {/* Rewards */}
            {(badge.xpReward || badge.coinReward) && (
              <div className="glass rounded-lg p-3 border border-glass-border/30">
                <div className="text-sm font-medium mb-2">Rewards Earned:</div>
                <div className="flex items-center justify-center gap-4">
                  {badge.xpReward && (
                    <div className="flex items-center gap-1">
                      <Zap className="w-4 h-4 text-gamification-xp" />
                      <span className="text-gamification-xp font-bold">+{badge.xpReward} XP</span>
                    </div>
                  )}
                  {badge.coinReward && (
                    <div className="flex items-center gap-1">
                      <span className="text-gamification-coin">🪙</span>
                      <span className="text-gamification-coin font-bold">+{badge.coinReward}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="pt-4">
            {isNewBadge ? (
              <Button 
                onClick={onClose} 
                className="btn-gradient w-full animate-pulse-glow"
              >
                🎉 Awesome! Continue Training
              </Button>
            ) : (
              <Button 
                onClick={onClose} 
                variant="outline"
                className="w-full border-primary/30 hover:bg-primary/10"
              >
                Close
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}