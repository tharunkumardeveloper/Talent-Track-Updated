import { Trophy, Star, TrendingUp, Award, Target, Medal } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const topStudents = [
  { 
    rank: 1, 
    name: "Arjun Sharma", 
    xp: 2840, 
    badges: 12, 
    location: "Chennai, Tamil Nadu",
    avatar: "AS",
    improvement: "+180 XP",
    category: "Athletics",
    recentAchievement: "Speed Demon"
  },
  { 
    rank: 2, 
    name: "Priya Patel", 
    xp: 2735, 
    badges: 11, 
    location: "Mumbai, Maharashtra",
    avatar: "PP",
    improvement: "+165 XP",
    category: "Swimming",
    recentAchievement: "Endurance Elite"
  },
  { 
    rank: 3, 
    name: "Karthik Iyer", 
    xp: 2690, 
    badges: 10, 
    location: "Bengaluru, Karnataka",
    avatar: "KI",
    improvement: "+142 XP",
    category: "Basketball",
    recentAchievement: "Team Player"
  },
  { 
    rank: 4, 
    name: "Neha Choudhary", 
    xp: 2580, 
    badges: 9, 
    location: "Jaipur, Rajasthan",
    avatar: "NC",
    improvement: "+125 XP",
    category: "Gymnastics",
    recentAchievement: "Flexibility Master"
  },
  { 
    rank: 5, 
    name: "Santosh Deshmukh", 
    xp: 2450, 
    badges: 8, 
    location: "Pune, Maharashtra",
    avatar: "SD",
    improvement: "+98 XP",
    category: "Wrestling",
    recentAchievement: "Core Crusher"
  }
];

const categoryLeaders = [
  { category: "Athletics", leader: "Arjun Sharma", score: 95, students: 45 },
  { category: "Swimming", leader: "Priya Patel", score: 92, students: 23 },
  { category: "Basketball", leader: "Karthik Iyer", score: 89, students: 18 },
  { category: "Gymnastics", leader: "Neha Choudhary", score: 87, students: 12 },
  { category: "Wrestling", leader: "Santosh Deshmukh", score: 85, students: 15 },
];

const recentMovers = [
  { name: "Raj Kumar", change: "+5 positions", direction: "up", newRank: 8 },
  { name: "Aisha Patel", change: "+3 positions", direction: "up", newRank: 12 },
  { name: "Vikram Singh", change: "-2 positions", direction: "down", newRank: 15 },
  { name: "Meera Joshi", change: "+7 positions", direction: "up", newRank: 6 },
];

export default function StaffLeaderboard() {
  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gamification-gold text-black';
      case 2: return 'bg-gamification-silver text-black';
      case 3: return 'bg-gamification-bronze text-black';
      default: return 'bg-primary/20 text-primary';
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-5 h-5" />;
      case 2: return <Medal className="w-5 h-5" />;
      case 3: return <Award className="w-5 h-5" />;
      default: return <span className="font-bold">{rank}</span>;
    }
  };

  return (
    <div className="space-y-6 md:space-y-8 p-4 md:p-6">
      {/* Header Section */}
      <section>
        <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 bg-gradient-primary bg-clip-text text-transparent flex items-center gap-2 md:gap-3">
          <Trophy className="w-6 h-6 md:w-10 md:h-10 text-primary" />
          Student Leaderboard
        </h1>
        <p className="text-base md:text-xl text-muted-foreground">
          Track and celebrate your students' achievements and progress.
        </p>
      </section>

      {/* Top Performers */}
      <Card className="glass border-glass-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <Star className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            Top Performing Students
          </CardTitle>
          <CardDescription className="text-sm">Your students leading the performance rankings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 md:space-y-4">
            {topStudents.map((student) => (
              <div 
                key={student.rank}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 rounded-xl bg-glass-border/10 hover:bg-glass-border/20 transition-all duration-300 hover:scale-[1.01] gap-3"
              >
                <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold ${getRankColor(student.rank)} flex-shrink-0`}>
                    {getRankIcon(student.rank)}
                  </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-primary text-sm md:text-base">{student.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                      <h3 className="font-bold text-sm md:text-lg truncate">{student.name}</h3>
                      <Badge variant="outline" className="text-xs w-fit">
                        {student.category}
                      </Badge>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground truncate">{student.location}</p>
                    <p className="text-xs text-accent truncate">Latest: {student.recentAchievement}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
                  <div className="text-center sm:text-right">
                    <p className="font-bold text-gamification-xp text-sm md:text-lg">{student.xp.toLocaleString()} XP</p>
                    <p className="text-xs md:text-sm text-success">{student.improvement}</p>
                  </div>
                  <div className="text-center sm:text-right">
                    <p className="font-semibold text-gamification-gold text-sm md:text-base">{student.badges} badges</p>
                    <p className="text-xs text-muted-foreground">Rank #{student.rank}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category Leaders & Recent Movers */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Category Leaders */}
        <Card className="glass border-glass-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Category Leaders
            </CardTitle>
            <CardDescription>Top performers in each sports category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryLeaders.map((category) => (
                <div key={category.category} className="flex items-center justify-between p-3 rounded-xl bg-glass-border/10">
                  <div>
                    <h4 className="font-semibold">{category.category}</h4>
                    <p className="text-sm text-muted-foreground">{category.leader}</p>
                    <p className="text-xs text-muted-foreground">{category.students} students</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-accent text-lg">{category.score}%</p>
                    <p className="text-xs text-muted-foreground">Best Score</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Movers */}
        <Card className="glass border-glass-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Recent Rank Changes
            </CardTitle>
            <CardDescription>Students with significant position changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMovers.map((mover, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-glass-border/10">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${mover.direction === 'up' ? 'bg-success/20' : 'bg-destructive/20'}`}>
                      <TrendingUp className={`w-4 h-4 ${mover.direction === 'up' ? 'text-success' : 'text-destructive rotate-180'}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold">{mover.name}</h4>
                      <p className="text-sm text-muted-foreground">Now rank #{mover.newRank}</p>
                    </div>
                  </div>
                  <Badge className={mover.direction === 'up' ? 'bg-success/20 text-success border-success/30' : 'bg-destructive/20 text-destructive border-destructive/30'}>
                    {mover.change}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recognition Section */}
      <Card className="glass border-glass-border/50 bg-gradient-secondary">
        <CardContent className="p-8">
          <div className="text-center">
            <Trophy className="w-16 h-16 text-primary mx-auto mb-4 animate-float" />
            <h3 className="text-2xl font-bold mb-4">Outstanding Performance!</h3>
            <p className="text-muted-foreground mb-6">
              Your students have achieved 15 new badges this month and 3 have entered the top 10 national rankings.
            </p>
            <div className="flex justify-center gap-4">
              <Button className="btn-gradient px-6 py-2 rounded-xl">
                Send Congratulations
              </Button>
              <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
                View Full Rankings
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}