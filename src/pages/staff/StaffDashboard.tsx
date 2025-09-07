import { BarChart3, Users, TrendingUp, Award, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const performanceMetrics = [
  { name: "Total Students", value: "127", change: "+8", trend: "up", icon: Users, color: "text-primary" },
  { name: "Assessments Reviewed", value: "284", change: "+45", trend: "up", icon: CheckCircle, color: "text-success" },
  { name: "Flagged Cases", value: "7", change: "-2", trend: "down", icon: AlertCircle, color: "text-warning" },
  { name: "Average Score", value: "78.5%", change: "+3.2%", trend: "up", icon: TrendingUp, color: "text-accent" },
];

const studentsByCategory = [
  { category: "Beginner", count: 45, percentage: 35, color: "bg-gamification-bronze" },
  { category: "Intermediate", count: 52, percentage: 41, color: "bg-gamification-silver" },
  { category: "Advanced", count: 23, percentage: 18, color: "bg-gamification-gold" },
  { category: "Elite", count: 7, percentage: 6, color: "bg-gamification-diamond" },
];

const recentAssessments = [
  { student: "Arjun Sharma", test: "Vertical Jump", score: 85, status: "Completed", date: "Today" },
  { student: "Priya Patel", test: "Shuttle Run", score: 92, status: "Completed", date: "Today" },
  { student: "Karthik Iyer", test: "Endurance", score: 78, status: "Under Review", date: "Yesterday" },
  { student: "Neha Choudhary", test: "Strength", score: 88, status: "Completed", date: "Yesterday" },
  { student: "Santosh Deshmukh", test: "Flexibility", score: 76, status: "Flagged", date: "2 days ago" },
];

const weeklyProgress = [
  { week: "Week 1", assessments: 45, avgScore: 75 },
  { week: "Week 2", assessments: 52, avgScore: 78 },
  { week: "Week 3", assessments: 48, avgScore: 82 },
  { week: "Week 4", assessments: 55, avgScore: 79 },
];

export default function StaffDashboard() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-success/20 text-success border-success/30';
      case 'Under Review': return 'bg-warning/20 text-warning border-warning/30';
      case 'Flagged': return 'bg-destructive/20 text-destructive border-destructive/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header Section */}
      <section>
        <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent flex items-center gap-3">
          <BarChart3 className="w-10 h-10 text-primary" />
          Staff Dashboard
        </h1>
        <p className="text-xl text-muted-foreground">
          Comprehensive analytics and insights for student performance monitoring.
        </p>
      </section>

      {/* Performance Metrics */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric) => (
          <Card key={metric.name} className="glass border-glass-border/50 glass-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{metric.name}</p>
                  <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                  <div className="flex items-center gap-1 text-success text-sm mt-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>{metric.change} this month</span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl bg-glass-border/20 ${metric.color}`}>
                  <metric.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Students by Category & Weekly Progress */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Student Categories */}
        <Card className="glass border-glass-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Students by Performance Level
            </CardTitle>
            <CardDescription>Distribution of students across skill categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studentsByCategory.map((category) => (
                <div key={category.category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                      <span className="font-medium">{category.category}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{category.count} students</span>
                  </div>
                  <Progress value={category.percentage} className="h-2" />
                  <div className="text-right text-xs text-muted-foreground">
                    {category.percentage}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Progress Chart */}
        <Card className="glass border-glass-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Weekly Assessment Trends
            </CardTitle>
            <CardDescription>Assessment volume and average scores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyProgress.map((week) => (
                <div key={week.week} className="flex items-center justify-between p-3 rounded-xl bg-glass-border/10">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium w-16">{week.week}</span>
                    <div className="w-32">
                      <Progress value={(week.assessments / 60) * 100} className="h-2" />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{week.assessments} tests</p>
                    <p className="text-xs text-accent">Avg: {week.avgScore}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Assessments */}
      <Card className="glass border-glass-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Recent Assessment Reviews
          </CardTitle>
          <CardDescription>Latest student assessments requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentAssessments.map((assessment, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-glass-border/10 hover:bg-glass-border/20 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">
                      {assessment.student.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{assessment.student}</h4>
                    <p className="text-sm text-muted-foreground">{assessment.test}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-bold text-accent">{assessment.score}%</p>
                    <p className="text-xs text-muted-foreground">{assessment.date}</p>
                  </div>
                  <Badge className={getStatusColor(assessment.status)}>
                    {assessment.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <Card className="glass border-glass-border/50 bg-gradient-secondary">
        <CardContent className="p-8">
          <div className="text-center">
            <Award className="w-16 h-16 text-primary mx-auto mb-4 animate-float" />
            <h3 className="text-2xl font-bold mb-4">Great Work This Month!</h3>
            <p className="text-muted-foreground mb-6">
              You've reviewed 45 more assessments than last month and maintained an average review time of 8 minutes per assessment.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="text-center">
                <p className="text-2xl font-bold text-success">95%</p>
                <p className="text-sm text-muted-foreground">Review Accuracy</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">8 min</p>
                <p className="text-sm text-muted-foreground">Avg Review Time</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-accent">284</p>
                <p className="text-sm text-muted-foreground">Total Reviews</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}