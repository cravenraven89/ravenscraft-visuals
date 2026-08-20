# 🐙 GitHub Pages Publishing Guide — Super Easy Version

Hi! This guide gets your website live on the internet using **GitHub Pages**
(100% free, forever) and shows you how to add your **own real domain name**
that YOU own and control.

**Quick truth first:** Hosting on GitHub is completely free forever. But
owning a real name like `ravenscraftvisuals.com` costs a small fee from a
separate company (usually **$10–15 a year** — about one pizza 🍕). Nobody can
give real domain names away for free — that's just how the internet works.
Once you buy it, though, it's 100% yours and only you control it.

We'll go slow, one click at a time. Ready? Let's go! 🚀

---

## 🧸 Part 1: Put Your Code on GitHub

Think of GitHub like a big online filing cabinet for your website's code.

1. Go to **github.com** and click **Sign up** (it's free)
2. Once you're logged in, click the **+** icon (top right) → **New repository**
3. Name it anything, like `ravenscraft-visuals`
4. Leave it set to **Public**
5. Click **Create repository**
6. Now you need to upload your project's files into it. The easiest way:
   - On the new repository page, click **uploading an existing file**
   - Drag in all your project's files and folders
   - Click **Commit changes** at the bottom

🎉 Your website's code now lives on GitHub!

> 💡 If you're comfortable with a tool called Git/GitHub Desktop, you can
> also push your code that way — either method works fine.

---

## ⚙️ Part 2: Turn On Auto-Publishing

Good news — this project already comes with a helper file
(`.github/workflows/deploy.yml`) that automatically builds and publishes your
website every time you update your code. You just need to flip one switch.

1. On your repository page, click **Settings** (top menu)
2. Click **Pages** on the left side menu
3. Where it says **Source**, choose **GitHub Actions**
4. That's it! GitHub will now build and publish your site automatically

Wait about 1–2 minutes, then refresh the **Settings → Pages** screen. You'll
see a message like:

> Your site is live at `https://your-username.github.io/ravenscraft-visuals/`

Click that link — your website is now LIVE for the whole world to see! 🎉

> 📝 Every time you upload new changes to GitHub from now on, your website
> will automatically update within a minute or two — no extra steps needed.

---

## 💎 Part 3: Get Your OWN Real Name (Small Yearly Cost)

This is the part that costs a little money — but it's cheap, and once you
buy it, **you own it and maintain it yourself**, forever (as long as you pay
the small renewal fee each year, like renewing a library card).

### Step 1: Buy your name

1. Go to a trustworthy "domain registrar" website, such as:
   - **namecheap.com**
   - **porkbun.com**
2. Search for the name you want, like `ravenscraftvisuals.com`
3. If it's available, add it to your cart and check out (usually **$10–15/year**)
4. 🎉 Congratulations — you now OWN that name!

### Step 2: Tell GitHub about your new name

1. Go back to your GitHub repository → **Settings** → **Pages**
2. Find the box called **Custom domain**
3. Type your new domain, like `ravenscraftvisuals.com`
4. Click **Save**
5. GitHub will show a little warning about DNS — that's normal, we fix that next

### Step 3: Point your domain at GitHub (this is the "maintaining it yourself" part!)

This step happens on the website where you BOUGHT your domain (like
Namecheap), not on GitHub. This is what makes it truly "yours" — you control
these settings any time you want.

1. Log into Namecheap (or wherever you bought your domain)
2. Find your domain and click **Manage** → **Advanced DNS**
3. Add these settings exactly (this tells the internet "go to GitHub" when
   someone types your name):

   | Type | Host | Value |
   |------|------|-------|
   | A Record | @ | 185.199.108.153 |
   | A Record | @ | 185.199.109.153 |
   | A Record | @ | 185.199.110.153 |
   | A Record | @ | 185.199.111.153 |
   | CNAME Record | www | your-username.github.io |

4. Save those settings
5. Go back to GitHub → **Settings** → **Pages** and check the box that says
   **Enforce HTTPS** (this makes your site secure — the little lock icon 🔒)

⏳ Wait anywhere from a few minutes up to 24 hours for the internet to
"learn" about your new name (this is normal and just how domains work).

🎉 Once it's ready, typing `ravenscraftvisuals.com` into any browser, on any
device, anywhere in the world, shows YOUR website — and you fully own and
control that name yourself, any time, forever.

---

## ✅ Checklist

- [ ] Made a free GitHub account (Part 1)
- [ ] Uploaded my website's code to a new GitHub repository (Part 1)
- [ ] Turned on GitHub Pages with "GitHub Actions" as the source (Part 2)
- [ ] Saw my free `.github.io` link work (Part 2)
- [ ] Bought my own domain name (~$10–15/year) (Part 3)
- [ ] Added my domain as a "Custom domain" in GitHub Pages settings (Part 3)
- [ ] Added the DNS records at my domain registrar (Part 3)
- [ ] Turned on "Enforce HTTPS" in GitHub Pages (Part 3)
- [ ] Typed my real name into a browser and saw my website! 🎉

---

## 🆘 If something goes wrong

- **Page says 404 / not found?** Double-check Settings → Pages shows a green
  "Your site is live" message — it can take a minute or two after enabling.
- **Custom domain shows an error in GitHub?** Make sure you've added the DNS
  records in Part 3, Step 3 — GitHub needs those to confirm you own the domain.
- **Site not loading on your new domain yet?** DNS changes can take a few
  hours to spread across the whole internet — this is normal, just wait.
- **Made a change to your website but it's not showing up?** Check the
  **Actions** tab on GitHub — you'll see if the auto-publish step succeeded
  or failed, and why.
- **Still stuck?** Tell me exactly what you see on the screen and I'll help
  you figure out the next click!

You've got this! 🌟
