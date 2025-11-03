/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/db/prisma";
import { getTranslations } from "next-intl/server";
import { cacheTag } from "next/cache";
import Image from "next/image";
import { Suspense } from "react";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

// 💡 Fetch products with caching
const fetchProducts = async () => {
  "use cache";
  cacheTag("products");
  return prisma.product.findMany({
    take: 9,
    include: {
      category: true,
    },
  });
};

const ProductCard = async ({ product }: { product: any }) => {
  const locale = await getLocale();

  // Get main image or fallback
  const mainImage =
    product.images?.find((img: any) => img.isMain)?.url ||
    product.images?.[0]?.url ||
    "/placeholder.webp";

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden flex flex-col h-full">
      <Link
        href={`/${product.id}`}
        className="block"
        prefetch={false}
      >
        <div className="aspect-square w-full bg-gray-100 relative">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4 flex flex-col grow">
          <h3 className="font-semibold text-gray-900 line-clamp-1 mb-1">
            {product.name}
          </h3>

          {product.category && (
            <p className="text-sm text-gray-500 mb-2">
              {product.category.name}
            </p>
          )}

          <div className="mt-auto">
            <p className="text-lg font-bold text-gray-900">
              {product.price.toLocaleString("en-US", {
                style: "currency",
                currency: product.currency || "USD",
              })}
            </p>

            <span
              className={`inline-block mt-2 px-2 py-1 text-xs font-medium rounded-full ${
                product.stock > 0
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

const Products = async () => {
  const products = await fetchProducts();

  if (products.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No products available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

// 💡 Main Home Page
export default async function HomePage() {
  const t = await getTranslations("HomePage");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">
        {t("title")}
      </h1>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse"
              >
                <div className="aspect-square w-full bg-gray-200" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        }
      >
        <Products />
      </Suspense>
    </div>
  );
}
