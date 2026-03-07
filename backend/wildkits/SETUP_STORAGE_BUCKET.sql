-- ============================================================================
-- Supabase Storage Setup for Student ID Images
-- Run this in Supabase SQL Editor to create the storage bucket
-- ============================================================================

-- Create the storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('student-id-images', 'student-id-images', false)
ON CONFLICT (id) DO NOTHING;

-- Verify the bucket was created
SELECT 
  id, 
  name, 
  public,
  created_at
FROM storage.buckets 
WHERE id = 'student-id-images';

-- Note: With service_role key, RLS policies are bypassed automatically
-- No additional policies needed!
