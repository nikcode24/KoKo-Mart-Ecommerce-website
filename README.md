# KoKo Mart — React E-Commerce Application

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

> Deployment link to be added here once deployed (e.g. Vercel / Netlify).

---

## Screenshots

> Screenshots to be added here once the app is running (desktop + mobile).

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