#!/usr/bin/env node
/**
 * Approve draft bits so they enter the posting queue.
 *
 * Usage:
 *   npm run bits:approve -- --id bit-025
 *   npm run bits:approve -- --all
 */
import { loadLibrary, parseArgs, saveLibrary } from "./lib.mjs";

const args = parseArgs(process.argv.slice(2));
const library = loadLibrary();

let changed = 0;
for (const bit of library.bits) {
  if (bit.status !== "draft") continue;
  if (args.all || bit.id === args.id) {
    bit.status = "approved";
    changed += 1;
    if (!args.all) break;
  }
}

if (!changed) {
  console.error("No draft bits matched. Pass --id bit-xxx or --all");
  process.exit(1);
}

saveLibrary(library);
console.log(`Approved ${changed} bit(s).`);
