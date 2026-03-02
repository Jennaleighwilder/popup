# Fix Google Sign-In + Run Migration (2 minutes)

## Step 1: Create a Supabase token (if you don't have one)
1. Go to https://supabase.com/dashboard/account/tokens
2. Click **Generate new token**
3. Name it: `popup-fix`
4. Copy the token (starts with `sbp_`)

## Step 2: Run the migration (creates tables)
In your terminal:

```bash
cd /Users/jenniferwest/popup
SUPABASE_ACCESS_TOKEN=paste_your_token_here node run-migration.mjs
```

Replace `paste_your_token_here` with your actual token.

## Step 3: Fix redirect (if sign-in loops)
```bash
SUPABASE_ACCESS_TOKEN=paste_your_token_here ./fix-supabase-redirect.sh
```

## Step 4: Try again
Sign in to Popup. It should go to the create page now.
