import SignInForm from "@/components/auth/SingIn";
import Link from "next/link";

export default function SignUpForm() {
  return (
    <div className="main-page-bg">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Sign In</h1>
            <p className="text-gray-600 mt-2">
              Join us today for exclusive features
            </p>
          </div>

          <SignInForm />

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              if you haven&apos;t an account?{" "}
              <Link
                href="/register"
                className="font-medium text-purple-600 hover:text-purple-500 transition"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
