# WildKits

A student marketplace platform with secure authentication and student ID verification.

## 🏗️ Project Structure

```
WildKits/
├── backend/          # Spring Boot REST API
├── web/             # Next.js Frontend
└── README.md        # This file
```

## 🛠️ Tech Stack

### Backend
- **Framework:** Spring Boot 2.7.18
- **Language:** Java 11
- **Database:** PostgreSQL (Supabase)
- **Authentication:** JWT with HS512
- **Storage:** Supabase Storage
- **Security:** BCrypt password hashing

### Frontend
- **Framework:** Next.js 15.5.12
- **Language:** TypeScript
- **UI:** React, Tailwind CSS, Framer Motion
- **HTTP Client:** Axios

## 🚀 Getting Started

### Prerequisites
- Java 11+
- Node.js 18+
- PostgreSQL database (Supabase account)
- Maven

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend/wildkits
   ```

2. Configure `src/main/resources/application.yml`:
   ```yaml
   supabase:
     url: YOUR_SUPABASE_URL
     api-key: YOUR_SERVICE_ROLE_KEY
     storage-bucket: student-id-images
   
   jwt:
     secret: YOUR_JWT_SECRET_KEY_AT_LEAST_512_BITS
   ```

3. Run database migration (see `FIX_SCHEMA.sql`)

4. Start the backend:
   ```bash
   mvn spring-boot:run
   ```

Backend runs on `http://localhost:8080`

### Frontend Setup

1. Navigate to web directory:
   ```bash
   cd web
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   bun install
   ```

3. Start development server:
   ```bash
   npm run dev
   # or
   bun dev
   ```

Frontend runs on `http://localhost:3000`

## 🔐 Authentication System

### User Registration
- **Fields:** Full Name, Email, Password, Student ID, Department, Year Level, Student ID Image
- **Validation:** Email format, Student ID pattern (XX-XXXX-XXX), Image file type/size
- **Security:** BCrypt password hashing, duplicate email/student ID prevention
- **Image Upload:** Student ID images stored in Supabase Storage

### User Login
- **Credentials:** Email and Password
- **Process:** BCrypt password verification, JWT token generation (24h expiration)
- **Response:** JWT token + user details

## 📡 API Endpoints

### Authentication
```
POST /api/auth/register  - Register new user (multipart/form-data)
POST /api/auth/login     - Login user (returns JWT token)
```

### Users
```
GET    /api/users           - Get all users
GET    /api/users/{id}      - Get user by ID
PUT    /api/users/{id}      - Update user
DELETE /api/users/{id}      - Delete user
```

### Products (Protected)
```
GET    /api/products        - Get all products
POST   /api/products        - Create product
PUT    /api/products/{id}   - Update product
DELETE /api/products/{id}   - Delete product
```

### Admin
```
POST  /api/admin/login              - Admin login
PATCH /api/admin/verify/{userId}    - Verify user account
```

## 🗄️ Database Schema

**Main Tables:**
- `users` - User accounts with UUID primary keys
- `products` - Marketplace items
- `transactions` - Purchase/trade records
- `product_reports` - Content moderation
- `account_approvals` - Student verification workflow
- `admins` - Admin accounts

See `backend/wildkits/DATABASE_SCHEMA.md` for full schema details.

## 📚 Documentation

- [Integration Guide](INTEGRATION_GUIDE.md)
- [Database Schema](backend/wildkits/DATABASE_SCHEMA.md)
- [JWT Setup Guide](backend/wildkits/JWT_AUTH_SETUP_GUIDE.md)
- [API Testing Guide](backend/wildkits/API_TESTING_GUIDE.md)
- [Implementation Summary](backend/wildkits/IMPLEMENTATION_SUMMARY.md)

## 🔒 Security Notes

- Never commit `service_role` keys to version control
- Use environment variables for sensitive configuration
- JWT secret must be at least 512 bits for HS512 algorithm
- Student ID images stored in private Supabase bucket with RLS policies

## 👥 Default Accounts

**Super Admin:**
- Email: `superadmin@wildkits.com`
- Password: `SuperAdmin123?`

## 📝 License

This project is for educational purposes.
