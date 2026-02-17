# Quick Reference: Google OAuth Implementation

## 🎯 What You Get

✅ **Full Authentication System** with:
- Google OAuth 2.0 integration
- User login/logout
- Session persistence
- Protected routes
- Beautiful login UI
- User profile in sidebar
- **Blank page when not logged in** (as requested)

## 📍 Key Files

| File | Purpose |
|------|---------|
| `src/contexts/AuthContext.jsx` | Authentication state & hooks |
| `src/pages/Login.jsx` | Login page component |
| `src/components/ProtectedRoute.jsx` | Route protection |
| `src/App.jsx` | Main app with auth routing |
| `src/main.jsx` | OAuth provider setup |
| `src/components/Sidebar.jsx` | User account display |

## 🔑 Google Client ID

```
730685688668-hd4cgfo1cv9a7gii4ao5l2234abm3uvn.apps.googleusercontent.com
```

**Source**: `client_secret.json` in workspace root

## 💻 How to Use

### Install Dependencies
```bash
cd front
yarn install
```

### Run App
```bash
yarn dev
```

### Test
1. Open `http://localhost:5173` → See blank page ✓
2. Navigate to `/login` → See login page
3. Click "Sign in with Google"
4. Authenticate → See dashboard with profile

## 🪝 Use Auth in Components

```javascript
import { useAuth } from './contexts/AuthContext'

export default function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth()
  
  return (
    <>
      {isAuthenticated && <p>Hello, {user.name}!</p>}
      <button onClick={logout}>Logout</button>
    </>
  )
}
```

## 🔐 Authentication State

```javascript
const {
  user,              // { id, name, email, picture, loginTime }
  isAuthenticated,   // true/false
  loading,           // true during auth check
  idToken,          // JWT token string
  logout,           // Function to logout
} = useAuth()
```

## 📱 What Users See

### Not Logged In
- Blank page (empty div)
- No sidebar, no content
- Navigate to `/login` to see login page

### Logged In
- Full app with sidebar
- Dashboard, Settings links
- Profile picture, name, email
- Logout button in sidebar

## 🎨 Login Page Features

- Modern gradient background
- Centered card design
- Google sign-in button
- Responsive layout
- Smooth animations
- Error handling

## 🛣️ Routes

| Route | Protected | Shows |
|-------|-----------|-------|
| `/` | Yes | Dashboard |
| `/dashboardwidget` | Yes | Dashboard |
| `/settings` | Yes | Settings |
| `/login` | No | Login page |
| `*` (other) | No | Blank page |

## 💾 Data Storage

User data stored in `localStorage`:
- `user` - User object (parsed JSON)
- `idToken` - JWT token string

Cleared on logout.

## 🚀 Deployment Checklist

- [ ] Test with real Google account
- [ ] Verify all routes protected
- [ ] Test logout flow
- [ ] Check mobile responsiveness
- [ ] Update OAuth redirect URIs in Google Console
- [ ] Consider moving to environment variables
- [ ] Add backend OAuth flow for production
- [ ] Implement token refresh

## ⚠️ Important Notes

1. **Google Client ID is hardcoded** in `src/main.jsx`
   - Safe for this client ID (public frontend usage)
   - For sensitive operations, use backend OAuth

2. **Tokens stored in localStorage**
   - Accessible from JS
   - For production, consider httpOnly cookies

3. **Blank page behavior**
   - App shows empty div for non-authenticated users
   - This is intentional (as requested)
   - Users navigate to `/login` to authenticate

4. **CORS Configuration**
   - Backend already has CORS enabled
   - Frontend OAuth works out of the box

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Blank page on load | Expected! Navigate to `/login` |
| Google button not showing | Check index.html has Google script |
| Login not working | Check browser console for errors |
| No profile in sidebar | Verify localStorage has user data |
| Logout not working | Check logout function is called |

## 📖 Full Documentation

- `front/AUTH_SETUP.md` - Complete setup guide
- `GOOGLE_OAUTH_SETUP.md` - Implementation summary

## ✨ Features

- ✅ Google OAuth 2.0
- ✅ User authentication
- ✅ Session persistence
- ✅ Protected routes
- ✅ Beautiful login UI
- ✅ User profile display
- ✅ Logout functionality
- ✅ Responsive design
- ✅ Error handling
- ✅ Loading states

---

**Ready to Use** ✓

Start with `yarn install && yarn dev` then navigate to `/login` to test!

