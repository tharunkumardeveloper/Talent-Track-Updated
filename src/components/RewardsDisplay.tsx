import { useState, useEffect } from "react";
import { Trophy, Zap, Coins, Medal, RefreshCw, BarChart3, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface RewardsDisplayProps {
  activityName: string;
  onRedo: () => void;
  onSave: () => void;
}

function FloatingCoin({ delay }: { delay: number }) {
  return (
    <div 
      className="absolute text-2xl animate-bounce"
      style={{
        left: `${Math.random() * 80 + 10}%`,
        top: `${Math.random() * 80 + 10}%`,
        animationDelay: `${delay}ms`,
        animationDuration: '2s'
      }}
    >
      🪙
    </div>
  );
}

export function RewardsDisplay({ activityName, onRedo, onSave }: RewardsDisplayProps) {
  const [showRewards, setShowRewards] = useState(false);
  const [xpCount, setXpCount] = useState(0);
  const [coinCount, setCoinCount] = useState(0);
  const [showBadge, setShowBadge] = useState(false);
  const [showCoins, setShowCoins] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const targetXP = 120;
  const targetCoins = 30;

  useEffect(() => {
    setTimeout(() => setShowRewards(true), 500);
    
    // Animate XP
    setTimeout(() => {
      const xpInterval = setInterval(() => {
        setXpCount(prev => {
          if (prev >= targetXP) {
            clearInterval(xpInterval);
            return targetXP;
          }
          return prev + 5;
        });
      }, 50);
    }, 1000);

    // Animate Coins
    setTimeout(() => {
      setShowCoins(true);
      const coinInterval = setInterval(() => {
        setCoinCount(prev => {
          if (prev >= targetCoins) {
            clearInterval(coinInterval);
            return targetCoins;
          }
          return prev + 2;
        });
      }, 100);
    }, 2000);

    // Show badge
    setTimeout(() => setShowBadge(true), 3000);
  }, []);

  const handleSave = () => {
    onSave();
    toast({
      title: "Results Saved! 🎉",
      description: "Your assessment has been recorded to your profile.",
    });
  };

  const handleViewLeaderboard = () => {
    navigate('/leaderboard');
  };

  if (!showRewards) {
    return (
      <Card className="glass border-glass-border/50 max-w-lg mx-auto">
        <CardContent className="py-12 text-center">
          <div className="animate-pulse">
            <Trophy className="w-16 h-16 text-gamification-gold mx-auto mb-4" />
            <h3 className="text-2xl font-bold">Calculating rewards...</h3>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">🎉 Congratulations!</h2>
        <p className="text-muted-foreground">You've earned some fantastic rewards</p>
      </div>

      {/* Rewards Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* XP Gained */}
        <Card className="glass border-glass-border/50 text-center hover-scale">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-gamification-xp">
              <Zap className="w-5 h-5" />
              XP Gained
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-gamification-xp mb-2 animate-pulse">
              +{xpCount}
            </div>
            <div className="w-full bg-glass-border/20 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-gamification-xp to-primary h-2 rounded-full transition-all duration-1000"
                style={{ width: `${(xpCount / targetXP) * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Coins Earned */}
        <Card className="glass border-glass-border/50 text-center hover-scale relative overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-gamification-coin">
              <Coins className="w-5 h-5" />
              Coins Earned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-gamification-coin mb-2">
              +{coinCount}
            </div>
            {showCoins && (
              <>
                {[...Array(5)].map((_, i) => (
                  <FloatingCoin key={i} delay={i * 200} />
                ))}
              </>
            )}
          </CardContent>
        </Card>

        {/* Badge Unlocked */}
        <Card className="glass border-glass-border/50 text-center hover-scale">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-gamification-gold">
              <Medal className="w-5 h-5" />
              Badge Unlocked
            </CardTitle>
          </CardHeader>
          <CardContent>
            {showBadge ? (
              <div className="animate-scale-in">
                <div className="text-4xl mb-2">🏆</div>
                <div className="font-bold text-gamification-gold">
                  {activityName} Starter
                </div>
                <Badge variant="outline" className="mt-2 border-gamification-gold text-gamification-gold">
                  Common
                </Badge>
              </div>
            ) : (
              <div className="text-2xl animate-pulse">🎁</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Encouragement Text */}
      <Card className="glass border-glass-border/50">
        <CardContent className="text-center py-6">
          <p className="text-lg font-medium mb-2">🌟 Great effort! Keep going to unlock more badges.</p>
          <p className="text-muted-foreground">
            Consistency is key to improving your fitness. Challenge yourself daily!
          </p>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button onClick={handleSave} className="btn-gradient">
          <Trophy className="w-4 h-4 mr-2" />
          Save & Submit
        </Button>
        
        <Button variant="outline" onClick={onRedo}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Redo Test
        </Button>
        
        <Button variant="outline" onClick={handleViewLeaderboard}>
          <BarChart3 className="w-4 h-4 mr-2" />
          View Leaderboard
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}