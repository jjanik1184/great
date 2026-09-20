#!/usr/bin/env node
/**
 * Mark a bit as posted after you publish it on X.
 *
 * Usage:
 *   npm run bits:mark-posted -- --id bit-001
 *   npm run bits:mark-posted -- --id bit-001 --url https://x.com/you/status/123
 */
import { loadLibrary, parseArgs, saveLibrary } from "./lib.mjs";

const args = parseArgs(process.argv.slice(2));
if (!args.id) {
  console.error("Usage: npm run bits:mark-posted -- --id bit-001 [--url URL]");
  process.exit(1);
}

const library = loadLibrary();
const bit = library.bits.find((b) => b.id === args.id);
if (!bit) {
  console.error(`Unknown bit id: ${args.id}`);
  process.exit(1);
}

bit.status = "posted";
bit.postedAt = new Date().toISOString();
bit.postUrl = args.url || bit.postUrl || null;
saveLibrary(library);

console.log(`Marked ${bit.id} as posted.`);
if (bit.postUrl) console.log(bit.postUrl);
