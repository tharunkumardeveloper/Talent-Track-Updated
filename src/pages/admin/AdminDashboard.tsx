import { BarChart3, Users, TrendingUp, Calendar, Target, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const performanceMetrics = [
  { name: "Overall Participation", value: "87%", change: "+5.2%", trend: "up", icon: Users, color: "text-primary" },
  { name: "Event Completion Rate", value: "92%", change: "+3.1%", trend: "up", icon: Target, color: "text-success" },
  { name: "Average Performance Score", value: "78.4", change: "+2.8", trend: "up", icon: TrendingUp, color: "text-accent" },
  { name: "Monthly Events", value: "156", change: "+12", trend: "up", icon: Calendar, color: "text-warning" },
];

const regionalPerformance = [
  { region: "Northern Region", participants: 3240, avgScore: 82.5, events: 45, status: "excellent" },
  { region: "Southern Region", participants: 2890, avgScore: 79.2, events: 38, status: "good" },
  { region: "Western Region", participants: 3150, avgScore: 80.1, events: 42, status: "excellent" },
  { region: "Eastern Region", participants: 2650, avgScore: 75.8, events: 31, status: "needs-attention" },
  { region: "Central Region", participants: 2180, avgScore: 77.3, events: 28, status: "good" },
];

const criticalAlerts = [
  {
    id: 1,
    title: "Equipment Shortage Alert",
    message: "Eastern Region reporting critical shortage of athletic equipment for upcoming championships.",
    priority: "high",
    region: "Eastern Region",
    time: "15 min ago"
  },
  {
    id: 2,
    title: "Facility Maintenance Required",
    message: "5 facilities across Northern Region need immediate maintenance attention.",
    priority: "medium",
    region: "Northern Region", 
    time: "1 hour ago"
  },
  {
    id: 3,
    title: "Outstanding Performance Milestone",
    message: "Western Region has achieved 95% participation rate - highest in SAI history.",
    priority: "low",
    region: "Western Region",
    time: "3 hours ago"
  }
];

export default function AdminDashboard() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-success/20 text-success border-success/30';
      case 'good': return 'bg-primary/20 text-primary border-primary/30';
      case 'needs-attention': return 'bg-warning/20 text-warning border-warning/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

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
          <BarChart3 className="w-6 h-6 md:w-10 md:h-10 text-primary" />
          Administrative Dashboard
        </h1>
        <p className="text-base md:text-xl text-muted-foreground">
          Comprehensive analytics and performance monitoring for national sports programs.
        </p>
      </section>

      {/* Performance Metrics */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {performanceMetrics.map((metric) => (
          <Card key={metric.name} className="glass border-glass-border/50 glass-hover">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground mb-1">{metric.name}</p>
                  <p className={`text-xl md:text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                  <div className="flex items-center gap-1 text-success text-xs md:text-sm mt-1">
                    <TrendingUp className="w-3 h-3" />
                    <span className="hidden sm:inline">{metric.change} vs last month</span>
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

      {/* Regional Performance */}
      <Card className="glass border-glass-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Regional Performance Overview
          </CardTitle>
          <CardDescription>Performance metrics across all SAI regions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {regionalPerformance.map((region) => (
              <div 
                key={region.region}
                className="flex items-center justify-between p-4 rounded-xl bg-glass-border/10 hover:bg-glass-border/20 transition-all duration-300"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-lg">{region.region}</h3>
                    <Badge className={getStatusColor(region.status)}>
                      {region.status.replace('-', ' ')}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Participants</p>
                      <p className="font-semibold">{region.participants.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Avg Score</p>
                      <p className="font-semibold">{region.avgScore}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Events</p>
                      <p className="font-semibold">{region.events}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Critical Alerts */}
      <Card className="glass border-glass-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-primary" />
            Critical Alerts & Updates
          </CardTitle>
          <CardDescription>Important system notifications requiring administrative attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {criticalAlerts.map((alert) => (
              <div key={alert.id} className="border-l-4 border-primary/50 pl-4 py-3 bg-glass-border/10 rounded-r-xl">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold">{alert.title}</h4>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(alert.priority)}>
                      {alert.priority}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{alert.time}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{alert.message}</p>
                <p className="text-xs text-accent font-medium">{alert.region}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="glass border-glass-border/50 bg-gradient-secondary">
        <CardContent className="p-8">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 text-primary mx-auto mb-4 animate-float" />
            <h3 className="text-2xl font-bold mb-4">Advanced Analytics Available</h3>
            <p className="text-muted-foreground mb-6">
              Detailed performance reports, predictive analytics, and regional comparison data ready for review.
            </p>
            <div className="flex justify-center gap-4">
              <Button className="btn-gradient px-6 py-2 rounded-xl">
                Generate Report
              </Button>
              <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
                Export Data
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}