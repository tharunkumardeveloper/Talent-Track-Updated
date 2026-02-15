import { User, Settings, Bell, Globe, Moon, Edit3, Trophy, Zap, Calendar, TrendingUp, Target, Award, LogOut } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LevelProgressModal } from "@/components/LevelProgressModal";
import { ProfileEditModal } from "@/components/ProfileEditModal";
import { BadgeModal } from "@/components/BadgeModal";

const userStats = {
  name: "Arjun Sharma",
  location: "Chennai, Tamil Nadu",
  joinDate: "March 2024",
  totalXP: 2840,
  currentLevel: 12,
  nextLevelXP: 3000,
  coins: 2450,
  totalAssessments: 47,
  personalRecords: 8,
  badges: 12,
  streak: 7,
  gender: "male"
};

const recentBadges = [
  { 
    name: "Strength Builder", 
    icon: Trophy, 
    color: "text-gamification-gold", 
    date: "2 days ago",
    description: "Completed 25 push-ups in assessment",
    rarity: "Common",
    xpReward: 50,
    coinReward: 30
  },
  { 
    name: "Speed Demon", 
    icon: Zap, 
    color: "text-gamification-silver", 
    date: "1 week ago",
    description: "Achieved exceptional speed in shuttle run",
    rarity: "Rare", 
    xpReward: 75,
    coinReward: 50
  },
  { 
    name: "Consistent", 
    icon: Target, 
    color: "text-gamification-bronze", 
    date: "2 weeks ago",
    description: "Maintained 7-day streak",
    rarity: "Common",
    xpReward: 40,
    coinReward: 25
  },
  { 
    name: "Form Focus", 
    icon: Award, 
    color: "text-primary", 
    date: "3 weeks ago",
    description: "Perfect form score in assessment",
    rarity: "Uncommon",
    xpReward: 60,
    coinReward: 35
  },
];

const performanceStats = [
  { name: "Vertical Jump", score: "61 cm", improvement: "+8 cm", trend: "up" },
  { name: "Push-Ups", score: "32 reps", improvement: "+8 reps", trend: "up" },
  { name: "Sit-Ups", score: "45 reps", improvement: "+12 reps", trend: "up" },
  { name: "Shuttle Run", score: "8.2 sec", improvement: "-0.8 sec", trend: "up" },
];

export function ProfileDropdown() {
  const [showLevelModal, setShowLevelModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [userProfile, setUserProfile] = useState(userStats);
  const levelProgress = (userProfile.totalXP / userProfile.nextLevelXP) * 100;

  const handleBadgeClick = (badge: any) => {
    setSelectedBadge(badge);
    setShowBadgeModal(true);
  };

  const handleProfileSave = (newProfile: any) => {
    setUserProfile(prev => ({...prev, ...newProfile}));
  };

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-12 w-12 rounded-full p-0 hover:bg-primary/20 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 rounded-full bg-gradient-primary border-2 border-primary/50 flex items-center justify-center text-sm font-bold text-primary-foreground shadow-glow">
              <User className="w-5 h-5" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gamification-gold flex items-center justify-center border-2 border-background shadow-md">
              <span className="text-xs font-bold text-black bg-white rounded-full w-4 h-4 flex items-center justify-center">{userStats.currentLevel}</span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent className="w-80 glass border-glass-border/50 backdrop-blur-glass" align="end">
          {/* Profile Header */}
          <div className="p-4 border-b border-glass-border/30">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-primary border-2 border-primary/50 flex items-center justify-center text-lg font-bold text-primary-foreground shadow-glow">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{userProfile.name}</h3>
                <p className="text-sm text-muted-foreground cursor-pointer hover:text-primary transition-colors" onClick={() => setShowLevelModal(true)}>
                  Level {userProfile.currentLevel} 
                  <span className="ml-1 text-xs">📊</span>
                </p>
              </div>
            </div>
            
            {/* XP Progress */}
            <div className="mt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Level Progress</span>
                <span className="text-muted-foreground">{userProfile.totalXP} / {userProfile.nextLevelXP} XP</span>
              </div>
              <Progress value={levelProgress} className="h-2" />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="p-4 border-b border-glass-border/30">
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-2 rounded-lg bg-glass-border/20">
                <div className="text-lg font-bold text-gamification-coin">{userProfile.coins}</div>
                <div className="text-xs text-muted-foreground">Coins</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-glass-border/20">
                <div className="text-lg font-bold text-primary">{userProfile.badges}</div>
                <div className="text-xs text-muted-foreground">Badges</div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            <DialogTrigger asChild>
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>View Full Profile</span>
              </DropdownMenuItem>
            </DialogTrigger>
            
            <DropdownMenuItem onClick={() => setShowEditModal(true)}>
              <Edit3 className="mr-2 h-4 w-4" />
              <span>Edit Profile</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem>
              <Bell className="mr-2 h-4 w-4" />
              <span>Notifications</span>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Full Profile Dialog */}
      <DialogContent className="glass border-glass-border/50 backdrop-blur-glass max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-primary bg-clip-text text-transparent">
            👤 Athlete Profile
          </DialogTitle>
          <DialogDescription>
            Track your progress, achievements, and customize your experience
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4 bg-glass-border/20">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <div className="max-h-[60vh] overflow-y-auto">
            <TabsContent value="overview" className="space-y-6 mt-0">
              {/* Profile Card */}
              <div className="glass rounded-2xl p-6 border border-glass-border/30 bg-gradient-secondary">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-gradient-primary border-2 border-primary/50 flex items-center justify-center text-2xl font-bold text-primary-foreground shadow-glow">
                        <User className="w-10 h-10" />
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                        onClick={() => setShowEditModal(true)}
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                    </div>
                  
                    <div className="flex-1 text-center md:text-left">
                      <h2 className="text-2xl font-bold mb-2">{userProfile.name}</h2>
                      <p className="text-muted-foreground mb-4">{userProfile.location} • Member since {userProfile.joinDate}</p>
                    
                    <div className="grid grid-cols-4 gap-4">
                      <div className="text-center p-2 rounded-lg bg-glass-border/20">
                        <div className="text-xl font-bold text-gamification-xp">{userProfile.totalXP}</div>
                        <div className="text-xs text-muted-foreground">XP</div>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-glass-border/20">
                        <div className="text-xl font-bold text-gamification-coin">{userProfile.coins}</div>
                        <div className="text-xs text-muted-foreground">Coins</div>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-glass-border/20">
                        <div className="text-xl font-bold text-primary">{userProfile.badges}</div>
                        <div className="text-xs text-muted-foreground">Badges</div>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-glass-border/20">
                        <div className="text-xl font-bold text-gamification-gold">{userProfile.streak}</div>
                        <div className="text-xs text-muted-foreground">Streak</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Overview */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Performance Overview
                </h4>
                <div className="space-y-2">
                  {performanceStats.map((stat) => (
                    <div key={stat.name} className="glass rounded-lg p-3 border border-glass-border/30 flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">{stat.name}</h5>
                        <p className="text-lg font-bold text-primary">{stat.score}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-success text-sm">
                          <TrendingUp className="w-3 h-3" />
                          <span className="font-semibold">{stat.improvement}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4 mt-0">
              <div className="space-y-3">
                {recentBadges.map((badge) => (
                  <div 
                    key={badge.name} 
                    className="glass rounded-lg p-4 border border-glass-border/30 flex items-center gap-4 cursor-pointer hover:border-primary/50 transition-all hover:scale-105"
                    onClick={() => handleBadgeClick(badge)}
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-glass-border/20 ${badge.color}`}>
                      <badge.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{badge.name}</h4>
                      <p className="text-sm text-muted-foreground">{badge.date}</p>
                    </div>
                    <Badge variant="secondary" className="bg-primary/20 text-primary border-0">
                      Earned
                    </Badge>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6 mt-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-glass-border/10">
                  <div>
                    <p className="font-medium">Achievement Notifications</p>
                    <p className="text-sm text-muted-foreground">Get notified when you unlock badges</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-glass-border/10">
                  <div>
                    <p className="font-medium">Workout Reminders</p>
                    <p className="text-sm text-muted-foreground">Daily reminders to complete assessments</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-glass-border/10">
                  <div>
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-sm text-muted-foreground">Currently using dark theme</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>

      <LevelProgressModal 
        isOpen={showLevelModal} 
        onClose={() => setShowLevelModal(false)} 
      />

      <ProfileEditModal 
        isOpen={showEditModal} 
        onClose={() => setShowEditModal(false)}
        currentProfile={userProfile}
        onSave={handleProfileSave}
      />

      {selectedBadge && (
        <BadgeModal 
          isOpen={showBadgeModal} 
          onClose={() => setShowBadgeModal(false)}
          badge={selectedBadge}
        />
      )}
    </Dialog>
  );
}