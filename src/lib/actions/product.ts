"use server";
import prisma from "../db/prisma";
import {  revalidateTag } from "next/cache";
import { productSchema } from "../schema";

export async function getProductBySlug(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      owner: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
}

export type CreateProductState = {
  success?: boolean;
  message?: string;
  fieldErrors?: Record<string, string>;
  globalError?: boolean;
};

export async function createProductClient(
  initialState:CreateProductState,
  formData: FormData
): Promise<CreateProductState> {


  // ✅ 2. Parse & validate
  const validatedFields = productSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description"),
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
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        currency: "USD",
        published: true,
        images: imageList,
        tags: tagList,
        categoryId, // now safe
        // ownerId: ... (add if you have auth)
      },
    });

    revalidateTag('products','max');

    return { success: true };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      globalError: true,
      message: "Failed to create product. Please try again.",
    };
  }
}
