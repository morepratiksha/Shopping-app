# Shopfront

A React + TypeScript storefront: browse products, filter and sort, manage a cart, and check out with a validated form. Product data comes from the free [DummyJSON](https://dummyjson.com) API, so there is no backend to run.

**Live demo:** _add your Vercel/Netlify link here_ · **Screenshot:** _add a screenshot or GIF here_

## Features
- Product grid with loading skeletons and error states
- Search, category filter and sorting, kept in the URL so views can be shared and survive a refresh
- Product detail page (`/product/:id`) with image gallery, stock display and a 404 for bad IDs
- Cart with quantity limits (1 to stock), merged duplicates, derived subtotal/tax/total, and localStorage persistence
- Checkout form with Zod validation and accessible inline errors, then an order confirmation page
- Accessibility: labelled controls, `aria-live` cart count and add-to-cart status, visible focus, reduced-motion support
- Responsive layout (SCSS, BEM naming)

## Stack
React 18 · TypeScript · Vite · React Router · Zustand · React Hook Form · Zod · SCSS · Vitest

## Getting started
```bash
npm install
npm run dev      # start the dev server
npm test         # run cart store tests
npm run build    # type-check and build for production
```

## Structure
```
src/
  components/  ProductCard
  pages/       Home, ProductDetail, Cart, Checkout, Confirmation
  store/       cartStore (+ tests)
  hooks/       useFetch
  schemas/     checkout (Zod)
  styles/      main.scss
```

## What I'd add next
Price-range filter, a slide-out cart drawer with focus trapping, TanStack Query for caching, and component tests for the checkout form.

## Deploy
Push to GitHub, import the repo on Vercel or Netlify (build command `npm run build`, output `dist`). For client-side routing, add a rewrite of all paths to `/index.html`.
