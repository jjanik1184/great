# Grok Bots that run your X account

This repo is a **copy-paste roster** for [Grok Bot](https://x.ai/bot): specialist AI teammates you create in the Grok Bot / Cursor app, then point at your X account.

I can’t create Bots inside your Grok Bot account from this Cloud Agent. You create them once in the app using the profiles below (about 10–15 minutes).

## Team (4 Bots)

| Bot | Job |
| --- | --- |
| **X Ops Lead** | Daily brief, priorities, approvals gate, hands work to specialists |
| **Scout** | Trends, bookmarks, accounts worth engaging |
| **Ghostwriter** | Drafts posts in your voice — never publishes without you |
| **Engagement** | Drafts replies to mentions / worthwhile threads |

Put them in one group chat: **X War Room** (`bots/kickoffs/x-war-room.md`).

## Create them (desktop or iOS)

1. Open [Grok Bot](https://x.ai/bot) (or Cursor → Grok Bot). Eligible plans: SuperGrok / Cursor Pro+.
2. **New** → **Create new Bot** (or `Cmd/Ctrl+N`).
3. **Edit Profile** → paste **Name**, **Title**, and **Description** from `bots/profiles/`.
4. Send the **First task** from that profile.
5. Repeat for all four Bots.
6. **New** → select all four → paste the War Room kickoff.
7. Connect plugins: **X** (required), optionally Gmail / Calendar / Drive. See `bots/SETUP.md`.

Official docs: [Create Bots](https://docs.x.ai/grok-bot/bots) · [Work with Grok Bot](https://cursor.com/docs/grok-bot/work) · [Connect plugins](https://cursor.com/help/grok-bot/connect-plugins)

## Safety default

Every profile ends publishing, DMs, follows, likes, and profile edits behind **your approval**. Automate research and drafts first; unlock posting only after the voice is right.

## What’s in the repo

```
bots/
  SETUP.md              # plugins, X connect, routines
  ROSTER.md             # who owns what
  profiles/             # paste into Edit Profile + first tasks
  kickoffs/             # group chat starter
  routines/             # schedules to ask each Bot to create
  skills/               # voice + post checklist (save as skills)
voice/VOICE.md          # shared writing rules
config/profile.json     # your handle, niche, hours
```
