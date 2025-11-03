"use client";
import { signInAciton } from "@/lib/actions/auth";
import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import { useActionState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

const SignInForm = () => {
  const [state, formAction, pending] = useActionState(signInAciton, {});
  const timeOut = useRef<NodeJS.Timeout>(null);
  const t = useTranslations("auth");
  const tTost = useTranslations("tost");
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (state?.ms === "create user is succesful") {
        toast(tTost("succes.signinSucces"));
        timeOut.current = setTimeout(() => {
          redirect("/user");
        }, 1000);
      } else if (state.ms === "server error") {
        toast(tTost("error.signinError"));
      } else if (state.ms === "incorrect") {
        toast(tTost("error.incorrect"));
      }
    }

    return () => {
      if (timeOut.current) clearTimeout(timeOut.current);
    };
  }, [state]);
  return (
    <form className="space-y-6" action={formAction}>
      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {t("email")}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className={`w-full px-4 py-3 rounded-lg border text-gray-800 outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition`}
          placeholder="you@example.com"
        />
        {state.email && (
          <p className="mt-1 text-sm text-red-600">{state.email}</p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {t("password")}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-purple-500  outline-none
                    focus:border-transparent transition text-gray-800`}
          placeholder="••••••••"
        />
        {state.password && (
          <p className="mt-1 text-sm text-red-600">{state.password}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`w-full py-3 px-4 rounded-lg bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium shadow-md transition-all duration-200 `}
      >
        {pending ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {t("signin")}...
          </span>
        ) : (
          t("signin")
        )}
      </button>
    </form>
  );
};

export default SignInForm;
