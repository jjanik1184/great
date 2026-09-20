#!/usr/bin/env node
/**
 * Export the next posting batch as plain text / CSV for copy-paste into X
 * or a scheduler (Typefully, Buffer, Hypefury, etc.).
 *
 * Usage:
 *   npm run bits:export
 *   npm run bits:export -- --count 7 --format csv
 *   npm run bits:export -- --format md > export/today.md
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  filterBits,
  loadLibrary,
  loadProfile,
  parseArgs,
  root,
} from "./lib.mjs";

const args = parseArgs(process.argv.slice(2));
const count = Math.max(1, Number(args.count || 7));
const format = args.format || "txt";
const profile = loadProfile();
const library = loadLibrary();

const ready = filterBits(library, { status: "approved" })
  .filter((b) => !b.postedAt)
  .slice(0, count);

if (!ready.length) {
  console.error("Nothing to export.");
  process.exit(1);
}

const hours = profile.postingCadence?.preferredHoursLocal || [8, 12, 19];
const rows = ready.map((bit, index) => ({
  id: bit.id,
  text: bit.text,
  suggestedHourLocal: hours[index % hours.length],
  pillar: bit.pillar || "",
  tags: (bit.tags || []).join("|"),
}));

let output;
if (format === "csv") {
  const header = "id,text,suggested_hour_local,pillar,tags";
  const lines = rows.map((r) =>
    [r.id, csv(r.text), r.suggestedHourLocal, csv(r.pillar), csv(r.tags)].join(
      ","
    )
  );
  output = [header, ...lines].join("\n") + "\n";
} else if (format === "md") {
  output =
    `# Grok Bits export\n\n` +
    rows
      .map(
        (r) =>
          `## ${r.id} · ~${String(r.suggestedHourLocal).padStart(2, "0")}:00\n\n${r.text}\n`
      )
      .join("\n") +
    "\n";
} else {
  output = rows
    .map(
      (r) =>
        `[${r.id} · ${String(r.suggestedHourLocal).padStart(2, "0")}:00]\n${r.text}\n`
    )
    .join("\n");
}

const outDir = join(root, "export");
mkdirSync(outDir, { recursive: true });
const stamp = new Date().toISOString().slice(0, 10);
const file = join(outDir, `queue-${stamp}.${format === "md" ? "md" : format}`);
writeFileSync(file, output, "utf8");

process.stdout.write(output);
console.error(`\nWrote ${file}`);

function csv(value) {
  const s = String(value ?? "");
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}
