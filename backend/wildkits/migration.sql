-- Migration to add Student ID, Department, and Year Level columns to users table
-- Run this in Supabase SQL Editor

-- Step 1: Add new columns (nullable first if you have existing data)
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS student_id VARCHAR(20),
ADD COLUMN IF NOT EXISTS department VARCHAR(50),
ADD COLUMN IF NOT EXISTS year_level VARCHAR(20);

-- Step 2: For existing users, set default values (if any exist)
-- UPDATE users SET student_id = '00-0000-000', department = 'OTHER', year_level = 'FIRST_YEAR' WHERE student_id IS NULL;

-- Step 3: Add constraints after data is populated
-- Make columns NOT NULL
ALTER TABLE users ALTER COLUMN student_id SET NOT NULL;
ALTER TABLE users ALTER COLUMN department SET NOT NULL;
ALTER TABLE users ALTER COLUMN year_level SET NOT NULL;

-- Step 4: Add unique constraint on student_id
ALTER TABLE users ADD CONSTRAINT users_student_id_unique UNIQUE (student_id);

-- Verify the changes
SELECT column_name, data_type, character_maximum_length, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'users' 
ORDER BY ordinal_position;
