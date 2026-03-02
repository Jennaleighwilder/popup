#!/bin/bash
# Run the Popup migration in Supabase via Management API
# Get token: https://supabase.com/dashboard/account/tokens
# Run: SUPABASE_ACCESS_TOKEN=your_token ./run-migration.sh

set -e
PROJECT_REF="oistyeccgqnshsdnmxqzm"
TOKEN="${SUPABASE_ACCESS_TOKEN}"
SQL_FILE="$(dirname "$0")/RUN-THIS-IN-SUPABASE.sql"

if [ -z "$TOKEN" ]; then
  echo "No SUPABASE_ACCESS_TOKEN. Opening Supabase SQL Editor..."
  echo "Paste the contents of RUN-THIS-IN-SUPABASE.sql and click Run."
  open "https://supabase.com/dashboard/project/${PROJECT_REF}/sql/new"
  exit 0
fi

if [ ! -f "$SQL_FILE" ]; then
  echo "Missing $SQL_FILE"
  exit 1
fi

echo "Running migration on project $PROJECT_REF..."
BODY=$(jq -Rs '{query: .}' "$SQL_FILE")

RESP=$(curl -s -w "\n%{http_code}" -X POST \
  "https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" \
  -d "$BODY")

HTTP_CODE=$(echo "$RESP" | tail -n1)
BODY=$(echo "$RESP" | sed '$d')

if [ "$HTTP_CODE" = "201" ] || [ "$HTTP_CODE" = "200" ]; then
  echo "Migration completed successfully."
else
  echo "Migration failed (HTTP $HTTP_CODE):"
  echo "$BODY" | jq . 2>/dev/null || echo "$BODY"
  exit 1
fi
