-- Create delivery service categories
CREATE TABLE public.delivery_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create stores
CREATE TABLE public.stores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID NOT NULL REFERENCES public.delivery_categories(id),
  owner_id UUID NOT NULL REFERENCES auth.users(id),
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  phone TEXT,
  address TEXT,
  latitude DECIMAL,
  longitude DECIMAL,
  is_active BOOLEAN DEFAULT true,
  rating DECIMAL DEFAULT 0,
  delivery_fee DECIMAL DEFAULT 0,
  minimum_order DECIMAL DEFAULT 0,
  estimated_delivery_time INTEGER DEFAULT 30,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create products
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL NOT NULL,
  image_url TEXT,
  is_available BOOLEAN DEFAULT true,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create orders
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID NOT NULL REFERENCES auth.users(id),
  store_id UUID NOT NULL REFERENCES public.stores(id),
  total_amount DECIMAL NOT NULL,
  delivery_fee DECIMAL DEFAULT 0,
  status TEXT CHECK (status IN ('pending', 'confirmed', 'preparing', 'delivering', 'delivered', 'cancelled')) DEFAULT 'pending',
  delivery_address TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create order items
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  price DECIMAL NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create properties for real estate
CREATE TABLE public.properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID NOT NULL REFERENCES auth.users(id),
  title TEXT NOT NULL,
  description TEXT,
  property_type TEXT CHECK (property_type IN ('apartment', 'villa', 'commercial', 'land')) NOT NULL,
  transaction_type TEXT CHECK (transaction_type IN ('rent', 'sale')) NOT NULL,
  price DECIMAL NOT NULL,
  area DECIMAL,
  bedrooms INTEGER,
  bathrooms INTEGER,
  location TEXT NOT NULL,
  latitude DECIMAL,
  longitude DECIMAL,
  features TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create property images
CREATE TABLE public.property_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create vehicles
CREATE TABLE public.vehicles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID NOT NULL REFERENCES auth.users(id),
  title TEXT NOT NULL,
  description TEXT,
  vehicle_type TEXT CHECK (vehicle_type IN ('car', 'motorcycle', 'truck', 'equipment')) NOT NULL,
  brand TEXT,
  model TEXT,
  year INTEGER,
  price DECIMAL NOT NULL,
  mileage INTEGER,
  condition TEXT CHECK (condition IN ('new', 'used', 'excellent', 'good', 'fair')) DEFAULT 'used',
  location TEXT NOT NULL,
  features TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create vehicle images
CREATE TABLE public.vehicle_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  vehicle_id UUID NOT NULL REFERENCES public.vehicles(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.delivery_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicle_images ENABLE ROW LEVEL SECURITY;

-- Create policies for delivery_categories (public read)
CREATE POLICY "Categories are viewable by everyone" ON public.delivery_categories FOR SELECT USING (true);
CREATE POLICY "Only admins can modify categories" ON public.delivery_categories FOR ALL USING (false);

-- Create policies for stores
CREATE POLICY "Stores are viewable by everyone" ON public.stores FOR SELECT USING (is_active = true);
CREATE POLICY "Users can create their own stores" ON public.stores FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Users can update their own stores" ON public.stores FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Users can delete their own stores" ON public.stores FOR DELETE USING (auth.uid() = owner_id);

-- Create policies for products
CREATE POLICY "Products are viewable by everyone" ON public.products FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.stores WHERE stores.id = products.store_id AND stores.is_active = true)
);
CREATE POLICY "Store owners can manage their products" ON public.products FOR ALL USING (
  EXISTS (SELECT 1 FROM public.stores WHERE stores.id = products.store_id AND stores.owner_id = auth.uid())
);

-- Create policies for orders
CREATE POLICY "Users can view their own orders" ON public.orders FOR SELECT USING (
  customer_id = auth.uid() OR 
  EXISTS (SELECT 1 FROM public.stores WHERE stores.id = orders.store_id AND stores.owner_id = auth.uid())
);
CREATE POLICY "Users can create orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = customer_id);
CREATE POLICY "Store owners can update order status" ON public.orders FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.stores WHERE stores.id = orders.store_id AND stores.owner_id = auth.uid())
);

-- Create policies for order_items
CREATE POLICY "Users can view order items for their orders" ON public.order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND 
    (orders.customer_id = auth.uid() OR 
     EXISTS (SELECT 1 FROM public.stores WHERE stores.id = orders.store_id AND stores.owner_id = auth.uid())
    )
  )
);
CREATE POLICY "Users can create order items for their orders" ON public.order_items FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.customer_id = auth.uid())
);

-- Create policies for properties
CREATE POLICY "Properties are viewable by everyone" ON public.properties FOR SELECT USING (is_active = true);
CREATE POLICY "Users can create their own properties" ON public.properties FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Users can update their own properties" ON public.properties FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Users can delete their own properties" ON public.properties FOR DELETE USING (auth.uid() = owner_id);

-- Create policies for property_images
CREATE POLICY "Property images are viewable by everyone" ON public.property_images FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.properties WHERE properties.id = property_images.property_id AND properties.is_active = true)
);
CREATE POLICY "Property owners can manage their images" ON public.property_images FOR ALL USING (
  EXISTS (SELECT 1 FROM public.properties WHERE properties.id = property_images.property_id AND properties.owner_id = auth.uid())
);

-- Create policies for vehicles
CREATE POLICY "Vehicles are viewable by everyone" ON public.vehicles FOR SELECT USING (is_active = true);
CREATE POLICY "Users can create their own vehicles" ON public.vehicles FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Users can update their own vehicles" ON public.vehicles FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Users can delete their own vehicles" ON public.vehicles FOR DELETE USING (auth.uid() = owner_id);

-- Create policies for vehicle_images
CREATE POLICY "Vehicle images are viewable by everyone" ON public.vehicle_images FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.vehicles WHERE vehicles.id = vehicle_images.vehicle_id AND vehicles.is_active = true)
);
CREATE POLICY "Vehicle owners can manage their images" ON public.vehicle_images FOR ALL USING (
  EXISTS (SELECT 1 FROM public.vehicles WHERE vehicles.id = vehicle_images.vehicle_id AND vehicles.owner_id = auth.uid())
);

-- Add triggers for updated_at columns
CREATE TRIGGER update_stores_updated_at BEFORE UPDATE ON public.stores FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON public.properties FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_vehicles_updated_at BEFORE UPDATE ON public.vehicles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_delivery_categories_updated_at BEFORE UPDATE ON public.delivery_categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample delivery categories
INSERT INTO public.delivery_categories (name, icon, description) VALUES
('مطاعم', 'utensils', 'توصيل الطعام من أفضل المطاعم'),
('صيدليات', 'pill', 'أدوية ومستحضرات صحية'),
('بقالة', 'shopping-cart', 'مواد غذائية ومنتجات يومية'),
('زهور', 'flower', 'باقات ورود وهدايا'),
('إلكترونيات', 'smartphone', 'أجهزة إلكترونية ومعدات تقنية'),
('ملابس', 'shirt', 'أزياء وملابس عصرية');