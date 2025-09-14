import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Package } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  buttonText: string;
  onClick: () => void;
  gradient?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  features,
  buttonText,
  onClick,
  gradient = false
}) => {
  return (
    <Card className={`relative p-6 border-0 shadow-card hover:shadow-glow transition-all duration-500 transform hover:scale-105 animate-fade-in ${gradient ? 'hero-gradient text-white' : 'card-gradient'}`}>
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-3 rounded-full ${gradient ? 'bg-white/20' : 'bg-primary/10'}`}>
          {icon}
        </div>
        <h3 className={`text-xl font-bold ${gradient ? 'text-white' : 'text-foreground'}`}>
          {title}
        </h3>
      </div>
      
      <p className={`mb-6 leading-relaxed ${gradient ? 'text-white/90' : 'text-muted-foreground'}`}>
        {description}
      </p>
      
      <div className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${gradient ? 'bg-white' : 'bg-primary'}`} />
            <span className={`text-sm ${gradient ? 'text-white/80' : 'text-muted-foreground'}`}>
              {feature}
            </span>
          </div>
        ))}
      </div>
      
      <Button 
        onClick={onClick}
        variant={gradient ? "glass" : "hero"}
        className="w-full group"
      >
        {buttonText}
        <ArrowLeft className="mr-2 group-hover:translate-x-1 transition-transform" size={16} />
      </Button>
    </Card>
  );
};