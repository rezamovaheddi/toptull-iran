"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { loginSchema } from "@/lib/validations/auth";

export default function LoginForm() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear specific error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (serverError) setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setServerError("");
    
    // Zod Validation
    const validation = loginSchema.safeParse(formData);
    
    if (!validation.success) {
      const fieldErrors = {};
      validation.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        // Since backend expects email and username but we only have one field,
        // we'll send it as both and the backend OR condition will match it.
        email: formData.emailOrUsername,
        username: formData.emailOrUsername,
        password: formData.password,
      });

      if (res?.error) {
        setServerError("اطلاعات وارد شده اشتباه است یا کاربری یافت نشد.");
        setIsLoading(false);
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      setServerError("خطای شبکه رخ داده است. لطفاً دوباره تلاش کنید.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl md:rounded-[40px] shadow-xl p-6 md:p-10 border border-gray-100">
      
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">ورود به حساب کاربری</h1>
        <p className="text-sm text-gray-500">برای دسترسی به پنل مدیریت ابزارها وارد شوید</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Email or Username */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 text-right">
            ایمیل یا نام کاربری
          </label>
          <div className="relative flex items-center">
            <div className="absolute right-3 text-gray-400">
              <User size={18} />
            </div>
            <input
              type="text"
              name="emailOrUsername"
              value={formData.emailOrUsername}
              onChange={handleChange}
              disabled={isLoading}
              placeholder="info@toptul.ir :مثال"
              className={`w-full pl-4 pr-10 py-3 rounded-xl border ${
                errors.emailOrUsername ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50/50"
              } focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-left dir-ltr placeholder:text-right placeholder:dir-rtl text-sm`}
              aria-invalid={errors.emailOrUsername ? "true" : "false"}
            />
          </div>
          {errors.emailOrUsername && (
            <p className="text-xs text-red-500 text-right mt-1">{errors.emailOrUsername}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 text-right">
            رمز عبور
          </label>
          <div className="relative flex items-center">
            <div className="absolute right-3 text-gray-400">
              <Lock size={18} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              placeholder="رمز عبور خود را وارد کنید"
              className={`w-full pl-10 pr-10 py-3 rounded-xl border ${
                errors.password ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50/50"
              } focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-sm`}
              aria-invalid={errors.password ? "true" : "false"}
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-500 text-right mt-1">{errors.password}</p>
          )}
        </div>

        {/* Remember me & Forgot Password */}
        <div className="flex items-center justify-between pt-1">
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            فراموشی رمز عبور؟
          </Link>
          <label className="flex items-center gap-2 cursor-pointer group">
            <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
              مرا به خاطر بسپار
            </span>
            <div className="relative flex items-center">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                disabled={isLoading}
                className="peer sr-only"
              />
              <div className="w-5 h-5 border-2 border-gray-300 rounded peer-focus:ring-2 peer-focus:ring-emerald-500/50 peer-checked:bg-emerald-500 peer-checked:border-emerald-500 transition-all flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </label>
        </div>

        {/* Server Error */}
        {serverError && (
          <div className="p-3 bg-red-50 border border-red-100 rounded-xl">
            <p className="text-sm text-red-600 text-center font-medium">{serverError}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 transition-all focus:outline-none focus:ring-4 focus:ring-emerald-500/50 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              <span>در حال ورود...</span>
            </>
          ) : (
            <span>ورود به پنل کاربری</span>
          )}
        </button>
      </form>

      {/* Footer link */}
      <div className="mt-8 text-center text-sm text-gray-500">
        حساب کاربری ندارید؟{" "}
        <Link href="/register" className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors">
          ثبت‌نام کنید
        </Link>
      </div>
    </div>
  );
}
