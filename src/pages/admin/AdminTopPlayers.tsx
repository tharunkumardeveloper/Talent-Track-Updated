import { Trophy, Star, Medal, Award, TrendingUp, MapPin, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const nationalTopPerformers = [
  { 
    rank: 1, 
    name: "Arjun Sharma", 
    xp: 4850, 
    badges: 18, 
    location: "Chennai, Tamil Nadu",
    avatar: "AS",
    improvement: "+285 XP",
    category: "Athletics",
    recentAchievement: "National Record Holder",
    region: "Southern"
  },
  { 
    rank: 2, 
    name: "Priya Patel", 
    xp: 4620, 
    badges: 16, 
    location: "Mumbai, Maharashtra",
    avatar: "PP",
    improvement: "+242 XP",
    category: "Swimming",
    recentAchievement: "Olympic Qualifier",
    region: "Western"
  },
  { 
    rank: 3, 
    name: "Karthik Iyer", 
    xp: 4485, 
    badges: 15, 
    location: "Bengaluru, Karnataka",
    avatar: "KI",
    improvement: "+198 XP",
    category: "Basketball",
    recentAchievement: "Championship MVP",
    region: "Southern"
  },
  { 
    rank: 4, 
    name: "Neha Choudhary", 
    xp: 4320, 
    badges: 14, 
    location: "Jaipur, Rajasthan",
    avatar: "NC",
    improvement: "+176 XP",
    category: "Gymnastics",
    recentAchievement: "Perfect Score",
    region: "Western"
  },
  { 
    rank: 5, 
    name: "Santosh Deshmukh", 
    xp: 4180, 
    badges: 13, 
    location: "Pune, Maharashtra",
    avatar: "SD",
    improvement: "+154 XP",
    category: "Wrestling",
    recentAchievement: "International Medal",
    region: "Western"
  }
];

const regionalChampions = [
  { region: "Northern", champion: "Vikram Singh", category: "Hockey", score: 98.5, participants: 1250 },
  { region: "Southern", champion: "Arjun Sharma", category: "Athletics", score: 97.8, participants: 1180 },
  { region: "Western", champion: "Priya Patel", category: "Swimming", score: 96.9, participants: 980 },
  { region: "Eastern", champion: "Ravi Das", category: "Football", score: 95.2, participants: 870 },
  { region: "Central", champion: "Pooja Sharma", category: "Badminton", score: 94.8, participants: 650 },
];

const emergingTalents = [
  { name: "Aarav Kumar", age: 16, category: "Tennis", potential: 92, improvement: "+45 ranks" },
  { name: "Kavya Nair", age: 17, category: "Archery", potential: 89, improvement: "+38 ranks" },
  { name: "Rohit Mehta", age: 15, category: "Cycling", potential: 87, improvement: "+29 ranks" },
  { name: "Ishita Gupta", age: 18, category: "Boxing", potential: 91, improvement: "+52 ranks" },
];

export default function AdminTopPlayers() {
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

  const getRegionColor = (region: string) => {
    const colors = {
      'Northern': 'bg-blue-100 text-blue-800 border-blue-200',
      'Southern': 'bg-green-100 text-green-800 border-green-200', 
      'Western': 'bg-purple-100 text-purple-800 border-purple-200',
      'Eastern': 'bg-orange-100 text-orange-800 border-orange-200',
      'Central': 'bg-pink-100 text-pink-800 border-pink-200'
    };
    return colors[region as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="space-y-6 md:space-y-8 p-4 md:p-6">
      {/* Header Section */}
      <section>
        <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 bg-gradient-primary bg-clip-text text-transparent flex items-center gap-2 md:gap-3">
          <Star className="w-6 h-6 md:w-10 md:h-10 text-primary" />
          National Top Players
        </h1>
        <p className="text-base md:text-xl text-muted-foreground">
          Monitor and recognize excellence across India's sports talent ecosystem.
        </p>
      </section>

      {/* National Top Performers */}
      <Card className="glass border-glass-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <Trophy className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            National Rankings - Top 5
          </CardTitle>
          <CardDescription className="text-sm">Highest performing athletes across all regions and categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 md:space-y-4">
            {nationalTopPerformers.map((player) => (
              <div 
                key={player.rank}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 rounded-xl bg-glass-border/10 hover:bg-glass-border/20 transition-all duration-300 hover:scale-[1.01] gap-3"
              >
                <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold ${getRankColor(player.rank)} flex-shrink-0`}>
                    {getRankIcon(player.rank)}
                  </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-primary text-sm md:text-base">{player.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                      <h3 className="font-bold text-sm md:text-lg truncate">{player.name}</h3>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">
                          {player.category}
                        </Badge>
                        <Badge className={getRegionColor(player.region)}>
                          {player.region}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm text-muted-foreground mb-1">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{player.location}</span>
                    </div>
                    <p className="text-xs text-accent font-medium truncate">Latest: {player.recentAchievement}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
                  <div className="text-center sm:text-right">
                    <p className="font-bold text-gamification-xp text-sm md:text-lg">{player.xp.toLocaleString()} XP</p>
                    <p className="text-xs md:text-sm text-success">{player.improvement}</p>
                  </div>
                  <div className="text-center sm:text-right">
                    <p className="font-semibold text-gamification-gold text-sm md:text-base">{player.badges} badges</p>
                    <p className="text-xs text-muted-foreground">Rank #{player.rank}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Regional Champions & Emerging Talents */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Regional Champions */}
        <Card className="glass border-glass-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Regional Champions
            </CardTitle>
            <CardDescription>Leading performers from each SAI region</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {regionalChampions.map((champion) => (
                <div key={champion.region} className="flex items-center justify-between p-3 rounded-xl bg-glass-border/10">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{champion.region} Region</h4>
                      <Badge className={getRegionColor(champion.region)}>
                        {champion.category}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium text-accent">{champion.champion}</p>
                    <p className="text-xs text-muted-foreground">{champion.participants} participants</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary text-lg">{champion.score}%</p>
                    <p className="text-xs text-muted-foreground">Performance Score</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Emerging Talents */}
        <Card className="glass border-glass-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Emerging Talents
            </CardTitle>
            <CardDescription>Rising stars with exceptional potential</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {emergingTalents.map((talent, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-glass-border/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-success/20">
                      <TrendingUp className="w-4 h-4 text-success" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{talent.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Age {talent.age}</span>
                        <span>•</span>
                        <span>{talent.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-success">{talent.potential}% potential</p>
                    <p className="text-xs text-accent">{talent.improvement}</p>
                  </div>
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
            <h3 className="text-2xl font-bold mb-4">Excellence Recognition Program</h3>
            <p className="text-muted-foreground mb-6">
              National talent development initiatives showing exceptional results with 127 athletes qualifying for international competitions.
            </p>
            <div className="flex justify-center gap-4">
              <Button className="btn-gradient px-6 py-2 rounded-xl">
                Generate Recognition Report
              </Button>
              <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
                Export Rankings
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}