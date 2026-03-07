# Database Schema Fix Guide

## Problem
You're getting `SQLGrammarException: could not execute statement` because your database schema doesn't match your JPA entities.

**Root Cause:** Your User entity uses `UUID` as the primary key, but your database likely still has `BIGINT/BIGSERIAL`, or is missing required columns like `student_id`, `department`, `year_level`, and `student_id_image_url`.

## Solution

### Step 1: Check Current Schema (Optional)
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project: **qgofibwesdynvlnwnkgz**
3. Go to **SQL Editor**
4. Copy and paste the contents of `check_schema.sql`
5. Run it to see your current schema

### Step 2: Fix the Schema

**⚠️ WARNING: This will DELETE all existing user data!**

1. In Supabase SQL Editor, copy and paste the contents of `FIX_SCHEMA.sql`
2. Click **Run** to execute the script
3. This will:
   - Drop all existing tables
   - Recreate them with the correct schema (UUID primary keys, all required columns)
   - Create proper foreign key relationships
   - Add performance indexes

### Step 3: Verify the Fix

After running the migration, try registering again:
- The registration should now work
- You'll be able to create new accounts
- Login should work after registration

### Step 4: Create Supabase Storage Bucket (Required for Image Upload)

If you want to enable student ID image uploads:

1. Go to **Supabase Dashboard > Storage**
2. Click **New Bucket**
3. Name: `student-id-images`
4. Set as **Private**
5. Click **Create Bucket**

## Alternative: If You Have Important Data

If you have existing users and don't want to lose them, you'll need to manually migrate the data:

1. Export existing user data first
2. Run the `FIX_SCHEMA.sql` script
3. Manually re-import users with UUID conversion

However, since this appears to be in development/testing, the cleanest solution is to drop and recreate.

## After the Fix

Once you've run `FIX_SCHEMA.sql`:

1. Restart your Spring Boot backend (if running)
2. Try registering a new user
3. Registration and login should work correctly

## Verification

Test with these credentials:
- **Name:** Test User
- **Email:** test@cit.edu
- **Student ID:** 21-1234-567
- **Department:** Information Technology
- **Year Level:** First Year
- **Password:** test123

If you still get errors after running the migration, check the Spring Boot console for new error messages.
