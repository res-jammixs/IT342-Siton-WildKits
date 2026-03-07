# WildKits Frontend-Backend Integration

## ✅ Integration Complete!

The WildKits web frontend has been successfully connected to the backend API. The application now has full authentication functionality and is ready for use.

## 🎯 What Was Implemented

### 1. **API Service Layer** (`web/src/lib/api.ts`)
- Configured axios HTTP client with base URL: `http://localhost:8080/api`
- Implemented authentication API (login, register, logout)
- Implemented products API (CRUD operations)
- Implemented users API
- Added request/response interceptors for:
  - Automatic token attachment to requests
  - Automatic redirect on 401 (Unauthorized)
  - Error handling

### 2. **Authentication System**
- Created AuthContext for global authentication state
- Created useAuth hook for easy access to auth functions
- Implemented user session persistence using localStorage
- Added authentication protection for routes

### 3. **Updated Pages**

#### **Login Page** (`web/src/pages/Login.tsx`)
- Connected to backend `/api/users/login` endpoint
- Form validation and error handling
- Auto-redirect if already authenticated
- Real-time feedback with toasts

#### **Register Page** (`web/src/pages/Register.tsx`)
- Connected to backend `/api/users/register` endpoint
- Multi-step registration form
- Password confirmation validation
- Account status handling (PENDING, APPROVED)

#### **Dashboard Page** (`web/src/pages/Dashboard.tsx`)
- Route protection (requires authentication)
- Displays user information
- Shows account status (Pending/Approved)
- Personalized welcome message

#### **Navbar Component** (`web/src/components/Navbar.tsx`)
- Conditional rendering based on auth status
- User dropdown menu with profile & logout
- Shows user name and email in dropdown
- Login/Signup buttons for unauthenticated users

### 4. **Environment Configuration**
- Created `.env` and `.env.example` files
- Configured `VITE_API_URL=http://localhost:8080/api`

## 🚀 How to Run

### Start the Backend (Port 8080)
```bash
cd backend/wildkits
./mvnw spring-boot:run
# Or on Windows:
mvnw.cmd spring-boot:run
```

### Start the Frontend (Port 8081)
```bash
cd web
npm run dev
```

The frontend will automatically open at `http://localhost:8081/`
(Port 8081 is used because 8080 is taken by the backend)

## 📋 API Endpoints Used

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user

### Users
- `GET /api/users/{id}` - Get user by ID
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create product
- `GET /api/products/search` - Search products
- `GET /api/products/user/{userId}` - Get user's products

## 🔐 Authentication Flow

1. **Registration**:
   - User fills registration form
   - Data sent to `/api/users/register`
   - Backend creates user with `PENDING` status
   - User data stored in localStorage
   - User redirected to dashboard

2. **Login**:
   - User enters email and password
   - Credentials sent to `/api/users/login`
   - Backend validates and returns user data
   - User data stored in localStorage
   - User redirected to dashboard

3. **Protected Routes**:
   - Dashboard checks authentication status
   - If not authenticated, redirects to login
   - User data loaded from localStorage on page refresh

4. **Logout**:
   - Clears user data from localStorage
   - Redirects to login page

## 📦 User Data Structure

```typescript
interface UserResponse {
  userId: number;
  name: string;
  email: string;
  accountStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
}
```

## 🎨 Key Features

- ✅ Persistent user sessions (survives page refresh)
- ✅ Automatic token management
- ✅ Route protection
- ✅ Error handling with user-friendly toasts
- ✅ Account status display
- ✅ Responsive design
- ✅ Loading states
- ✅ Form validation

## 🔧 Configuration Files

- `.env` - Environment variables (not committed to git)
- `.env.example` - Example environment variables
- `src/lib/api.ts` - API client configuration
- `src/contexts/AuthContext.tsx` - Authentication provider
- `src/hooks/useAuth.tsx` - Authentication hook

## 📝 Testing the Integration

### Test User Registration
1. Go to `http://localhost:8081/register`
2. Fill in the registration form:
   - First Name: Juan
   - Last Name: Dela Cruz
   - Email: juan.delacruz@cit.edu
   - Password: password123
3. Click "Create Account"
4. You should be redirected to the dashboard
5. Check the backend console to see the registration log

### Test User Login
1. Go to `http://localhost:8081/login`
2. Enter credentials used during registration
3. Click "Sign In"
4. You should be redirected to the dashboard
5. Your name should appear in the navbar dropdown

### Test Protected Routes
1. Logout using the dropdown menu
2. Try to access `http://localhost:8081/dashboard` directly
3. You should be redirected to login page

## 🐛 Troubleshooting

### Frontend can't connect to backend
- Ensure backend is running on port 8080
- Check `.env` file has correct `VITE_API_URL`
- Check browser console for CORS errors
- Verify backend CORS configuration allows requests from frontend

### Login/Registration not working
- Check backend console for error messages
- Open browser DevTools Network tab to see API responses
- Verify database connection in backend
- Check if user already exists (for registration errors)

### Port conflicts
- If port 8080 or 8081 is busy, update configuration
- Frontend: Vite will auto-select another port
- Backend: Update `server.port` in `application.properties`

## 🎉 Next Steps

The frontend and backend are now fully integrated! You can now:

1. ✅ Login and register users
2. ✅ View user dashboard
3. ✅ Access protected routes
4. ⏳ Implement product listing (API ready, UI needs integration)
5. ⏳ Implement transaction management
6. ⏳ Implement messaging system
7. ⏳ Admin approval workflow

## 📚 Additional Resources

- Backend API Documentation: `backend/wildkits/API_TESTING_GUIDE.md`
- Backend Schema: `backend/wildkits/DATABASE_SCHEMA.md`
- Frontend Components: All in `web/src/components/`

---

**Status**: ✅ Frontend-Backend Integration Complete
**Last Updated**: March 7, 2026
