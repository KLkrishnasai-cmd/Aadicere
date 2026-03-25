# Aadicere Website Deployment Structure

This repository is organized so you can host:

- `aadicere.tech` -> home page (`index.html`)
- `nrg-aadicere.tech` -> NRG division page (`nrg.html`)
- `arx-aadicere.tech` -> ARX division page (`arx.html`)
- `strux-aadicere.tech` -> STRUX division page (`strux.html`)
- `iatrik-aadicere.tech` -> IATRIK division page (`iatrik.html`)

## Current File Layout

- `index.html` - main home page for `aadicere.tech`
- `nrg.html` - NRG division page for `nrg-aadicere.tech`
- `arx.html` - ARX division page
- `strux.html` - STRUX division page
- `iatrik.html` - IATRIK division page
- `privacy.html` - Privacy policy
- `terms.html` - Terms of use
- `styles.css` - shared styles
- `script.js` - shared interactions
- `images/` - image assets

## Hosting Mapping (No File Moves Required)

Use host-based routing at your hosting provider:

1. Serve `index.html` when host is `aadicere.tech`.
2. Serve `nrg.html` when host is `nrg-aadicere.tech`.
3. Serve `arx.html` when host is `arx-aadicere.tech`.
4. Serve `strux.html` when host is `strux-aadicere.tech`.
5. Serve `iatrik.html` when host is `iatrik-aadicere.tech`.
6. Keep static assets (`styles.css`, `script.js`, `images/`) available from the same project root.

## DNS Setup

1. Create `A` or `CNAME` record for `aadicere.tech` to your hosting platform.
2. Create `A` or `CNAME` record for `nrg-aadicere.tech` to the same hosting platform.
3. Create `A` or `CNAME` record for `arx-aadicere.tech` to the same hosting platform.
4. Create `A` or `CNAME` record for `strux-aadicere.tech` to the same hosting platform.
5. Create `A` or `CNAME` record for `iatrik-aadicere.tech` to the same hosting platform.
6. In hosting settings, add all custom domains.
