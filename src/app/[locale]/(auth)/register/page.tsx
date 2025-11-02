import FormSection from "@/components/auth/FormSection";
import Link from "next/link";

export default function SignUpForm() {
  return (
    <div className="main-page-bg">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
            <p className="text-gray-600 mt-2">
              Join us today for exclusive features
            </p>
          </div>

          <FormSection />

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-medium text-purple-600 hover:text-purple-500 transition"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
