import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Home, Car, Building, Users, Search, Filter } from "lucide-react";

const RealEstate = () => {
  const categories = [
    { name: "شقق للإيجار", icon: <Home className="text-primary" size={24} />, count: 250 },
    { name: "فلل للبيع", icon: <Building className="text-secondary" size={24} />, count: 120 },
    { name: "سيارات", icon: <Car className="text-accent" size={24} />, count: 180 },
    { name: "معدات", icon: <Users className="text-primary" size={24} />, count: 95 },
  ];

  const featuredListings = [
    {
      id: 1,
      title: "شقة مفروشة 3 غرف",
      location: "حي الملك فهد",
      price: "2,500 ريال/شهر",
      type: "إيجار",
      image: "🏠",
      features: ["3 غرف", "مفروشة", "موقف سيارة"]
    },
    {
      id: 2,
      title: "فيلا للبيع",
      location: "حي النرجس",
      price: "850,000 ريال",
      type: "بيع",
      image: "🏘️",
      features: ["5 غرف", "حديقة", "مسبح"]
    },
    {
      id: 3,
      title: "تويوتا كامري 2020",
      location: "الرياض",
      price: "65,000 ريال",
      type: "بيع",
      image: "🚗",
      features: ["أوتوماتيك", "فل أوبشن", "صيانة دورية"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 secondary-gradient opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              العقارات والمبيعات
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
              اعرض أو ابحث عن العقارات والسيارات والمعدات بكل سهولة وأمان
            </p>
            
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto animate-fade-in">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <input 
                  type="text" 
                  placeholder="ابحث عن عقار، سيارة أو معدات..."
                  className="w-full pr-12 pl-4 py-4 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <Button variant="hero" size="lg">
                <Filter className="ml-2" size={20} />
                بحث
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">تصفح حسب الفئة</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-card transition-all duration-300 cursor-pointer group">
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                <Badge variant="secondary" className="text-xs">
                  {category.count} إعلان
                </Badge>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">الإعلانات المميزة</h2>
            <Button variant="outline">
              عرض الكل
              <ArrowRight className="mr-2" size={16} />
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredListings.map((listing) => (
              <Card key={listing.id} className="overflow-hidden hover:shadow-card transition-all duration-300 cursor-pointer group">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-6xl">
                  {listing.image}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {listing.title}
                    </h3>
                    <Badge variant={listing.type === "بيع" ? "default" : "secondary"}>
                      {listing.type}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground mb-3 flex items-center">
                    <Building className="ml-1" size={16} />
                    {listing.location}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {listing.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-primary">
                      {listing.price}
                    </span>
                    <Button variant="ghost" size="sm">
                      تفاصيل أكثر
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How to Sell/Rent */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">كيف تعرض إعلانك؟</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              عملية بسيطة وسريعة لعرض عقارك أو سيارتك للبيع أو الإيجار
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "أضف التفاصيل",
                description: "ارفع الصور واكتب وصف مفصل",
                icon: <Home className="text-primary" size={32} />
              },
              {
                step: "2",
                title: "حدد السعر",
                description: "اختر السعر المناسب ونوع العرض",
                icon: <Building className="text-secondary" size={32} />
              },
              {
                step: "3",
                title: "انشر الإعلان",
                description: "ابدأ استقبال العروض والاستفسارات",
                icon: <Users className="text-accent" size={32} />
              }
            ].map((item, index) => (
              <Card key={index} className="p-8 text-center">
                <div className="secondary-gradient w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
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
      <section className="py-16 hero-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">اعرض إعلانك الآن</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            انضم لآلاف البائعين والمشترين واحصل على أفضل العروض
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="glass" size="lg" className="shadow-glow">
              أعرض للبيع
            </Button>
            <Button variant="accent" size="lg">
              أعرض للإيجار
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RealEstate;