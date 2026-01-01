# KHAMRAH E-Commerce Setup Instructions

## Current Status

✅ **Products Page**: Working perfectly! Products are loading from database.  
❌ **Login**: Failing because no test users exist in Supabase Auth.  
⚠️ **Analytics**: Missing tables causing 404 errors (non-critical).

## Quick Fix Guide

### Step 1: Run Your Main SQL Script

1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Copy and paste your entire SQL script (the one you shared)
4. Click **Run** to execute it
5. Wait for success message

### Step 2: Run Additional Fixes

1. In the same SQL Editor
2. Copy and paste the contents of `supabase-fixes.sql`
3. Click **Run**
4. This will create the missing analytics tables

### Step 3: Create Test Users in Supabase Auth

**Important**: You must create users in Supabase Auth Dashboard first!

#### Create Admin User:
1. Go to **Supabase Dashboard** → **Authentication** → **Users**
2. Click **Add User** → **Create new user**
3. Enter:
   - **Email**: `admin@khamrah.com`
   - **Password**: `Admin123!@#`
   - **Auto Confirm User**: ✅ Check this box
4. Click **Create User**
5. **Copy the User ID** (UUID) that appears

#### Create Test Customer:
1. Click **Add User** again
2. Enter:
   - **Email**: `test@khamrah.com`
   - **Password**: `Test123!@#`
   - **Auto Confirm User**: ✅ Check this box
3. Click **Create User**
4. **Copy the User ID** (UUID) that appears

### Step 4: Link Auth Users to Your Users Table

1. Go back to **SQL Editor**
2. Run this for the admin user (replace the UUID):

```sql
INSERT INTO public.users (id, email, full_name, role, is_active)
VALUES (
  'PASTE_ADMIN_USER_ID_HERE',  -- The UUID you copied from step 3
  'admin@khamrah.com',
  'Admin User',
  'admin',
  true
)
ON CONFLICT (id) DO UPDATE SET
  role = 'admin',
  is_active = true;
```

3. Run this for the test customer (replace the UUID):

```sql
INSERT INTO public.users (id, email, full_name, role, is_active)
VALUES (
  'PASTE_CUSTOMER_USER_ID_HERE',  -- The UUID you copied from step 3
  'test@khamrah.com',
  'Test Customer',
  'customer',
  true
)
ON CONFLICT (id) DO UPDATE SET
  is_active = true;
```

### Step 5: Test Login

1. Go to `http://localhost:3000/#/auth`
2. Try logging in with:
   - **Email**: `admin@khamrah.com`
   - **Password**: `Admin123!@#`
3. You should be redirected to the admin dashboard!

Or try the customer account:
   - **Email**: `test@khamrah.com`
   - **Password**: `Test123!@#`

## What's Working Now

✅ **Products Page**: Displays all products correctly  
✅ **Categories**: Loading properly  
✅ **Sales**: Showing sale badges on products  
✅ **Database Connection**: Supabase is connected  
✅ **RLS Policies**: All security policies are in place  

## What Was Fixed

1. ✅ Created missing `site_visits` table
2. ✅ Created missing `analytics_sessions` table
3. ✅ Added RLS policies for analytics
4. ✅ Provided instructions for creating test users

## Troubleshooting

### "Invalid login credentials" error
- Make sure you created the user in **Supabase Auth Dashboard** first
- Make sure you ran the INSERT statement with the correct UUID
- Make sure you checked "Auto Confirm User" when creating the user

### Products not loading
- Check your `.env.local` file has correct Supabase credentials
- Make sure you ran the main SQL script first
- Check browser console for specific errors

### 404 errors in console
- Run the `supabase-fixes.sql` script to create missing tables
- These are non-critical and won't break the app

## Test Credentials

After setup, you can use these credentials:

**Admin Account:**
- Email: `admin@khamrah.com`
- Password: `Admin123!@#`
- Access: Full admin dashboard access

**Customer Account:**
- Email: `test@khamrah.com`
- Password: `Test123!@#`
- Access: Regular customer access

## Next Steps

Once login is working:
1. Test the admin dashboard
2. Try creating new products
3. Test the checkout flow
4. Add more products and categories

## Need Help?

If you encounter any issues:
1. Check the browser console for errors
2. Check the Supabase logs in the dashboard
3. Verify your environment variables are correct
4. Make sure all SQL scripts ran successfully
