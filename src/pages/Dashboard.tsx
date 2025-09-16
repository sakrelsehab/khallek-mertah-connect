import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Header } from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  Store,
  Home,
  Car,
  Plus,
  Package,
  Eye,
  Edit,
  Trash2,
  ShoppingBag,
  TrendingUp
} from 'lucide-react';

interface UserData {
  stores: any[];
  properties: any[];
  vehicles: any[];
  orders: any[];
}

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData>({
    stores: [],
    properties: [],
    vehicles: [],
    orders: []
  });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchUserData();
  }, [user, navigate]);

  const fetchUserData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Fetch user's stores
      const { data: stores } = await supabase
        .from('stores')
        .select('*, delivery_categories(name)')
        .eq('owner_id', user.id);

      // Fetch user's properties
      const { data: properties } = await supabase
        .from('properties')
        .select('*')
        .eq('owner_id', user.id);

      // Fetch user's vehicles
      const { data: vehicles } = await supabase
        .from('vehicles')
        .select('*')
        .eq('owner_id', user.id);

      // Fetch user's orders
      const { data: orders } = await supabase
        .from('orders')
        .select('*, stores(name)')
        .eq('customer_id', user.id);

      setUserData({
        stores: stores || [],
        properties: properties || [],
        vehicles: vehicles || [],
        orders: orders || []
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل البيانات",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (table: 'stores' | 'properties' | 'vehicles', id: string, type: string) => {
    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "تم الحذف",
        description: `تم حذف ${type} بنجاح`,
      });

      fetchUserData();
    } catch (error) {
      console.error('Error deleting item:', error);
      toast({
        title: "خطأ",
        description: "فشل في حذف العنصر",
        variant: "destructive",
      });
    }
  };

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
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            لوحة التحكم
          </h1>
          <p className="text-muted-foreground">
            أدر محتواك وتابع إحصائياتك
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 card-gradient">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Store className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{userData.stores.length}</p>
                <p className="text-sm text-muted-foreground">متاجري</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 card-gradient">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-secondary/10 rounded-full">
                <Home className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{userData.properties.length}</p>
                <p className="text-sm text-muted-foreground">عقاراتي</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 card-gradient">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent/10 rounded-full">
                <Car className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{userData.vehicles.length}</p>
                <p className="text-sm text-muted-foreground">مركباتي</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 card-gradient">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{userData.orders.length}</p>
                <p className="text-sm text-muted-foreground">طلباتي</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="stores" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="stores">المتاجر</TabsTrigger>
            <TabsTrigger value="properties">العقارات</TabsTrigger>
            <TabsTrigger value="vehicles">المركبات</TabsTrigger>
            <TabsTrigger value="orders">الطلبات</TabsTrigger>
          </TabsList>

          {/* Stores Tab */}
          <TabsContent value="stores" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">متاجري</h2>
              <Button onClick={() => navigate('/dashboard/add-store')}>
                <Plus className="ml-2 h-4 w-4" />
                إضافة متجر
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userData.stores.map((store) => (
                <Card key={store.id} className="p-6 card-gradient">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{store.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {store.delivery_categories?.name}
                        </p>
                      </div>
                      <Badge variant={store.is_active ? "default" : "secondary"}>
                        {store.is_active ? 'نشط' : 'غير نشط'}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm">
                        <strong>العنوان:</strong> {store.address || 'غير محدد'}
                      </p>
                      <p className="text-sm">
                        <strong>الهاتف:</strong> {store.phone || 'غير محدد'}
                      </p>
                      <p className="text-sm">
                        <strong>التقييم:</strong> {store.rating}/5 ⭐
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="ml-2 h-4 w-4" />
                        عرض
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="ml-2 h-4 w-4" />
                        تعديل
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => deleteItem('stores', store.id, 'المتجر')}
                      >
                        <Trash2 className="ml-2 h-4 w-4" />
                        حذف
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {userData.stores.length === 0 && (
              <div className="text-center py-12">
                <Store className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">لا توجد متاجر</h3>
                <p className="text-muted-foreground mb-4">
                  ابدأ بإضافة أول متجر لك
                </p>
                <Button onClick={() => navigate('/dashboard/add-store')}>
                  <Plus className="ml-2 h-4 w-4" />
                  إضافة متجر جديد
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Properties Tab */}
          <TabsContent value="properties" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">عقاراتي</h2>
              <Button onClick={() => navigate('/dashboard/add-property')}>
                <Plus className="ml-2 h-4 w-4" />
                إضافة عقار
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userData.properties.map((property) => (
                <Card key={property.id} className="p-6 card-gradient">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{property.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {property.location}
                        </p>
                      </div>
                      <Badge variant={property.is_active ? "default" : "secondary"}>
                        {property.is_active ? 'نشط' : 'غير نشط'}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm">
                        <strong>النوع:</strong> {property.property_type === 'apartment' ? 'شقة' : 
                                                property.property_type === 'villa' ? 'فيلا' : 
                                                property.property_type === 'commercial' ? 'تجاري' : 'أرض'}
                      </p>
                      <p className="text-sm">
                        <strong>السعر:</strong> {formatPrice(property.price)}
                      </p>
                      <p className="text-sm">
                        <strong>المساحة:</strong> {property.area} م²
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="ml-2 h-4 w-4" />
                        عرض
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="ml-2 h-4 w-4" />
                        تعديل
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => deleteItem('properties', property.id, 'العقار')}
                      >
                        <Trash2 className="ml-2 h-4 w-4" />
                        حذف
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {userData.properties.length === 0 && (
              <div className="text-center py-12">
                <Home className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">لا توجد عقارات</h3>
                <p className="text-muted-foreground mb-4">
                  ابدأ بإضافة أول عقار لك
                </p>
                <Button onClick={() => navigate('/dashboard/add-property')}>
                  <Plus className="ml-2 h-4 w-4" />
                  إضافة عقار جديد
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Vehicles Tab */}
          <TabsContent value="vehicles" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">مركباتي</h2>
              <Button onClick={() => navigate('/dashboard/add-vehicle')}>
                <Plus className="ml-2 h-4 w-4" />
                إضافة مركبة
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userData.vehicles.map((vehicle) => (
                <Card key={vehicle.id} className="p-6 card-gradient">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{vehicle.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {vehicle.brand} {vehicle.model} - {vehicle.year}
                        </p>
                      </div>
                      <Badge variant={vehicle.is_active ? "default" : "secondary"}>
                        {vehicle.is_active ? 'نشط' : 'غير نشط'}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm">
                        <strong>النوع:</strong> {vehicle.vehicle_type === 'car' ? 'سيارة' : 
                                                vehicle.vehicle_type === 'motorcycle' ? 'دراجة نارية' : 
                                                vehicle.vehicle_type === 'truck' ? 'شاحنة' : 'معدات'}
                      </p>
                      <p className="text-sm">
                        <strong>السعر:</strong> {formatPrice(vehicle.price)}
                      </p>
                      <p className="text-sm">
                        <strong>المسافة:</strong> {vehicle.mileage?.toLocaleString()} كم
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="ml-2 h-4 w-4" />
                        عرض
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="ml-2 h-4 w-4" />
                        تعديل
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => deleteItem('vehicles', vehicle.id, 'المركبة')}
                      >
                        <Trash2 className="ml-2 h-4 w-4" />
                        حذف
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {userData.vehicles.length === 0 && (
              <div className="text-center py-12">
                <Car className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">لا توجد مركبات</h3>
                <p className="text-muted-foreground mb-4">
                  ابدأ بإضافة أول مركبة لك
                </p>
                <Button onClick={() => navigate('/dashboard/add-vehicle')}>
                  <Plus className="ml-2 h-4 w-4" />
                  إضافة مركبة جديدة
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <h2 className="text-xl font-bold">طلباتي</h2>

            <div className="space-y-4">
              {userData.orders.map((order) => (
                <Card key={order.id} className="p-6 card-gradient">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h3 className="font-bold">طلب من {order.stores?.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString('ar-SA')}
                      </p>
                      <p className="text-sm">
                        <strong>العنوان:</strong> {order.delivery_address}
                      </p>
                      <p className="text-sm">
                        <strong>المبلغ الإجمالي:</strong> {formatPrice(order.total_amount)}
                      </p>
                    </div>
                    <Badge variant={
                      order.status === 'delivered' ? 'default' :
                      order.status === 'cancelled' ? 'destructive' : 
                      'secondary'
                    }>
                      {order.status === 'pending' ? 'قيد الانتظار' :
                       order.status === 'confirmed' ? 'مؤكد' :
                       order.status === 'preparing' ? 'قيد التحضير' :
                       order.status === 'delivering' ? 'قيد التوصيل' :
                       order.status === 'delivered' ? 'تم التوصيل' : 'ملغي'}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>

            {userData.orders.length === 0 && (
              <div className="text-center py-12">
                <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">لا توجد طلبات</h3>
                <p className="text-muted-foreground mb-4">
                  لم تقم بأي طلبات بعد
                </p>
                <Button onClick={() => navigate('/delivery')}>
                  تصفح الخدمات
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;