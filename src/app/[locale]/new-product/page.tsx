// app/[locale]/products/new/page.tsx
import CreateProductForm from "@/components/product/CreateProductForm";
import { getCategoryOptions } from "@/lib/actions/categories";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function NewProductPage() {
  const t = await getTranslations("CreateProductPage");
  const categories = await getCategoryOptions();
  const cookie =await cookies();
  const user = JSON.parse(cookie.get('user')?.value || "{}");
  if(!user.id &&!user.name&&!user.email){
    return notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{t("title")}</h1>
      <CreateProductForm categories={categories} />
    </div>
  );
}
