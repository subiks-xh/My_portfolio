# Portfolio — Subikshan M

This repository contains a responsive, static portfolio site for Subikshan M.
The root entry point is `index.html` and the site reuses assets from `Task 1/codesoft-project1/`.

What I changed
- Created a clean root entry: `index.html`, with `styles.css` and `script.js`.
- Updated content (Education, Internships, Projects, Certifications, Contact)
  to match the provided resume.

Quick preview (local)
1. Open `d:\portfolio\index.html` in your browser (double-click or use Live Server).

Deploy to Vercel (recommended)
Option A — Connect GitHub (recommended)
1. Push this repository to GitHub (create a new repo and push main branch):

```bash
git init
git add .
git commit -m "Add deployable portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo>.git
git push -u origin main
```

2. Go to https://vercel.com, sign in and choose "Import Project" → "From Git Repository" → select your repo.
3. For a static site, Vercel will auto-detect; use the default build settings (no build required). Click Deploy.

Option B — Vercel CLI (quick)
1. Install Vercel CLI and login:

```bash
npm i -g vercel
vercel login
```

2. From the repo root run:

```bash
vercel --prod
```

Contact form / real email delivery
- The site currently uses a client-side mail compose (mailto) to open your mail client when the contact form is submitted.
- If you want form submissions to be collected (no backend), use Formspree or EmailJS:

Formspree (no backend) — preferred for static portfolios:
1. Create an account at https://formspree.io and create a new form to get your endpoint (e.g. `https://formspree.io/f/xyzabc`).
2. Provide me the full Formspree endpoint URL (the `https://formspree.io/f/...` string). I will add it to the contact form and verify submission.
3. The site already includes AJAX submission to Formspree and will show a success/error message inline — no page reload required.

What I need from you to complete the wiring:
- The Formspree form endpoint URL (example: `https://formspree.io/f/xyzabc`).

If you prefer EmailJS instead (alternative):
- I would need your `service ID`, `template ID`, and `public user ID` from EmailJS to integrate client-side sending.

EmailJS (client-side SMTP):
1. Sign up at https://www.emailjs.com, create a service and template, and follow their docs to configure client-side sending.
2. Update `script.js` to call EmailJS on form submit instead of the `mailto` redirect.

Notes and next steps
- If you want, I can: connect the form to Formspree and update the form action, or integrate EmailJS directly so messages are sent without opening the mail client.
- I can also create a small CI/CD workflow (GitHub Actions) to lint or validate the site before each deploy.

Questions?
- Which deploy option do you prefer (Vercel dashboard, or Vercel CLI)?
- Do you want me to wire Formspree (I'll need the Formspree endpoint) or use EmailJS?
# CODSOFT
All tasks completed for CODSOFT Internship
