# ABC POS — Client Demo

A static site. No build step, no server, no database. Deploy the folder as-is.

```
index.html          Landing page
app/pos/            The till — try it, take it offline, print a receipt
app/dashboard/      Owner dashboard
deck/               Product guide (English PDF + Urdu)
```

## Deploy

**Cloudflare Pages / Netlify** — connect the repo. Framework preset: *None*.
Build command: *empty*. Output directory: `/`.

**GitHub Pages** — push these files to the repo root, then
Settings → Pages → Deploy from a branch → `main` / `(root)`.
The `.nojekyll` file is already included and must stay.

**Locally**
```bash
python3 -m http.server 8080
```

## Showing it to a client

1. Open the till. Add a few items, take a cash payment with a quick-tender
   button so the change calculation shows, print the receipt.
2. Tap the green **ONLINE** chip. Sell again. The order queues as PENDING and
   the receipt still prints.
3. Tap it back. Watch the queue drain to SYNCED. Let this moment land — it is
   the thing that sells the product.
4. Switch to **Mart**. Scan `6291001`, then `2000011` to show weighed produce,
   then search `naan` or `milk` to show finding a product by name.
5. Open the dashboard. Change the date range so they see it respond, then
   scroll to the trial balance and say that nobody typed any of it.

## Before you publish

- Set your real prices on the landing page (`index.html`, pricing section).
- Point the contact links at your own address if they change.
- Optional: replace the three gradient panels in the "Who it's for" section with
  real photos — add `--photo-restaurant`, `--photo-grocery` and `--photo-fuel`
  to `:root` in `index.html`, each `url('assets/img/yourfile.jpg')`.

ByteCraft · bytecraft.live
