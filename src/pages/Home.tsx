import { Trophy, BarChart3, Globe, Zap, Award, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

const demoLeaderboard = [
  { rank: 1, name: "Arjun Sharma", xp: 2840, badges: 12, location: "Chennai, Tamil Nadu" },
  { rank: 2, name: "Priya Patel", xp: 2735, badges: 11, location: "Mumbai, Maharashtra" },
  { rank: 3, name: "Karthik Iyer", xp: 2690, badges: 10, location: "Bengaluru, Karnataka" },
];

const demoBadges = [
  { icon: Target, name: "First Steps", color: "text-gamification-bronze" },
  { icon: Trophy, name: "Speed Demon", color: "text-gamification-silver" },
  { icon: Award, name: "Endurance Elite", color: "text-gamification-gold" },
  { icon: Zap, name: "Power House", color: "text-gamification-diamond" },
  { icon: BarChart3, name: "Consistent", color: "text-gamification-bronze" },
];

export default function Home() {
  return (
    <div className="space-y-8 p-6">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="glass rounded-3xl p-8 border border-glass-border/50 bg-gradient-hero">
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Discover Your Sports Potential 🚀
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Transform your athletic journey with AI-powered assessments, 
              personalized training insights, and competitive performance tracking.
            </p>
            <Button 
              className="btn-gradient text-lg px-8 py-3 rounded-2xl"
              onClick={() => window.location.href = '/assessment'}
            >
              Start Your Assessment
            </Button>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/20 rounded-full blur-2xl animate-float" style={{animationDelay: '1s'}}></div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="glass glass-hover rounded-2xl p-6 border border-glass-border/50">
          <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
            <BarChart3 className="w-6 h-6 text-primary-foreground" />
          </div>
          <h3 className="text-xl font-bold mb-3">📊 Standard Tests</h3>
          <p className="text-muted-foreground">
            Comprehensive athletic assessments including vertical jump, 
            shuttle run, endurance, and strength evaluations.
          </p>
        </div>

        <div className="glass glass-hover rounded-2xl p-6 border border-glass-border/50">
          <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
            <Trophy className="w-6 h-6 text-primary-foreground" />
          </div>
          <h3 className="text-xl font-bold mb-3">🎮 Gamified Progress</h3>
          <p className="text-muted-foreground">
            Earn XP, unlock achievements, and compete with athletes 
            nationwide through our engaging progression system.
          </p>
        </div>

        <div className="glass glass-hover rounded-2xl p-6 border border-glass-border/50">
          <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
            <Globe className="w-6 h-6 text-primary-foreground" />
          </div>
          <h3 className="text-xl font-bold mb-3">🌍 National Reach</h3>
          <p className="text-muted-foreground">
            Connect with athletes across the country and see how 
            your performance ranks on local, state, and national levels.
          </p>
        </div>
      </section>

      {/* Demo Content Sections */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Demo Leaderboard */}
        <div className="glass rounded-2xl p-6 border border-glass-border/50">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-primary" />
            Top Performers
          </h3>
          <div className="space-y-3">
            {demoLeaderboard.map((athlete) => (
              <div 
                key={athlete.rank}
                className="flex items-center justify-between p-3 rounded-xl bg-glass-border/10 hover:bg-glass-border/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold
                    ${athlete.rank === 1 ? 'bg-gamification-gold text-black' : 
                      athlete.rank === 2 ? 'bg-gamification-silver text-black' : 
                      'bg-gamification-bronze text-black'}`}>
                    {athlete.rank}
                  </div>
                  <div>
                    <p className="font-semibold">{athlete.name}</p>
                    <p className="text-sm text-muted-foreground">{athlete.badges} badges</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gamification-xp">{athlete.xp.toLocaleString()} XP</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Demo Badges */}
        <div className="glass rounded-2xl p-6 border border-glass-border/50">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Award className="w-6 h-6 text-primary" />
            Latest Achievements
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {demoBadges.map((badge, index) => (
              <div 
                key={badge.name}
                className="flex items-center gap-3 p-3 rounded-xl bg-glass-border/10 hover:bg-glass-border/20 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <div className={`w-10 h-10 rounded-lg bg-glass-border/20 flex items-center justify-center ${badge.color}`}>
                  <badge.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{badge.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Motivational Banner */}
      <section className="glass rounded-2xl p-6 border border-glass-border/50 bg-gradient-secondary">
        <div className="text-center">
          <p className="text-lg font-semibold mb-2">
            🔥 You're 5 sit-ups away from your next badge!
          </p>
          <p className="text-muted-foreground mb-4">
            You're on a 7-day streak! Keep the momentum going and unlock more achievements.
          </p>
          <div className="text-sm text-muted-foreground">
            💡 <strong>Next milestone:</strong> Complete 5 more sit-ups to unlock "Core Crusher" badge
          </div>
          <Button variant="outline" className="btn-gradient border-0">
            Complete Challenge
          </Button>
        </div>
      </section>
    </div>
  );
}