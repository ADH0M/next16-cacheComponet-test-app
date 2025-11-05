import { getLocale, getTranslations } from "next-intl/server";
import { Card } from "@/components/ui/UserCard";
import { Badge } from "@/components/ui/UserBadge";
import { getUser } from "@/lib/actions/user";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function UserProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const cookeStore = await cookies();
  const userDate = JSON.parse(cookeStore.get("user")?.value || "{}");
  if(!userDate.name || !userDate.email ||!userDate.id){
    notFound();
  };


  
  const t = await getTranslations("user");
  const { id } = await params;
  const user = await getUser(id);
  const locale = await getLocale();

  return (
    <div
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="max-w-3xl mx-auto p-4 md:p-6"
    >
      <Card>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{t("profile")}</h1>
          <div className="mt-1 flex items-center gap-2">
            <Badge>{t("id")}</Badge>
            <span className="text-sm font-mono text-gray-600">{user.id}</span>
          </div>
        </div>

        <div className="space-y-5">
          {/* Email */}
          <div>
            <h2 className="text-sm font-medium text-gray-500 mb-1">
              {t("email")}
            </h2>
            <p className="text-gray-900">{user.email}</p>
          </div>

          {/* Name */}
          <div>
            <h2 className="text-sm font-medium text-gray-500 mb-1">
              {t("name")}
            </h2>
            <p className="text-gray-900">
              {user.name || (
                <span className="text-gray-400 italic">{t("notProvided")}</span>
              )}
            </p>
          </div>

          {/* Password (masked) */}
          <div>
            <h2 className="text-sm font-medium text-gray-500 mb-1">
              {t("password")}
            </h2>
            <p className="text-gray-900 font-mono">. . . . . .</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
