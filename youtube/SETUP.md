# Setup — YouTube Grok Bot team

## 0. Channel prerequisites

- [ ] YouTube channel created  
- [ ] Channel name + handle set  
- [ ] Face/brand avatar + banner  
- [ ] One-line promise drafted (finish with YT Growth Lead)  
- [ ] YouTube Studio access on a browser the Bot computer can use (or Composio YouTube / TubeAlfred for research)

## 1. Create the four Bots

In [Grok Bot](https://x.ai/bot): **New → Create new Bot** × 4.  
Paste **Name / Title / Description** from `youtube/profiles/`, then send **First task**.

1. YT Growth Lead  
2. YT Scout  
3. Packaging  
4. Scriptwriter  

## 2. Connect tools

| Path | Use for |
| --- | --- |
| **Browser → YouTube Studio** | Upload, analytics, title tests (Bot hands you 2FA) |
| **Composio → YouTube** | Channel/video metadata via plugin ([guide](https://composio.dev/toolkits/youtube/framework/grok-bot)) |
| **TubeAlfred** (optional) | Read-only research: transcripts, search, competitors ([plugin](https://grokbot.dev/plugins/tubealfred/)) |

Prefer structured plugins for research; use the computer + Studio for publish with your approval.

## 3. Config

Edit `config/youtube.json` — channel URL, niche, cadence.  
Save skills from `youtube/skills/` inside Grok Bot when prompted.

## 4. Studio War Room

**New** → select all four YouTube Bots → paste `youtube/kickoffs/studio-war-room.md`.

## 5. Your weekly human block

1. Approve topic + packaging for next long-form  
2. Approve script / hook  
3. Film & edit (or teach your edit workflow later)  
4. Approve upload metadata + thumbnail  
5. Skim Growth Lead scoreboard after 48–72h  

## 6. Routines

After one full video cycle, install `youtube/routines/weekly.md`.
