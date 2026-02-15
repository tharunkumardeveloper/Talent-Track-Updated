import { Bell, X, Coins, Zap, Award, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const notifications = [
  { 
    id: 1, 
    type: "coins", 
    title: "Coins Earned! 🪙", 
    message: "+50 coins for completing Speed Demon challenge by Ravi Patel", 
    time: "2 mins ago",
    icon: Coins,
    color: "text-gamification-coin",
    bgColor: "bg-gamification-coin/10"
  },
  { 
    id: 2, 
    type: "badge", 
    title: "New Badge Unlocked! 🏆", 
    message: "Kavya Patel from Bengaluru earned 'Consistency Champion' badge", 
    time: "1 hour ago",
    icon: Award,
    color: "text-gamification-gold",
    bgColor: "bg-gamification-gold/10"
  },
  { 
    id: 3, 
    type: "xp", 
    title: "XP Gained! ⚡", 
    message: "+180 XP for completing daily assessment by Arjun Sharma", 
    time: "3 hours ago",
    icon: Zap,
    color: "text-gamification-xp",
    bgColor: "bg-gamification-xp/10"
  },
  { 
    id: 4, 
    type: "challenge", 
    title: "Challenge Completed! 🎯", 
    message: "Rohit Verma from Chennai completed 'Core Challenger' challenge", 
    time: "5 hours ago",
    icon: Target,
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  { 
    id: 5, 
    type: "rank", 
    title: "Rank Improved! 📈", 
    message: "Priya Patel moved up 5 positions in Tamil Nadu leaderboard", 
    time: "1 day ago",
    icon: TrendingUp,
    color: "text-success",
    bgColor: "bg-success/10"
  },
];

export function NotificationCenter() {
  const [notificationList, setNotificationList] = useState(notifications);
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseNotification = (notificationId: number) => {
    setNotificationList(prev => prev.filter(n => n.id !== notificationId));
  };

  const handleMarkAllAsRead = () => {
    setNotificationList([]);
  };

  const handleCloseDropdown = () => {
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="relative p-2 rounded-lg hover:bg-glass-border/20 transition-colors bell-shake"
        >
          <Bell className="w-5 h-5 text-muted-foreground hover:text-foreground" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse-glow"></div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className="w-96 glass border-glass-border/50 backdrop-blur-glass p-0" 
        align="end"
      >
        {/* Header */}
        <div className="p-4 border-b border-glass-border/30">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">🔔 Notifications</h3>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-primary/20 text-primary border-0">
                {notificationList.length} new
              </Badge>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0 opacity-60 hover:opacity-100 hover:bg-destructive/20 transition-all"
                onClick={handleCloseDropdown}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-h-96 overflow-y-auto">
          {notificationList.length === 0 ? (
            <div className="p-6 text-center">
              <Bell className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-muted-foreground">No new notifications</p>
            </div>
          ) : (
            <div className="space-y-1">
              {notificationList.map((notification) => (
                <div 
                  key={notification.id}
                  className="group p-4 hover:bg-glass-border/20 transition-colors cursor-pointer border-b border-glass-border/10 last:border-0"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${notification.bgColor} ${notification.color}`}>
                      <notification.icon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div>
                        <h4 className="font-semibold text-sm mb-1">
                          {notification.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground/75 mt-2">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {notificationList.length > 0 && (
          <div className="p-3 border-t border-glass-border/30">
            <Button 
              variant="ghost" 
              className="w-full text-primary hover:bg-primary/10 transition-colors"
              onClick={handleMarkAllAsRead}
            >
              Mark all as read
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}