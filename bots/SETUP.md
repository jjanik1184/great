# Setup — connect tools and go live

## 1. Create the four Bots

For each file in `bots/profiles/`:

1. Grok Bot → **New** → **Create new Bot**
2. Edit Profile → paste **Name**, **Title**, **Description**
3. Send the **First task**
4. After a good run, ask: `Save this process as a skill called "<skill name from profile>"`

## 2. Connect plugins

In Grok Bot: **Plugins** (sidebar) or avatar → Plugins on mobile.

| Plugin | Why |
| --- | --- |
| **X** | Search, timelines, trends, bookmarks; posting when you approve ([marketplace](https://cursor.com/marketplace/cursor/x)) |
| Gmail | Optional digests / “reply to this email about my X brand” |
| Google Calendar | Optional posting reminders aligned to `config/profile.json` hours |
| Google Drive | Optional long-form drafts / swipe files |

Plugins are **account-wide** — install once, every Bot can use them. In chat, `@` the plugin when a task needs it.

### X plugin notes

1. Add **X** → authorize the account you want the Bots to run.
2. Confirm tools show as available, then ask any Bot: `@X what can you do on my account?`
3. If auth fails: reopen Plugins → reconnect → retry. Some setups need an X developer bearer token; complete that in the browser when prompted.
4. Keep **write** actions (posts, likes, follows) behind approval until you trust the roster.

## 3. Fill your profile

Edit `config/profile.json`: set `xHandle`, tweak `niche` / pillars / hours. Paste the niche + approval rules into each Bot’s first message once:

> My handle is @____. Niche: ____. Timezone: America/Chicago. Always follow the approval rules in your description.

Also paste or attach `voice/VOICE.md` (or save it as a skill — see `bots/skills/`).

## 4. Open the War Room

**New** → select X Ops Lead, Scout, Ghostwriter, Engagement → paste `bots/kickoffs/x-war-room.md`.

## 5. Turn on routines (after one good manual day)

Ask each owning Bot to create the matching routine in `bots/routines/`. Then **Test run** with safe inputs (drafts only).

Docs: [Routines](https://cursor.com/docs/grok-bot/work#create-a-routine) · [Connect plugins](https://cursor.com/help/grok-bot/connect-plugins)

## 6. Teach by demo (optional, powerful)

For “how I actually post on X”:

1. Open a 1:1 with Ghostwriter + Agent Computer
2. **Teach a task** → post one draft the way you like (stop before Publish if you want)
3. Edit the draft skill: add approval boundary + voice rules
4. Test on a second draft before any routine posts

## Trust ladder

1. Week 1: drafts only  
2. Week 2: you paste/publish from drafts  
3. Week 3+: allow Bot to publish **one** approved post at a time via X plugin  
4. Later: scheduled routines that still stop for approval on anything public  
