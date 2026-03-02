#!/bin/bash
# Fix Supabase redirect - add Popup URLs so Google sign-in stays on Popup
# Run: SUPABASE_ACCESS_TOKEN=your_token ./fix-supabase-redirect.sh
# Get token: https://supabase.com/dashboard/account/tokens

set -e
PROJECT_REF="oistyeccgqnshsdnmxqzm"
TOKEN="${SUPABASE_ACCESS_TOKEN}"

if [ -z "$TOKEN" ]; then
  echo "Get your token from: https://supabase.com/dashboard/account/tokens"
  echo "Then run: SUPABASE_ACCESS_TOKEN=your_token ./fix-supabase-redirect.sh"
  exit 1
fi

echo "Updating Supabase auth config..."
curl -s -X PATCH "https://api.supabase.com/v1/projects/${PROJECT_REF}/config/auth" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "site_url": "https://popup-tawny-nu.vercel.app",
    "uri_allow_list": "https://popup-tawny-nu.vercel.app,https://popup-tawny-nu.vercel.app/**,https://launchpad-conference-platform.vercel.app,https://launchpad-conference-platform.vercel.app/**"
  }' | head -20

echo ""
echo "Done. Try signing in to Popup again."
