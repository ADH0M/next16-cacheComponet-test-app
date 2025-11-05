"use server";
import prisma from "../db/prisma";
import { revalidateTag, updateTag } from "next/cache";
import { productSchema } from "../schema";
import { getTranslations } from "next-intl/server";

export async function getProductBySlug(id: string) {
  return prisma.product.findUnique({
    where: { id },
  });
}

export async function addToFavorite(
  productId: string,
  userId: string
): Promise<{ success: boolean; ms?: string }> {
  const t = await getTranslations("favorite");
  try {
    if (!productId) return { success: false, ms: t("no-product-id") };
    if (!userId) return { success: false, ms: t("no-user-id") };

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return { success: false, ms: t("productID-not-valid") };
    }

    const favorite = await prisma.favorite.findUnique({
      where: { userId },
    });

    let updatedProducts: string[];

    if (favorite) {
      if (favorite.products.includes(productId)) {
        updatedProducts = favorite.products.filter(
          (prodcut) => prodcut != productId
        );
        await prisma.favorite.update({
          where: { id: favorite.id },
          data: { products: updatedProducts },
        });
        updateTag("products");
        return { success: false, ms: t("remove-from-favorite-success") };
      }
      updatedProducts = [...favorite.products, productId];
      await prisma.favorite.update({
        where: { userId },
        data: { products: updatedProducts },
      });
    } else {
      await prisma.favorite.create({
        data: {
          userId,
          products: [productId],
        },
      });
    }
    updateTag("products");
    return { success: true, ms: t("product-favorite") };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { success: false, ms: t("Server-error") };
  }
}

export type CreateProductState = {
  success?: boolean;
  message?: string;
  fieldErrors?: Record<string, string>;
  globalError?: boolean;
};

export async function createProductClient(
  locale: "en" | "ar",
  initialState: CreateProductState,
  formData: FormData
): Promise<CreateProductState> {
  if (!locale) {
    return { success: false };
  }
  const t = await getTranslations("CreateProductForm");
  // ✅ 2. Parse & validate
  const validatedFields = productSchema(t).safeParse({
    nameEn: formData.get("name-en"),
    nameAR: formData.get("name-ar"),
    slug: formData.get("slug"),
    descriptionEn: formData.get("description-en"),
    descriptionAr: formData.get("description-ar"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    categoryId: formData.get("categoryId") || undefined,
    mainImageUrl: formData.get("mainImageUrl") || "",
    tags: formData.get("tags"),
  });

  // ✅ 3. Handle validation errors
  if (!validatedFields.success) {
    const fieldErrors: Record<string, string> = {};
    validatedFields.error.issues.forEach((issue) => {
      const path = issue.path[0];
      if (typeof path === "string") {
        fieldErrors[path] = issue.message;
      }
    });
    return { success: false, fieldErrors };
  }

  const data = validatedFields.data;

  try {
    // ✅ 5. Clean categoryId: convert empty string to undefined
    const categoryId = data.categoryId === "" ? undefined : data.categoryId;

    // ✅ 6. Prepare data
    const imageList = data.mainImageUrl
      ? [{ url: data.mainImageUrl, isMain: true }]
      : [];

    const tagList = data.tags
      ? data.tags
          .split(",")
          .map((t: string) => t.trim())
          .filter(Boolean)
      : [];

    // ✅ 7. Create product
    const product = await prisma.product.create({
      data: {
        name: {
          en: data.nameEn,
          ar: data.nameAR,
        },
        description: {
          en: data.descriptionEn,
          ar: data.descriptionAr,
        },
        price: data.price,
        stock: data.stock,
        images: imageList,
        tags: tagList,
        categoryId,
      },
    });

    revalidateTag("products", "max");

    return { success: true };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      globalError: true,
      message: "Failed to create product. Please try again.",
    };
  }
}
