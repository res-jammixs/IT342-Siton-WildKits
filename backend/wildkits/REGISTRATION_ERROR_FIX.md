# WildKits Registration Error - Quick Fix Guide

## Problem: "Registration failed please try again error code"

This error occurs when the Supabase Storage configuration is missing or incorrect.

## Solution

### Option 1: Set Environment Variables (Recommended for Production)

Set the following environment variables in your system or IDE:

**Windows PowerShell:**
```powershell
$env:SUPABASE_URL="https://qgofibwesdynvlnwnkgz.supabase.co"
$env:SUPABASE_API_KEY="your_actual_supabase_anon_key"
```

**Windows Command Prompt:**
```cmd
set SUPABASE_URL=https://qgofibwesdynvlnwnkgz.supabase.co
set SUPABASE_API_KEY=your_actual_supabase_anon_key
```

**Linux/Mac:**
```bash
export SUPABASE_URL="https://qgofibwesdynvlnwnkgz.supabase.co"
export SUPABASE_API_KEY="your_actual_supabase_anon_key"
```

### Option 2: Update application.yml (Quick Testing)

Edit `backend/wildkits/src/main/resources/application.yml`:

```yaml
supabase:
  url: https://qgofibwesdynvlnwnkgz.supabase.co
  api-key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.YOUR_ACTUAL_KEY_HERE
  storage-bucket: student-id-images
```

## Where to Find Your Supabase API Key

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project: **qgofibwesdynvlnwnkgz**
3. Click **Settings** (gear icon) → **API**
4. Copy the **anon/public** key (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## Create the Storage Bucket

Before registration works, you must create the storage bucket:

1. Go to Supabase Dashboard → **Storage**
2. Click **Create a new bucket**
3. Name: `student-id-images`
4. Public: **No** (keep it private)
5. Click **Create bucket**

## Set Storage Permissions (RLS Policies)

Run this SQL in Supabase SQL Editor:

```sql
-- Allow authenticated users to upload
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'student-id-images');

-- Allow authenticated users to read
CREATE POLICY "Allow authenticated reads"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'student-id-images');
```

## Test the Fix

After configuration:

1. Restart your Spring Boot application
2. Try registering again with these test data:
   - Email: test@university.edu
   - Password: Test123!
   - Full Name: Test User
   - Student ID: 2024-TEST-001
   - Department: COMPUTER_SCIENCE (or "Computer Science")
   - Year Level: THIRD_YEAR (or "3rd Year")
   - Student ID Image: Upload a JPEG or PNG file (max 5MB)

## Expected Success Response

```json
{
  "user": {
    "id": "uuid-here",
    "email": "test@university.edu",
    "role": "USER",
    "status": "UNVERIFIED"
  },
  "token": "eyJhbGciOiJIUzUxMiJ9..."
}
```

## Common Error Messages

| Error Message | Solution |
|---------------|----------|
| "Supabase API key is not configured" | Set the SUPABASE_API_KEY environment variable or update application.yml |
| "Invalid file type" | Only JPEG and PNG images are allowed |
| "File size exceeds 5MB limit" | Reduce image file size to under 5MB |
| "Invalid department" | Use: COMPUTER_SCIENCE, INFORMATION_TECHNOLOGY, etc. |
| "Invalid year level" | Use: FIRST_YEAR, SECOND_YEAR, THIRD_YEAR, FOURTH_YEAR |
| "Failed to upload file: 404" | Storage bucket 'student-id-images' doesn't exist - create it in Supabase |
| "User with email ... already exists" | Email is already registered - use a different email |

## Still Not Working?

Check the application logs for detailed error messages:

```powershell
# Look for lines starting with "ERROR" or "Registration failed"
cd "c:\Users\ACER\Desktop\WildKits beta\WildKits\backend\wildkits"
.\mvnw spring-boot:run
```

The logs will show the exact error message that will help identify the issue.

## Valid Department Values

When registering, use one of these exact values (case-insensitive):
- `COMPUTER_SCIENCE` or "Computer Science"
- `INFORMATION_TECHNOLOGY` or "Information Technology"  
- `COMPUTER_ENGINEERING`, `ELECTRONICS_ENGINEERING`, `ELECTRICAL_ENGINEERING`
- `CIVIL_ENGINEERING`, `MECHANICAL_ENGINEERING`, `ARCHITECTURE`
- `BUSINESS_ADMINISTRATION`, `ACCOUNTANCY`, `NURSING`, `EDUCATION`
- `ARTS_AND_SCIENCES`, `HOSPITALITY_MANAGEMENT`, `TOURISM_MANAGEMENT`
- `OTHER`

## Valid Year Level Values

- `FIRST_YEAR` or "1st Year"
- `SECOND_YEAR` or "2nd Year"
- `THIRD_YEAR` or "3rd Year"
- `FOURTH_YEAR` or "4th Year"
- `FIFTH_YEAR` or "5th Year"
- `GRADUATE`

---

**After fixing the configuration, rebuild and restart:**

```powershell
cd "c:\Users\ACER\Desktop\WildKits beta\WildKits\backend\wildkits"
.\mvnw clean install
.\mvnw spring-boot:run
```
