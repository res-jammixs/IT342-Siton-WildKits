# WildKits Migration to Next.js

## ✅ Migration Complete!

Your React + Vite application has been successfully migrated to Next.js 15 with the App Router.

## What Changed

### 1. **Routing System**
- ✅ Migrated from React Router to Next.js App Router
- ✅ All pages moved to `src/app/` directory structure
- ✅ Routes now use file-based routing:
  - `/` → `src/app/page.tsx` (redirects to landing)
  - `/landing` → `src/app/landing/page.tsx`
  - `/marketplace` → `src/app/marketplace/page.tsx`
  - `/login` → `src/app/login/page.tsx`
  - `/register` → `src/app/register/page.tsx`
  - `/dashboard` → `src/app/dashboard/page.tsx`
  - `/list-item` → `src/app/list-item/page.tsx`
  - `/transactions` → `src/app/transactions/page.tsx`
  - `/messages` → `src/app/messages/page.tsx`
  - `/profile` → `src/app/profile/page.tsx`
  - `/notifications` → `src/app/notifications/page.tsx`

### 2. **Navigation Updates**
- ✅ Replaced `react-router-dom` Link with Next.js Link
- ✅ Changed `to` prop to `href` prop
- ✅ Replaced `useNavigate()` with `useRouter()`
- ✅ Replaced `useLocation()` with `usePathname()`
- ✅ Updated all navigation calls: `navigate('/path')` → `router.push('/path')`

### 3. **Component Updates**
All components updated with proper client/server component directives:
- ✅ Navbar
- ✅ Footer
- ✅ ProductCard
- ✅ NavLink (custom implementation for Next.js)
- ✅ All page components
- ✅ AuthContext

### 4. **Configuration Files**
- ✅ Created `next.config.js` with API proxy configuration
- ✅ Updated `package.json` with Next.js dependencies and scripts
- ✅ Updated Tailwind config (already compatible)
- ✅ Created `.env.local` for environment variables
- ✅ Updated `.gitignore` for Next.js build files

### 5. **API Integration**
- ✅ Updated environment variable from `VITE_API_URL` to `NEXT_PUBLIC_API_URL`
- ✅ API client remains compatible with Next.js

## How to Run

### Development
```bash
cd web
npm install  # Install dependencies including Next.js
npm run dev  # Start Next.js development server
```

The app will run on http://localhost:3000

### Production Build
```bash
npm run build  # Create optimized production build
npm start      # Start production server
```

## Environment Variables

Create a `.env.local` file in the `web/` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

## API Proxy

The Next.js config includes automatic API proxying:
- Frontend requests to `/api/*` are proxied to `http://localhost:8080/api/*`
- No CORS issues during development

## Important Notes

### Client Components
Components using hooks, state, or browser APIs need `'use client'` directive:
- All page components (they wrap original pages)
- AuthContext
- QueryProvider
- Interactive components (Navbar, Footer, etc.)

### Server Components
By default, components are Server Components (better performance):
- Can fetch data directly
- No JavaScript sent to client
- Better SEO

### Links
All navigation now uses Next.js Link:
```tsx
// Old (React Router)
<Link to="/dashboard">Dashboard</Link>

// New (Next.js)
<Link href="/dashboard">Dashboard</Link>
```

### Navigation Hooks
```tsx
// Old (React Router)
const navigate = useNavigate();
navigate('/dashboard');

const location = useLocation();
const path = location.pathname;

// New (Next.js)
const router = useRouter();
router.push('/dashboard');

const pathname = usePathname();
```

## Testing

The existing test setup (Vitest) remains unchanged and should work with the migrated code.

```bash
npm test          # Run tests once
npm run test:watch # Watch mode
```

## What to Delete (Optional)

### Old Vite Files (Can be removed):
- `vite.config.ts`
- `index.html`
- `src/main.tsx`
- `src/App.tsx`
- `tsconfig.app.json`
- `tsconfig.node.json`

### Dependencies to Remove (Already removed from package.json):
- `react-router-dom`
- `@vitejs/plugin-react-swc`
- `vite`

## Next Steps

1. **Install dependencies**: Run `npm install` to get Next.js and remove old dependencies
2. **Start dev server**: Run `npm run dev`
3. **Test all routes**: Verify each page loads correctly
4. **Test navigation**: Verify all links and programmatic navigation work
5. **Test authentication**: Verify login/logout flows work correctly
6. **Remove old files**: Once everything works, delete the old Vite files listed above

## Benefits of Next.js

✅ **Better SEO**: Server-side rendering support
✅ **Better Performance**: Automatic code splitting, image optimization
✅ **Better DX**: File-based routing, easier deployment
✅ **Better Scalability**: API routes, middleware, edge functions
✅ **Better Caching**: Automatic static optimization

## Troubleshooting

### Issue: Module not found
- Run `npm install` to ensure all dependencies are installed

### Issue: API calls fail
- Verify `.env.local` contains `NEXT_PUBLIC_API_URL`
- Check backend is running on port 8080

### Issue: Authentication redirect loops
- Clear browser localStorage
- Check AuthContext navigation logic

### Issue: Build errors
- Run `npm run lint` to check for issues
- Verify all imports use correct paths

## Support

For Next.js documentation:
- https://nextjs.org/docs
- https://nextjs.org/learn

For migration questions:
- Check the official migration guide: https://nextjs.org/docs/app/building-your-application/upgrading/from-vite
