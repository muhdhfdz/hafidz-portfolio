# Your portfolio site — setup guide

This is a plain, custom-coded website (no framework, no build step) with a
real admin panel at `/admin` so you can update everything yourself —
text, photos, video, stats — without touching code again after today.

It works like this: your content lives in GitHub. Netlify hosts the site
and rebuilds it automatically every time you publish a change in `/admin`.

Total one-time setup: about 15 minutes.

---

## Step 1 — Create a GitHub repository (no coding required)

1. Go to [github.com](https://github.com) and create a free account if you
   don't have one.
2. Click the **+** in the top right → **New repository**.
3. Name it something like `hafidz-portfolio`. Keep it **Public** (required
   for the free Netlify/Identity setup below). Click **Create repository**.
4. On the new repo's page, click **uploading an existing file**.
5. Drag every file and folder from this package into the upload box
   (`index.html`, `styles.css`, `script.js`, the `content` folder, the
   `images` folder, the `admin` folder). Wait for the upload bar to finish.
6. Scroll down, click **Commit changes**.

Your code now lives on GitHub.

## Step 2 — Connect it to Netlify

1. Go to [netlify.com](https://netlify.com) and sign up (you can sign up
   directly with your GitHub account — easiest option).
2. Click **Add new site → Import an existing project**.
3. Choose **GitHub**, authorize Netlify, and select the repo you just
   created.
4. Leave the build settings empty (no build command, publish directory
   `/`) and click **Deploy**.

In a minute or two, your site is live at a random address like
`https://cheerful-panda-123abc.netlify.app`. You can rename this later in
**Site settings → Domain management**, or connect your own domain if you
buy one.

## Step 3 — Turn on the admin panel (Identity + Git Gateway)

This is what makes `/admin` work.

1. In your Netlify site dashboard, go to **Site configuration → Identity**
   (or **Settings → Identity** depending on the current Netlify layout) →
   **Enable Identity**.
2. Still in Identity settings, find **Registration** and set it to
   **Invite only**. This step matters — it stops strangers from signing
   up and editing your site.
3. Go to **Identity → Services** (or **Git Gateway** in the sidebar) →
   **Enable Git Gateway**.
4. Go back to the Identity tab and click **Invite users**. Enter your own
   email address and send the invite.
5. Check your email, open the invite, and set a password when prompted.

## Step 4 — Log in and edit your site

1. Go to `https://your-site-name.netlify.app/admin`.
2. Log in with the email and password you just set.
3. You'll see form fields for every section of your site: name, tagline,
   bio, expertise, event photos, video link, the communication assets
   gallery, campaign stats, and contact details.
4. Change whatever you want, then click **Publish** (top right of each
   entry). Netlify rebuilds the live site automatically — refresh your
   site in a minute to see the change.

To swap a photo: click the image field, upload the new one — old one gets
replaced. To update your video: paste any normal YouTube or Vimeo link
into the video field, it converts automatically.

---

## Two things to finish before you share this with people

1. **Your LinkedIn link is blank.** I left it out rather than guess it —
   add your real profile URL in `/admin → Contact` once you're set up.
2. **The video section shows "Video coming soon"** since I don't have your
   video links yet — drop the link into `/admin → Video` whenever you're
   ready, no rebuild needed on my end, it just works.

## About the contact form

The "Send message" form on the site works automatically — no setup
needed. Submissions appear in your Netlify dashboard under **Forms**. You
can turn on email notifications for new submissions in that same tab if
you want them sent straight to your inbox.

## If something looks off

Everything in `index.html` / `styles.css` / `script.js` is standard code —
any developer, or Claude in a future chat, can open and adjust it. The
content you'll actually touch day-to-day all lives in one place:
`content/site.json`, which the admin panel edits for you.
