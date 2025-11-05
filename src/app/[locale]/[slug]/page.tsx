// app/[locale]/products/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { getProductBySlug } from "@/lib/actions/product";

export default async function ProductPage({
  params,
}: PageProps<"/[locale]/[slug]">) {
  const t = await getTranslations("ProductPage");
  const locale = (await getLocale()) as "en" | "ar";
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {product.images && product.images.length > 0 ? (
            <Image
              src={
                product.images.find((img) => img.isMain)?.url ||
                product.images[0].url
              }
              alt={product.images[0].alt || product.name[locale]}
              width={400}
              height={400}
              className="w-full h-96 object-cover rounded-lg shadow-md"
            />
          ) : (
            <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
              {t("noImage")}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {product.name[locale]}
          </h1>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-2xl font-bold text-green-600">
              {product.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>
            {product.stock === 0 ? (
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                {t("outOfStock")}
              </span>
            ) : (
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                {t("inStock")}
              </span>
            )}
          </div>

          {product.description && (
            <p className="text-gray-700 mb-6 leading-relaxed">
              {product.description[locale]}
            </p>
          )}

          {product.tags && product.tags.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-2">{t("tags")}:</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
