# WildKits Authentication System

Complete login and registration system for the WildKits campus marketplace platform.

## 🎯 Overview

WildKits is a campus-exclusive peer-to-peer marketplace for CIT-U students (Technologians). This authentication system provides:

- **Login** - Secure user authentication
- **Sign Up** - New user registration with validation
- **Dashboard** - Protected user area after login
- **Password Recovery** - Forgot password page (placeholder)

## 🎨 Design Features

- **Deep Maroon/Red Primary Color** (#8B0000 - #7A0000)
- **Gold/Yellow Accent** (#FFC107)
- **Modern UI** with rounded cards and soft shadows
- **Fully Responsive** - Desktop and mobile optimized
- **Smooth Animations** - Hover effects and transitions
- **Icon Support** - React Icons integration
- **Loading States** - Visual feedback during API calls
- **Error Handling** - Clear validation and error messages

## 📁 Project Structure

```
web/
│
├── app/
│   ├── login/
│   │   └── page.js              # Login page
│   ├── signup/
│   │   └── page.js              # Sign up page
│   ├── dashboard/
│   │   └── page.js              # Protected dashboard
│   ├── forgot-password/
│   │   └── page.js              # Password recovery (placeholder)
│   ├── layout.js                # Root layout with fonts
│   └── globals.css              # Global styles and colors
│
├── components/
│   └── auth/
│       ├── AuthLayout.jsx       # Shared auth layout (hero + form)
│       ├── InputField.jsx       # Reusable input field component
│       └── Button.jsx           # Reusable button component
│
├── services/
│   └── api.js                   # Axios API configuration
│
├── hooks/
│   └── useAuth.js               # Authentication hook
│
├── .env.local                   # Environment variables
└── package.json                 # Dependencies
```

## 🚀 Setup Instructions

### 1. Install Dependencies

Navigate to the web directory and install packages:

```bash
cd web
npm install
```

This will install:
- `axios` - HTTP client for API calls
- `react-icons` - Icon library for UI

### 2. Configure Environment Variables

The `.env.local` file has been created with:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

**Update this URL** if your Spring Boot backend is running on a different port or host.

### 3. Start the Development Server

```bash
npm run dev
```

The application will be available at: **http://localhost:3000**

## 📝 Available Pages

| Page | URL | Description |
|------|-----|-------------|
| Login | `/login` | User authentication |
| Sign Up | `/signup` | New user registration |
| Dashboard | `/dashboard` | Protected user area |
| Forgot Password | `/forgot-password` | Password recovery (placeholder) |

## 🔌 Backend API Integration

The frontend connects to your Spring Boot backend using these endpoints:

### Register

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Expected Response

```json
{
  "user_id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Login successful"
}
```

The user data is stored in `localStorage` and used for authentication state.

## ✅ Form Validation

### Login Form
- **Email**: Must be valid email format
- **Password**: Minimum 8 characters

### Sign Up Form
- **Name**: Required, minimum 2 characters
- **Email**: Valid email format
- **Password**: 
  - Minimum 8 characters
  - Must contain uppercase letter
  - Must contain lowercase letter
  - Must contain number
- **Confirm Password**: Must match password field

## 🎨 Component Usage

### AuthLayout

Shared layout for authentication pages with hero section and form card:

```jsx
import AuthLayout from '@/components/auth/AuthLayout';

<AuthLayout title="Welcome Back" subtitle="Sign in to your account">
  {/* Your form here */}
</AuthLayout>
```

### InputField

Reusable input field with icon, label, and error handling:

```jsx
import InputField from '@/components/auth/InputField';
import { HiMail } from 'react-icons/hi';

<InputField
  label="Email Address"
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  error={errors.email}
  placeholder="your.email@cit.edu"
  icon={HiMail}
  required
/>
```

### Button

Customizable button with loading states:

```jsx
import Button from '@/components/auth/Button';

<Button
  type="submit"
  loading={loading}
  disabled={loading}
>
  {loading ? 'Logging in...' : 'Login'}
</Button>
```

## 🔧 Custom Hook - useAuth

Authentication logic is centralized in the `useAuth` hook:

```jsx
import useAuth from '@/hooks/useAuth';

function MyComponent() {
  const { user, loading, error, login, register, logout, isAuthenticated } = useAuth();
  
  // Use authentication functions
  const handleLogin = async () => {
    const result = await login({ email, password });
    if (result.success) {
      // Handle success
    }
  };
  
  return (
    // Your component
  );
}
```

## 🎯 Features Implemented

✅ **Login Page** with email/password authentication  
✅ **Sign Up Page** with comprehensive validation  
✅ **Password Strength Indicator** on registration  
✅ **Client-side Validation** with real-time error messages  
✅ **Server-side Error Handling** with user-friendly messages  
✅ **Loading States** during API requests  
✅ **Success Messages** after registration  
✅ **LocalStorage Integration** for user persistence  
✅ **Protected Dashboard** page  
✅ **Logout Functionality**  
✅ **Responsive Design** for all screen sizes  
✅ **Icon Integration** with React Icons  
✅ **Custom Fonts** (Inter & Poppins from Google Fonts)  
✅ **Tailwind CSS** custom colors and styling  

## 🌐 Responsive Behavior

### Desktop (≥1024px)
- Split-screen layout
- Hero section on the left
- Form on the right

### Mobile (<1024px)
- Stacked layout
- Hero section on top
- Form below

## 🎨 Color Palette

```css
Primary: #8B0000 (Deep Maroon)
Primary Dark: #7A0000
Primary Darker: #6A0000
Accent: #FFC107 (Gold/Yellow)
Background: #FFFFFF (White)
Background Gray: #F9FAFB
Text: #333333 (Dark Gray)
```

## 📱 Typography

- **Primary Font**: Inter (sans-serif)
- **Display Font**: Poppins (headings)
- Loaded from Google Fonts with optimal display swap

## 🔒 Security Features

- Password minimum length requirement (8 characters)
- Password complexity validation (uppercase, lowercase, number)
- Client-side input sanitization
- Axios interceptors for token handling
- Automatic redirect on 401 (Unauthorized)

## 🐛 Error Handling

The system handles various error scenarios:

1. **Validation Errors** - Shown below input fields
2. **Server Errors** - Displayed at top of form
3. **Network Errors** - Generic error message
4. **Authentication Failures** - Clear feedback to user

## 📦 Next Steps

To complete the full marketplace:

1. **Implement Backend Endpoints** - Create `/api/auth/register` and `/api/auth/login` in Spring Boot
2. **Add JWT Tokens** - Implement token-based authentication
3. **Build Dashboard** - Add marketplace features (browse, list, search)
4. **Password Recovery** - Implement forgot password functionality
5. **Profile Management** - User profile pages and settings
6. **Product Listing** - CRUD operations for marketplace items

## 🤝 Contributing

When adding new features:

1. Follow the existing component structure
2. Use the custom color palette
3. Maintain responsive design
4. Add proper error handling
5. Include loading states

## 📄 License

Internal project for CIT-U campus use.

---

**Built with ❤️ for the Technologian community**
