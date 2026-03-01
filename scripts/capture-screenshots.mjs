#!/usr/bin/env node
/**
 * Capture screenshots of Popup app for demos/docs.
 * Run: npm run dev (in another terminal), then: node scripts/capture-screenshots.mjs
 * Or: npx playwright test scripts/screenshots.spec.ts (if using Playwright test)
 */

import { chromium } from "playwright";
import { mkdirSync, existsSync } from "fs";
import { join } from "path";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const OUT_DIR = join(process.cwd(), "screenshots");

const PAGES = [
  { name: "01-homepage", url: "/", wait: 2000 },
  { name: "02-login", url: "/login", wait: 1500 },
  { name: "03-signup", url: "/signup", wait: 1500 },
  { name: "04-create-step1", url: "/create", wait: 2000 },
  { name: "05-event-atelier", url: "/e/the-edit-spring-sample-sale", wait: 2500 },
  { name: "06-event-harvest", url: "/e/spice-route-supper", wait: 2500 },
  { name: "07-event-gallery", url: "/e/first-friday-art-walk", wait: 2500 },
  { name: "08-event-botanica", url: "/e/morning-rituals", wait: 2500 },
  { name: "09-event-soiree", url: "/e/golden-hour-sessions", wait: 2500 },
  { name: "10-event-neon", url: "/e/neon-nights", wait: 2500 },
  { name: "11-event-vintage", url: "/e/the-makers-market", wait: 2500 },
];

async function main() {
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

  console.log("Capturing screenshots from", BASE_URL);
  console.log("Output:", OUT_DIR);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  for (const { name, url, wait } of PAGES) {
    try {
      const page = await context.newPage();
      const fullUrl = BASE_URL + url;
      await page.goto(fullUrl, { waitUntil: "networkidle", timeout: 15000 });
      await new Promise((r) => setTimeout(r, wait));
      const path = join(OUT_DIR, `${name}.png`);
      await page.screenshot({ path, fullPage: false });
      console.log("  ✓", name);
      await page.close();
    } catch (err) {
      console.error("  ✗", name, err.message);
    }
  }

  await browser.close();
  console.log("\nDone. Screenshots saved to", OUT_DIR);
}

main().catch(console.error);
