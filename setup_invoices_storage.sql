-- ============================================
-- SETUP INVOICES STORAGE
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Create bucket if not exists
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'invoices', 
  'invoices', 
  true, 
  5242880, 
  ARRAY['application/pdf']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 2. RESET Policies for invoices
DROP POLICY IF EXISTS "Public Invoice Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Invoice Upload" ON storage.objects;

-- 3. Create Permissive Policies
-- Public Read (Anyone with the link can see the invoice)
CREATE POLICY "Public Invoice Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'invoices' );

-- Public Upload (Required for anonymous checkout users to store their generated invoice)
CREATE POLICY "Public Invoice Upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'invoices' );

-- 4. Verify
SELECT * FROM storage.buckets WHERE id = 'invoices';
