import { Bell, Coins, Zap, LogOut } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ProfileDropdown } from "./ProfileDropdown";
import { NotificationCenter } from "./NotificationCenter";
import { Button } from "@/components/ui/button";
import { useRole } from "@/contexts/RoleContext";

export function TopNotificationBar() {
  const { role, logout } = useRole();
  
  const getRoleDisplay = () => {
    switch (role) {
      case 'student': return { text: 'Student Portal', color: 'text-primary' };
      case 'staff': return { text: 'Staff Portal', color: 'text-accent' };
      case 'admin': return { text: 'Admin Portal (SAI)', color: 'text-success' };
      default: return { text: '', color: '' };
    }
  };

  const roleDisplay = getRoleDisplay();

  return (
    <header className="h-14 md:h-16 glass border-b border-glass-border backdrop-blur-glass flex items-center justify-between px-3 md:px-4 ml-14 md:ml-0">
      <div className="flex items-center gap-2 md:gap-4">
        <SidebarTrigger className="hidden md:flex p-2 rounded-lg hover:bg-glass-border/20 transition-colors" />
        <div className="flex items-center gap-2 md:gap-3">
          <h1 className="font-bold text-lg md:text-xl bg-gradient-primary bg-clip-text text-transparent">
            Talent Track
          </h1>
          {roleDisplay.text && (
            <span className={`text-xs md:text-sm font-medium ${roleDisplay.color} hidden sm:inline`}>
              • {roleDisplay.text}
            </span>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        {/* Coins - Hidden on very small screens */}
        <div className="hidden sm:flex items-center gap-2 glass px-2 md:px-3 py-1 md:py-2 rounded-xl border border-glass-border/50">
          <Coins className="w-3 h-3 md:w-4 md:h-4 text-gamification-coin" />
          <span className="font-semibold text-gamification-coin text-sm md:text-base">2,450</span>
        </div>
        
        {/* XP - Hidden on very small screens */}
        <div className="hidden sm:flex items-center gap-2 glass px-2 md:px-3 py-1 md:py-2 rounded-xl border border-glass-border/50">
          <Zap className="w-3 h-3 md:w-4 md:h-4 text-gamification-xp" />
          <span className="font-semibold text-gamification-xp text-sm md:text-base">1,280</span>
          <div className="text-xs text-muted-foreground hidden md:inline">XP</div>
        </div>
        
        {/* Notification Bell */}
        <NotificationCenter />

        {/* Profile Dropdown */}
        <ProfileDropdown />

        {/* Logout Button - Smaller on mobile */}
        <Button
          variant="outline"
          size="sm"
          onClick={logout}
          className="border-destructive/30 text-destructive hover:bg-destructive/10 h-8 w-8 p-0 md:h-auto md:w-auto md:px-3"
        >
          <LogOut className="w-3 h-3 md:w-4 md:h-4" />
        </Button>
      </div>
    </header>
  );
}