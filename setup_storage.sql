-- ============================================
-- STORAGE BUCKET SETUP
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Create the 'product-images' bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Enable RLS on objects (it should be on by default, but good to ensure)
-- Note: 'storage.objects' policies need to be set carefully.

-- POLICY: Give public read access to everyone
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'product-images' );

-- POLICY: Allow authenticated uploads (or restrict to admins)
-- For simplicity, we'll allow any authenticated user to upload to this bucket for now, 
-- or you can restrict it to specific roles if needed.
DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;
CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'product-images' );

-- POLICY: Allow owners to update/delete their own files (optional depending on use case)
DROP POLICY IF EXISTS "Owner Update" ON storage.objects;
CREATE POLICY "Owner Update"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'product-images' AND auth.uid() = owner );

DROP POLICY IF EXISTS "Owner Delete" ON storage.objects;
CREATE POLICY "Owner Delete"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'product-images' AND auth.uid() = owner );

-- VERIFICATION
SELECT * FROM storage.buckets WHERE id = 'product-images';
