import { Bell, Users, Calendar, TrendingUp, FileText, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const announcements = [
  {
    id: 1,
    title: "New Assessment Guidelines Released",
    content: "Updated guidelines for conducting physical assessments have been published. Please review before next evaluation session.",
    date: "2024-01-08",
    priority: "high",
    author: "SAI Administration"
  },
  {
    id: 2,
    title: "Equipment Maintenance Schedule",
    content: "Scheduled maintenance for sports equipment will take place this weekend. Plan assessments accordingly.",
    date: "2024-01-07",
    priority: "medium",
    author: "Facilities Team"
  },
  {
    id: 3,
    title: "Student Achievement Recognition",
    content: "Congratulations to our staff for successfully mentoring 15 students who achieved state-level recognition this quarter.",
    date: "2024-01-05",
    priority: "low",
    author: "Sports Director"
  }
];

const quickStats = [
  { name: "Students Supervised", value: "127", change: "+8", icon: Users, color: "text-primary" },
  { name: "Assessments This Week", value: "45", change: "+12", icon: FileText, color: "text-accent" },
  { name: "Upcoming Events", value: "6", change: "+2", icon: Calendar, color: "text-success" },
  { name: "Outstanding Reports", value: "3", change: "-2", icon: TrendingUp, color: "text-warning" },
];

const recentActivities = [
  { action: "Assessment completed", student: "Arjun Sharma", time: "2 hours ago", type: "assessment" },
  { action: "Performance flagged", student: "Priya Patel", time: "4 hours ago", type: "flag" },
  { action: "Badge awarded", student: "Karthik Iyer", time: "6 hours ago", type: "badge" },
  { action: "Event registration", student: "Neha Choudhary", time: "1 day ago", type: "event" },
];

export default function StaffHome() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive/20 text-destructive border-destructive/30';
      case 'medium': return 'bg-warning/20 text-warning border-warning/30';
      case 'low': return 'bg-success/20 text-success border-success/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'assessment': return FileText;
      case 'flag': return Bell;
      case 'badge': return Award;
      case 'event': return Calendar;
      default: return Users;
    }
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header Section */}
      <section>
        <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent flex items-center gap-3">
          <Users className="w-10 h-10 text-primary" />
          Staff Portal Home
        </h1>
        <p className="text-xl text-muted-foreground">
          Welcome back, Coach Raj! Monitor student progress and manage assessments.
        </p>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat) => (
          <Card key={stat.name} className="glass border-glass-border/50 glass-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.name}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  <div className="flex items-center gap-1 text-success text-sm mt-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>{stat.change} this week</span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl bg-glass-border/20 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Announcements */}
        <Card className="glass border-glass-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Announcements
            </CardTitle>
            <CardDescription>Latest updates and important information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="border-l-4 border-primary/50 pl-4 py-2">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">{announcement.title}</h4>
                    <Badge className={getPriorityColor(announcement.priority)}>
                      {announcement.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{announcement.content}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{announcement.author}</span>
                    <span>{new Date(announcement.date).toLocaleDateString('en-IN')}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="glass border-glass-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Recent Activities
            </CardTitle>
            <CardDescription>Latest student activities and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => {
                const IconComponent = getActivityIcon(activity.type);
                return (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-glass-border/10 hover:bg-glass-border/20 transition-colors">
                    <div className="p-2 rounded-lg bg-primary/20">
                      <IconComponent className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.student}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="glass border-glass-border/50 bg-gradient-secondary">
        <CardContent className="p-8">
          <div className="text-center">
            <FileText className="w-16 h-16 text-primary mx-auto mb-4 animate-float" />
            <h3 className="text-2xl font-bold mb-4">Ready to Review Assessments?</h3>
            <p className="text-muted-foreground mb-6">
              You have 3 pending assessment reviews waiting for your evaluation.
            </p>
            <div className="flex justify-center gap-4">
              <Button className="btn-gradient px-6 py-2 rounded-xl">
                Review Assessments
              </Button>
              <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
                View Dashboard
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}