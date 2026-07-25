# ABC POS — Static Demo Site

Everything here is plain HTML, CSS and JavaScript. No build step, no server, no database.
Deploy the folder as-is and it works.

```
index.html            Demo menu (the receipt)
pos/index.html        The till — interactive, incl. the offline → sync demo
dashboard/index.html  Owner dashboard — seeded sales, chart, trial balance
admin/index.html      Platform admin — add a business, seeded tenant list
deck/index.html       Product guide (English PDF + Urdu)
```

---

## Deploy to Cloudflare Pages (free, ~10 minutes)

1. **Put this folder in a Git repo** and push to GitHub.
   ```bash
   git init && git add . && git commit -m "ABC POS demo site"
   git remote add origin git@github.com:<you>/abcpos-demo.git
   git push -u origin main
   ```

2. **Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git.**
   Pick the repo, then:
   - Framework preset: **None**
   - Build command: *leave empty*
   - Build output directory: `/` (or the subfolder if you nested it)

3. **Save and Deploy.** You get a `*.pages.dev` URL immediately.

4. **Add your own address.** In the project → *Custom domains* → *Set up a domain* →
   `demo.bytecraft.live`. If `bytecraft.live` already uses Cloudflare DNS, the record is
   added for you and the certificate is issued automatically. Nothing to configure.

5. **Check it on a phone.** Every page is responsive; the till is best shown on a tablet
   or in a landscape phone view.

Any push to `main` redeploys. Pull requests get their own preview URL, which is useful
if you want a client to review a change before it goes on the main demo link.

### Netlify, Vercel or GitHub Pages
All work the same way — it's a static folder. Drag-and-drop deploy also works on
Netlify if you'd rather not use Git yet.

---

## Running it locally

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

Opening `index.html` directly with `file://` mostly works, but a local server is
closer to how it will behave when hosted.

---

## Demoing it — the order that lands best

1. **The till.** Add a few items, pick a table, take a cash payment with a quick-tender
   button so the change calculation shows. Print the receipt.
2. **Break the internet.** Tap the green ONLINE chip. Ring up another order. Point out
   that nothing changed for the cashier, the order shows as PENDING, and the receipt
   still printed.
3. **Bring it back.** Tap the chip again and let them watch the queue drain and flip to
   SYNCED. This is the moment that sells the product — let it play out.
4. **Owner dashboard.** Change the date range so they see it respond. Scroll to the
   trial balance and say the part that matters: nobody typed any of it.
5. **Admin.** Create a business with their own name in it. Takes ten seconds and makes
   the whole thing feel real.

---

## What is real and what is not

| | |
|---|---|
| Real | All the UI, the receipt layout, the offline queue and sync behaviour, the till's cart and payment maths |
| Seeded | Dashboard sales figures, top items, trial balance, tenant list |
| Not connected | No API, no database. Reloading the page resets everything |

The dashboard's numbers are all derived from one array of 14 trading days
(`DAYS` in `dashboard/index.html`), so the KPIs, the chart and the trial balance can
never contradict each other. Debits and credits foot exactly — worth pointing at if a
client's accountant is in the room.

To use the client's own name in a pitch, edit `DAYS`, `TOP_ITEMS` and the header text
in `dashboard/index.html`, and `SEED` in `admin/index.html`.

---

## Switching to live data later

Both the dashboard and the admin page start with a `CONFIG` block:

```js
const CONFIG = { MODE:'demo', API_BASE:'https://api.bytecraft.live' };
```

When the API is deployed, set `MODE:'live'` and add the fetch calls against
`API_BASE` (`/api/reports/daily-sales`, `/api/reports/trial-balance`,
`/api/admin/tenants`). The render functions already take plain data objects in the
same shape the API returns, so only the data source changes — not the markup.

Keep a demo build on `demo.bytecraft.live` even after the live version exists. It has
no cold start, no login, and nothing to go wrong five minutes before a meeting.

---

ByteCraft — bytecraft.live · hello@bytecraft.live
