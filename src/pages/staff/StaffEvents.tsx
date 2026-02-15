import { Calendar, MapPin, Users, Plus, Edit, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const managedEvents = [
  {
    id: 1,
    name: "Regional Swimming Championship",
    date: "2024-01-20",
    time: "10:00 AM",
    location: "Aquatic Center, Mumbai",
    registrations: 34,
    maxParticipants: 50,
    status: "Active",
    category: "Swimming",
    organizer: "You",
    description: "Regional level swimming competition for students aged 14-18"
  },
  {
    id: 2,
    name: "Basketball Skills Workshop",
    date: "2024-01-25",
    time: "02:00 PM",
    location: "Sports Complex, Pune",
    registrations: 18,
    maxParticipants: 25,
    status: "Active",
    category: "Basketball",
    organizer: "You",
    description: "Interactive workshop focusing on fundamental basketball skills"
  },
  {
    id: 3,
    name: "Athletics Training Camp",
    date: "2024-02-01",
    time: "08:00 AM",
    location: "Stadium, Chennai",
    registrations: 42,
    maxParticipants: 60,
    status: "Draft",
    category: "Athletics",
    organizer: "You",
    description: "3-day intensive training camp for track and field events"
  }
];

const upcomingEvents = [
  {
    name: "National Athletics Championship",
    date: "2024-01-15",
    students: ["Arjun Sharma", "Priya Patel", "Karthik Iyer"],
    status: "Registered"
  },
  {
    name: "State Swimming Meet",
    date: "2024-01-22",
    students: ["Neha Choudhary", "Santosh Deshmukh"],
    status: "Pending"
  }
];

const eventStats = [
  { name: "Events Organized", value: "12", change: "+3", icon: Calendar },
  { name: "Total Registrations", value: "156", change: "+24", icon: Users },
  { name: "Active Events", value: "5", change: "+1", icon: CheckCircle },
  { name: "Students Participating", value: "94", change: "+18", icon: Users },
];

export default function StaffEvents() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-success/20 text-success border-success/30';
      case 'Draft': return 'bg-warning/20 text-warning border-warning/30';
      case 'Completed': return 'bg-muted/20 text-muted-foreground border-muted/30';
      default: return 'bg-primary/20 text-primary border-primary/30';
    }
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header Section */}
      <section>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent flex items-center gap-3">
              <Calendar className="w-10 h-10 text-primary" />
              Event Management
            </h1>
            <p className="text-xl text-muted-foreground">
              Organize and manage sports events for your students.
            </p>
          </div>
          <Button className="btn-gradient px-6 py-3 rounded-xl flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create New Event
          </Button>
        </div>
      </section>

      {/* Event Stats */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {eventStats.map((stat) => (
          <Card key={stat.name} className="glass border-glass-border/50 glass-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.name}</p>
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <div className="flex items-center gap-1 text-success text-sm mt-1">
                    <span>{stat.change} this month</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-primary/20 text-primary">
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Managed Events */}
      <Card className="glass border-glass-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Edit className="w-5 h-5 text-primary" />
            Your Managed Events
          </CardTitle>
          <CardDescription>Events you are organizing and managing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {managedEvents.map((event) => (
              <div key={event.id} className="p-4 rounded-xl bg-glass-border/10 hover:bg-glass-border/20 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold">{event.name}</h3>
                      <Badge className={getStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {event.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{new Date(event.date).toLocaleDateString('en-IN')} at {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        <span>{event.registrations}/{event.maxParticipants} registered</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="rounded-lg">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" className="btn-gradient rounded-lg">
                      View Details
                    </Button>
                  </div>
                </div>
                
                {/* Registration Progress */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Registration Progress</span>
                    <span>{Math.round((event.registrations / event.maxParticipants) * 100)}%</span>
                  </div>
                  <div className="w-full bg-glass-border/20 rounded-full h-2">
                    <div 
                      className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(event.registrations / event.maxParticipants) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events with Student Participation */}
      <Card className="glass border-glass-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Student Participation Tracking
          </CardTitle>
          <CardDescription>Events where your students are participating</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="p-4 rounded-xl bg-glass-border/10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">{event.name}</h3>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-sm">{new Date(event.date).toLocaleDateString('en-IN')}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2 flex-wrap">
                    {event.students.map((student) => (
                      <Badge key={student} variant="outline" className="text-xs">
                        {student}
                      </Badge>
                    ))}
                  </div>
                  <Badge className={event.status === 'Registered' ? 'bg-success/20 text-success border-success/30' : 'bg-warning/20 text-warning border-warning/30'}>
                    {event.status}
                  </Badge>
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
            <Calendar className="w-16 h-16 text-primary mx-auto mb-4 animate-float" />
            <h3 className="text-2xl font-bold mb-4">Ready to Create Your Next Event?</h3>
            <p className="text-muted-foreground mb-6">
              Set up competitions, workshops, or training camps to help your students excel in their chosen sports.
            </p>
            <div className="flex justify-center gap-4">
              <Button className="btn-gradient px-6 py-2 rounded-xl">
                Create Event
              </Button>
              <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
                View Templates
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}