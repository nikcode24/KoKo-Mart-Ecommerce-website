<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/d9c55d65-ddf7-4c0b-b34d-9700e40fe7c0" /># KoKo Mart — React E-Commerce Application

**KoKo Mart** is a responsive e-commerce web app built with React. It uses the
[DummyJSON products API](https://dummyjson.com/docs/products) to power product
browsing, search, filtering, sorting, a wishlist, and a fully persistent
shopping cart.

This is **Project 2** of the Sajilo Life Pvt. Ltd. React Developer
Intern/Trainee Technical Assessment, designed from the reference `Product.png`
mockup (navy `#00235F` + orange `#F06000` palette, NPR currency, "Shop Smart,
Live Better" branding).

---

## Live Demo

> https://ko-ko-mart-ecommerce-website.vercel.app/

---

## Screenshots

> Desktop View
<img width="1920" height="1080" alt="Screenshot (485)" src="https://github.com/user-attachments/assets/8ad20dbc-2938-4ebe-acd2-5f9459d53681" />
<img width="1920" height="1080" alt="Screenshot (486)" src="https://github.com/user-attachments/assets/bf114b11-adf4-4ca1-8580-ac96bf653d2f" />
<img width="1920" height="1080" alt="Screenshot (487)" src="https://github.com/user-attachments/assets/25549c77-57b1-48a2-a57d-2637741344ad" />

> Mobile View
<img width="1920" height="1080" alt="Screenshot (501)" src="https://github.com/user-attachments/assets/8971b27c-033e-45ff-b71f-2a22e9242349" />
<img width="1920" height="1080" alt="Screenshot (502)" src="https://github.com/user-attachments/assets/e8ec9338-e747-4d05-9202-8d0dd5d5b337" />
<img width="1920" height="1080" alt="Screenshot (503)" src="https://github.com/user-attachments/assets/35f4ee8b-35a6-47d5-8b86-fee3a5ff2546" />
<img width="1920" height="1080" alt="Screenshot (504)" src="https://github.com/user-attachments/assets/7b31327b-6613-44c8-b11d-ae720c3765a7" />
<img width="1920" height="1080" alt="Screenshot (505)" src="https://github.com/user-attachments/assets/a2a599df-ff89-4df8-9493-41376c18d265" />
<img width="1920" height="1080" alt="Screenshot (506)" src="https://github.com/user-attachments/assets/c126a83a-1110-485f-97d1-b40431858028" />
<img width="1920" height="1080" alt="Screenshot (507)" src="https://github.com/user-attachments/assets/2107d22e-1aeb-4883-8332-83b553d19590" />

> View the Product page
<img width="1920" height="1080" alt="Screenshot (488)" src="https://github.com/user-attachments/assets/171db991-50ea-4901-bfcf-f1e5f1687ee2" />
<img width="1920" height="1080" alt="Screenshot (489)" src="https://github.com/user-attachments/assets/d3ff3d2a-8cd3-4540-a73e-5a5756674b32" />
<img width="1920" height="1080" alt="Screenshot (490)" src="https://github.com/user-attachments/assets/56b5247a-ba71-4b85-b6a2-68deee49789a" />

> View the Product featured
<img width="1920" height="1080" alt="Screenshot (491)" src="https://github.com/user-attachments/assets/9e403fdd-76bc-49f2-a0a6-aef0e6cd45da" />
<img width="1920" height="1080" alt="Screenshot (492)" src="https://github.com/user-attachments/assets/0d63dd73-745f-4113-b866-aee85b21dc13" />

> View the Product details
<img width="1920" height="1080" alt="Screenshot (493)" src="https://github.com/user-attachments/assets/84fe2007-da23-4c2d-9dc0-9a30edd6e927" />
<img width="1920" height="1080" alt="Screenshot (494)" src="https://github.com/user-attachments/assets/208f2342-014a-4882-84b1-834b5efcf9d4" />
<img width="1920" height="1080" alt="Screenshot (495)" src="https://github.com/user-attachments/assets/ed70cc69-2fd0-4011-a07a-f9798ca213f8" />

> View the Cart page
<img width="1920" height="1080" alt="Screenshot (496)" src="https://github.com/user-attachments/assets/4ae9b1b7-6fa6-4f64-8ef5-15b53e65eaf9" />

> View the Favourite page
<img width="1920" height="1080" alt="Screenshot (497)" src="https://github.com/user-attachments/assets/81d786c9-1b62-48a9-a963-dff986669890" />

> View the login page
<img width="1920" height="1080" alt="Screenshot (498)" src="https://github.com/user-attachments/assets/bf4731e3-9825-4b2d-92e7-8d6cbf849765" />

> View the signup page
 <img width="1920" height="1080" alt="Screenshot (500)" src="https://github.com/user-attachments/assets/4b2a644e-cae5-465c-856a-9b51f9a0cad1" />

---

## Features

### Product listing
- Product cards with image, title, brand, rating, live price, original (strikethrough) price and discount badge
- **Pagination** (12 per page) with numbered controls and prev/next
- **Search** across title, brand and category — with a 300 ms **debounce** and URL sync (`/products?q=shoes`)
- **Category filtering** via chips/URL (`/products?category=beauty`) with an active-filter pill
- **Sorting**: Featured, Price Low → High, Price High → Low, Highest Rated, Biggest Discount
- Skeleton loaders, empty states and graceful API-error states

### Home page
- Summer Sale promo banner
- Category chips row
- **Flash Sale** section with a live countdown (runs until midnight) and auto-picked top-discount deals
- "Top Rated Picks" section

### Product details
- Image gallery (main image + thumbnail strip)
- Price, discount, rating and review count
- Meta: category, brand, live stock, return policy
- Quantity stepper, **Add to Cart** and **Buy Now**
- Customer reviews with rating stars

### Cart & Wishlist
- Add / remove / update quantity (capped at 99)
- Order summary: subtotal, savings, free shipping, **13% VAT**, total
- **Persisted in `localStorage`** (survives refresh)
- Wishlist with heart toggle, also persisted

### Login & Sign Up
- Login ("Welcome Back!") and Sign Up ("Create Account") pages matching the
  reference design
- Client-side validation with inline, accessible error messages
- **Protected route**: `/account` redirects to `/login` when signed out, then
  back to your intended page after login
- Demo auth persisted in `localStorage` (no backend):
  - "Use demo account" quick-fill — `demo@kokomart.np` / `demo123`
  - "Continue with Google / Apple" instant demo login
  - Sign up validates email uniqueness, password strength and match, and terms
- Logout from the Profile page

### Quality & robustness
- Clean component/page/hook/service/context/util structure
- `React Router` with dynamic routes and URL-based filters
- `Context API` for cart, wishlist and toast state
- Reusable components (ProductCard, RatingStars, Pagination, Skeleton, error/empty states)
- **React.lazy + Suspense** code splitting, **Error Boundary** fallback
- Accessible: semantic HTML, labeled inputs, skip link, focus-visible rings,
  `aria-live` toasts, reduced-motion support, keyboard-friendly steppers
- Fully responsive: mobile bottom-nav, desktop header nav, fluid card grid

---

## Tech Stack

- **React 18** (Vite 5 build tool)
- **React Router v6**
- **Axios** for REST API calls
- Plain **CSS** with custom properties (design tokens) — no UI framework
- localStorage for persistence

## Project Structure

```
src/
├── api/            # Axios client + products service (all API calls here)
├── components/     # Reusable UI (ProductCard, RatingStars, Skeleton, States…)
│   └── layout/     # Header, BottomNav, Layout shell
├── context/        # CartContext, WishlistContext, ToastContext
├── hooks/          # useProducts, useProduct, useDebounce
├── pages/          # Home, Products, ProductDetails, Cart, Wishlist, Account, 404
├── utils/          # Currency / discount formatting helpers
├── App.jsx         # Routes (lazy-loaded)
└── theme.css       # Design tokens + global styles
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Install & run locally
```bash
npm install
npm run dev        # http://localhost:5173
```

### Production build
```bash
npm run build      # outputs to dist/
npm run preview    # serve the production build locally
```

## API

Base URL: `https://dummyjson.com` (see [docs](https://dummyjson.com/docs/products))

| Purpose | Endpoint |
| --- | --- |
| All products (194) | `GET /products?limit=0&select=…` |
| Single product | `GET /products/:id` |
| Categories | `GET /products/categories` |
| Search | `GET /products/search?q=…` |

Products are fetched once per session, cached in-memory, then filtered /
sorted / paginated client-side for a snappy UX. Product cards use a `select`
param to keep payloads small.

## Assumptions & Decisions

- **Client-side filtering/sorting/pagination** over server-side, after one
  `limit=0` fetch, gives instant search/category/sort interactions that the
  DummyJSON API can't combine server-side.
- **VAT computed at 13%**, Nepal's standard rate; shipping is free (matches the
  reference design's "NPR 0" row).
- Listing/detail images are served directly from DummyJSON's CDN with lazy
  loading.
- **Auth is a front-end demo only** — credentials are stored in browser
  `localStorage` (plaintext) because the DummyJSON `/auth` endpoints add
  dependencies; a real backend + token-based session would replace
  `AuthContext` in production.
- The checkout button is a lightweight placeholder — checkout flow is out of
  core scope and replaced by a demo toast.
- Cart quantity is capped at 99; removing to zero deletes the line item.
- Product data is cached in-memory (`useProducts`) while cart/wishlist persist
  in `localStorage`.

## Extra Credit Implemented

- **Protected routes** (login required for `/account`) with redirect-back
- Login & Sign Up flow with client-side validation (demo auth via localStorage)
- Debounced, URL-synced search
- URL-based page/category/sort state (shareable, refresh-safe)
- Category filter chips directly on the listing page (with active state)
- Skeleton loaders
- Toast notifications (add/remove/wishlist/auth feedback)
- Confirmation dialog for destructive "Clear cart"
- Error Boundary + React.lazy/Suspense code splitting
- Scroll-to-top on navigation + per-page document titles
- Mobile bottom navigation + desktop header + full footer (logo-only brand)
- In-memory cache to avoid repeated large fetches

---

© Built for the Sajilo Life React Developer Intern/Trainee assessment.
