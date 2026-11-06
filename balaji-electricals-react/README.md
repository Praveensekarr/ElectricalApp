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

## Backend integration (Spring Boot API)
The storefront now reads and writes everything through the Balaji Electricals backend.

1. Start PostgreSQL and the Spring Boot backend (default `http://localhost:8080`).
2. Run the frontend: `npm install && npm run dev` (opens on `http://localhost:5173`).
3. To use a different API address, edit `.env.development` / `.env.production` (`VITE_API_BASE_URL`, see `.env.example`).
   The backend's `CORS_ALLOWED_ORIGINS` must include the origin the frontend is served from.

Where things live:
- `src/api/client.js` — single fetch wrapper: base URL, JSON, 15 s timeout, normalised errors, JWT header, auto-logout on 401.
- `src/api/index.js` — one function per endpoint (products, quote, orders, auth, admin).
- `src/components/` — `AdminLoginModal`, `ProductEditModal`, `AdminOrdersPanel`.

Behaviour:
- **Prices, bulk rates, coupons, GST and invoice numbers come only from the server.** The cart calls `POST /api/orders/quote`; the invoice screen shows the saved order returned by `POST /api/orders`. The old "Contractor Bulk Rates" switch was removed because bulk pricing now applies automatically at each product's configured minimum quantity.
- **Stock** is deducted only when an admin moves an order to CONFIRMED (Admin → Orders). Editing a product never changes its stock; use the +10 / -5 buttons.
- **Admin login** uses `POST /api/auth/login`. The JWT is kept in `sessionStorage` (cleared when the tab closes) and sent only to `/api/admin/*`. An expired token returns you to the login prompt.
- Cart and wishlist remain in `localStorage`; the catalogue no longer does.
- The WhatsApp button in the cart only sends a quotation message. "Generate Official Invoice" is what saves the order.

## Important notes
- Verify all prices, product claims, GST details, address, contact numbers, UPI ID and service rates before publishing.
- Use HTTPS for the API in production; the JWT travels in the Authorization header.
