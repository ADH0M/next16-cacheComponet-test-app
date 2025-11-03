"use client";
import { useActionState, useEffect } from "react";
import { createProductClient } from "@/lib/actions/product";
import toast from "react-hot-toast";
import { useTranslations } from "use-intl";

type CategoryOption = { id: string; name: string };

export default function CreateProductForm({
  categories,
}: {
  categories: CategoryOption[];
}) {
  const [state, formAction, isPending] = useActionState(
    createProductClient,
    {}
  );
  const t = useTranslations("CreateProductForm"); // ✅ namespace جديد
  const tToast = useTranslations("tost"); // للـ toast

  useEffect(() => {
    if (state.success && !state.message) {
      toast.success(tToast("succes.createProduct"));
    }
  }, [state, tToast]);

  return (
    <form action={formAction} className="space-y-6">
      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {t("name")} *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {state?.fieldErrors?.name && (
          <p className="mt-1 text-sm text-red-600">{state?.fieldErrors.name}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {t("description")}
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
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
          required
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
              {cat.name}
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
          type="url"
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
