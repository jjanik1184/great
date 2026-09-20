import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

export function loadProfile() {
  return JSON.parse(readFileSync(join(root, "config/profile.json"), "utf8"));
}

export function loadLibrary() {
  return JSON.parse(readFileSync(join(root, "bits/library.json"), "utf8"));
}

export function saveLibrary(library) {
  library.updatedAt = new Date().toISOString();
  writeFileSync(
    join(root, "bits/library.json"),
    `${JSON.stringify(library, null, 2)}\n`,
    "utf8"
  );
}

export function nextBitId(library) {
  const nums = library.bits
    .map((b) => Number(String(b.id).replace(/\D/g, "")))
    .filter((n) => Number.isFinite(n));
  const max = nums.length ? Math.max(...nums) : 0;
  return `bit-${String(max + 1).padStart(3, "0")}`;
}

export function filterBits(library, { status, tag, pillar } = {}) {
  return library.bits.filter((bit) => {
    if (status && bit.status !== status) return false;
    if (tag && !(bit.tags || []).includes(tag)) return false;
    if (pillar && bit.pillar !== pillar) return false;
    return true;
  });
}

export function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token.startsWith("--")) {
      const key = token.slice(2);
      const next = argv[i + 1];
      if (!next || next.startsWith("--")) {
        args[key] = true;
      } else {
        args[key] = next;
        i += 1;
      }
    } else {
      args._.push(token);
    }
  }
  return args;
}

export { root };
