# Your portfolio site — how it works

This is a plain, fast website. No app, no login, no monthly cost. Three files do the work:

- `index.html` — the page structure (you shouldn't need to touch this)
- `styles.css` — the design (you shouldn't need to touch this)
- `content.json` — **your content**. This is the only file you'll normally edit.
- `images/` — this is where your photo and campaign images live.

Everything on the page — your name, your bio, your images, your videos, your contact
info — comes from `content.json`. Add something there (and the image file, if it's
a photo), and it shows up on the site automatically. Delete it, and it disappears.

---

## Step 1 — Put it on GitHub

Since you already have a GitHub account:

1. Go to github.com and click **New repository**. Name it something like `hafidz-portfolio`. Keep it Public. Create it.
2. On the new repo's page, click **uploading an existing file**.
3. Drag in every file and folder from this project.
4. Click **Commit changes**.

## Step 2 — Connect it to Netlify

1. Go to netlify.com and sign up / log in (you can log in with your GitHub account directly).
2. Click **Add new site → Import an existing project**.
3. Choose GitHub, then pick the `hafidz-portfolio` repo.
4. Leave the build settings as they are (this site doesn't need a build step) and click **Deploy**.
5. Netlify gives you a live link like `hafidz-portfolio.netlify.app`. That's what you share.
6. Optional: in Site settings → Domain management, you can rename that subdomain to something like `hafidzzainudin.netlify.app`, or connect a domain you own.

From now on: **any time you save a change on GitHub, Netlify rebuilds the live site automatically within a minute or two.** You never need to touch Netlify again after this step.

---

## Step 3 — Add your real photo and campaign images

The site currently uses placeholder blocks that say things like "IMAGE MISSING" —
that's intentional, so it's obvious what still needs a real file. To fix one:

1. In your GitHub repo, open the `images` folder.
2. Click **Add file → Upload files**, drag your image in.
3. Open `content.json` (click it, then the pencil/edit icon).
4. Find the matching entry and update `"file"` to match your uploaded filename exactly, e.g.:
   ```json
   "file": "images/i-lindung-fiesta.jpg",
   ```
5. Scroll down, click **Commit changes**. Give it a minute — refresh your live site.

Do the same for `"photo": "images/profile.jpg"` under `"profile"` at the top of the file, for your headshot.

---

## Adding a brand-new piece of work later

**A new static image:**
1. Upload the image file to `images/` (same as above).
2. In `content.json`, inside the `"images"` list, copy one existing block and paste it as a new one, then edit the title, caption, and file name. Example:
   ```json
   {
     "id": "img-7",
     "file": "images/new-campaign.jpg",
     "title": "Your new campaign name",
     "caption": "One line about what this piece is and what it's for."
   }
   ```
3. Commit the change. Done — it appears in the gallery automatically.

**Removing one:** delete its whole block (from `{` to `}`) out of `content.json`, commit. You can leave the image file in `images/` or delete it too, doesn't matter.

**A new video:** your videos need to live on YouTube first (set the visibility to **Unlisted** so it won't show up in YouTube search, but anyone with your portfolio link can still watch it embedded).
1. Upload the video to YouTube, set it to Unlisted.
2. Copy the video ID from the URL — the part after `watch?v=`. Example: in `https://www.youtube.com/watch?v=Ab12Cd34Efg`, the ID is `Ab12Cd34Efg`.
3. In `content.json`, inside `"videos"`, add or edit a block:
   ```json
   {
     "id": "vid-5",
     "youtubeId": "Ab12Cd34Efg",
     "title": "Video title",
     "caption": "One line describing it."
   }
   ```
4. Commit. It'll show a real thumbnail and play in a popup when clicked.

**Editing your bio, contact info, or headline:** all in the `"profile"` and `"about"` sections at the top of `content.json` — same idea, edit the text between the quote marks, commit.

A general rule for editing `content.json`: keep the commas, quote marks, and curly
brackets `{ }` exactly as they are in the examples — that punctuation is what keeps
the file valid. If the site ever shows a red error banner after you save, it usually
means a comma or bracket got dropped somewhere; compare against a block that still works.

---

## Testing changes on your own computer first (optional)

Double-clicking `index.html` will open it, but the content won't load — browsers
block that specific step for local files as a security rule. To preview properly on
your computer before uploading to GitHub, open a terminal in this folder and run:

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000` in your browser. (This step is optional — you can
also just edit directly on GitHub and check the live Netlify link instead.)

---

## About the placeholder content already in there

I filled in `content.json` with your real bio text and the titles of the six Etiqa
campaign images and four videos, based on what showed on your Wix draft. I don't
have the actual image and video files, so those are placeholder blocks right now —
swap them in using the steps above. Your phone number and email are filled in from
what was visible in your recording; double check those are correct and current
before you share the link. Your LinkedIn/Instagram/Behance links are left blank
on purpose — add your real URLs under `"socials"` in `content.json` and that
button will appear on the site automatically (leave the `"url"` empty and the
button just won't show).

## One thing I want to flag honestly

You asked for a way to add and remove content without touching any file, like a
proper admin dashboard with buttons. That's possible using a free tool called Decap
CMS, but setting it up depends on a couple of Netlify account settings that may have
changed since I last had reliable, verified information about them — I don't want
to hand you steps I'm not confident are still accurate. The GitHub-based method
above works right now, is simple once you've done it twice, and needs no extra
setup. If you want the dashboard version later, ask me and I'll look into what
Decap CMS currently requires, or we can check Netlify's docs together at that point.
