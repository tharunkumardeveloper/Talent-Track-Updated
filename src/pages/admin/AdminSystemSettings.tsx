import { Settings, Shield, Database, Globe, Bell, Users, Lock, Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const systemStatus = [
  { name: "Database Performance", status: "optimal", value: "98.7%", color: "text-success" },
  { name: "API Response Time", status: "good", value: "145ms", color: "text-primary" },
  { name: "User Authentication", status: "optimal", value: "99.9%", color: "text-success" },
  { name: "Regional Sync", status: "warning", value: "89.2%", color: "text-warning" },
];

const securitySettings = [
  { 
    name: "Two-Factor Authentication", 
    description: "Require 2FA for all administrative accounts",
    enabled: true,
    category: "Authentication"
  },
  { 
    name: "Session timeout", 
    description: "Auto-logout after 30 minutes of inactivity",
    enabled: true,
    category: "Security"
  },
  { 
    name: "IP Whitelist", 
    description: "Restrict access to approved IP addresses",
    enabled: false,
    category: "Access Control"
  },
  { 
    name: "Audit Logging", 
    description: "Track all administrative actions",
    enabled: true,
    category: "Compliance"
  }
];

const regionSettings = [
  { 
    region: "Northern Region", 
    status: "active", 
    facilities: 45, 
    staff: 234, 
    lastSync: "2 min ago",
    connectivity: 99.8 
  },
  { 
    region: "Southern Region", 
    status: "active", 
    facilities: 52, 
    staff: 278, 
    lastSync: "1 min ago",
    connectivity: 99.9 
  },
  { 
    region: "Western Region", 
    status: "active", 
    facilities: 38, 
    staff: 198, 
    lastSync: "3 min ago",
    connectivity: 98.7 
  },
  { 
    region: "Eastern Region", 
    status: "maintenance", 
    facilities: 31, 
    staff: 156, 
    lastSync: "15 min ago",
    connectivity: 87.2 
  },
  { 
    region: "Central Region", 
    status: "active", 
    facilities: 28, 
    staff: 134, 
    lastSync: "1 min ago",
    connectivity: 99.1 
  }
];

const notificationSettings = [
  { 
    type: "Critical System Alerts", 
    description: "Immediate notifications for system failures",
    enabled: true,
    recipients: 8 
  },
  { 
    type: "Performance Reports", 
    description: "Weekly performance analytics",
    enabled: true,
    recipients: 15 
  },
  { 
    type: "Security Incidents", 
    description: "Real-time security breach notifications",
    enabled: true,
    recipients: 5 
  },
  { 
    type: "Maintenance Schedules", 
    description: "Planned maintenance notifications",
    enabled: false,
    recipients: 12 
  }
];

export default function AdminSystemSettings() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'bg-success/20 text-success border-success/30';
      case 'good': return 'bg-primary/20 text-primary border-primary/30';
      case 'warning': return 'bg-warning/20 text-warning border-warning/30';
      case 'active': return 'bg-success/20 text-success border-success/30';
      case 'maintenance': return 'bg-warning/20 text-warning border-warning/30';
      case 'critical': return 'bg-destructive/20 text-destructive border-destructive/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  return (
    <div className="space-y-6 md:space-y-8 p-4 md:p-6">
      {/* Header Section */}
      <section>
        <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 bg-gradient-primary bg-clip-text text-transparent flex items-center gap-2 md:gap-3">
          <Settings className="w-6 h-6 md:w-10 md:h-10 text-primary" />
          System Settings
        </h1>
        <p className="text-base md:text-xl text-muted-foreground">
          Configure and monitor national SAI system infrastructure and security.
        </p>
      </section>

      {/* System Status */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {systemStatus.map((metric) => (
          <Card key={metric.name} className="glass border-glass-border/50 glass-hover">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground mb-1">{metric.name}</p>
                  <p className={`text-xl md:text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                  <Badge className={getStatusColor(metric.status)}>
                    {metric.status}
                  </Badge>
                </div>
                <div className="p-2 md:p-3 rounded-xl bg-glass-border/20">
                  <Activity className={`w-5 h-5 md:w-6 md:h-6 ${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Security & Regional Settings */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Security Settings */}
        <Card className="glass border-glass-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Security Configuration
            </CardTitle>
            <CardDescription>Manage security policies and access controls</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {securitySettings.map((setting) => (
                <div key={setting.name} className="flex items-center justify-between p-3 rounded-xl bg-glass-border/10">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{setting.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {setting.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{setting.description}</p>
                  </div>
                  <Switch checked={setting.enabled} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Regional Configuration */}
        <Card className="glass border-glass-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              Regional Configuration
            </CardTitle>
            <CardDescription>Monitor regional infrastructure and connectivity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {regionSettings.map((region) => (
                <div key={region.region} className="p-3 rounded-xl bg-glass-border/10">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{region.region}</h4>
                    <Badge className={getStatusColor(region.status)}>
                      {region.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Facilities</p>
                      <p className="font-semibold">{region.facilities}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Staff</p>
                      <p className="font-semibold">{region.staff}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Connectivity</p>
                      <p className="font-semibold">{region.connectivity}%</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Last sync: {region.lastSync}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notification Settings */}
      <Card className="glass border-glass-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            Notification Management
          </CardTitle>
          <CardDescription>Configure system alerts and notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notificationSettings.map((notification) => (
              <div key={notification.type} className="flex items-center justify-between p-4 rounded-xl bg-glass-border/10">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-semibold">{notification.type}</h4>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="w-3 h-3" />
                      <span>{notification.recipients} recipients</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.description}</p>
                </div>
                <Switch checked={notification.enabled} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Database & Backup */}
      <Card className="glass border-glass-border/50 bg-gradient-secondary">
        <CardContent className="p-8">
          <div className="text-center">
            <Database className="w-16 h-16 text-primary mx-auto mb-4 animate-float" />
            <h3 className="text-2xl font-bold mb-4">System Infrastructure</h3>
            <p className="text-muted-foreground mb-6">
              Advanced database management, automated backups, and real-time monitoring across all SAI regions.
            </p>
            <div className="flex justify-center gap-4">
              <Button className="btn-gradient px-6 py-2 rounded-xl">
                Database Console
              </Button>
              <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
                Backup Settings
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}