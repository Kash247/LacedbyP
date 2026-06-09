# Laced by P 💇🏽‍♀️✨

An elegant black & gold one-page website for a luxury hair styling business — built as a simple HTML/CSS/JavaScript site so it's easy to edit and free to host.

## See it on your computer

Just **double-click `index.html`** — it opens in your web browser. That's it.

## How to make it yours (no coding needed for most of this)

Open `index.html` in a text editor (Notepad works, but **VS Code** is nicer) and change the text between the tags.

### 1. Your contact details
- **Email:** open `script.js` and change the line `const YOUR_EMAIL = "hello@lacedbyp.com";` to your real email. This is where booking requests are sent.
- **Instagram / WhatsApp:** in `index.html`, find the `contact-links` section near the bottom and replace the `https://instagram.com/` and `https://wa.me/` links:
  - Instagram → `https://instagram.com/yourusername`
  - WhatsApp → `https://wa.me/15551234567` (your number, country code, no symbols)

### 2. Your prices & services
In `index.html`, find the `Services` section and edit the names, descriptions and `from $...` prices.

### 3. Your photos (gallery + about)
The gray boxes are placeholders. To add a real photo:
1. Put your image file (e.g. `style1.jpg`) in the project folder.
2. In `styles.css`, find `.gallery-item` and add this inside it:
   ```css
   background-image: url("style1.jpg");
   background-size: cover;
   background-position: center;
   ```
   (To give each box a different photo, ask and I'll set that up.)

### 4. Colors
All colors live at the top of `styles.css` under `:root`. Change `--gold` or `--black` to restyle the whole site at once.

## Put it online for free (GitHub Pages)

1. Commit and push these files to your GitHub repo.
2. On GitHub: **Settings → Pages → Source: `main` branch → Save**.
3. After a minute your site is live at `https://kash247.github.io/LacedbyP/`.

---
*Need help with any step? Just ask.*
