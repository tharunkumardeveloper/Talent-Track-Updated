import { 
  Home, 
  Video, 
  LayoutDashboard, 
  Trophy, 
  TrendingUp, 
  Map, 
  Calendar 
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Home", url: "/", icon: Home },
  { title: "Assessment", url: "/assessment", icon: Video },
  { title: "Challenges", url: "/challenges", icon: Trophy },
  { title: "Leaderboard", url: "/leaderboard", icon: TrendingUp },
  { title: "Roadmap", url: "/roadmap", icon: Map },
  { title: "Events", url: "/events", icon: Calendar },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const isMobile = useIsMobile();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed" && !isMobile;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-gradient-primary text-primary-foreground font-medium shadow-glow hover:shadow-glow hover:scale-105 border border-primary/30" 
      : "hover:bg-glass text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 border border-transparent";

  return (
    <Sidebar 
      className={`${isCollapsed ? "w-14 md:w-20" : "w-64 md:w-72"} glass border-r border-glass-border backdrop-blur-glass flex-shrink-0`}
      collapsible="icon"
    >
      <SidebarContent className="bg-transparent">
        <div className="p-4 border-b border-glass-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`${isCollapsed ? 'w-10 h-10 rounded-full' : 'w-10 h-10 rounded-2xl'} bg-gradient-primary flex items-center justify-center shadow-glow`}>
                <Trophy className={`${isCollapsed ? 'w-6 h-6' : 'w-6 h-6'} text-primary-foreground`} />
              </div>
              {!isCollapsed && (
                <div>
                  <h2 className="font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
                    Talent Track
                  </h2>
                  <p className="text-sm text-muted-foreground">Discover Your Potential</p>
                </div>
              )}
            </div>
            <SidebarTrigger className="hidden md:flex h-7 w-7 hover:bg-glass hover:text-foreground" />
          </div>
        </div>

        <SidebarGroup className="px-2 py-4">
          {!isCollapsed && (
            <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
              Navigation
            </SidebarGroupLabel>
          )}
          
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="rounded-xl">
                     <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => `
                        flex items-center gap-3 p-3 transition-all duration-300
                        ${getNavCls({ isActive })}
                        ${isCollapsed ? 'rounded-full w-12 h-12 justify-center' : 'rounded-xl text-lg'}
                       `}
                     >
                       <item.icon className={`${isCollapsed ? 'w-5 h-5' : 'w-5 h-5'} flex-shrink-0`} />
                       {!isCollapsed && (
                         <span className="font-medium text-lg">
                           {item.title}
                         </span>
                       )}
                     </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}