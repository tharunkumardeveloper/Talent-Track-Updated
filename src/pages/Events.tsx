import { Calendar, MapPin, Clock, Users, Trophy, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const upcomingEvents = [
  {
    id: 1,
    name: "National Athletics Championship",
    date: "2024-01-15",
    time: "09:00 AM",
    location: "Jawaharlal Nehru Stadium, New Delhi",
    participants: 156,
    category: "Athletics",
    registrationDeadline: "2024-01-10",
    description: "Annual national championship featuring track and field events for all age categories.",
    prizes: ["Gold Medal + ₹50,000", "Silver Medal + ₹30,000", "Bronze Medal + ₹20,000"],
    status: "Open"
  },
  {
    id: 2,
    name: "Swimming State Championship",
    date: "2024-01-22",
    time: "08:00 AM",
    location: "Aquatic Center, Mumbai",
    participants: 89,
    category: "Swimming",
    registrationDeadline: "2024-01-18",
    description: "State-level swimming competition across multiple swimming disciplines.",
    prizes: ["Gold Medal + ₹25,000", "Silver Medal + ₹15,000", "Bronze Medal + ₹10,000"],
    status: "Open"
  },
  {
    id: 3,
    name: "Basketball Youth Tournament",
    date: "2024-01-28",
    time: "10:00 AM",
    location: "Sports Complex, Bengaluru",
    participants: 24,
    category: "Basketball",
    registrationDeadline: "2024-01-25",
    description: "Under-18 basketball tournament featuring teams from across South India.",
    prizes: ["Trophy + ₹30,000", "Runner-up Trophy + ₹20,000", "Third Place + ₹10,000"],
    status: "Limited Spots"
  },
  {
    id: 4,
    name: "Gymnastics Excellence Cup",
    date: "2024-02-05",
    time: "02:00 PM",
    location: "Gymnastics Academy, Chennai",
    participants: 67,
    category: "Gymnastics",
    registrationDeadline: "2024-02-01",
    description: "Showcasing artistic and rhythmic gymnastics performances at national level.",
    prizes: ["Gold Medal + ₹40,000", "Silver Medal + ₹25,000", "Bronze Medal + ₹15,000"],
    status: "Open"
  }
];

const pastEvents = [
  {
    name: "Inter-School Cricket Championship",
    date: "2023-12-10",
    participants: 128,
    winner: "Delhi Public School",
    category: "Cricket"
  },
  {
    name: "Track & Field District Meet",
    date: "2023-11-25",
    participants: 234,
    winner: "Multiple Winners",
    category: "Athletics"
  }
];

export default function Events() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-success/20 text-success border-success/30';
      case 'Limited Spots':
        return 'bg-warning/20 text-warning border-warning/30';
      case 'Closed':
        return 'bg-destructive/20 text-destructive border-destructive/30';
      default:
        return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header Section */}
      <section>
        <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent flex items-center gap-3">
          <Calendar className="w-10 h-10 text-primary" />
          Events & Competitions
        </h1>
        <p className="text-xl text-muted-foreground">
          Discover and participate in exciting sports events and competitions across the country.
        </p>
      </section>

      {/* Featured Event Banner */}
      <Card className="glass border-glass-border/50 bg-gradient-secondary overflow-hidden">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Badge className="bg-primary/30 text-primary border-primary/50 mb-4">
                Featured Event
              </Badge>
              <h2 className="text-3xl font-bold mb-2">National Athletics Championship</h2>
              <p className="text-muted-foreground mb-4">
                Join the most prestigious athletics event in the country. Compete with the best athletes and showcase your talent.
              </p>
              <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  January 15, 2024
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  New Delhi
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  156 participants
                </div>
              </div>
              <Button className="btn-gradient px-8 py-3 rounded-xl">
                Register Now
              </Button>
            </div>
            <div className="hidden md:block">
              <Trophy className="w-32 h-32 text-primary/30 animate-float" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Target className="w-6 h-6 text-primary" />
          Upcoming Events
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className="glass border-glass-border/50 glass-hover">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{event.name}</CardTitle>
                    <CardDescription>{event.description}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(event.status)}>
                    {event.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{new Date(event.date).toLocaleDateString('en-IN', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                    <Clock className="w-4 h-4 text-primary ml-2" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-primary" />
                    <span>{event.participants} participants registered</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <h4 className="font-semibold text-sm">Prizes:</h4>
                  <div className="grid grid-cols-1 gap-1">
                    {event.prizes.map((prize, index) => (
                      <div key={index} className="text-xs bg-glass-border/10 rounded-lg px-3 py-2">
                        {prize}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    Register by: {new Date(event.registrationDeadline).toLocaleDateString('en-IN')}
                  </div>
                  <Button 
                    size="sm" 
                    className="btn-gradient rounded-lg"
                    disabled={event.status === 'Closed'}
                  >
                    {event.status === 'Closed' ? 'Registration Closed' : 'Join Event'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Past Events */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-primary" />
          Recent Completed Events
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pastEvents.map((event, index) => (
            <Card key={index} className="glass border-glass-border/50">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">{event.name}</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(event.date).toLocaleDateString('en-IN')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3 h-3" />
                    <span>{event.participants} participants</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-3 h-3 text-gamification-gold" />
                    <span className="text-gamification-gold font-medium">{event.winner}</span>
                  </div>
                </div>
                <Badge variant="outline" className="mt-3 text-xs">
                  {event.category}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <Card className="glass border-glass-border/50 bg-gradient-secondary">
        <CardContent className="p-8 text-center">
          <Calendar className="w-16 h-16 text-primary mx-auto mb-4 animate-float" />
          <h3 className="text-2xl font-bold mb-4">Want to Organize an Event?</h3>
          <p className="text-muted-foreground mb-6">
            Contact our events team to organize competitions in your region and help discover new talent.
          </p>
          <Button variant="outline" className="btn-gradient border-0">
            Contact Events Team
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}