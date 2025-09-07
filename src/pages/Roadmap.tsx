import { Trophy, Lock, CheckCircle2, Star, Target, Flame, Crown, Diamond, Heart } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { BadgeModal } from "@/components/BadgeModal";

const badgeCategories = [
  {
    name: "Inclusive Champion",
    color: "text-primary",
    bgColor: "bg-primary/20",
    unlocked: 3,
    total: 8,
    badges: [
      { name: "First Assisted Exercise", emoji: "🌟", icon: Heart, unlocked: true, description: "Complete your first adaptive assessment" },
      { name: "Daily Practice Streak", emoji: "🔥", icon: Flame, unlocked: true, description: "Complete adaptive exercises 5 days in a row" },
      { name: "Endurance Milestone", emoji: "💫", icon: Trophy, unlocked: true, description: "Achieve personal best in breathing test" },
      { name: "Strength Adaptation", emoji: "💪", icon: Diamond, unlocked: false, description: "Master modified strength exercises" },
      { name: "Mobility Mastery", emoji: "♿", icon: CheckCircle2, unlocked: false, description: "Excel in wheelchair navigation tests" },
      { name: "Breathing Champion", emoji: "🫁", icon: Star, unlocked: false, description: "Achieve excellent respiratory scores" },
      { name: "Adaptive Leader", emoji: "👑", icon: Crown, unlocked: false, description: "Inspire 3 other adaptive athletes" },
      { name: "Limitless Spirit", emoji: "✨", icon: Target, unlocked: false, description: "Complete all adaptive challenge categories" },
    ]
  },
  {
    name: "Beginner",
    color: "text-gamification-bronze",
    bgColor: "bg-gamification-bronze/20",
    unlocked: 8,
    total: 10,
    badges: [
      { name: "First Steps", emoji: "👶", icon: Target, unlocked: true, description: "Complete your first assessment" },
      { name: "Early Bird", emoji: "🐣", icon: Star, unlocked: true, description: "Complete 3 assessments" },
      { name: "Consistent", emoji: "📅", icon: CheckCircle2, unlocked: true, description: "Complete assessments 3 days in a row" },
      { name: "Form Focus", emoji: "🎯", icon: Trophy, unlocked: true, description: "Achieve 90% form accuracy" },
      { name: "Speed Demon", emoji: "⚡", icon: Flame, unlocked: true, description: "Complete fastest shuttle run time" },
      { name: "Strength Builder", emoji: "💪", icon: Diamond, unlocked: true, description: "Complete 20 push-ups" },
      { name: "Core Crusher", emoji: "🔥", icon: Target, unlocked: true, description: "Complete 30 sit-ups" },
      { name: "Jump Master", emoji: "🦘", icon: Star, unlocked: true, description: "Achieve 20+ inch vertical jump" },
      { name: "Team Player", emoji: "👥", icon: Crown, unlocked: false, description: "Add 5 friends to your network" },
      { name: "Milestone", emoji: "🏁", icon: Trophy, unlocked: false, description: "Reach 1000 XP" },
    ]
  },
  {
    name: "Intermediate",
    color: "text-gamification-silver",
    bgColor: "bg-gamification-silver/20",
    unlocked: 4,
    total: 12,
    badges: [
      { name: "Rising Star", emoji: "🌟", icon: Star, unlocked: true, description: "Reach top 50 in local leaderboard" },
      { name: "Power House", emoji: "🏋️", icon: Diamond, unlocked: true, description: "Complete 40 push-ups" },
      { name: "Endurance Elite", emoji: "🏃‍♂️", icon: Flame, unlocked: true, description: "Run 1.5 miles in under 12 minutes" },
      { name: "Perfect Form", emoji: "💎", icon: CheckCircle2, unlocked: true, description: "Achieve 95% form accuracy" },
      { name: "Leaderboard Climber", emoji: "📈", icon: Crown, unlocked: false, description: "Move up 10 ranks in a week" },
      { name: "Streak Master", emoji: "🔥", icon: Target, unlocked: false, description: "Complete assessments 7 days in a row" },
      { name: "All Rounder", emoji: "🎖️", icon: Trophy, unlocked: false, description: "Achieve intermediate in all 5 tests" },
      { name: "Social Athlete", emoji: "🤝", icon: Star, unlocked: false, description: "Complete 10 friend challenges" },
      { name: "Progress Tracker", emoji: "📊", icon: Diamond, unlocked: false, description: "Improve personal best 5 times" },
      { name: "Form Perfectionist", emoji: "✨", icon: CheckCircle2, unlocked: false, description: "Get perfect form score 5 times" },
      { name: "Speed Specialist", emoji: "💨", icon: Flame, unlocked: false, description: "Top 3 in shuttle run locally" },
      { name: "Milestone Achiever", emoji: "🚀", icon: Crown, unlocked: false, description: "Reach 2500 XP" },
    ]
  },
  {
    name: "Regional",
    color: "text-gamification-gold",
    bgColor: "bg-gamification-gold/20",
    unlocked: 2,
    total: 14,
    badges: [
      { name: "Regional Champion", emoji: "👑", icon: Crown, unlocked: true, description: "Reach top 10 in regional rankings" },
      { name: "Explosive Power", emoji: "💥", icon: Diamond, unlocked: true, description: "Achieve 30+ inch vertical jump" },
      { name: "Iron Will", emoji: "⚔️", icon: Flame, unlocked: false, description: "Complete 50 push-ups" },
      { name: "Elite Endurance", emoji: "🔋", icon: Target, unlocked: false, description: "Run 2 miles in under 14 minutes" },
      { name: "Master Trainer", emoji: "🧙‍♂️", icon: Trophy, unlocked: false, description: "Mentor 3 beginner athletes" },
      { name: "Competition Ready", emoji: "🏆", icon: Star, unlocked: false, description: "Win 5 regional challenges" },
      { name: "Form Master", emoji: "🥋", icon: CheckCircle2, unlocked: false, description: "Maintain 98% form accuracy" },
      { name: "Consistency King", emoji: "🔥", icon: Crown, unlocked: false, description: "Complete assessments 30 days straight" },
      { name: "Local Legend", emoji: "🏛️", icon: Diamond, unlocked: false, description: "Hold #1 local rank for 1 month" },
      { name: "Training Beast", emoji: "🦁", icon: Flame, unlocked: false, description: "Complete 100 total assessments" },
      { name: "Perfect Athlete", emoji: "🎯", icon: Target, unlocked: false, description: "Score 100% in any test" },
      { name: "Community Leader", emoji: "👨‍🏫", icon: Star, unlocked: false, description: "Help 10 athletes improve" },
      { name: "Regional Elite", emoji: "🌟", icon: Trophy, unlocked: false, description: "Top 5 in all regional categories" },
      { name: "XP Master", emoji: "🧠", icon: Crown, unlocked: false, description: "Reach 5000 XP" },
    ]
  },
  {
    name: "Advanced",
    color: "text-primary",
    bgColor: "bg-primary/20",
    unlocked: 0,
    total: 13,
    badges: [
      { name: "State Champion", emoji: "🥇", icon: Crown, unlocked: false, description: "Reach #1 in state rankings" },
      { name: "Olympic Potential", emoji: "🏅", icon: Diamond, unlocked: false, description: "Achieve elite scores in all tests" },
      { name: "Record Breaker", emoji: "📸", icon: Flame, unlocked: false, description: "Set new regional record" },
      { name: "Ultra Endurance", emoji: "🚴‍♂️", icon: Target, unlocked: false, description: "Complete marathon distance" },
      { name: "Master Coach", emoji: "🎓", icon: Trophy, unlocked: false, description: "Train 10 regional champions" },
      { name: "Legendary Form", emoji: "🌪️", icon: CheckCircle2, unlocked: false, description: "Maintain perfect form for 50 tests" },
      { name: "State Elite", emoji: "⭐", icon: Star, unlocked: false, description: "Top 3 in state for 6 months" },
      { name: "Training Legend", emoji: "🗿", icon: Crown, unlocked: false, description: "Complete 500 total assessments" },
      { name: "Perfection Seeker", emoji: "🎪", icon: Diamond, unlocked: false, description: "Score perfect in all 5 tests" },
      { name: "National Qualifier", emoji: "🎌", icon: Flame, unlocked: false, description: "Qualify for national championships" },
      { name: "Elite Mentor", emoji: "👨‍🚀", icon: Target, unlocked: false, description: "Develop 5 state-level athletes" },
      { name: "Consistency Master", emoji: "⌚", icon: Trophy, unlocked: false, description: "Train every day for 6 months" },
      { name: "XP Legend", emoji: "🧙", icon: Star, unlocked: false, description: "Reach 10,000 XP" },
    ]
  },
  {
    name: "National",
    color: "text-gamification-diamond",
    bgColor: "bg-gamification-diamond/20",
    unlocked: 0,
    total: 11,
    badges: [
      { name: "National Champion", emoji: "🏆", icon: Crown, unlocked: false, description: "Reach #1 in national rankings" },
      { name: "World Class", emoji: "🌍", icon: Diamond, unlocked: false, description: "Achieve world-class performance" },
      { name: "Olympic Bound", emoji: "🏅", icon: Flame, unlocked: false, description: "Qualify for Olympic trials" },
      { name: "Record Holder", emoji: "📋", icon: Target, unlocked: false, description: "Hold national record" },
      { name: "Elite Academy", emoji: "🏛️", icon: Trophy, unlocked: false, description: "Train at national academy" },
      { name: "Perfect Machine", emoji: "🤖", icon: CheckCircle2, unlocked: false, description: "Achieve perfection in all areas" },
      { name: "Global Elite", emoji: "🛸", icon: Star, unlocked: false, description: "Compete internationally" },
      { name: "Master Athlete", emoji: "🦅", icon: Crown, unlocked: false, description: "Master all athletic disciplines" },
      { name: "Training Immortal", emoji: "♾️", icon: Diamond, unlocked: false, description: "Complete 1000+ assessments" },
      { name: "National Legend", emoji: "🔮", icon: Flame, unlocked: false, description: "Inspire a generation of athletes" },
      { name: "Ultimate Champion", emoji: "🌟", icon: Target, unlocked: false, description: "The pinnacle of athletic achievement" },
    ]
  }
];

function BadgeItem({ badge, category, onBadgeClick }: { badge: any, category: any, onBadgeClick: (badge: any, category: any) => void }) {
  const handleClick = () => {
    if (badge.unlocked) {
      onBadgeClick(badge, category);
    }
  };

  return (
    <div 
      className={`
        glass rounded-xl p-4 border transition-all duration-300 cursor-pointer
        ${badge.unlocked 
          ? `border-glass-border/50 hover:border-primary/50 hover:shadow-glow hover:scale-105 ${category.bgColor}` 
          : 'border-glass-border/30 opacity-60 hover:opacity-80'
        }
      `}
      title={badge.description}
      onClick={handleClick}
    >
      <div className="text-center">
        <div className={`
          w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center text-2xl relative
          ${badge.unlocked 
            ? `${category.bgColor} animate-pulse-glow` 
            : 'text-muted-foreground bg-glass-border/20 opacity-50'
          }
        `}>
          {badge.unlocked ? (
            <div className="text-2xl">{badge.emoji}</div>
          ) : (
            <>
              <div className="text-2xl text-muted-foreground/50">{badge.emoji}</div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-muted rounded-full flex items-center justify-center">
                <Lock className="w-2 h-2 text-muted-foreground" />
              </div>
            </>
          )}
        </div>
        
        <h4 className={`font-semibold text-sm mb-1 ${badge.unlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
          {badge.name}
        </h4>
        
        <p className="text-xs text-muted-foreground leading-tight">
          {badge.description}
        </p>
        
        {badge.unlocked && (
          <CheckCircle2 className="w-4 h-4 text-success mx-auto mt-2" />
        )}
      </div>
    </div>
  );
}

export default function Roadmap() {
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  
  const totalBadges = badgeCategories.reduce((sum, cat) => sum + cat.total, 0);
  const unlockedBadges = badgeCategories.reduce((sum, cat) => sum + cat.unlocked, 0);
  const progressPercentage = (unlockedBadges / totalBadges) * 100;

  const handleBadgeClick = (badge: any, category: any) => {
    setSelectedBadge({
      ...badge,
      color: category.color,
      earnedDate: "2024-01-15", // Mock date
      rarity: category.name,
      xpReward: category.name === "Beginner" ? 50 : category.name === "Intermediate" ? 100 : category.name === "Regional" ? 200 : category.name === "Advanced" ? 500 : 1000,
      coinReward: category.name === "Beginner" ? 25 : category.name === "Intermediate" ? 50 : category.name === "Regional" ? 100 : category.name === "Advanced" ? 250 : 500,
      emoji: badge.emoji
    });
    setShowBadgeModal(true);
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header Section */}
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
          Achievement Roadmap 🗺️
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Your journey to athletic excellence starts here. Unlock badges, track your progress,
          and see how far you can climb on your path to becoming a champion.
        </p>
      </section>

      {/* Overall Progress */}
      <section className="max-w-4xl mx-auto">
        <div className="glass rounded-2xl p-6 border border-glass-border/50 bg-gradient-secondary">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">Overall Progress</h3>
            <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              {unlockedBadges} / {totalBadges}
            </div>
            <p className="text-muted-foreground">Badges Unlocked</p>
          </div>

          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-sm">
              <span>Achievement Progress</span>
              <span className="font-semibold">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>

          <div className="grid md:grid-cols-5 gap-4 text-center">
            {badgeCategories.map((category) => (
              <div key={category.name} className="space-y-2">
                <div className={`text-2xl font-bold ${category.color}`}>
                  {category.unlocked}
                </div>
                <div className="text-sm font-medium">{category.name}</div>
                <div className="text-xs text-muted-foreground">
                  {category.unlocked}/{category.total}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Badge Categories */}
      <section className="space-y-8">
        {badgeCategories.map((category, categoryIndex) => (
          <div key={category.name} className="space-y-4">
            {/* Category Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className={`text-2xl font-bold ${category.color}`}>
                  {category.name}
                </h3>
                <Badge 
                  variant="secondary" 
                  className={`${category.bgColor} ${category.color} border-0`}
                >
                  {category.unlocked}/{category.total}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                {Math.round((category.unlocked / category.total) * 100)}% Complete
              </div>
            </div>

            {/* Progress Bar */}
            <Progress 
              value={(category.unlocked / category.total) * 100} 
              className="h-2"
            />

            {/* Badges Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {category.badges.map((badge, badgeIndex) => (
                <BadgeItem 
                  key={`${category.name}-${badge.name}`}
                  badge={badge}
                  category={category}
                  onBadgeClick={handleBadgeClick}
                />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Motivational Section */}
      <section className="glass rounded-2xl p-6 border border-glass-border/50 text-center">
        <Trophy className="w-16 h-16 text-primary mx-auto mb-4 animate-float" />
        <h3 className="text-2xl font-bold mb-2">Keep Pushing Forward!</h3>
        <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
          Every badge you unlock brings you closer to athletic excellence. 
          Train consistently, maintain perfect form, and challenge yourself to reach new heights.
        </p>
        <div className="text-sm text-muted-foreground">
          💡 <strong>Next milestone:</strong> Reach top 100 in Chennai to unlock "Regional Star" badge
        </div>
      </section>

      {/* Badge Modal */}
      {selectedBadge && (
        <BadgeModal 
          isOpen={showBadgeModal}
          onClose={() => setShowBadgeModal(false)}
          badge={selectedBadge}
          isNewBadge={false}
        />
      )}
    </div>
  );
}