# X account ops playbook

Run the account from a queue of Grok Bits — short posts with one idea and a little bite.

## Daily loop (15–20 min)

1. **Fill the tank** — generate drafts if approved inventory is under ~14 bits (about 5 days).
2. **Approve** — read drafts out loud; keep only what you'd actually post.
3. **Queue today** — `npm run bits:queue` picks the next approved bits against your local posting hours.
4. **Export + post** — `npm run bits:export` then paste into X (or your scheduler).
5. **Mark posted** — `npm run bits:mark-posted -- --id bit-00N --url <permalink>`.
6. **Engage** — spend most of the time on replies to people in your niche, not on polishing captions.

## Cadence defaults

From `config/profile.json` (America/Chicago):

- ~3 posts/day at 08:00, 12:00, 19:00 local
- Mix pillars across the day (take → observation → humor)

## What “running the account” means

| Job | How Grok Bits help |
| --- | --- |
| Original posts | Queue of approved bits |
| Replies | Use voice rules in `voice/VOICE.md`; one sharp sentence beats a paragraph |
| Quote-posts | Pair a bit with a current post; don't force it |
| Profile | Pin your best bit; bio should match the niche line in profile.json |

## Growth that isn't spam

- Reply early on posts from accounts slightly larger than yours
- Add information or a twist — never “this”
- Recycle strong bits after 60+ days if they still feel true

## Optional: generate with Grok

1. Get an API key at [console.x.ai](https://console.x.ai)
2. `export XAI_API_KEY=...`
3. `npm run bits:generate -- --count 10`

Without a key, the generator still expands new drafts offline from your existing library + voice rules.

## Optional: auto-post later

This repo does **not** post to X by itself (no X API credentials in the environment). When you're ready:

- Paste exports into Typefully / Buffer / Hypefury, or
- Wire a poster (X API or a posting MCP) and call it from a thin script that reads `status: approved` bits

Keep human approval on by default until the voice is locked in.

## Weekly review

- Which bits got replies from real people (not bots)?
- Which pillar is over-represented?
- Update `config/profile.json` niche/pillars if the account is drifting
