-- Create storage buckets for images
INSERT INTO storage.buckets (id, name, public) VALUES 
('property-images', 'property-images', true),
('vehicle-images', 'vehicle-images', true),
('store-images', 'store-images', true),
('product-images', 'product-images', true),
('avatars', 'avatars', true);

-- Create storage policies for property images
CREATE POLICY "Property images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'property-images');

CREATE POLICY "Users can upload property images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'property-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their property images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'property-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can delete their property images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'property-images' AND auth.uid() IS NOT NULL);

-- Create storage policies for vehicle images
CREATE POLICY "Vehicle images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'vehicle-images');

CREATE POLICY "Users can upload vehicle images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'vehicle-images' AND auth.uid() IS NOT NULL);

-- Create storage policies for store images
CREATE POLICY "Store images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'store-images');

CREATE POLICY "Users can upload store images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'store-images' AND auth.uid() IS NOT NULL);

-- Create storage policies for product images
CREATE POLICY "Product images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'product-images');

CREATE POLICY "Users can upload product images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'product-images' AND auth.uid() IS NOT NULL);

-- Create storage policies for avatars
CREATE POLICY "Avatar images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'avatars' AND auth.uid() IS NOT NULL);