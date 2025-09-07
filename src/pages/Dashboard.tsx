import { Trophy, TrendingUp, Target, Calendar, Star, Zap, Users, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const weeklyStats = [
  { day: "Mon", assessments: 2, xp: 180 },
  { day: "Tue", assessments: 1, xp: 120 },
  { day: "Wed", assessments: 3, xp: 250 },
  { day: "Thu", assessments: 1, xp: 100 },
  { day: "Fri", assessments: 2, xp: 200 },
  { day: "Sat", assessments: 4, xp: 320 },
  { day: "Sun", assessments: 2, xp: 180 },
];

const recentAchievements = [
  { name: "Speed Demon 🏃‍♂️", date: "Today", xp: 150, coins: 50, athlete: "Harish Kumar" },
  { name: "Consistency Champion 📅", date: "Yesterday", xp: 100, coins: 30, athlete: "Neha Choudhary" },
  { name: "Core Crusher 💪", date: "2 days ago", xp: 120, coins: 40, athlete: "Santosh Deshmukh" },
];

const upcomingGoals = [
  { name: "Complete 50 Push-ups", progress: 85, target: "🎯 5 reps to go" },
  { name: "30-day Streak", progress: 60, target: "📅 12 days remaining" },
  { name: "Top 10 Local Rank", progress: 40, target: "📈 Rank 15 → 10" },
];

const performanceMetrics = [
  { name: "Total XP", value: "2,840", change: "+180", trend: "up", icon: Zap, color: "text-gamification-xp" },
  { name: "Coins", value: "2,450", change: "+120", trend: "up", icon: Trophy, color: "text-gamification-coin" },
  { name: "Badges", value: "12", change: "+2", trend: "up", icon: Award, color: "text-gamification-gold" },
  { name: "Rank", value: "#15", change: "+3", trend: "up", icon: TrendingUp, color: "text-primary" },
];

export default function Dashboard() {
  return (
    <div className="space-y-8 p-6">
      {/* Header Section */}
      <section>
        <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent flex items-center gap-3">
          <TrendingUp className="w-10 h-10 text-primary" />
          Athletic Dashboard
        </h1>
        <p className="text-xl text-muted-foreground">
          Welcome back, Arjun! Here's your performance overview and progress insights.
        </p>
      </section>

      {/* Performance Metrics */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric) => (
          <Card key={metric.name} className="glass border-glass-border/50 hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{metric.name}</p>
                  <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                  <div className="flex items-center gap-1 text-success text-sm mt-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>{metric.change} this week</span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl bg-glass-border/20 ${metric.color}`}>
                  <metric.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Weekly Activity & Goals */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Activity Chart */}
        <Card className="glass border-glass-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Weekly Activity
            </CardTitle>
            <CardDescription>Your assessment activity over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyStats.map((day) => (
                <div key={day.day} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium w-10">{day.day}</span>
                    <div className="w-32">
                      <Progress 
                        value={(day.assessments / 5) * 100} 
                        className="h-2" 
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{day.assessments} tests</p>
                    <p className="text-xs text-gamification-xp">+{day.xp} XP</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Goals */}
        <Card className="glass border-glass-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Upcoming Goals
            </CardTitle>
            <CardDescription>Your progress towards next achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingGoals.map((goal) => (
                <div key={goal.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-sm">{goal.name}</h4>
                    <span className="text-xs text-muted-foreground">{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">{goal.target}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Achievements */}
      <Card className="glass border-glass-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            Recent Achievements
          </CardTitle>
          <CardDescription>Latest badges and milestones unlocked</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentAchievements.map((achievement) => (
              <div key={achievement.name} className="flex items-center justify-between p-3 rounded-xl bg-glass-border/20 hover:bg-glass-border/30 transition-colors">
                <div>
                  <h4 className="font-semibold">{achievement.name}</h4>
                  <p className="text-sm text-muted-foreground">{achievement.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm text-gamification-xp">+{achievement.xp} XP</div>
                    <div className="text-sm text-gamification-coin">+{achievement.coins} Coins</div>
                  </div>
                  <Badge variant="secondary" className="bg-primary/20 text-primary border-0">
                    New!
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="glass border-glass-border/50 bg-gradient-secondary">
        <CardContent className="p-6">
          <div className="text-center">
            <Trophy className="w-16 h-16 text-primary mx-auto mb-4 animate-float" />
            <h3 className="text-2xl font-bold mb-2">Ready for Your Next Challenge?</h3>
            <p className="text-muted-foreground mb-4">
              You're on a 7-day streak! Keep the momentum going and unlock more achievements.
            </p>
            <div className="flex justify-center gap-4">
              <button 
                className="btn-gradient px-6 py-2 rounded-xl text-sm font-medium"
                onClick={() => window.location.href = '/assessment'}
              >
                Start Assessment
              </button>
              <button 
                className="px-6 py-2 rounded-xl text-sm font-medium border border-primary/30 hover:bg-primary/10 transition-colors"
                onClick={() => window.location.href = '/challenges'}
              >
                View Challenges
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}