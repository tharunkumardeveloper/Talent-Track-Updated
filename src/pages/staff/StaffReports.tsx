import { FileText, TrendingUp, Download, Filter, BarChart3, PieChart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const reportCategories = [
  {
    name: "Student Performance Analytics",
    description: "Comprehensive analysis of student achievements and progress trends",
    lastGenerated: "2024-01-08",
    icon: TrendingUp,
    color: "text-primary"
  },
  {
    name: "Assessment Summary Reports",
    description: "Detailed breakdown of test results and scoring patterns",
    lastGenerated: "2024-01-07",
    icon: BarChart3,
    color: "text-accent"
  },
  {
    name: "Attendance & Participation",
    description: "Student attendance tracking and event participation metrics",
    lastGenerated: "2024-01-06",
    icon: Users,
    color: "text-success"
  },
  {
    name: "Skills Development Tracking",
    description: "Progress monitoring for specific sports skills and competencies",
    lastGenerated: "2024-01-05",
    icon: PieChart,
    color: "text-warning"
  }
];

const recentReports = [
  {
    title: "Monthly Performance Summary - December 2023",
    type: "Performance",
    generatedDate: "2024-01-02",
    size: "2.4 MB",
    students: 127,
    status: "Ready"
  },
  {
    title: "Swimming Category Analysis",
    type: "Category Specific",
    generatedDate: "2024-01-01",
    size: "1.8 MB",
    students: 23,
    status: "Ready"
  },
  {
    title: "Year-End Assessment Report 2023",
    type: "Annual",
    generatedDate: "2023-12-31",
    size: "5.2 MB",
    students: 156,
    status: "Ready"
  }
];

const performanceInsights = [
  { metric: "Average Test Completion Rate", value: "94%", trend: "+3%", color: "text-success" },
  { metric: "Student Improvement Rate", value: "78%", trend: "+12%", color: "text-primary" },
  { metric: "Badge Achievement Rate", value: "85%", trend: "+7%", color: "text-accent" },
  { metric: "Event Participation", value: "67%", trend: "+15%", color: "text-warning" }
];

const topPerformers = [
  { name: "Arjun Sharma", category: "Athletics", score: 95, improvement: "+12%" },
  { name: "Priya Patel", category: "Swimming", score: 92, improvement: "+8%" },
  { name: "Karthik Iyer", category: "Basketball", score: 89, improvement: "+15%" },
];

export default function StaffReports() {
  return (
    <div className="space-y-8 p-6">
      {/* Header Section */}
      <section>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent flex items-center gap-3">
              <FileText className="w-10 h-10 text-primary" />
              Analytics & Reports
            </h1>
            <p className="text-xl text-muted-foreground">
              Generate insights and track student performance trends.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2 border-primary/30">
              <Filter className="w-4 h-4" />
              Filter Reports
            </Button>
            <Button className="btn-gradient px-6 py-3 rounded-xl flex items-center gap-2">
              <Download className="w-5 h-5" />
              Generate Report
            </Button>
          </div>
        </div>
      </section>

      {/* Performance Insights */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceInsights.map((insight) => (
          <Card key={insight.metric} className="glass border-glass-border/50 glass-hover">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">{insight.metric}</p>
                <p className={`text-3xl font-bold mb-2 ${insight.color}`}>{insight.value}</p>
                <div className="flex items-center justify-center gap-1 text-success text-sm">
                  <TrendingUp className="w-3 h-3" />
                  <span>{insight.trend} vs last month</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Report Categories & Recent Reports */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Report Categories */}
        <Card className="glass border-glass-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Report Categories
            </CardTitle>
            <CardDescription>Generate comprehensive reports by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportCategories.map((category) => (
                <div key={category.name} className="p-4 rounded-xl bg-glass-border/10 hover:bg-glass-border/20 transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg bg-glass-border/20 ${category.color}`}>
                      <category.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{category.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{category.description}</p>
                      <p className="text-xs text-muted-foreground">
                        Last generated: {new Date(category.lastGenerated).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                    <Button size="sm" className="btn-gradient rounded-lg">
                      Generate
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <Card className="glass border-glass-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5 text-primary" />
              Recent Reports
            </CardTitle>
            <CardDescription>Your recently generated reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map((report, index) => (
                <div key={index} className="p-4 rounded-xl bg-glass-border/10 hover:bg-glass-border/20 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{report.title}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {report.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {report.students} students
                        </span>
                      </div>
                    </div>
                    <Badge className="bg-success/20 text-success border-success/30">
                      {report.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      <span>{new Date(report.generatedDate).toLocaleDateString('en-IN')}</span>
                      <span className="mx-2">•</span>
                      <span>{report.size}</span>
                    </div>
                    <Button size="sm" variant="outline" className="rounded-lg">
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers Summary */}
      <Card className="glass border-glass-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Student Performance Highlights
          </CardTitle>
          <CardDescription>Top performing students in your supervision</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {topPerformers.map((student, index) => (
              <div key={index} className="text-center p-4 rounded-xl bg-glass-border/10">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                  <span className="font-bold text-primary text-lg">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="font-semibold mb-1">{student.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{student.category}</p>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-accent">{student.score}%</p>
                  <p className="text-sm text-success">{student.improvement} improvement</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="glass border-glass-border/50 bg-gradient-secondary">
        <CardContent className="p-8">
          <div className="text-center">
            <FileText className="w-16 h-16 text-primary mx-auto mb-4 animate-float" />
            <h3 className="text-2xl font-bold mb-4">Need Custom Analytics?</h3>
            <p className="text-muted-foreground mb-6">
              Generate customized reports with specific metrics, date ranges, and student groups to get deeper insights.
            </p>
            <div className="flex justify-center gap-4">
              <Button className="btn-gradient px-6 py-2 rounded-xl">
                Custom Report Builder
              </Button>
              <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
                Schedule Reports
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}