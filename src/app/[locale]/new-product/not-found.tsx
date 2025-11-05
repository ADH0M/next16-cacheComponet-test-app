import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

export default function UnauthorizedPage() {
  const t = useTranslations("unauthorized-user-page");
  const locale = useLocale();
  return (
    <main className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex flex-col">
      <div
        dir={locale === "ar" ? "rtl" : "ltr"}
        className="grow flex items-center justify-center p-4"
      >
        <div className="max-w-md w-full text-center">
          {/* Lock Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6 mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a2 2 0 00-2-2H4a2 2 0 00-2 2v4h20z"
              />
            </svg>
          </div>

          {/* Content */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t("title")}
          </h1>

          <p className="text-gray-600 mb-1">{t("subtitle")}</p>

          <p className="text-gray-500 text-sm mb-8">{t("description")}</p>

          <p className="text-gray-400 text-xs mb-8 font-mono">
            {t("errorCode")}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="px-5 py-2.5 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors text-center"
            >
              {t("backHome")}
            </Link>

            <Link
              href="/sign-in"
              className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-center"
            >
              {t("signIn")}
            </Link>
          </div>
        </div>
      </div>

      {/* Subtle background accent */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-linear-to-br from-red-50/10 to-transparent transform rotate-12"></div>
      </div>
    </main>
  );
}
