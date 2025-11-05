import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";
import { MobileManu } from "./MobileManu";
import { Link } from "@/i18n/navigation";
import { Suspense } from "react";
import { checkUser } from "@/lib/actions/user";
import UserProfile, { UserLoading } from "./UserProfile";

const IsSignIn = async () => {
  const t = await getTranslations("btns");
  const cookieStore = await cookies();
  const user = JSON.parse(cookieStore.get("user")?.value || "{}");
  let isSign = false;
  if (user) {
    isSign = await checkUser(user.id, user.email, user.password);
  }

  return (
    <>
      {!isSign ? (
        <div className="flex  gap-2 ">
          <Link
            href={"/sign-in"}
            className="bg-neutral-400 text-sm p-1  md:p-2 rounded-sm  focus:ring-1 ring-pink-500"
          >
            {t("sign-in")}
          </Link>
          <Link
            href={"/register"}
            className="bg-blue-400 rounded-sm p-1 md:p-2 text-sm focus:ring-1 ring-pink-500"
          >
            {t("register")}
          </Link>
        </div>
      ) : (
        <UserProfile username={user.name[0]} id={user.id} />
      )}
    </>
  );
};

const Navbar = async ({ locale }: { locale: "ar" | "en" }) => {
  const navLinks = [
    { label: locale === "ar" ? "منتجات" : "Products", href: `/` },
    { label: locale === "ar" ? "اضف منتجك" : "Add product", href: `/new-product` },
    { label: locale === "ar" ? "بطاقة" : "Card", href: `/card` },
  ];

  return (
    <nav
      dir="ltr"
      className="sticky top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b px-5
       border-gray-200 flex justify-between items-center"
    >
      <div className="w-full mx-auto ">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="shrink-0 font-bold text-xl text-gray-800">Logo</div>

          {/* Desktop Menu - hidden on mobile */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* User Profile (always visible) */}

          <div className="md:flex items-center gap-3 hidden ">
            <Suspense fallback={<UserLoading />}>
              <IsSignIn />
            </Suspense>

            <ul className="text-gray-700 font-light text-sm block md:p-2">
              <li
                className={`${
                  locale === "ar" ? "text-blue-500 underline" : "text-gray-500"
                }`}
              >
                <Link href="/" locale="ar">
                  Ar
                </Link>
              </li>
              <li
                className={`${
                  locale === "en" ? "text-pink-500 underline" : "text-gray-500"
                }`}
              >
                <Link href="/" locale="en">
                  En
                </Link>{" "}
                {/* ✅ Fixed */}
              </li>
            </ul>
          </div>
          {/* Mobile menu button */}
          <MobileManu navLinks={navLinks}>
            <div className="flex items-center gap-3   ">
              <IsSignIn />
              <ul className="text-gray-700 font-light text-sm block md:p-2">
                <li
                  className={`${
                    locale === "ar"
                      ? "text-blue-500 underline"
                      : " text-gray-500"
                  } `}
                >
                  <Link href={"/"} locale="ar">
                    Ar
                  </Link>
                </li>

                <li
                  className={`${
                    locale === "en"
                      ? "text-pink-500 underline"
                      : " text-gray-500"
                  }`}
                >
                  <Link href={"/"} locale="ar">
                    En
                  </Link>
                </li>
              </ul>
            </div>
          </MobileManu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
