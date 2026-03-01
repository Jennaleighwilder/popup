# Fix: Google Sign-In Redirects to Launchpad Instead of Popup

Popup and Launchpad share the same Supabase project. Supabase needs to know Popup's URL is allowed.

## Do this once (2 minutes):

1. Go to **https://supabase.com/dashboard**
2. Open your project (the one with URL containing `zqtnmznyyzjstmtqcscv`)
3. Click **Authentication** (left sidebar)
4. Click **URL Configuration**
5. Under **Redirect URLs**, click **Add URL**
6. Add this exact URL:
   ```
   https://popup-tawny-nu.vercel.app/auth/callback
   ```
7. Click **Save**

Done. Google sign-in will now redirect back to Popup.
