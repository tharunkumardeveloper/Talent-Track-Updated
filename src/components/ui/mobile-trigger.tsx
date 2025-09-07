import { Menu } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function MobileSidebarTrigger() {
  return (
    <div className="md:hidden fixed top-4 left-4 z-50">
      <SidebarTrigger className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm border border-border">
        <Menu className="h-4 w-4" />
      </SidebarTrigger>
    </div>
  );
}