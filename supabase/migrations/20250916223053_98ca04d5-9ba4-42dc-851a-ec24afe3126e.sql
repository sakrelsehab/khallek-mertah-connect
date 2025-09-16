-- Insert sample users for stores (this won't work in production, just for demo purposes we'll use sample UUIDs)
-- In a real scenario, users would register through the auth system

-- Insert sample stores
INSERT INTO public.stores (category_id, owner_id, name, description, image_url, phone, address, rating, delivery_fee, minimum_order, estimated_delivery_time) 
SELECT 
  dc.id as category_id,
  gen_random_uuid() as owner_id, -- Demo UUID, in reality this would be a real user ID
  store_data.name,
  store_data.description,
  store_data.image_url,
  store_data.phone,
  store_data.address,
  store_data.rating,
  store_data.delivery_fee,
  store_data.minimum_order,
  store_data.estimated_delivery_time
FROM public.delivery_categories dc
CROSS JOIN (
  VALUES 
    ('مطعم البيت العربي', 'أشهى الأطباق العربية التقليدية والشعبية', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400', '+966501234567', 'حي النخيل، الرياض', 4.5, 15.00, 50.00, 25),
    ('مطعم البرجر الذهبي', 'برجر طازج ووجبات سريعة لذيذة', 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400', '+966501234568', 'حي الملك فهد، الرياض', 4.2, 12.00, 30.00, 20),
    ('مطعم المأكولات البحرية', 'أطباق بحرية طازجة ولذيذة', 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400', '+966501234569', 'حي الملز، الرياض', 4.7, 20.00, 80.00, 35)
  ) AS store_data(name, description, image_url, phone, address, rating, delivery_fee, minimum_order, estimated_delivery_time)
WHERE dc.name = 'مطاعم';

-- Insert stores for pharmacies
INSERT INTO public.stores (category_id, owner_id, name, description, image_url, phone, address, rating, delivery_fee, minimum_order, estimated_delivery_time) 
SELECT 
  dc.id as category_id,
  gen_random_uuid() as owner_id,
  store_data.name,
  store_data.description,
  store_data.image_url,
  store_data.phone,
  store_data.address,
  store_data.rating,
  store_data.delivery_fee,
  store_data.minimum_order,
  store_data.estimated_delivery_time
FROM public.delivery_categories dc
CROSS JOIN (
  VALUES 
    ('صيدلية النهدي', 'أدوية ومستحضرات طبية وتجميلية', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400', '+966501234570', 'حي السليمانية، الرياض', 4.3, 10.00, 25.00, 15),
    ('صيدلية الدواء', 'خدمات صيدلانية متكاملة على مدار الساعة', 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400', '+966501234571', 'حي المروج، الرياض', 4.4, 8.00, 20.00, 12)
  ) AS store_data(name, description, image_url, phone, address, rating, delivery_fee, minimum_order, estimated_delivery_time)
WHERE dc.name = 'صيدليات';

-- Insert stores for groceries
INSERT INTO public.stores (category_id, owner_id, name, description, image_url, phone, address, rating, delivery_fee, minimum_order, estimated_delivery_time) 
SELECT 
  dc.id as category_id,
  gen_random_uuid() as owner_id,
  store_data.name,
  store_data.description,
  store_data.image_url,
  store_data.phone,
  store_data.address,
  store_data.rating,
  store_data.delivery_fee,
  store_data.minimum_order,
  store_data.estimated_delivery_time
FROM public.delivery_categories dc
CROSS JOIN (
  VALUES 
    ('بقالة الخير', 'مواد غذائية طازجة ومنتجات منزلية', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', '+966501234572', 'حي الوادي، الرياض', 4.1, 12.00, 40.00, 30),
    ('سوبر ماركت الأسرة', 'تشكيلة واسعة من المنتجات بأسعار مناسبة', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400', '+966501234573', 'حي البديعة، الرياض', 4.6, 15.00, 60.00, 25)
  ) AS store_data(name, description, image_url, phone, address, rating, delivery_fee, minimum_order, estimated_delivery_time)
WHERE dc.name = 'بقالة';

-- Insert sample properties
INSERT INTO public.properties (owner_id, title, description, property_type, transaction_type, price, area, bedrooms, bathrooms, location, features)
VALUES 
(gen_random_uuid(), 'شقة فاخرة في حي الملك فهد', 'شقة مفروشة بالكامل مع إطلالة رائعة وموقع مميز', 'apartment', 'rent', 3500.00, 120, 3, 2, 'حي الملك فهد، الرياض', ARRAY['مفروشة', 'موقف سيارة', 'حديقة', 'أمن وحراسة']),
(gen_random_uuid(), 'فيلا عصرية للبيع', 'فيلا حديثة التصميم في حي راقي مع جميع الخدمات', 'villa', 'sale', 1200000.00, 400, 5, 4, 'حي النرجس، الرياض', ARRAY['مسبح خاص', 'حديقة واسعة', 'غرفة خادمة', 'مجلس رجال']),
(gen_random_uuid(), 'شقة استثمارية مميزة', 'شقة في موقع حيوي مناسبة للاستثمار أو السكن', 'apartment', 'sale', 450000.00, 95, 2, 2, 'حي السليمانية، الرياض', ARRAY['قريبة من المترو', 'إطلالة جميلة', 'موقف سيارة']);

-- Insert sample vehicles  
INSERT INTO public.vehicles (owner_id, title, description, vehicle_type, brand, model, year, price, mileage, condition, location, features)
VALUES 
(gen_random_uuid(), 'تويوتا كامري 2023 فل كامل', 'سيارة جديدة لم تستخدم، بحالة ممتازة مع ضمان الوكالة', 'car', 'تويوتا', 'كامري', 2023, 95000.00, 0, 'new', 'الرياض', ARRAY['نظام ملاحة', 'كاميرا خلفية', 'تحكم مثبت', 'مقاعد جلد']),
(gen_random_uuid(), 'نيسان التيما 2020 نظيفة', 'سيارة مستعملة بحالة ممتازة، صيانة منتظمة', 'car', 'نيسان', 'التيما', 2020, 65000.00, 45000, 'excellent', 'الرياض', ARRAY['فتحة سقف', 'شاشة تاتش', 'حساسات ركن', 'مثبت سرعة']),
(gen_random_uuid(), 'هوندا أكورد 2019 للبيع', 'سيارة اقتصادية وموثوقة، مناسبة للاستخدام اليومي', 'car', 'هوندا', 'أكورد', 2019, 58000.00, 78000, 'good', 'الرياض', ARRAY['توفير وقود', 'صيانة قليلة', 'مساحة واسعة']);