import { useState, useEffect } from 'react';
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Utensils, 
  Pill, 
  ShoppingCart, 
  Flower2, 
  Smartphone, 
  Shirt, 
  MapPin, 
  Search, 
  Star,
  Clock,
  Truck
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  is_active: boolean;
}

interface Store {
  id: string;
  category_id: string;
  name: string;
  description: string;
  image_url: string;
  phone: string;
  address: string;
  rating: number;
  delivery_fee: number;
  minimum_order: number;
  estimated_delivery_time: number;
  delivery_categories: {
    name: string;
    icon: string;
  };
}

const iconMap: { [key: string]: React.ReactNode } = {
  'utensils': <Utensils size={32} className="text-white" />,
  'pill': <Pill size={32} className="text-white" />,
  'shopping-cart': <ShoppingCart size={32} className="text-white" />,
  'flower': <Flower2 size={32} className="text-white" />,
  'smartphone': <Smartphone size={32} className="text-white" />,
  'shirt': <Shirt size={32} className="text-white" />,
};

const DeliveryServiceReal = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('delivery_categories')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (categoriesError) throw categoriesError;

      // Fetch stores
      const { data: storesData, error: storesError } = await supabase
        .from('stores')
        .select(`
          *,
          delivery_categories (
            name,
            icon
          )
        `)
        .eq('is_active', true)
        .order('rating', { ascending: false });

      if (storesError) throw storesError;

      setCategories(categoriesData || []);
      setStores(storesData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل البيانات",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredStores = stores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         store.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || store.category_id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR'
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 pt-24">
          <div className="text-center">جاري التحميل...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 hero-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">خدمات التوصيل</h1>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            اطلب ما تحتاجه من المطاعم والمحلات واحصل على توصيل سريع إلى باب منزلك
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Button variant="glass" size="lg" className="flex-1">
              <MapPin className="ml-2" size={20} />
              تحديد موقعك
            </Button>
            <Button variant="outline" size="lg" className="flex-1 border-white text-white hover:bg-white hover:text-primary">
              تصفح الخدمات
            </Button>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="ابحث عن متجر أو خدمة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 h-12"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">الفئات المتاحة</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Card 
                key={category.id}
                className={`p-6 text-center cursor-pointer transition-all duration-300 hover:shadow-glow hover:scale-105 ${
                  selectedCategory === category.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
                  {iconMap[category.icon] || <ShoppingCart size={32} className="text-white" />}
                </div>
                <h3 className="font-bold text-sm mb-2">{category.name}</h3>
                <p className="text-xs text-muted-foreground">{category.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stores Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">المتاجر المتاحة</h2>
            {selectedCategory && (
              <Button 
                variant="outline" 
                onClick={() => setSelectedCategory(null)}
              >
                مسح الفلتر
              </Button>
            )}
          </div>

          {filteredStores.length === 0 ? (
            <div className="text-center py-12">
              <Truck className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">لا توجد متاجر</h3>
              <p className="text-muted-foreground">
                {searchQuery || selectedCategory 
                  ? 'لا توجد متاجر تطابق معايير البحث' 
                  : 'لا توجد متاجر متاحة حالياً'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStores.map((store) => (
                <Card key={store.id} className="overflow-hidden hover:shadow-glow transition-all duration-300">
                  {store.image_url && (
                    <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${store.image_url})` }} />
                  )}
                  
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{store.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {store.delivery_categories?.name}
                        </p>
                      </div>
                      <Badge variant="secondary">
                        <Star className="ml-1 h-3 w-3 fill-current" />
                        {store.rating}/5
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {store.description}
                    </p>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {store.estimated_delivery_time} دقيقة
                      </div>
                      <div className="text-primary font-medium">
                        رسوم التوصيل: {formatPrice(store.delivery_fee)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {store.address || 'العنوان غير محدد'}
                      </div>
                      <div className="text-muted-foreground">
                        حد أدنى: {formatPrice(store.minimum_order)}
                      </div>
                    </div>

                    <Button className="w-full" variant="hero">
                      اطلب الآن
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">كيف يعمل التطبيق</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="p-8 text-center card-gradient">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center">
                <Search size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">اختر الخدمة</h3>
              <p className="text-muted-foreground">
                تصفح الفئات المختلفة واختر المتجر أو المطعم المناسب لك
              </p>
            </Card>

            <Card className="p-8 text-center card-gradient">
              <div className="w-16 h-16 mx-auto mb-6 bg-secondary rounded-full flex items-center justify-center">
                <ShoppingCart size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">اطلب التوصيل</h3>
              <p className="text-muted-foreground">
                أضف المنتجات لسلة التسوق واختر عنوان التوصيل وأكمل الطلب
              </p>
            </Card>

            <Card className="p-8 text-center card-gradient">
              <div className="w-16 h-16 mx-auto mb-6 bg-accent rounded-full flex items-center justify-center">
                <Truck size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">استلم طلبك</h3>
              <p className="text-muted-foreground">
                تتبع حالة طلبك واستلمه من المندوب في الوقت المحدد
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">ابدأ الآن واحصل على خدماتك</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            انضم إلى آلاف المستخدمين واستمتع بخدمة توصيل سريعة وموثوقة
          </p>
          <Button variant="glass" size="lg">
            سجل الآن مجاناً
          </Button>
        </div>
      </section>
    </div>
  );
};

export default DeliveryServiceReal;