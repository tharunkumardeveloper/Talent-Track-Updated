import { Trophy, Target, Calendar, Users, Zap, Award, CheckCircle2, Lock, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const challengeCategories = [
  {
    id: "getting-started",
    name: "🌱 Getting Started",
    color: "text-gamification-bronze",
    bgColor: "bg-gamification-bronze/20",
    challenges: [
      { name: "Create your profile", emoji: "👤", reward: "50 XP + First Step badge", completed: true },
      { name: "Complete your first assessment", emoji: "📝", reward: "100 XP + 20 coins + Getting Started badge", completed: true },
      { name: "Watch a tutorial video", emoji: "🎥", reward: "50 XP + Learner badge", completed: true },
      { name: "Complete your first Vertical Jump test", emoji: "⬆️", reward: "30 coins + Jump Initiate badge", completed: true },
      { name: "Complete your first Sit-Ups test", emoji: "🤸‍♂️", reward: "30 coins + Core Starter badge", completed: false },
      { name: "Complete your first Push-Ups test", emoji: "💪", reward: "30 coins + Strength Rookie badge", completed: false },
      { name: "Complete your first Shuttle Run test", emoji: "🏃‍♂️", reward: "30 coins + Speed Explorer badge", completed: false },
      { name: "Complete your first Endurance Run test", emoji: "🏃‍♀️", reward: "30 coins + Endurance Starter badge", completed: false },
      { name: "Check your profile after completing a test", emoji: "👀", reward: "20 coins + Proud Athlete badge", completed: false },
      { name: "Unlock your first badge", emoji: "🏅", reward: "50 XP + Achievement Unlocked badge", completed: true },
    ]
  },
  {
    id: "skill-building",
    name: "💪 Skill Building",
    color: "text-gamification-silver",
    bgColor: "bg-gamification-silver/20",
    challenges: [
      { name: "Do 3 assessments in one week", emoji: "📅", reward: "100 XP + Weekend Warrior badge", completed: true },
      { name: "Reach 20 reps in Sit-Ups", emoji: "🔥", reward: "50 coins + Core Challenger badge", completed: false },
      { name: "Reach 20 reps in Push-Ups", emoji: "💪", reward: "50 coins + Strength Builder badge", completed: false },
      { name: "Jump over 40 cm", emoji: "🦘", reward: "80 XP + Jump Master badge", completed: false },
      { name: "Run Shuttle 5 laps under 30 seconds", emoji: "⚡", reward: "70 XP + Speed Demon badge", completed: false },
      { name: "Complete Endurance Run of 2 km", emoji: "🏃‍♂️", reward: "100 XP + Endurance Hero badge", completed: false },
      { name: "Achieve consistency streak of 3 days", emoji: "🔗", reward: "40 coins + Consistency Champion badge", completed: true },
      { name: "Watch all How To videos", emoji: "🎓", reward: "50 XP + Knowledge Seeker badge", completed: false },
      { name: "Review your results after each test for 1 week", emoji: "📊", reward: "60 XP + Self-Analyzer badge", completed: false },
      { name: "Share your progress screenshot", emoji: "📸", reward: "30 coins + Motivator badge", completed: false },
    ]
  },
  {
    id: "consistency",
    name: "📈 Consistency",
    color: "text-gamification-gold",
    bgColor: "bg-gamification-gold/20",
    challenges: [
      { name: "Complete 5 assessments across 2 weeks", emoji: "📋", reward: "100 XP + Routine Starter badge", completed: false },
      { name: "Earn 500 XP total", emoji: "⚡", reward: "100 coins + Focused Athlete badge", completed: true },
      { name: "Reach 3 different test milestones", emoji: "🎯", reward: "50 XP + Multi-Talented badge", completed: false },
      { name: "Stay active for 7 consecutive days", emoji: "🔥", reward: "70 XP + Streak Keeper badge", completed: false },
      { name: "Achieve personal best in any test", emoji: "🏆", reward: "60 coins + Best Version badge", completed: true },
      { name: "Use the app for 10 days total", emoji: "📱", reward: "40 coins + Committed Player badge", completed: false },
      { name: "Complete the same test twice with improved results", emoji: "📈", reward: "50 XP + Persistent Performer badge", completed: false },
      { name: "Check your leaderboard rank after every assessment for 1 week", emoji: "📊", reward: "30 coins + Leaderboard Tracker badge", completed: false },
      { name: "Complete assessments in both morning and evening in one day", emoji: "🌅🌙", reward: "50 XP + All-Day Athlete badge", completed: false },
      { name: "Record and review 10 test sessions", emoji: "🎬", reward: "70 XP + Practice Pro badge", completed: false },
    ]
  },
  {
    id: "community",
    name: "🤝 Community & Motivation",
    color: "text-primary",
    bgColor: "bg-primary/20",
    challenges: [
      { name: "Comment on 5 badges unlocked", emoji: "💬", reward: "30 coins + Cheerleader badge", completed: false },
      { name: "Complete assessments during a weekend challenge event", emoji: "🏁", reward: "100 XP + Weekend Warrior II badge", completed: false },
      { name: "Help another athlete by reviewing their test feedback", emoji: "🤝", reward: "50 coins + Supporter badge", completed: false },
      { name: "Participate in leaderboard competitions for 3 weeks", emoji: "🏆", reward: "80 XP + Top Contender badge", completed: false },
      { name: "Unlock at least 10 badges", emoji: "🏅", reward: "100 coins + Milestone Achiever badge", completed: false },
      { name: "Share your streak on social media", emoji: "📱", reward: "40 coins + Social Butterfly badge", completed: false },
      { name: "Create your own challenge for others to try", emoji: "💡", reward: "50 XP + Challenge Creator badge", completed: false },
      { name: "Check your analytics every day for a week", emoji: "📈", reward: "60 coins + Data Enthusiast badge", completed: false },
      { name: "Celebrate a milestone", emoji: "🎉", reward: "50 XP + Celebrate Success badge", completed: false },
      { name: "Invite 3 friends to try the app", emoji: "👥", reward: "100 coins + Team Builder badge", completed: false },
    ]
  },
  {
    id: "mastery",
    name: "👑 Mastery & Elite",
    color: "text-gamification-diamond",
    bgColor: "bg-gamification-diamond/20",
    challenges: [
      { name: "Reach 1000 XP", emoji: "⚡", reward: "150 coins + Elite Performer I badge", completed: true },
      { name: "Complete all 5 tests at least once each", emoji: "🎯", reward: "100 XP + All-Rounder badge", completed: false },
      { name: "Maintain a streak of 30 days", emoji: "🔥", reward: "200 coins + Streak Master badge", completed: false },
      { name: "Beat your previous best in 3 tests", emoji: "📈", reward: "80 XP + Personal Record Breaker badge", completed: false },
      { name: "Reach level 10", emoji: "🌟", reward: "150 coins + Level Legend badge", completed: false },
      { name: "Unlock 25 badges", emoji: "🏆", reward: "100 XP + Roadmap Achiever badge", completed: false },
      { name: "Complete a week-long training program", emoji: "📅", reward: "120 coins + Program Finisher badge", completed: false },
      { name: "Get featured in leaderboard's Top 10", emoji: "🌟", reward: "200 XP + Leaderboard Star badge", completed: false },
      { name: "Unlock all beginner and intermediate badges", emoji: "🎖️", reward: "150 coins + Skill Builder Pro badge", completed: false },
      { name: "Unlock all 50 badges", emoji: "👑", reward: "500 coins + National Icon badge + sparkling animation", completed: false },
    ]
  }
];

function ChallengeItem({ challenge, category }: { challenge: any, category: any }) {
  const navigate = useNavigate();

  const handleChallengeClick = () => {
    // Check if challenge involves a specific exercise/activity
    if (challenge.name.toLowerCase().includes('push-ups') || 
        challenge.name.toLowerCase().includes('push') ||
        challenge.name.toLowerCase().includes('sit-ups') ||
        challenge.name.toLowerCase().includes('sit') ||
        challenge.name.toLowerCase().includes('jump') ||
        challenge.name.toLowerCase().includes('shuttle') ||
        challenge.name.toLowerCase().includes('run')) {
      
      navigate('/assessment', { 
        state: { challenge: challenge.name }
      });
    }
  };
  return (
    <div 
      onClick={handleChallengeClick}
      className={`
        glass rounded-xl p-4 border transition-all duration-300 cursor-pointer
        ${challenge.completed 
          ? `border-success/50 bg-success/10 hover:bg-success/20` 
          : 'border-glass-border/30 hover:border-primary/50 hover:shadow-glow hover:scale-105'
        }
      `}
    >
      <div className="flex items-start gap-4">
        <div className={`
          w-12 h-12 rounded-2xl flex items-center justify-center text-2xl
          ${challenge.completed 
            ? 'bg-success/20 border border-success/50' 
            : `${category.bgColor} border border-glass-border/30`
          }
        `}>
          {challenge.completed ? (
            <CheckCircle2 className="w-6 h-6 text-success" />
          ) : (
            <span>{challenge.emoji}</span>
          )}
        </div>
        
        <div className="flex-1">
          <h4 className={`font-semibold text-sm mb-2 ${challenge.completed ? 'text-success' : 'text-foreground'}`}>
            {challenge.name}
          </h4>
          
          <p className="text-xs text-muted-foreground mb-2">
            Reward: {challenge.reward}
          </p>
          
          {challenge.completed && (
            <Badge variant="secondary" className="bg-success/20 text-success border-0 text-xs">
              ✅ Completed
            </Badge>
          )}
          
          {!challenge.completed && (
            <Badge variant="outline" className="border-primary/30 text-primary text-xs">
              🎯 Available
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Challenges() {
  const navigate = useNavigate();
  const totalChallenges = challengeCategories.reduce((sum, cat) => sum + cat.challenges.length, 0);
  const completedChallenges = challengeCategories.reduce((sum, cat) => 
    sum + cat.challenges.filter(c => c.completed).length, 0
  );
  const progressPercentage = (completedChallenges / totalChallenges) * 100;

  return (
    <div className="space-y-8 p-6">
      {/* Header Section */}
      <section className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow">
            <Target className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Athletic Challenges
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Complete challenges to earn XP, coins, and exclusive badges. Each challenge brings you closer to athletic excellence!
        </p>
      </section>

      {/* Overall Progress */}
      <section className="max-w-4xl mx-auto">
        <div className="glass rounded-2xl p-6 border border-glass-border/50 bg-gradient-secondary">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">Challenge Progress</h3>
            <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              {completedChallenges} / {totalChallenges}
            </div>
            <p className="text-muted-foreground">Challenges Completed</p>
          </div>

          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span className="font-semibold">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>

          <div className="grid md:grid-cols-5 gap-4 text-center">
            {challengeCategories.map((category) => {
              const completed = category.challenges.filter(c => c.completed).length;
              return (
                <div key={category.id} className="space-y-2">
                  <div className={`text-2xl font-bold ${category.color}`}>
                    {completed}
                  </div>
                  <div className="text-sm font-medium">{category.name.split(' ')[1]}</div>
                  <div className="text-xs text-muted-foreground">
                    {completed}/{category.challenges.length}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Challenge Categories - Single View */}
      <section className="space-y-12">
        {challengeCategories.map((category) => {
          const completed = category.challenges.filter(c => c.completed).length;
          return (
            <div key={category.id} className="space-y-6">
              {/* Category Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h3 className={`text-3xl font-bold ${category.color}`}>
                    {category.name}
                  </h3>
                  <Badge 
                    variant="secondary" 
                    className={`${category.bgColor} ${category.color} border-0 text-lg px-3 py-1`}
                  >
                    {completed}/{category.challenges.length}
                  </Badge>
                </div>
                <div className="text-lg text-muted-foreground font-medium">
                  {Math.round((completed / category.challenges.length) * 100)}% Complete
                </div>
              </div>

              {/* Progress Bar */}
              <Progress 
                value={(completed / category.challenges.length) * 100} 
                className="h-3"
              />

              {/* Challenges Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.challenges.map((challenge, challengeIndex) => (
                  <ChallengeItem 
                    key={`${category.id}-${challengeIndex}`}
                    challenge={challenge}
                    category={category}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Motivational Section */}
      <section className="glass rounded-2xl p-6 border border-glass-border/50 text-center">
        <Target className="w-16 h-16 text-primary mx-auto mb-4 animate-float" />
        <h3 className="text-2xl font-bold mb-2">Keep Challenging Yourself!</h3>
        <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
          Every challenge you complete brings you closer to your fitness goals. 
          Earn rewards, unlock badges, and show the world what you're made of!
        </p>
          <div className="text-sm text-muted-foreground">
            💡 <strong>Next challenge:</strong> Complete your first Sit-Ups test to unlock "Core Starter" badge from Chennai region
          </div>
      </section>
    </div>
  );
}