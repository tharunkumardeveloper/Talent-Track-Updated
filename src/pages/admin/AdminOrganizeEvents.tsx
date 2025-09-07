import { Calendar, Plus, MapPin, Users, Clock, Trophy, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const upcomingEvents = [
  {
    id: 1,
    title: "National Athletics Championship 2024",
    date: "2024-04-15",
    location: "Jawaharlal Nehru Stadium, New Delhi", 
    participants: 1250,
    status: "registration-open",
    category: "Athletics",
    priority: "high",
    organizer: "SAI Northern Region"
  },
  {
    id: 2,
    title: "All India Swimming Competition",
    date: "2024-04-22", 
    location: "Aquatic Complex, Mumbai",
    participants: 680,
    status: "planning",
    category: "Swimming", 
    priority: "medium",
    organizer: "SAI Western Region"
  },
  {
    id: 3,
    title: "Youth Basketball Tournament",
    date: "2024-05-05",
    location: "Sports Complex, Bengaluru",
    participants: 420,
    status: "confirmed",
    category: "Basketball",
    priority: "medium", 
    organizer: "SAI Southern Region"
  },
  {
    id: 4,
    title: "National Gymnastics Championships",
    date: "2024-05-18",
    location: "Indira Gandhi Stadium, Delhi",
    participants: 380,
    status: "registration-open",
    category: "Gymnastics",
    priority: "high",
    organizer: "SAI National"
  }
];

const eventCategories = [
  { name: "Athletics", events: 24, participants: 5420, avgRating: 4.8 },
  { name: "Swimming", events: 18, participants: 3240, avgRating: 4.7 },
  { name: "Basketball", events: 15, participants: 2890, avgRating: 4.6 },
  { name: "Gymnastics", events: 12, participants: 2180, avgRating: 4.9 },
  { name: "Wrestling", events: 16, participants: 2650, avgRating: 4.5 },
  { name: "Hockey", events: 10, participants: 1980, avgRating: 4.8 }
];

const recentEvents = [
  {
    title: "Regional Wrestling Championship",
    date: "2024-03-28", 
    participants: 345,
    outcome: "Successfully completed with 98% attendance",
    rating: 4.9
  },
  {
    title: "Inter-State Badminton Tournament",
    date: "2024-03-25",
    participants: 280,
    outcome: "Excellent organization, minor equipment delays",
    rating: 4.6
  },
  {
    title: "National Boxing Championship",
    date: "2024-03-20",
    participants: 520,
    outcome: "Outstanding event management and safety protocols",
    rating: 4.8
  }
];

export default function AdminOrganizeEvents() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-success/20 text-success border-success/30';
      case 'registration-open': return 'bg-primary/20 text-primary border-primary/30';
      case 'planning': return 'bg-warning/20 text-warning border-warning/30';
      case 'cancelled': return 'bg-destructive/20 text-destructive border-destructive/30';
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

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <div className="space-y-6 md:space-y-8 p-4 md:p-6">
      {/* Header Section */}
      <section>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
          <h1 className="text-2xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent flex items-center gap-2 md:gap-3">
            <Calendar className="w-6 h-6 md:w-10 md:h-10 text-primary" />
            Organize Events
          </h1>
          <Button className="btn-gradient px-4 md:px-6 py-2 rounded-xl w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Create New Event
          </Button>
        </div>
        <p className="text-base md:text-xl text-muted-foreground">
          Manage and coordinate national sports events across all SAI regions.
        </p>
      </section>

      {/* Upcoming Events */}
      <Card className="glass border-glass-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <Clock className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            Upcoming Events
          </CardTitle>
          <CardDescription className="text-sm">Events scheduled for the next quarter</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 md:space-y-4">
            {upcomingEvents.map((event) => (
              <div 
                key={event.id}
                className="flex flex-col lg:flex-row lg:items-center justify-between p-3 md:p-4 rounded-xl bg-glass-border/10 hover:bg-glass-border/20 transition-all duration-300 gap-3"
              >
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                    <h3 className="font-bold text-sm md:text-lg">{event.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge className={getStatusColor(event.status)}>
                        {event.status.replace('-', ' ')}
                      </Badge>
                      <Badge className={getPriorityColor(event.priority)}>
                        {event.priority} priority
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 text-xs md:text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-3 h-3 md:w-4 md:h-4" />
                      <span>{event.participants} participants</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Trophy className="w-3 h-3 md:w-4 md:h-4" />
                      <span>{event.category}</span>
                    </div>
                  </div>
                  <p className="text-xs text-accent mt-1">Organized by: {event.organizer}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 lg:w-auto w-full">
                  <Button variant="outline" size="sm" className="text-xs md:text-sm">
                    Edit
                  </Button>
                  <Button size="sm" className="bg-primary/20 hover:bg-primary/30 text-primary text-xs md:text-sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Event Categories & Recent Events */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Event Categories */}
        <Card className="glass border-glass-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              Event Categories
            </CardTitle>
            <CardDescription>Performance metrics by sports category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {eventCategories.map((category) => (
                <div key={category.name} className="flex items-center justify-between p-3 rounded-xl bg-glass-border/10">
                  <div>
                    <h4 className="font-semibold">{category.name}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{category.events} events</span>
                      <span>•</span>
                      <span>{category.participants.toLocaleString()} participants</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-accent text-lg">★ {category.avgRating}</p>
                    <p className="text-xs text-muted-foreground">Avg Rating</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Events */}
        <Card className="glass border-glass-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-primary" />
              Recently Completed
            </CardTitle>
            <CardDescription>Post-event analysis and feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEvents.map((event, index) => (
                <div key={index} className="p-3 rounded-xl bg-glass-border/10">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{event.title}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-accent font-medium">★ {event.rating}</span>
                      <span className="text-xs text-muted-foreground">{formatDate(event.date)}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{event.outcome}</p>
                  <p className="text-xs text-muted-foreground">{event.participants} participants</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Event Management Tools */}
      <Card className="glass border-glass-border/50 bg-gradient-secondary">
        <CardContent className="p-8">
          <div className="text-center">
            <Calendar className="w-16 h-16 text-primary mx-auto mb-4 animate-float" />
            <h3 className="text-2xl font-bold mb-4">Advanced Event Management</h3>
            <p className="text-muted-foreground mb-6">
              Streamlined tools for planning, execution, and analysis of national sports events with real-time coordination capabilities.
            </p>
            <div className="flex justify-center gap-4">
              <Button className="btn-gradient px-6 py-2 rounded-xl">
                Event Calendar
              </Button>
              <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
                Resource Manager
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}