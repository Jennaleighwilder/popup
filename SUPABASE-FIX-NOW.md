# FIX: Google Sign-In Loops Back to Login

**Do this once (2 minutes).** Supabase must allow Popup's callback URL or it redirects to the wrong place.

---

## Steps

1. Go to **https://supabase.com/dashboard**
2. Open your project (the one with `zqtnmznyyzjstmtqcscv` in the URL)
3. Click **Authentication** (left sidebar)
4. Click **URL Configuration**
5. Under **Redirect URLs**, click **Add URL**
6. Add this **exact** URL:
   ```
   https://popup-tawny-nu.vercel.app/auth/callback
   ```
7. Under **Site URL**, set it to:
   ```
   https://popup-tawny-nu.vercel.app
   ```
   (This makes Popup the default when Supabase isn't sure where to send you)
8. Click **Save**

---

## Done

Try signing in with Google again. You should land on the create page, not the login page.
