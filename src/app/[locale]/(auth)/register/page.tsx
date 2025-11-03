import FormSection from "@/components/auth/FormSection";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function SignUpForm() {
  const t = useTranslations("auth");
  return (
    <div className="main-page-bg flex justify-center   -mt-3">
      <div className="w-full max-w-md bg-white max-h-fit rounded-2xl shadow-xl overflow-hidden ">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">{t("title1")}</h1>
            <p className="text-gray-600 mt-2">{t("sub-title1")}</p>
          </div>

          <FormSection />

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 ">
              {t("alreadyHaveAccount")}

              <Link
                href="/sign-in"
                className="font-medium text-purple-600 hover:text-purple-500 transition"
              >
                {" "}
                {t("title2")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
