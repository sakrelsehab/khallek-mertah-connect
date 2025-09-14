import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowRight } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="text-8xl mb-6">😔</div>
        <h1 className="mb-4 text-4xl font-bold text-foreground">404</h1>
        <h2 className="mb-4 text-xl text-muted-foreground">عذراً! الصفحة غير موجودة</h2>
        <p className="mb-8 text-muted-foreground">
          لم نتمكن من العثور على الصفحة التي تبحث عنها. ربما تم حذفها أو نقلها.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button variant="hero" className="w-full sm:w-auto">
              <Home className="ml-2" size={20} />
              العودة للرئيسية
            </Button>
          </Link>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowRight className="ml-2" size={20} />
            الصفحة السابقة
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
