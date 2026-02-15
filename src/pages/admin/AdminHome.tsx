import { Shield, Users, TrendingUp, Globe, Bell, BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const systemOverview = [
  { name: "Total Registrations", value: "15,247", change: "+1,204", trend: "up", icon: Users, color: "text-primary" },
  { name: "Active Athletes", value: "12,890", change: "+856", trend: "up", icon: TrendingUp, color: "text-success" },
  { name: "Events This Month", value: "42", change: "+8", trend: "up", icon: BarChart3, color: "text-accent" },
  { name: "Staff Members", value: "567", change: "+23", trend: "up", icon: Shield, color: "text-warning" },
];

const systemAlerts = [
  {
    id: 1,
    title: "High Registration Volume",
    message: "Regional championships receiving exceptional registration numbers. Consider expanding capacity.",
    priority: "high",
    time: "5 min ago"
  },
  {
    id: 2,
    title: "Equipment Maintenance Due",
    message: "15 facilities scheduled for equipment maintenance this week.",
    priority: "medium",
    time: "2 hours ago"
  },
  {
    id: 3,
    title: "Performance Analytics Ready",
    message: "Quarterly performance report has been generated and is ready for review.",
    priority: "low",
    time: "1 day ago"
  }
];

export default function AdminHome() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive/20 text-destructive border-destructive/30';
      case 'medium': return 'bg-warning/20 text-warning border-warning/30';
      case 'low': return 'bg-success/20 text-success border-success/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  return (
    <div className="space-y-6 md:space-y-8 p-4 md:p-6">
      {/* Header Section */}
      <section>
        <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 bg-gradient-primary bg-clip-text text-transparent flex items-center gap-2 md:gap-3">
          <Shield className="w-6 h-6 md:w-10 md:h-10 text-primary" />
          SAI Admin Dashboard
        </h1>
        <p className="text-base md:text-xl text-muted-foreground">
          Welcome, Administrator! System overview and national sports management portal.
        </p>
      </section>

      {/* System Overview */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {systemOverview.map((metric) => (
          <Card key={metric.name} className="glass border-glass-border/50 glass-hover">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground mb-1">{metric.name}</p>
                  <p className={`text-xl md:text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                  <div className="flex items-center gap-1 text-success text-xs md:text-sm mt-1">
                    <TrendingUp className="w-3 h-3" />
                    <span className="hidden sm:inline">{metric.change} this month</span>
                    <span className="sm:hidden">{metric.change}</span>
                  </div>
                </div>
                <div className={`p-2 md:p-3 rounded-xl bg-glass-border/20 ${metric.color}`}>
                  <metric.icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* System Alerts */}
      <Card className="glass border-glass-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <Bell className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            System Alerts & Notifications
          </CardTitle>
          <CardDescription className="text-sm">Critical system updates and administrative notices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 md:space-y-4">
            {systemAlerts.map((alert) => (
              <div key={alert.id} className="border-l-4 border-primary/50 pl-3 md:pl-4 py-2 md:py-3 bg-glass-border/10 rounded-r-xl">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 gap-2">
                  <h4 className="font-semibold text-sm md:text-base">{alert.title}</h4>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(alert.priority)}>
                      {alert.priority}
                    </Badge>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{alert.time}</span>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">{alert.message}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="glass border-glass-border/50 bg-gradient-secondary">
        <CardContent className="p-6 md:p-8">
          <div className="text-center">
            <Globe className="w-12 h-12 md:w-16 md:h-16 text-primary mx-auto mb-4 animate-float" />
            <h3 className="text-xl md:text-2xl font-bold mb-4">National Sports Excellence Initiative</h3>
            <p className="text-muted-foreground mb-6 text-sm md:text-base">
              Monitor and enhance India's sports development programs across all states and territories.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
              <Button className="btn-gradient px-4 md:px-6 py-2 rounded-xl text-sm md:text-base">
                View Analytics
              </Button>
              <Button variant="outline" className="border-primary/30 hover:bg-primary/10 text-sm md:text-base">
                System Settings
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}