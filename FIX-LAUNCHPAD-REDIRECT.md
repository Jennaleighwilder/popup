# Fix: Google Sign-In Sends You to Launchpad Instead of Popup

Popup and Launchpad share the same Supabase project. Supabase needs Popup's URL in the allowed list.

---

## I opened the Supabase page for you. Do this:

1. You should see **URL Configuration** (Auth → URL Configuration)
2. Find **Redirect URLs**
3. Click **Add URL**
4. Type exactly: `https://popup-tawny-nu.vercel.app/auth/callback`
5. Click **Add** or **Save**
6. Add another: `https://popup-tawny-nu.vercel.app`
7. Click **Save**

---

## Also check Site URL

- If **Site URL** is set to Launchpad's domain, change it to: `https://popup-tawny-nu.vercel.app`
- That makes Popup the default redirect when Supabase isn't sure where to send you

---

## If you created a NEW Supabase project for Popup

Use that instead! Give me:
- Project URL
- anon key  
- service_role key

I'll add them to Vercel and you won't have any Launchpad conflict.
