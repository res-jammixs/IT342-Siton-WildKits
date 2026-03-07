# JWT Authentication with Student ID Upload - Setup Guide

## Overview
This guide walks you through setting up and testing the new JWT authentication system with student ID image upload functionality.

## 🎯 What's Been Implemented

### Backend Changes (Complete)
1. **JWT Authentication**
   - Token generation with 24-hour expiration
   - HS512 signing algorithm
   - User ID and email embedded in token claims

2. **Student ID Image Upload**
   - Supabase Storage integration via OkHttp
   - File validation (5MB max, JPEG/PNG only)
   - Secure URL generation

3. **New Endpoints**
   - `POST /auth/register` - Register with student ID image (multipart form data)
   - `POST /auth/login` - Login and receive JWT token
   - `PATCH /api/admin/verify/{userId}` - Admin verification endpoint

4. **Database Changes**
   - Added `student_id_image_url` column (VARCHAR 500)
   - Updated `account_status` enum values (UNVERIFIED, VERIFIED, REJECTED, SUSPENDED)

## 📋 Setup Steps

### Step 1: Run Database Migration

1. Open your Supabase SQL Editor
2. Run the migration script:
   ```bash
   c:\Users\ACER\Desktop\WildKits beta\WildKits\backend\wildkits\migration_auth_images.sql
   ```
3. Verify the column was added successfully

### Step 2: Create Supabase Storage Bucket

1. Go to your Supabase Dashboard → Storage
2. Click "Create a new bucket"
3. Configure the bucket:
   - **Name**: `student-id-images`
   - **Public**: ❌ No (private bucket)
   - **File size limit**: 5MB
   - **Allowed MIME types**: image/jpeg, image/png

4. Set Row Level Security (RLS) policies:
   ```sql
   -- Allow authenticated users to upload their own student ID images
   CREATE POLICY "Users can upload student ID images"
   ON storage.objects FOR INSERT
   TO authenticated
   WITH CHECK (bucket_id = 'student-id-images');

   -- Allow authenticated users to view their own images
   CREATE POLICY "Users can view student ID images"
   ON storage.objects FOR SELECT
   TO authenticated
   USING (bucket_id = 'student-id-images');

   -- Allow admins to view all student ID images
   CREATE POLICY "Admins can view all student ID images"
   ON storage.objects FOR SELECT
   TO authenticated
   USING (
     bucket_id = 'student-id-images' 
     AND auth.jwt() ->> 'role' = 'ADMIN'
   );
   ```

### Step 3: Configure Application Properties

Ensure your `application.yml` has the correct values:

```yaml
jwt:
  secret: your-secret-key-at-least-256-bits-long-for-hs512-algorithm
  expiration: 86400000  # 24 hours in milliseconds

supabase:
  url: https://your-project.supabase.co
  api-key: your-supabase-anon-key
  storage-bucket: student-id-images
```

**Important**: Replace `your-secret-key-at-least-256-bits-long-for-hs512-algorithm` with a secure secret (at least 32 characters).

### Step 4: Build and Run

```powershell
cd "c:\Users\ACER\Desktop\WildKits beta\WildKits\backend\wildkits"
.\mvnw clean install
.\mvnw spring-boot:run
```

## 🧪 Testing Guide

### Test 1: User Registration with Student ID Image

**Endpoint**: `POST http://localhost:8080/auth/register`

**Headers**:
```
Content-Type: multipart/form-data
```

**Body** (form-data):
| Key | Type | Value |
|-----|------|-------|
| email | text | john.doe@university.edu |
| password | text | SecurePassword123! |
| fullName | text | John Doe |
| studentId | text | 2024-00001 |
| department | text | Computer Science |
| yearLevel | text | 3rd Year |
| studentIdImage | file | [student_id.jpg] |

**Expected Response** (201 Created):
```json
{
  "userId": "123e4567-e89b-12d3-a456-426614174000",
  "email": "john.doe@university.edu",
  "name": "John Doe",
  "studentId": "2024-00001",
  "department": "Computer Science",
  "yearLevel": "3rd Year",
  "role": "STUDENT",
  "accountStatus": "UNVERIFIED",
  "studentIdImageUrl": "https://your-project.supabase.co/storage/v1/object/public/student-id-images/..."
}
```

**cURL Example**:
```bash
curl -X POST http://localhost:8080/auth/register \
  -F "email=john.doe@university.edu" \
  -F "password=SecurePassword123!" \
  -F "fullName=John Doe" \
  -F "studentId=2024-00001" \
  -F "department=Computer Science" \
  -F "yearLevel=3rd Year" \
  -F "studentIdImage=@/path/to/student_id.jpg"
```

### Test 2: User Login

**Endpoint**: `POST http://localhost:8080/auth/login`

**Headers**:
```
Content-Type: application/json
```

**Body**:
```json
{
  "email": "john.doe@university.edu",
  "password": "SecurePassword123!"
}
```

**Expected Response** (200 OK):
```json
{
  "user": {
    "userId": "123e4567-e89b-12d3-a456-426614174000",
    "email": "john.doe@university.edu",
    "name": "John Doe",
    "studentId": "2024-00001",
    "department": "Computer Science",
    "yearLevel": "3rd Year",
    "role": "STUDENT",
    "accountStatus": "UNVERIFIED",
    "studentIdImageUrl": "https://..."
  },
  "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDAiLCJlbWFpbCI6ImpvaG4uZG9lQHVuaXZlcnNpdHkuZWR1Iiwicm9sZSI6IlNUVURFTlQiLCJpYXQiOjE3MDkwMDAwMDAsImV4cCI6MTcwOTA4NjQwMH0..."
}
```

**cURL Example**:
```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@university.edu",
    "password": "SecurePassword123!"
  }'
```

### Test 3: Admin Verification

**Endpoint**: `PATCH http://localhost:8080/api/admin/verify/{userId}`

**Headers**:
```
Content-Type: application/json
Authorization: Bearer {admin-jwt-token}
```

**Body**:
```json
{
  "status": "VERIFIED"
}
```

**Expected Response** (200 OK):
```json
{
  "userId": "123e4567-e89b-12d3-a456-426614174000",
  "email": "john.doe@university.edu",
  "name": "John Doe",
  "studentId": "2024-00001",
  "department": "Computer Science",
  "yearLevel": "3rd Year",
  "role": "STUDENT",
  "accountStatus": "VERIFIED",
  "studentIdImageUrl": "https://..."
}
```

**cURL Example**:
```bash
curl -X PATCH http://localhost:8080/api/admin/verify/123e4567-e89b-12d3-a456-426614174000 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {admin-jwt-token}" \
  -d '{
    "status": "VERIFIED"
  }'
```

## 🔍 Validation Checklist

### File Upload Validation
- ✅ Only JPEG and PNG files accepted
- ✅ Maximum file size: 5MB
- ✅ Original filename preserved in storage
- ✅ Unique storage path per upload

### JWT Token Validation
- ✅ Token contains userId claim
- ✅ Token contains email claim
- ✅ Token contains role claim
- ✅ Token expires after 24 hours
- ✅ HS512 signature algorithm

### Account Status Flow
1. User registers → Status: UNVERIFIED
2. Admin verifies → Status: VERIFIED
3. Admin rejects → Status: REJECTED

## 🐛 Troubleshooting

### Issue: "File upload failed"
**Solution**: Check Supabase API key and bucket permissions

### Issue: "JWT secret too short"
**Solution**: Ensure JWT secret is at least 32 characters (256 bits)

### Issue: "Column student_id_image_url does not exist"
**Solution**: Run the migration script in Supabase SQL Editor

### Issue: "Bucket not found"
**Solution**: Create the `student-id-images` bucket in Supabase Storage

### Issue: "Token validation failed"
**Solution**: Verify JWT secret matches between token generation and validation

## 📊 Database Schema Changes

```sql
-- New column added to users table
ALTER TABLE users ADD COLUMN student_id_image_url VARCHAR(500);

-- AccountStatus enum values updated
-- Old: PENDING, APPROVED, REJECTED, SUSPENDED
-- New: UNVERIFIED, VERIFIED, REJECTED, SUSPENDED
```

## 🔐 Security Considerations

1. **JWT Secret**: Must be kept secret and should be at least 256 bits (32 characters)
2. **File Upload**: Only authenticated users can upload student ID images
3. **Storage Access**: Private bucket with RLS policies
4. **Password Hashing**: BCrypt with default strength (10 rounds)
5. **Token Expiration**: 24 hours (configurable)

## 📝 Next Steps (Optional Enhancements)

1. **Email Verification**: Send verification email on registration
2. **Password Reset**: Implement forgot password flow
3. **Refresh Tokens**: Add refresh token mechanism
4. **Rate Limiting**: Prevent brute force attacks
5. **Image Compression**: Reduce storage costs
6. **Audit Logging**: Track verification actions

## 🎓 API Documentation Summary

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/auth/register` | POST | ❌ No | Register with student ID image |
| `/auth/login` | POST | ❌ No | Login and get JWT token |
| `/api/admin/verify/{userId}` | PATCH | ✅ Admin | Verify/reject user account |

## ✅ Implementation Complete

All code changes have been implemented successfully:
- ✅ JWT token generation and validation
- ✅ Student ID image upload to Supabase Storage
- ✅ New authentication endpoints
- ✅ Admin verification endpoint
- ✅ Database migration script
- ✅ File validation and error handling
- ✅ Comprehensive logging

**Status**: Ready for testing! 🚀
