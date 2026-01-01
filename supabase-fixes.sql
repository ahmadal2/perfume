-- ============================================
-- ADDITIONAL FIXES FOR KHAMRAH E-COMMERCE
-- Run this AFTER running your main SQL script
-- ============================================

-- ============================================
-- STEP 1: CREATE MISSING ANALYTICS TABLES
-- ============================================

-- Create site_visits table (currently causing 404 errors)
CREATE TABLE IF NOT EXISTS public.site_visits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  visitor_id TEXT,
  page_url TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  ip_address TEXT,
  country TEXT,
  city TEXT,
  device_type TEXT,
  browser TEXT,
  os TEXT,
  visited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  session_duration INTEGER DEFAULT 0
);

-- Create analytics_sessions table (currently causing 404 errors)
CREATE TABLE IF NOT EXISTS public.analytics_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT UNIQUE NOT NULL,
  visitor_id TEXT,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ended_at TIMESTAMP WITH TIME ZONE,
  page_views INTEGER DEFAULT 0,
  total_duration INTEGER DEFAULT 0,
  device_type TEXT,
  browser TEXT,
  os TEXT,
  country TEXT,
  city TEXT,
  referrer TEXT,
  landing_page TEXT,
  exit_page TEXT
);

-- Create indexes for analytics tables
CREATE INDEX IF NOT EXISTS idx_site_visits_visited_at ON site_visits(visited_at DESC);
CREATE INDEX IF NOT EXISTS idx_site_visits_visitor_id ON site_visits(visitor_id);
CREATE INDEX IF NOT EXISTS idx_analytics_sessions_session_id ON analytics_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_sessions_user_id ON analytics_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_sessions_started_at ON analytics_sessions(started_at DESC);

-- Enable RLS on analytics tables
ALTER TABLE public.site_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for analytics tables
CREATE POLICY "Anyone can insert site visits" ON public.site_visits 
FOR INSERT WITH CHECK (true);

CREATE POLICY "Only admins can view site visits" ON public.site_visits 
FOR SELECT USING (is_admin_or_owner());

CREATE POLICY "Anyone can insert analytics sessions" ON public.analytics_sessions 
FOR INSERT WITH CHECK (true);

CREATE POLICY "Only admins can view analytics sessions" ON public.analytics_sessions 
FOR SELECT USING (is_admin_or_owner());

-- ============================================
-- STEP 2: CREATE TEST ADMIN USER
-- ============================================

-- Note: You need to create the user in Supabase Auth first!
-- Go to: Supabase Dashboard > Authentication > Users > Add User
-- Email: admin@khamrah.com
-- Password: Admin123!@#
-- Then run this to add them to the users table:

-- Insert admin user into users table (replace the UUID with the actual auth.users id)
-- You can find the UUID in Supabase Dashboard > Authentication > Users
INSERT INTO public.users (id, email, full_name, role, is_active)
VALUES (
  'REPLACE_WITH_ACTUAL_AUTH_USER_ID', -- Get this from Supabase Auth Dashboard
  'admin@khamrah.com',
  'Admin User',
  'admin',
  true
)
ON CONFLICT (id) DO UPDATE SET
  role = 'admin',
  is_active = true;

-- ============================================
-- STEP 3: CREATE TEST CUSTOMER USER
-- ============================================

-- Note: You need to create the user in Supabase Auth first!
-- Go to: Supabase Dashboard > Authentication > Users > Add User
-- Email: test@khamrah.com
-- Password: Test123!@#
-- Then run this to add them to the users table:

INSERT INTO public.users (id, email, full_name, role, is_active)
VALUES (
  'REPLACE_WITH_ACTUAL_AUTH_USER_ID', -- Get this from Supabase Auth Dashboard
  'test@khamrah.com',
  'Test Customer',
  'customer',
  true
)
ON CONFLICT (id) DO UPDATE SET
  is_active = true;

-- ============================================
-- STEP 4: GRANT PERMISSIONS FOR ANALYTICS
-- ============================================

GRANT SELECT, INSERT ON public.site_visits TO anon;
GRANT SELECT, INSERT ON public.site_visits TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_visits TO authenticated;

GRANT SELECT, INSERT ON public.analytics_sessions TO anon;
GRANT SELECT, INSERT ON public.analytics_sessions TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.analytics_sessions TO authenticated;

-- ============================================
-- VERIFICATION
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '✅ ============================================';
  RAISE NOTICE '✅ ADDITIONAL FIXES COMPLETED!';
  RAISE NOTICE '✅ ============================================';
  RAISE NOTICE '';
  RAISE NOTICE '✅ site_visits table created';
  RAISE NOTICE '✅ analytics_sessions table created';
  RAISE NOTICE '✅ Analytics policies created';
  RAISE NOTICE '';
  RAISE NOTICE '⚠️  IMPORTANT: You must create users in Supabase Auth Dashboard first!';
  RAISE NOTICE '⚠️  Then update the user INSERT statements with actual auth.users IDs';
  RAISE NOTICE '';
  RAISE NOTICE '📝 Recommended test credentials:';
  RAISE NOTICE '   Admin: admin@khamrah.com / Admin123!@#';
  RAISE NOTICE '   Customer: test@khamrah.com / Test123!@#';
END $$;
