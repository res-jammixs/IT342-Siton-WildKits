-- Migration script to add student_id_image_url column to users table
-- This script is idempotent and can be run multiple times safely

-- Add student_id_image_url column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'users' 
        AND column_name = 'student_id_image_url'
    ) THEN
        ALTER TABLE users 
        ADD COLUMN student_id_image_url VARCHAR(500);
        
        RAISE NOTICE 'Column student_id_image_url added to users table';
    ELSE
        RAISE NOTICE 'Column student_id_image_url already exists in users table';
    END IF;
END $$;

-- Optional: Add comment to the column
COMMENT ON COLUMN users.student_id_image_url IS 'URL to student ID image stored in Supabase Storage';

-- Verify the migration
SELECT column_name, data_type, character_maximum_length 
FROM information_schema.columns 
WHERE table_name = 'users' 
AND column_name = 'student_id_image_url';
