import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, MapPin, Clock, Star, Truck } from "lucide-react";

const DeliveryService = () => {
  const categories = [
    { name: "مطاعم", icon: "🍕", count: 150 },
    { name: "صيدليات", icon: "💊", count: 85 },
    { name: "بقالة", icon: "🛒", count: 120 },
    { name: "محلات", icon: "🏪", count: 200 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              خدمات التوصيل
            </h1>
            <p className="text-xl opacity-90 mb-8 animate-fade-in">
              اطلب ما تحتاجه من المطاعم والمحلات القريبة منك واتركنا نوصله إليك
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Button variant="glass" size="lg" className="shadow-glow">
                <MapPin className="ml-2" size={20} />
                تحديد موقعك
              </Button>
              <Button variant="accent" size="lg">
                تصفح الخدمات
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">الخدمات المتاحة</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-card transition-all duration-300 cursor-pointer group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} متجر</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">كيف يعمل التطبيق؟</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "اختر الخدمة",
                description: "حدد نوع الخدمة المطلوبة وموقعك",
                icon: <MapPin className="text-primary" size={32} />
              },
              {
                step: "2", 
                title: "اطلب التوصيل",
                description: "تواصل مع مقدم الخدمة واتفق على السعر",
                icon: <Clock className="text-secondary" size={32} />
              },
              {
                step: "3",
                title: "استلم طلبك",
                description: "احصل على طلبك في الوقت المحدد",
                icon: <Truck className="text-accent" size={32} />
              }
            ].map((item, index) => (
              <Card key={index} className="p-8 text-center relative">
                <div className="hero-gradient w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {item.step}
                </div>
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">ابدأ الآن واحصل على خدماتك</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            انضم لآلاف المستخدمين الذين يستخدمون خليك مرتاح للحصول على خدماتهم اليومية
          </p>
          <Button variant="hero" size="lg" className="shadow-glow">
            سجل الآن مجاناً
            <ArrowRight className="mr-2" size={20} />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default DeliveryService;