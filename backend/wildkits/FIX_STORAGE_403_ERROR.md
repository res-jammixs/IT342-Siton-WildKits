# Fix Supabase Storage Upload Error (403 Unauthorized)

## Problem
The error "Failed to upload file: row violates row-level security policy" occurs because:
1. The backend is using the **anon** (public) key instead of **service_role** key
2. OR the storage bucket RLS policies are too restrictive

## Solution - Use Service Role Key (Recommended)

### Step 1: Get Your Service Role Key

1. Go to [Supabase Dashboard](https://app.supabase.com/project/qgofibwesdynvlnwnkgz/settings/api)
2. Navigate to **Settings** → **API**
3. Find the **service_role** key (NOT the anon/public key)
   - It will be a JWT token starting with `eyJhbGci...`
   - Look for the one labeled **service_role secret**
4. Copy it

### Step 2: Update Backend Configuration

**Option A: Environment Variable (Recommended for production)**

Set the environment variable before running the backend:

**Windows PowerShell:**
```powershell
$env:SUPABASE_SERVICE_ROLE_KEY="your_service_role_key_here"
```

**Windows CMD:**
```cmd
set SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**Linux/Mac:**
```bash
export SUPABASE_SERVICE_ROLE_KEY="your_service_role_key_here"
```

**Option B: Update application.yml (Quick testing only - DO NOT COMMIT)**

Edit `backend/wildkits/src/main/resources/application.yml`:

```yaml
supabase:
  url: https://qgofibwesdynvlnwnkgz.supabase.co
  api-key: ${SUPABASE_SERVICE_ROLE_KEY:your_service_role_key_here}
  storage-bucket: student-id-images
```

### Step 3: Create Storage Bucket

Run the SQL in Supabase SQL Editor:

```sql
-- Create the storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('student-id-images', 'student-id-images', false)
ON CONFLICT (id) DO NOTHING;
```

### Step 4: Restart Backend

Restart your Spring Boot application to pick up the new configuration.

---

## Alternative Solution - Update RLS Policies

If you want to keep using the anon key (not recommended for backend), run this SQL:

```sql
-- Allow anon key to upload (less secure)
CREATE POLICY "Allow anon uploads to student-id-images"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (
  bucket_id = 'student-id-images'
);

CREATE POLICY "Allow anon to read student-id-images"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (
  bucket_id = 'student-id-images'
);
```

⚠️ **Warning**: This is less secure as it allows anyone with the anon key to upload files.

---

## Verification

After applying the fix, test registration again. The upload should succeed and you'll see:
- File uploads to Supabase Storage
- URL stored in database: `https://qgofibwesdynvlnwnkgz.supabase.co/storage/v1/object/public/student-id-images/student_id_...`

## Security Notes

- **Service Role Key**: Full database access - keep it secret on the backend only!
- **Anon Key**: Limited access for frontend/public use
- Never commit service role keys to version control
- Use environment variables in production
