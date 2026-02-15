import { Trophy, Medal, Crown, Users, MapPin, Zap, Star, TrendingUp, Heart, Flame } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const leaderboardData = {
  local: [
    { rank: 1, name: "Arjun Sharma", xp: 2840, badges: 12, location: "Chennai, Tamil Nadu", avatar: "AS" },
    { rank: 2, name: "Priya Patel", xp: 2735, badges: 11, location: "Chennai, Tamil Nadu", avatar: "PP" },
    { rank: 3, name: "Karthik Iyer", xp: 2690, badges: 10, location: "Chennai, Tamil Nadu", avatar: "KI" },
    { rank: 4, name: "Meera Iyer", xp: 2580, badges: 9, location: "Madurai, Tamil Nadu", avatar: "MI" },
    { rank: 5, name: "Ravi Patel", xp: 2450, badges: 8, location: "Vellore, Tamil Nadu", avatar: "RP" },
  ],
  state: [
    { rank: 1, name: "Manish Singh", xp: 3240, badges: 18, location: "Coimbatore, Tamil Nadu", avatar: "MS" },
    { rank: 2, name: "Arjun Sharma", xp: 2840, badges: 12, location: "Chennai, Tamil Nadu", avatar: "AS" },
    { rank: 3, name: "Kavya Patel", xp: 2790, badges: 14, location: "Tirunelveli, Tamil Nadu", avatar: "KP" },
    { rank: 4, name: "Priya Patel", xp: 2735, badges: 11, location: "Chennai, Tamil Nadu", avatar: "PP" },
    { rank: 5, name: "Rohit Verma", xp: 2720, badges: 13, location: "Thanjavur, Tamil Nadu", avatar: "RV" },
  ],
  national: [
    { rank: 1, name: "Aditya Rao", xp: 4850, badges: 28, location: "Mumbai, Maharashtra", avatar: "AR" },
    { rank: 2, name: "Anjali Singh", xp: 4720, badges: 26, location: "Delhi, Delhi", avatar: "ANS" },
    { rank: 3, name: "Deepak Tiwari", xp: 4650, badges: 25, location: "Bengaluru, Karnataka", avatar: "DT" },
    { rank: 4, name: "Sneha Rao", xp: 4580, badges: 24, location: "Hyderabad, Telangana", avatar: "SR" },
    { rank: 5, name: "Vikas Chauhan", xp: 4520, badges: 23, location: "Pune, Maharashtra", avatar: "VC" },
  ],
  friends: [
    { rank: 1, name: "Priya Patel", xp: 2735, badges: 11, location: "Chennai, Tamil Nadu", avatar: "PP" },
    { rank: 2, name: "Karthik Iyer", xp: 2690, badges: 10, location: "Chennai, Tamil Nadu", avatar: "KI" },
    { rank: 3, name: "You", xp: 2450, badges: 8, location: "Chennai, Tamil Nadu", avatar: "YU" },
    { rank: 4, name: "Ravi Patel", xp: 2380, badges: 7, location: "Vellore, Tamil Nadu", avatar: "RP" },
    { rank: 5, name: "Divya Joshi", xp: 2210, badges: 6, location: "Madurai, Tamil Nadu", avatar: "DJ" },
  ]
};

const inspirationalLeaderboard = [
  { 
    rank: 1, 
    name: "Maya Chen", 
    xp: 3420, 
    badges: 15, 
    location: "Mumbai, Maharashtra", 
    avatar: "MC",
    achievement: "Wheelchair Racing Champion",
    inspiration: "Completed 500+ adaptive exercises with perfect form",
    specialty: "♿ Adaptive Strength"
  },
  { 
    rank: 2, 
    name: "Raj Kumar", 
    xp: 3180, 
    badges: 12, 
    location: "Delhi, Delhi", 
    avatar: "RK",
    achievement: "Prosthetic Athletics Pioneer", 
    inspiration: "First to complete all adaptive challenge categories",
    specialty: "🦾 Limb Adaptation"
  },
  { 
    rank: 3, 
    name: "Anitha Devi", 
    xp: 2950, 
    badges: 14, 
    location: "Bengaluru, Karnataka", 
    avatar: "AD",
    achievement: "Vision-Guided Excellence",
    inspiration: "Achieved 98% accuracy in breathing endurance tests",
    specialty: "👁️ Sensory Excellence"
  },
  { 
    rank: 4, 
    name: "Samuel Joseph", 
    xp: 2780, 
    badges: 11, 
    location: "Chennai, Tamil Nadu", 
    avatar: "SJ",
    achievement: "Inclusive Fitness Ambassador",
    inspiration: "Mentored 25+ athletes in adaptive techniques",
    specialty: "🤝 Community Leader"
  },
  { 
    rank: 5, 
    name: "Prisha Sharma", 
    xp: 2640, 
    badges: 13, 
    location: "Pune, Maharashtra", 
    avatar: "PS",
    achievement: "Young Adaptive Athlete",
    inspiration: "Youngest athlete to achieve Endurance Milestone badge",
    specialty: "🌟 Rising Star"
  }
];

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="w-6 h-6 text-gamification-gold" />;
    case 2:
      return <Medal className="w-6 h-6 text-gamification-silver" />;
    case 3:
      return <Trophy className="w-6 h-6 text-gamification-bronze" />;
    default:
      return (
        <div className="w-6 h-6 rounded-full bg-glass-border/30 flex items-center justify-center text-xs font-bold">
          {rank}
        </div>
      );
  }
};

const getRankBg = (rank: number, isCurrentUser = false) => {
  if (isCurrentUser) {
    return "bg-gradient-primary border-primary/50 shadow-glow";
  }
  
  switch (rank) {
    case 1:
      return "bg-gradient-to-r from-gamification-gold/20 to-transparent border-gamification-gold/30";
    case 2:
      return "bg-gradient-to-r from-gamification-silver/20 to-transparent border-gamification-silver/30";
    case 3:
      return "bg-gradient-to-r from-gamification-bronze/20 to-transparent border-gamification-bronze/30";
    default:
      return "bg-glass-border/10 border-glass-border/30";
  }
};

function LeaderboardTable({ data, category }: { data: any[], category: string }) {
  return (
    <div className="space-y-3">
      {data.map((athlete) => (
        <div
          key={`${category}-${athlete.rank}`}
          className={`glass rounded-xl p-4 border transition-all duration-300 hover:scale-[1.02] ${getRankBg(
            athlete.rank,
            athlete.name === "You"
          )}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Rank Icon */}
              <div className="flex-shrink-0">
                {getRankIcon(athlete.rank)}
              </div>

              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center font-bold text-primary-foreground">
                {athlete.avatar}
              </div>

              {/* Athlete Info */}
              <div>
                <h4 className="font-bold text-lg flex items-center gap-2">
                  {athlete.name}
                  {athlete.name === "You" && (
                    <Badge variant="secondary" className="text-xs bg-primary text-primary-foreground">
                      You
                    </Badge>
                  )}
                </h4>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {athlete.location}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="text-right">
              <div className="flex items-center gap-1 mb-1">
                <Zap className="w-4 h-4 text-gamification-xp" />
                <span className="font-bold text-gamification-xp">
                  {athlete.xp.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-gamification-gold" />
                <span className="font-semibold text-gamification-gold">
                  {athlete.badges}
                </span>
                <span className="text-xs text-muted-foreground">badges</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function InspirationalLeaderboardTable({ data }: { data: any[] }) {
  return (
    <div className="space-y-4">
      {data.map((athlete) => (
        <div
          key={`inspirational-${athlete.rank}`}
          className="glass rounded-xl p-6 border border-glass-border/50 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 hover:shadow-glow transition-all duration-300"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              {/* Rank Icon with special styling */}
              <div className="flex-shrink-0">
                {athlete.rank === 1 ? (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary flex items-center justify-center">
                    <Crown className="w-5 h-5 text-white" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                    {athlete.rank}
                  </div>
                )}
              </div>

              {/* Avatar with glow effect */}
              <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center font-bold text-primary-foreground shadow-glow">
                {athlete.avatar}
              </div>

              {/* Athlete Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-lg">{athlete.name}</h4>
                  <Badge variant="secondary" className="bg-primary/20 text-primary border-0 text-xs">
                    {athlete.specialty}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                  <MapPin className="w-3 h-3" />
                  {athlete.location}
                </p>
                <h5 className="font-semibold text-primary text-sm mb-1">{athlete.achievement}</h5>
                <p className="text-sm text-muted-foreground italic leading-relaxed">
                  {athlete.inspiration}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="text-right">
              <div className="flex items-center gap-1 mb-2">
                <Zap className="w-4 h-4 text-primary" />
                <span className="font-bold text-primary text-lg">
                  {athlete.xp.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-primary" />
                <span className="font-semibold text-primary">
                  {athlete.badges}
                </span>
                <span className="text-xs text-muted-foreground">badges</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Leaderboard() {
  return (
    <div className="space-y-8 p-6">
      {/* Header Section */}
      <section className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow">
            <TrendingUp className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Leaderboard
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          See how you stack up against athletes in your area and across the nation. 
          Compete, improve, and climb the ranks in the Talent Track community.
        </p>
      </section>

      {/* Stats Overview */}
      <section className="grid md:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-4 border border-glass-border/50 text-center">
          <div className="text-2xl font-bold text-primary mb-1">147th</div>
          <div className="text-sm text-muted-foreground">Local Rank</div>
        </div>
        <div className="glass rounded-xl p-4 border border-glass-border/50 text-center">
          <div className="text-2xl font-bold text-primary mb-1">1,247th</div>
          <div className="text-sm text-muted-foreground">State Rank</div>
        </div>
        <div className="glass rounded-xl p-4 border border-glass-border/50 text-center">
          <div className="text-2xl font-bold text-primary mb-1">24,567th</div>
          <div className="text-sm text-muted-foreground">National Rank</div>
        </div>
        <div className="glass rounded-xl p-4 border border-glass-border/50 text-center">
          <div className="text-2xl font-bold text-primary mb-1">3rd</div>
          <div className="text-sm text-muted-foreground">Among Friends</div>
        </div>
      </section>

      {/* Leaderboard Tabs */}
      <section className="glass rounded-2xl p-6 border border-glass-border/50">
        <Tabs defaultValue="local" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6 bg-glass-border/20 p-1 rounded-xl">
            <TabsTrigger 
              value="local" 
              className="rounded-lg data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
            >
              <Users className="w-4 h-4 mr-2" />
              Local
            </TabsTrigger>
            <TabsTrigger 
              value="state"
              className="rounded-lg data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
            >
              <MapPin className="w-4 h-4 mr-2" />
              State
            </TabsTrigger>
            <TabsTrigger 
              value="national"
              className="rounded-lg data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
            >
              <Trophy className="w-4 h-4 mr-2" />
              National
            </TabsTrigger>
            <TabsTrigger 
              value="friends"
              className="rounded-lg data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
            >
              <Star className="w-4 h-4 mr-2" />
              Friends
            </TabsTrigger>
          </TabsList>

          <TabsContent value="local" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold">Chennai Region</h3>
            </div>
            <LeaderboardTable data={leaderboardData.local} category="local" />
          </TabsContent>

          <TabsContent value="state" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold">Tamil Nadu</h3>
            </div>
            <LeaderboardTable data={leaderboardData.state} category="state" />
          </TabsContent>

          <TabsContent value="national" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold">India</h3>
            </div>
            <LeaderboardTable data={leaderboardData.national} category="national" />
          </TabsContent>

          <TabsContent value="friends" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold">Your Friends</h3>
            </div>
            <LeaderboardTable data={leaderboardData.friends} category="friends" />
          </TabsContent>
        </Tabs>
      </section>

      {/* Inspirational Leaderboard */}
      <section className="glass rounded-2xl p-6 border border-glass-border/50 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Inspirational Athletes
            </h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Celebrating athletes who show us that limitations are just starting points.
          </p>
        </div>
        
        <div className="space-y-4">
          {inspirationalLeaderboard.map((athlete) => (
            <div key={athlete.rank} className="glass rounded-xl p-6 border border-glass-border/50 hover:shadow-glow transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Crown className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center font-bold text-primary-foreground shadow-glow">
                    {athlete.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-lg">{athlete.name}</h4>
                      <Badge variant="secondary" className="bg-primary/20 text-primary border-0 text-xs">
                        {athlete.specialty}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                      <MapPin className="w-3 h-3" />
                      {athlete.location}
                    </p>
                    <h5 className="font-semibold text-primary text-sm mb-1">{athlete.achievement}</h5>
                    <p className="text-sm text-muted-foreground italic leading-relaxed">
                      {athlete.inspiration}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="font-bold text-primary text-lg">
                      {athlete.xp.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-primary">
                      {athlete.badges}
                    </span>
                    <span className="text-xs text-muted-foreground">badges</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Achievement Highlight */}
      <section className="glass rounded-2xl p-6 border border-glass-border/50 bg-gradient-secondary">
        <div className="text-center">
          <Trophy className="w-12 h-12 text-gamification-gold mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Climb the Leaderboard!</h3>
          <p className="text-muted-foreground mb-4">
            Complete more assessments and improve your scores to move up in rankings. 
            Every workout brings you closer to the top!
          </p>
          <div className="text-sm text-muted-foreground">
            💡 <strong>Pro tip:</strong> Consistent training and perfect form scores give the biggest XP boosts
          </div>
        </div>
      </section>
    </div>
  );
}