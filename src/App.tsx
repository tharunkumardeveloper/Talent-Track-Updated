import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { RoleProvider, useRole } from "@/contexts/RoleContext";
import { RoleSelection } from "@/components/RoleSelection";
import { AppSidebar } from "@/components/AppSidebar";
import { StaffSidebar } from "@/components/StaffSidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { TopNotificationBar } from "@/components/TopNotificationBar";
import { MobileSidebarTrigger } from "@/components/ui/mobile-trigger";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Assessment from "./pages/Assessment";
import VideoAnalysis from "./pages/VideoAnalysis";
import Challenges from "./pages/Challenges";
import Leaderboard from "./pages/Leaderboard";
import Roadmap from "./pages/Roadmap";
import Events from "./pages/Events";
import StaffHome from "./pages/staff/StaffHome";
import StaffDashboard from "./pages/staff/StaffDashboard";
import StaffLeaderboard from "./pages/staff/StaffLeaderboard";
import StaffEvents from "./pages/staff/StaffEvents";
import StaffReports from "./pages/staff/StaffReports";
import AdminHome from "./pages/admin/AdminHome";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTopPlayers from "./pages/admin/AdminTopPlayers";
import AdminOrganizeEvents from "./pages/admin/AdminOrganizeEvents";
import AdminSystemSettings from "./pages/admin/AdminSystemSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  const { role, isLoggedIn } = useRole();

  if (!isLoggedIn) {
    return <RoleSelection />;
  }

  const getSidebar = () => {
    switch (role) {
      case 'staff': return <StaffSidebar />;
      case 'admin': return <AdminSidebar />;
      default: return <AppSidebar />;
    }
  };

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex min-h-screen w-full">
        {getSidebar()}
        <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
          <MobileSidebarTrigger />
          <TopNotificationBar />
          <main className="flex-1 overflow-auto relative">
            <Routes>
              {/* Student Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/assessment" element={<Assessment />} />
              <Route path="/video-analysis" element={<VideoAnalysis />} />
              <Route path="/challenges" element={<Challenges />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/events" element={<Events />} />
              
              {/* Staff Routes */}
              <Route path="/staff/home" element={<StaffHome />} />
              <Route path="/staff/dashboard" element={<StaffDashboard />} />
              <Route path="/staff/leaderboard" element={<StaffLeaderboard />} />
              <Route path="/staff/events" element={<StaffEvents />} />
              <Route path="/staff/reports" element={<StaffReports />} />
              
              {/* Admin Routes */}
              <Route path="/admin/home" element={<AdminHome />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/top-players" element={<AdminTopPlayers />} />
              <Route path="/admin/organize-events" element={<AdminOrganizeEvents />} />
              <Route path="/admin/system-settings" element={<AdminSystemSettings />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RoleProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </RoleProvider>
  </QueryClientProvider>
);

export default App;
