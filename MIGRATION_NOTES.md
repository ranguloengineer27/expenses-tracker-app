# Next.js Migration Notes

This project has been migrated from Vite + React Router to Next.js 15 with App Router.

## Key Changes

### 1. Project Structure
- Created `app/` directory with Next.js App Router structure
- Routes converted from React Router to Next.js file-based routing:
  - `/` → `app/page.tsx`
  - `/projects` → `app/projects/page.tsx`
  - `/add-profile` → `app/add-profile/page.tsx`
  - `/dashboard/[projectId]` → `app/dashboard/[projectId]/page.tsx`
  - `/logs` → `app/logs/page.tsx`
  - `/sign-in` → `app/sign-in/page.tsx`
  - `/reset-password` → `app/reset-password/page.tsx`

### 2. Routing Changes
- Replaced `react-router-dom` with Next.js navigation:
  - `useNavigate()` → `useRouter()` from `next/navigation`
  - `useLocation()` → `usePathname()` from `next/navigation`
  - `useParams()` → `useParams()` from `next/navigation` (for dynamic routes)
  - `<Link to="...">` → `<Link href="...">` from `next/link`
  - Removed `BrowserRouter` wrapper

### 3. Component Updates
- Added `"use client"` directive to all components using hooks or browser APIs
- Updated `MainContainer` to accept `children` prop instead of rendering `AppRouter`
- Updated `ProjectDashboard` to receive `projectId` as prop instead of using `useParams()`

### 4. Configuration Files
- Created `next.config.js` with appropriate settings
- Updated `tsconfig.json` for Next.js
- Created `.eslintrc.json` for Next.js ESLint config
- Updated `package.json`:
  - Added `next` dependency
  - Removed `react-router-dom` and Vite dependencies
  - Updated scripts to use Next.js commands

### 5. Providers
- Created `app/providers.tsx` as a client component wrapper
- Moved all providers (QueryClient, AuthProvider, ProfileProvider) to `app/providers.tsx`
- Root layout (`app/layout.tsx`) wraps app with providers

### 6. Build & Development
- Development: `pnpm dev` (runs `next dev`)
- Build: `pnpm build` (runs `next build`)
- Start: `pnpm start` (runs `next start`)

## Next Steps

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Test the application:
   ```bash
   pnpm dev
   ```

3. Remove old Vite files (optional):
   - `vite.config.ts`
   - `index.html`
   - `src/main.tsx` (no longer needed)
   - `vitest.config.ts` (if not using Vitest)

4. Update environment variables:
   - Ensure `.env.local` or `.env` contains required Supabase keys
   - Next.js automatically loads `.env.local` files

5. Test all routes and functionality to ensure everything works correctly

## Notes

- All components that use hooks, state, or browser APIs must have `"use client"` directive
- Static assets should be placed in `public/` directory
- API routes can be added in `app/api/` directory if needed
- The old `AppRouter.tsx` component is no longer used but kept for reference

