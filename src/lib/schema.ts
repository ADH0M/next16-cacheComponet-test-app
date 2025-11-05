import * as z from "zod";

export const productSchema = (t: (ms: string) => string) =>
  z.object({
    nameEn: z.string(t("name-required")).min(1, t("description-min-length")),
    nameAR: z.string(t("name-required")).min(1, t("description-min-length")),
    descriptionEn: z
      .string()
      .min(20, t("description-min-length"))
      .max(250, t("description-max-length")),
    descriptionAr: z
      .string()
      .min(20, t("description-min-length"))
      .max(250, t("description-max-length")),
    price: z.coerce.number(t("price-required")).positive(t("is-positive")),
    stock: z.coerce
      .number(t("stock-required"))
      .int()
      .nonnegative(t("is-non-negative")),
    categoryId: z.string().optional(),
    mainImageUrl: z.string(t("image-required")).optional().or(z.literal("")),
    tags: z.string(t("tags-str")).optional(),
  });
