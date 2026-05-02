PROJECT: Interio — Interior Design eCommerce Platform
STACK: Next.js 14 (App Router), MongoDB (Mongoose), Cloudinary (image uploads), Tailwind CSS
DEPLOYMENT TARGET: Vercel

---

### OVERVIEW

Build a full-stack eCommerce website for an interior design business selling products like
PVC panels, wall cladding, false ceilings, and related items. The platform has two sides:

1. Public storefront — customers browse, view product details, and place orders via WhatsApp.
2. Admin panel — the owner manages products, views inquiries, no payment gateway needed.

---

### DATA MODELS (MongoDB via Mongoose)

Product {
  _id, title, slug, description, price, discountPrice,
  category, tags[], images[{ url, public_id }],
  inStock, featured, createdAt
}

Category {
  _id, name, slug, image
}

Order (WhatsApp inquiry log) {
  _id, customerName, customerPhone, items[{ productId, title, qty }],
  message, status (new/seen/resolved), createdAt
}

Admin {
  _id, email, passwordHash
}

---

### PUBLIC STOREFRONT PAGES

/ — Hero section with tagline, featured products grid, category strip, "Why Choose Us" section
/products — Filterable product listing (by category, price range). Grid layout, 12 per page, infinite scroll or pagination.
/products/[slug] — Product detail page:
  - Image gallery (main + thumbnails)
  - Title, price (with strikethrough if discounted), description
  - "Specifications" accordion
  - WhatsApp Order button (see below)
  - Related products section
/categories/[slug] — Category-filtered product listing
/about — About the business
/contact — Contact info + embedded Google Map

WhatsApp Order Button behavior:
  When clicked, open: https://wa.me/91XXXXXXXXXX?text=<encoded message>
  Pre-filled message format:
  "Hello! I'm interested in ordering:
  - [Product Name] × [Qty]
  Price: ₹[price]
  Please confirm availability and delivery details."
  Qty selector (1–10) appears before the button on the product page.

---

### ADMIN PANEL

Route prefix: /admin (protected by NextAuth.js with credentials provider)

/admin — Dashboard: total products, recent inquiries, quick actions
/admin/products — Table of all products with Edit / Delete / Toggle Stock buttons
/admin/products/new — Add product form:
  - Title, slug (auto-generated), description (rich text via react-quill)
  - Price, discount price, stock toggle
  - Category dropdown
  - Image upload (multi-image, drag-and-drop, uploaded to Cloudinary, URLs stored in MongoDB)
  - Tags input
/admin/products/[id]/edit — Same form pre-filled
/admin/categories — CRUD for categories
/admin/orders — List of WhatsApp inquiry logs (read-only, with status toggle)

---

### API ROUTES (Next.js App Router, /app/api/)

GET  /api/products          — list with filters (category, search, page)
GET  /api/products/[slug]   — single product
POST /api/products          — create (admin only)
PUT  /api/products/[id]     — update (admin only)
DEL  /api/products/[id]     — delete (admin only)

GET  /api/categories        — list all
POST /api/categories        — create (admin only)

POST /api/orders            — log a WhatsApp inquiry (called client-side before redirect)
GET  /api/orders            — list (admin only)
PUT  /api/orders/[id]       — update status (admin only)

POST /api/upload            — upload image to Cloudinary, return URL + public_id (admin only)
POST /api/auth/[...nextauth] — NextAuth handler

---

### UI / DESIGN REQUIREMENTS

- Color palette: warm neutrals (cream, warm white, charcoal) + one accent (e.g. deep teal or copper gold)
- Typography: Playfair Display (headings) + Inter (body)
- Mobile-first responsive layout
- Subtle scroll animations (Framer Motion)
- Professional interior design aesthetic — clean, spacious, premium feel
- No generic "add to cart" UI — the CTA is always the WhatsApp button

---

### ENVIRONMENT VARIABLES NEEDED

MONGODB_URI
NEXTAUTH_SECRET
NEXTAUTH_URL
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
NEXT_PUBLIC_WHATSAPP_NUMBER   (e.g. 919876543210)
ADMIN_EMAIL
ADMIN_PASSWORD_HASH

---

### FOLDER STRUCTURE

/app
  /(public)/page.tsx               ← home
  /(public)/products/page.tsx
  /(public)/products/[slug]/page.tsx
  /admin/layout.tsx                ← auth guard
  /admin/page.tsx
  /admin/products/page.tsx
  /admin/products/new/page.tsx
  /api/...
/components
  /ui         ← Button, Badge, Input, Modal, etc.
  /storefront ← ProductCard, ProductGallery, WhatsAppButton, CategoryStrip
  /admin      ← ProductForm, ImageUploader, DataTable
/lib
  /mongodb.ts
  /cloudinary.ts
  /whatsapp.ts   ← buildWhatsAppURL(product, qty)
/models
  Product.ts, Category.ts, Order.ts, Admin.ts

---

### IMPLEMENTATION ORDER

1. MongoDB connection + models
2. Seed script (3 categories, 6 products)
3. Public product listing + detail page + WhatsApp button
4. NextAuth admin login
5. Admin product CRUD + Cloudinary upload
6. Admin order log
7. Polish: homepage hero, animations, mobile nav, SEO meta tags