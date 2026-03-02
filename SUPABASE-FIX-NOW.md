# FIX: Google Sign-In Loops Back to Login

**Do this once (2 minutes).** Supabase must allow Popup's callback URL or it redirects to the wrong place.

---

## Steps (in your Popup Supabase project)

1. Go to **https://supabase.com/dashboard**
2. Open your **Popup** project (`oistyeccgqnshsdnmxqzm`)
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

## Or run in terminal (one command)

```bash
cd /Users/jenniferwest/popup
SUPABASE_ACCESS_TOKEN=your_token ./fix-supabase-redirect.sh
```
(Get token: https://supabase.com/dashboard/account/tokens)

---

## Done

Redeploy, then try sign-in again (desktop + mobile).
