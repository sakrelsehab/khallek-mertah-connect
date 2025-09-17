import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header"; 
import { ServiceCard } from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Truck, Home, Users, Star, ArrowLeft, Phone, Mail, MapPin } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const stats = [
    { number: "10,000+", label: "مستخدم نشط" },
    { number: "500+", label: "متجر وخدمة" },
    { number: "50,000+", label: "عملية توصيل" },
    { number: "4.8⭐", label: "تقييم التطبيق" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 px-4 py-2 animate-fade-in">
              🎉 أهلاً بك في خليك مرتاح
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                خليك مرتاح
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed animate-fade-in">
              تطبيقك الشامل لخدمات التوصيل من المطاعم والمحلات، بالإضافة لعرض وشراء العقارات والسيارات بكل سهولة وأمان
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in">
              {user ? (
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="shadow-glow"
                  onClick={() => navigate('/dashboard')}
                >
                  <Users className="ml-2" size={20} />
                  لوحة التحكم
                </Button>
              ) : (
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="shadow-glow"
                  onClick={() => navigate('/auth')}
                >
                  <Users className="ml-2" size={20} />
                  تسجيل الدخول
                </Button>
              )}
              <Button variant="outline" size="lg">
                <Phone className="ml-2" size={20} />
                تواصل معنا
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">خدماتنا المميزة</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              نقدم لك خدمتين رئيسيتين تلبي احتياجاتك اليومية بكل احترافية
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <ServiceCard
              title="خدمات التوصيل"
              description="احصل على احتياجاتك من المطاعم والمحلات والصيدليات مع خدمة توصيل سريعة وموثوقة"
              icon={<Truck className="text-white" size={28} />}
              features={[
                "توصيل من المطاعم والمحلات",
                "خدمة على مدار الساعة", 
                "أسعار منافسة ومرونة في الدفع",
                "تتبع الطلب في الوقت الفعلي"
              ]}
              buttonText="استكشف خدمات التوصيل"
              onClick={() => navigate('/delivery')}
              gradient={true}
            />

            <ServiceCard
              title="العقارات والمبيعات"
              description="اعرض أو ابحث عن العقارات والسيارات والمعدات مع ضمان الأمان والشفافية في التعاملات"
              icon={<Home className="text-primary" size={28} />}
              features={[
                "عقارات للبيع والإيجار",
                "سيارات ومعدات متنوعة",
                "عمولة عادلة حسب الشريعة",
                "ضمان الأمان في التعاملات"
              ]}
              buttonText="تصفح العقارات والمبيعات"
              onClick={() => navigate('/real-estate')}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">لماذا خليك مرتاح؟</h2>
            <p className="text-xl text-muted-foreground">مميزات تجعلنا الخيار الأفضل لك</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Star className="text-accent" size={32} />,
                title: "جودة عالية",
                description: "نضمن لك أفضل مستوى من الخدمة والجودة في كل تعامل"
              },
              {
                icon: <Users className="text-primary" size={32} />,
                title: "مجتمع موثوق",
                description: "مجتمع من المستخدمين والتجار الموثوقين والمعتمدين"
              },
              {
                icon: <MapPin className="text-secondary" size={32} />,
                title: "تغطية واسعة",
                description: "خدماتنا تغطي معظم المناطق مع توسع مستمر"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl glass-effect hover:shadow-card transition-all duration-300">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl font-bold mb-6">ابدأ رحلتك معنا اليوم</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            انضم لآلاف المستخدمين السعداء واستمتع بخدمات متميزة وموثوقة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="glass" size="lg" className="shadow-glow">
              سجل الآن
              <ArrowLeft className="mr-2" size={20} />
            </Button>
            <Button variant="accent" size="lg" asChild>
              <a href="tel:+201044306309">
                اتصل بنا: 01044306309
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 hero-gradient rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">خ</span>
                </div>
                <span className="text-xl font-bold">خليك مرتاح</span>
              </div>
              <p className="text-muted-foreground mb-4">
                تطبيقك الشامل للخدمات اليومية والعقارات
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">الخدمات</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>خدمات التوصيل</li>
                <li>العقارات</li>
                <li>السيارات</li>
                <li>المعدات</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">الدعم</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>مركز المساعدة</li>
                <li>تواصل معنا</li>
                <li>الأسئلة الشائعة</li>
                <li>سياسة الخصوصية</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">تواصل معنا</h4>
              <div className="space-y-2 text-muted-foreground">
                <p>البريد: abdallahsakr198@gmail.com</p>
                <p>الهاتف: 01044306309</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>© 2024 خليك مرتاح. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;