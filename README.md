# Grok Bits → X account

Create short **Grok Bits** and use them as the posting engine for your X account.

## What's here

| Path | Purpose |
| --- | --- |
| `bits/library.json` | Source of truth for every bit (draft → approved → posted) |
| `config/profile.json` | Handle, niche, pillars, posting hours |
| `voice/VOICE.md` | Voice rules for writing and approving bits |
| `ops/PLAYBOOK.md` | Daily loop for running the account |
| `scripts/` | Generate, queue, export, approve, mark posted |

## Quick start

```bash
# See ready inventory
npm run bits:list -- --status approved

# Today's posting schedule
npm run bits:queue

# Copy-paste batch for X / a scheduler
npm run bits:export -- --count 7

# Make more bits (offline by default)
npm run bits:generate -- --count 10

# Approve drafts, then mark after you post
npm run bits:approve -- --id bit-025
npm run bits:mark-posted -- --id bit-001 --url https://x.com/you/status/...
```

## Setup (2 minutes)

1. Set your handle and niche in `config/profile.json`
2. Skim `voice/VOICE.md` and adjust if needed
3. Post from the seeded approved bits, or generate more

## Generate with real Grok

```bash
export XAI_API_KEY=your_key_here
npm run bits:generate -- --count 8 --approve
```

## Seed inventory

This repo ships with **24 approved Grok Bits** ready to schedule. Generate more anytime; keep a buffer of ~2 weeks so posting never depends on inspiration that day.
