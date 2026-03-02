#!/usr/bin/env node
/**
 * Run Popup migration in Supabase via Management API
 * Get token: https://supabase.com/dashboard/account/tokens
 * Run: SUPABASE_ACCESS_TOKEN=your_token node run-migration.mjs
 * Or: node run-migration.mjs
 *     (will prompt for token)
 */
import { readFileSync } from "fs";
import { createInterface } from "readline";

const PROJECT_REF = "oistyeccgqnshsdnmxqzm";
const SQL_FILE = "RUN-THIS-IN-SUPABASE.sql";

async function getToken() {
  if (process.env.SUPABASE_ACCESS_TOKEN) {
    return process.env.SUPABASE_ACCESS_TOKEN;
  }
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question("Paste your Supabase token (from dashboard/account/tokens): ", (t) => {
      rl.close();
      resolve(t?.trim() || "");
    });
  });
}

async function run() {
  const token = await getToken();
  if (!token) {
    console.log("No token. Get one at: https://supabase.com/dashboard/account/tokens");
    console.log("Then run: SUPABASE_ACCESS_TOKEN=your_token node run-migration.mjs");
    process.exit(1);
  }

  const sql = readFileSync(SQL_FILE, "utf8");
  console.log("Running migration on project", PROJECT_REF, "...");

  const res = await fetch(
    `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: sql }),
    }
  );

  const text = await res.text();
  if (res.ok) {
    console.log("Migration completed successfully.");
  } else {
    console.error("Migration failed (HTTP", res.status, "):", text);
    process.exit(1);
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
