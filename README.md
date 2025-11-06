# 🛍️ Next.js 16 E-Commerce Demo

A modern, bilingual (Arabic/English) e-commerce demo built with **Next.js 16**, leveraging cutting-edge features like React Server Components, advanced caching, and full internationalization support.

---

## ✨ Key Features

- **Next.js 16** with App Router and React Server Components
- **Full i18n Support**: Seamless switching between **Arabic (RTL)** and **English (LTR)**
- **Responsive UI** with **Tailwind CSS** and built-in RTL handling
- **MongoDB + Prisma ORM** for type-safe data modeling
- **Cloudinary SDK** for optimized image management
- **Smart Caching Strategy** using Next.js 16’s latest performance techniques
- **Live Favorite System**: Heart icon updates instantly to reflect favorite status
- **Shopping Cart** (experimental JSON-based structure)
- **Authentication System** (login/register)
- **New Product Route** for adding products (admin/demo)
- **User Page** for managing favorites and cart
- **Product & Products Routes** for detailed and list views

---

## 🗃️ Data Models (Prisma)

The app uses a clean, embedded-document-friendly schema optimized for MongoDB:

- **`User`**: Authenticated users with address and relations
- **`Product`**: Products with bilingual name/description, images, category, stock
- **`Category`**: Bilingual product categories
- **`Favorite`**: One-to-one per user, storing `productIds` as `String[]`
- **`ShopCard`**: Shopping cart (currently uses `Json` field for items)
- **Embedded Types**:
  - `LocalizedString` → `{ en: String, ar: String }`
  - `Image` → `{ url, alt?, isMain }`
  - `Address` → `{ city, state }`

> 💡 Designed specifically for **MongoDB** using `@db.ObjectId`.

---

## 🛠️ Tech Stack

| Layer                | Technology                   |
| -------------------- | ---------------------------- |
| Framework            | Next.js 16 (App Router)      |
| Styling              | Tailwind CSS + RTL Plugin    |
| Database             | MongoDB                      |
| ORM                  | Prisma Client                |
| Internationalization | Next.js i18n + JSON messages |
| Media Handling       | Cloudinary SDK               |
| Authentication       | NextAuth.js (planned/custom) |
| State (Client)       | React (for interactivity)    |
| Performance          | Server Components + Caching  |

---

## 🧪 Getting Started

1. **Clone the repo**
   ```bash
   git clone <your-repo-url>
   cd nextjs-ecommerce-demo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create `.env.local`:
   ```env
   DATABASE_URL="your_mongodb_connection_string"
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
   ```

4. **Generate Prisma Client**
   ```bash
   npx prisma generate
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. 🌐 Visit [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
/app
 ├── (main)
 │   ├── page.tsx                  # Home page
 │   ├── products/                 # Product listing page
 │   ├── product/[id]/             # Single product details
 │   ├── new-product/              # Add new product (admin/demo)
 │   ├── user/                     # User page (favorites/cart)
 │   └── auth/                     # Login & register routes
 │
 ├── api/                          # API routes (products, favorites, auth)
 ├── messages/
 │   ├── en.json                   # English messages
 │   └── ar.json                   # Arabic messages
 │
 ├── lib/
 │   ├── prisma.ts                 # Prisma client singleton
 │   └── cloudinaryLoader.ts       # Cloudinary image loader
 │
 ├── prisma/
 │   └── schema.prisma             # Database schema
 │
 ├── components/                   # UI components (cards, navbar, etc.)
 └── styles/                       # Tailwind CSS + RTL config
```

---

## 💡 How Favorite Status Works

When products are fetched:

1. If user is logged in → fetch their `favorite.products` (array of IDs)
2. Convert to Set for **O(1)** lookup
3. Enrich each product with `isFavorite: boolean`
4. Frontend renders ❤️ (filled) or ♡ (outline) based on this flag

This ensures **optimal performance** with only **2 database queries**, regardless of product count.

---

## 🌍 Bilingual Experience

- Language is detected from browser or user preference
- UI automatically switches direction (`dir="rtl"` for Arabic)
- All text loaded from `/messages/ar.json` or `/messages/en.json`
- Easy to extend to additional languages in the future

---

## 📈 Future Improvements

- Replace `ShopCard.items: Json` with a proper `CartItem` model  
- Add full **authentication** (NextAuth.js or custom)  
- Implement real-time cart sync  
- Add product **search & filtering**  
- Integrate payment gateway (e.g., Stripe)  
- Admin dashboard for managing inventory

---

## 🙌 Why This Demo?

This project demonstrates how to build a **production-ready, performant, and multilingual** e-commerce frontend using the **latest Next.js features**, while maintaining:

- Clean architecture 🧩  
- Type safety ✅  
- Real-time interactivity ⚡  
- Seamless bilingual UX 🌍  

Perfect for **learning**, **prototyping**, or as a **foundation for your next store**.

---

> 🧱 Built with ❤️ using Next.js 16, Tailwind CSS, Prisma, and Cloudinary.