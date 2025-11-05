"use client";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

export default function ErrorPage() {
  const t = useTranslations("error-user-page");
  const locale = useLocale();

  return (
    <main className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex flex-col">
      <div
        dir={locale === "ar" ? "rtl" : "ltr"}
        className="grow flex items-center justify-center p-4"
      >
        <div className="max-w-md w-full text-center">
          {/* Error Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
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
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          {/* Content */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t("title")}
          </h1>

          <p className="text-gray-600 mb-1">{t("subtitle")}</p>

          <p className="text-gray-500 text-sm mb-6">{t("description")}</p>

          <p className="text-gray-400 text-xs mb-8 font-mono">
            {t("errorCode")}
          </p>

          {/* Action Button */}
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors shadow-sm"
          >
            {t("backHome")}
          </Link>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-[200%] h-[200%] bg-linear-to-br from-red-50/20 to-transparent transform -rotate-12"></div>
      </div>
    </main>
  );
}
