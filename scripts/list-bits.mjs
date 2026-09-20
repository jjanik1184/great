#!/usr/bin/env node
import { filterBits, loadLibrary, parseArgs } from "./lib.mjs";

const args = parseArgs(process.argv.slice(2));
const library = loadLibrary();
const bits = filterBits(library, {
  status: args.status,
  tag: args.tag,
  pillar: args.pillar,
});

if (!bits.length) {
  console.log("No bits matched.");
  process.exit(0);
}

for (const bit of bits) {
  const tags = (bit.tags || []).join(", ");
  console.log(`${bit.id}  [${bit.status}]  ${bit.text}`);
  console.log(`         pillar: ${bit.pillar || "—"}  tags: ${tags || "—"}`);
  console.log("");
}

console.log(`${bits.length} bit(s)`);
