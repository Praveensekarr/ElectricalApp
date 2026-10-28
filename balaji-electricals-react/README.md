# Balaji Electricals — Updated React Website

This Vite + React project uses the updated design code supplied by you. It includes the customer storefront, product catalogue and filters, cart and checkout UI, WhatsApp order flow, electrician booking, electrical load calculator, and admin/demo inventory view as implemented in the source component.

## Requirements
- Node.js 20+ recommended
- Internet connection for Tailwind CSS CDN, Google Fonts, remote product images and WhatsApp links

## Run on Windows / VS Code
1. Extract the ZIP folder.
2. Open the extracted `balaji-electricals-react` folder in VS Code.
3. Open **Terminal → New Terminal**.
4. Run:
   ```bash
   npm install
   npm run dev
   ```
5. Open the local URL shown by Vite (usually `http://localhost:5173`).

## Production build
```bash
npm run build
npm run preview
```

## Project structure
- `src/App.jsx` — updated React design and storefront logic
- `src/main.jsx` — React entry point
- `src/styles.css` — base styling
- `index.html` — Vite page entry and Tailwind CDN setup

## Important notes
- Product, cart and wishlist data are stored in the browser's localStorage; this is not a shared online database.
- The Admin switch is a front-end demo, not a secure admin login. Add server-side authentication/authorization before deploying it publicly.
- Verify all prices, product claims, GST details, address, contact numbers, UPI ID and service rates before publishing.
- The code has been packaged, but a successful production build and browser interaction test have not been confirmed in this environment.
