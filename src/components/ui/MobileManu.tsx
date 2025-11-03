"use client";

import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useState } from "react";

type NavLinks = { label: string; href: string };
export const MobileManu = ({
  children,
  navLinks,
}: {
  children: React.ReactNode;
  navLinks: NavLinks[];
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const locale = useLocale();
  return (
    <div
      className=" flex relative md:hidden"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <button
        className=" flex items-center text-gray-600"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {/* Mobile Menu - slide down */}
      {mobileMenuOpen && (
        <div className=" bg-white border-t w-56 px-4 pb-5 rounded-b-md border-gray-200 shadow-lg absolute top-11 -right-5">
          <div className=" pt-2 pb-3 space-y-1 ">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          {children}
        </div>
      )}
    </div>
  );
};
