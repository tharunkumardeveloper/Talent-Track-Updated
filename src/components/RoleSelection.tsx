import { GraduationCap, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRole } from "@/contexts/RoleContext";

export function RoleSelection() {
  const { login } = useRole();

  const roles = [
    {
      id: 'student' as const,
      title: 'Student',
      description: 'Access assessments, challenges, and track your athletic progress',
      icon: GraduationCap,
      color: 'text-primary',
      bgColor: 'bg-primary/20'
    },
    {
      id: 'staff' as const,
      title: 'Staff',
      description: 'Manage students, review assessments, and organize events',
      icon: Users,
      color: 'text-accent',
      bgColor: 'bg-accent/20'
    },
    {
      id: 'admin' as const,
      title: 'Admin (SAI)',
      description: 'System administration, analytics, and sports authority oversight',
      icon: Shield,
      color: 'text-success',
      bgColor: 'bg-success/20'
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-hero">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Welcome to Talent Track
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose your role to access the platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((role) => (
            <div
              key={role.id}
              className="glass glass-hover rounded-3xl p-8 border border-glass-border/50 text-center group cursor-pointer"
              onClick={() => login(role.id)}
            >
              <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl ${role.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <role.icon className={`w-10 h-10 ${role.color}`} />
              </div>
              
              <h3 className="text-2xl font-bold mb-4">{role.title}</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {role.description}
              </p>
              
              <Button 
                className="btn-gradient w-full py-3 rounded-xl text-lg font-semibold group-hover:shadow-glow transition-all duration-300"
              >
                Continue as {role.title}
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            Demo Mode - Choose any role to explore the platform
          </p>
        </div>
      </div>
    </div>
  );
}