#!/usr/bin/env node
/**
 * Generate more Grok Bits.
 *
 * Offline (default): expands from seeds + voice rules into draft bits.
 * With XAI_API_KEY: asks Grok via the xAI API for fresh bits.
 *
 * Usage:
 *   npm run bits:generate -- --count 10
 *   npm run bits:generate -- --count 5 --approve
 *   XAI_API_KEY=... npm run bits:generate -- --count 8 --model grok-4-1-fast
 */
import {
  loadLibrary,
  loadProfile,
  nextBitId,
  parseArgs,
  saveLibrary,
} from "./lib.mjs";

const args = parseArgs(process.argv.slice(2));
const count = Math.max(1, Number(args.count || 8));
const autoApprove = Boolean(args.approve);
const model = args.model || "grok-4-1-fast-non-reasoning";

const profile = loadProfile();
const library = loadLibrary();
const existingTexts = new Set(library.bits.map((b) => normalize(b.text)));

const generated = process.env.XAI_API_KEY
  ? await generateWithGrok({ count, model, profile, library })
  : generateOffline({ count, profile });

const status = autoApprove ? "approved" : "draft";
const now = new Date().toISOString();
const added = [];

for (const item of generated) {
  const text = cleanBit(item.text);
  if (!text || existingTexts.has(normalize(text))) continue;
  if ([...text].length > 280) continue;

  const bit = {
    id: nextBitId({ bits: [...library.bits, ...added] }),
    text,
    pillar: item.pillar || pick(profile.pillars),
    tags: item.tags || inferTags(text),
    status,
    createdAt: now,
    postedAt: null,
    postUrl: null,
  };
  added.push(bit);
  existingTexts.add(normalize(text));
  if (added.length >= count) break;
}

if (!added.length) {
  console.error("No new bits generated (duplicates or empty). Try again.");
  process.exit(1);
}

library.bits.push(...added);
saveLibrary(library);

console.log(`Added ${added.length} ${status} bit(s):`);
for (const bit of added) {
  console.log(`- ${bit.id}: ${bit.text}`);
}

if (!process.env.XAI_API_KEY) {
  console.log(
    "\nTip: set XAI_API_KEY to generate fresher bits with Grok instead of the offline expander."
  );
}

function normalize(text) {
  return String(text).toLowerCase().replace(/\s+/g, " ").trim();
}

function cleanBit(text) {
  let s = String(text || "")
    .replace(/^[-*•\d.)\s]+/, "")
    .replace(/\s+/g, " ")
    .trim();
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    s = s.slice(1, -1).trim();
  }
  return s;
}

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function inferTags(text) {
  const lower = text.toLowerCase();
  const tags = [];
  if (/\bai\b|model|llm|agent/.test(lower)) tags.push("ai");
  if (/app|software|tool|product|tech|wifi|wi‑fi|wi-fi/.test(lower))
    tags.push("tech");
  if (/work|meeting|calendar|boss|job|career/.test(lower)) tags.push("work");
  if (/humor|joke|laugh|cosplay|flex/.test(lower)) tags.push("humor");
  if (!tags.length) tags.push("life");
  return tags.slice(0, 3);
}

function generateOffline({ count, profile }) {
  const bank = offlineBank(profile);
  const shuffled = [...bank].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count * 2).map((text) => ({
    text,
    pillar: pick(profile.pillars),
    tags: inferTags(text),
  }));
}

function offlineBank(profile) {
  const nicheHook = profile.niche.split(",")[0].trim();
  return [
    "Inbox zero is cute. Decision zero is the real flex.",
    "If the demo needs a script, the product still needs a product.",
    "Busy is a costume. Done is a receipt.",
    "The roadmap isn't late. The promises were early.",
    "Unfollow accounts that make you feel behind and follow ones that make you sharper.",
    "A checklist is only useful if you're willing to delete half of it.",
    "\"Quick sync\" is rarely quick and almost never a sync.",
    "Your second brain app can't fix your first brain's avoidance.",
    "Shipping scared beats polishing invisible.",
    "The comment section isn't a jury. Stop arguing like it is.",
    "Automation that needs daily babysitting is just a needy chore in a hoodie.",
    "Clarity is a feature. Jargon is camouflage.",
    "Most \"community\" is a group chat with a logo.",
    "If you wouldn't say it at dinner, don't put it in the company values.",
    "Trends expire. Taste compounds.",
    "The best growth hack is still: be useful in public, repeatedly.",
    "Don't build a personal brand. Build a trail of receipts.",
    "\"Let me look into that\" is fine. \"Let me disappear into that\" is how projects die.",
    "You don't need more tabs. You need fewer unfinished sentences with yourself.",
    "Soft skills are just hard skills with better timing.",
    "The algorithm rewards consistency. Humans reward coherence.",
    "Stop collecting frameworks. Start collecting finished things.",
    "A sharp question beats a long opinion nine times out of ten.",
    "If your calendar owns you, you're not busy — you're rented.",
    `People overcomplicate ${nicheHook}. The boring version usually works.`,
    `In ${nicheHook}, the loudest take is rarely the most durable one.`,
    "Reply like a human. Post like you edited once. Leave before you over-explain.",
    "Confidence without specifics is just volume.",
    "The draft folder is where good ideas go to get respectable — and die.",
    "You can't outsource taste. You can only delay practicing it.",
  ];
}

async function generateWithGrok({ count, model, profile, library }) {
  const samples = library.bits.slice(-12).map((b) => `- ${b.text}`).join("\n");
  const prompt = `You write Grok Bits: short X posts for an account.

Account niche: ${profile.niche}
Pillars: ${profile.pillars.join("; ")}
Voice notes: ${profile.voiceNotes.join(" ")}
Avoid: ${profile.avoid.join("; ")}

Recent bits for style (do not copy):
${samples}

Write ${count} brand-new Grok Bits. Rules:
- One idea each
- Under 220 characters
- No hashtags, no "Agree?", no "Unpopular opinion"
- Dry wit, concrete, specific
- Return ONLY a JSON array of objects: [{"text":"...","pillar":"...","tags":["..."]}]`;

  const res = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.XAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.9,
      messages: [
        {
          role: "system",
          content:
            "You are a sharp ghostwriter for X. Output valid JSON only. No markdown fences.",
        },
        { role: "user", content: prompt },
      ],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`xAI API error ${res.status}: ${body}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content || "[]";
  const jsonText = content.replace(/^```(?:json)?\s*|\s*```$/g, "").trim();
  const parsed = JSON.parse(jsonText);
  if (!Array.isArray(parsed)) throw new Error("Grok did not return a JSON array");
  return parsed;
}
