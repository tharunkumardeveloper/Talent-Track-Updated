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
    <div className="min-h-screen flex items-center justify-center p-4 md:p-6 bg-gradient-hero">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-6 md:mb-12">
          <h1 className="text-2xl md:text-5xl font-bold mb-2 md:mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Welcome to Talent Track
          </h1>
          <p className="text-base md:text-xl text-muted-foreground px-2">
            Choose your role to access the platform
          </p>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-3 gap-3 md:gap-6">
          {roles.map((role) => (
            <div
              key={role.id}
              className="glass glass-hover rounded-xl md:rounded-3xl p-4 md:p-8 border border-glass-border/50 text-center group cursor-pointer w-full"
              onClick={() => login(role.id)}
            >
              <div className={`w-14 h-14 md:w-20 md:h-20 mx-auto mb-3 md:mb-6 rounded-xl md:rounded-2xl ${role.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <role.icon className={`w-6 h-6 md:w-10 md:h-10 ${role.color}`} />
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">{role.title}</h3>
              <p className="text-muted-foreground mb-4 md:mb-8 leading-relaxed text-sm md:text-base">
                {role.description}
              </p>
              
              <Button 
                className="btn-gradient w-full py-3 md:py-3 rounded-lg md:rounded-xl text-base md:text-lg font-semibold group-hover:shadow-glow transition-all duration-300"
              >
                Continue as {role.title}
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-6 md:mt-12">
          <p className="text-sm md:text-sm text-muted-foreground px-2">
            Demo Mode - Choose any role to explore the platform
          </p>
        </div>
      </div>
    </div>
  );
}