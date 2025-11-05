"use client";
import { useActionState, useEffect } from "react";
import { createProductClient } from "@/lib/actions/product";
import toast from "react-hot-toast";
import { useLocale, useTranslations } from "use-intl";

type CategoryOption = { id: string; name: { en: string; ar: string } };

export default function CreateProductForm({
  categories,
}: {
  categories: CategoryOption[];
}) {
  const t = useTranslations("CreateProductForm");
  const tToast = useTranslations("tost");
  const locale = useLocale() as "en" | "ar";

  const [state, formAction, isPending] = useActionState(
    createProductClient.bind(null, locale),
    {}
  );
  useEffect(() => {
    if (state.success && !state.message) {
      toast.success(tToast("succes.createProduct"));
    }
  }, [state, tToast]);

  console.log(state.fieldErrors);

  return (
    <form action={formAction} className="space-y-6">
      {/* Name */}
      <div>
        <label
          htmlFor="name-ar"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {t("name")} * العربيه
        </label>
        <input
          type="text"
          id="name-ar"
          name="name-ar"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {state?.fieldErrors?.nameAR && (
          <p className="mt-1 text-sm text-red-600">
            {state.fieldErrors.nameAR}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="name-en"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {t("name")} * English
        </label>
        <input
          type="text"
          id="name-en"
          name="name-en"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {state?.fieldErrors?.nameEn && (
          <p className="mt-1 text-sm text-red-600">
            {state?.fieldErrors.nameEn}
          </p>
        )}
      </div>

      {/* Description */}

      <div>
        <label
          htmlFor="description-ar"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {t("description")}
        </label>
        <textarea
          id="description-ar"
          name="description-ar"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        {state?.fieldErrors?.descriptionEn && (
          <p className="mt-1 text-sm text-red-600">
            {state.fieldErrors.descriptionEn}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="description-en"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {t("description")} * English
        </label>
        <textarea
          id="description-en"
          name="description-en"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {state?.fieldErrors?.descriptionAr && (
          <p className="mt-1 text-sm text-red-600">
            {state.fieldErrors.descriptionAr}
          </p>
        )}
      </div>

      {/* Price */}
      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {t("price")} *
        </label>
        <input
          type="number"
          id="price"
          name="price"
          step="0.01"
          min="0"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {state?.fieldErrors?.price && (
          <p className="mt-1 text-sm text-red-600">
            {state?.fieldErrors?.price}
          </p>
        )}
      </div>

      {/* Stock */}
      <div>
        <label
          htmlFor="stock"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {t("stock")} *
        </label>
        <input
          type="number"
          id="stock"
          name="stock"
          min="0"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Category */}
      <div>
        <label
          htmlFor="categoryId"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {t("category")}
        </label>
        <select
          id="categoryId"
          name="categoryId"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">{t("selectCategory")}</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name[locale]}
            </option>
          ))}
        </select>
      </div>

      {/* Main Image URL */}
      <div>
        <label
          htmlFor="mainImageUrl"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {t("mainImageUrl")}
        </label>
        <input
          type="text"
          id="mainImageUrl"
          name="mainImageUrl"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {state?.fieldErrors?.mainImageUrl && (
          <p className="mt-1 text-sm text-red-600">
            {state?.fieldErrors?.mainImageUrl}
          </p>
        )}
      </div>

      {/* Tags */}
      <div>
        <label
          htmlFor="tags"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {t("tags")}
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          placeholder={t("tagsPlaceholder")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Submit Button */}
      <div>
        <SubmitButton isPending={isPending} label={t("createProduct")} />
      </div>

      {/* General Error */}
      {state?.globalError && <p className="text-red-600">{state.message}</p>}
    </form>
  );
}

function SubmitButton({
  isPending,
  label,
}: {
  isPending: boolean;
  label: string;
}) {
  return (
    <button
      type="submit"
      disabled={isPending}
      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75"
    >
      {isPending ? "Creating..." : label}
    </button>
  );
}
