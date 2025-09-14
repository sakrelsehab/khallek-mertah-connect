import { Button } from "@/components/ui/button";
import { Menu, User, Bell } from "lucide-react";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-border/50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon">
            <Menu size={24} />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 hero-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">خ</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              خليك مرتاح
            </h1>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell size={20} />
          </Button>
          <Button variant="ghost" size="icon">
            <User size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
};