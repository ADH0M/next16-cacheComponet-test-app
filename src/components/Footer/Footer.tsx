'use client'

import { useLocale } from 'next-intl'

export default function Footer() {
  const locale = useLocale()
  const year = new Date().getFullYear()
  const isArabic = locale === 'ar'

  return (
    <footer
      dir={isArabic ? 'rtl' : 'ltr'}
      className="w-full border-t border-gray-200 bg-gray-50 mt-10 text-neutral-600"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col md:flex-row justify-center items-center text-sm  gap-3">
        {/* Left side */}
        <div className="flex items-center gap-2">
          <span>© {year} All rights reserved.</span>
          <span className="font-semibold  text-blue-400">
            Adham Said
          </span>
        </div>

      </div>
    </footer>
  )
}
