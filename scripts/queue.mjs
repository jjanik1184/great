#!/usr/bin/env node
/**
 * Show today's posting queue from approved, unposted bits.
 *
 * Usage:
 *   npm run bits:queue
 *   npm run bits:queue -- --day 2026-09-21
 */
import { filterBits, loadLibrary, loadProfile, parseArgs } from "./lib.mjs";

const args = parseArgs(process.argv.slice(2));
const profile = loadProfile();
const library = loadLibrary();
const hours = profile.postingCadence?.preferredHoursLocal || [8, 12, 19];
const perDay = profile.postingCadence?.postsPerDay || hours.length;

const day = args.day || new Intl.DateTimeFormat("en-CA", {
  timeZone: profile.timezone || "America/Chicago",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(new Date());

const ready = filterBits(library, { status: "approved" }).filter(
  (b) => !b.postedAt
);

if (!ready.length) {
  console.log("No approved unposted bits. Generate or approve more first.");
  process.exit(0);
}

const slots = hours.slice(0, perDay);
const picked = ready.slice(0, slots.length);

console.log(`Queue for ${day} (${profile.timezone})`);
console.log(`Handle: ${profile.xHandle || "(set config/profile.json → xHandle)"}`);
console.log("");

picked.forEach((bit, index) => {
  const hour = slots[index] ?? slots[slots.length - 1];
  const label = `${String(hour).padStart(2, "0")}:00`;
  console.log(`${label}  ${bit.id}`);
  console.log(`       ${bit.text}`);
  console.log("");
});

console.log(
  `${ready.length - picked.length} approved bit(s) still waiting after today.`
);
