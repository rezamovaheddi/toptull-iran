"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { User, Lock, Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";
import { registerSchema } from "@/lib/validations/auth";
import { useAuthStore } from "@/store/useAuthStore";

export default function RegisterForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear field-specific error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (serverError) setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setServerError("");
    setSuccessMessage("");

    // Zod Client-Side Validation
    const validation = registerSchema.safeParse(formData);

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
      const res = await fetch("/api/v1/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username.trim(),
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.message || "خطا در ثبت‌نام");
        setIsLoading(false);
        return;
      }

      // Store JWT token if provided
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Update client-side auth store immediately
      if (data.user) {
        useAuthStore.getState().setAuth(data.user);
      }

      // Automatically sign in through NextAuth so session is active
      const loginIdentifier = data.user?.username || formData.username.trim();
      await signIn("credentials", {
        redirect: false,
        username: loginIdentifier,
        password: formData.password,
      });

      setSuccessMessage("ثبت‌نام با موفقیت انجام شد! در حال انتقال...");
      setIsLoading(false);
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 1000);
    } catch (error) {
      setServerError("خطای شبکه رخ داده است. لطفاً دوباره تلاش کنید.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl md:rounded-[40px] shadow-xl p-6 md:p-10 border border-gray-100">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          ثبت‌نام در تاپ‌تول
        </h1>
        <p className="text-sm text-gray-500">
          نام کاربری و رمز عبور حساب خود را تعیین کنید
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Username */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 text-right">
            نام کاربری
          </label>
          <div className="relative flex items-center">
            <div className="absolute right-3 text-gray-400">
              <User size={18} />
            </div>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              disabled={isLoading || Boolean(successMessage)}
              placeholder="مثال: ali_ahmadi"
              className={`w-full pl-4 pr-10 py-3 rounded-xl border ${
                errors.username
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200 bg-gray-50/50"
              } focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-left dir-ltr placeholder:text-right placeholder:dir-rtl text-sm`}
              aria-invalid={errors.username ? "true" : "false"}
            />
          </div>
          {errors.username && (
            <p className="text-xs text-red-500 text-right mt-1">
              {errors.username}
            </p>
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
              disabled={isLoading || Boolean(successMessage)}
              placeholder="رمز عبور خود را وارد کنید"
              className={`w-full pl-10 pr-10 py-3 rounded-xl border ${
                errors.password
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200 bg-gray-50/50"
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
            <p className="text-xs text-red-500 text-right mt-1">
              {errors.password}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 text-right">
            تکرار رمز عبور
          </label>
          <div className="relative flex items-center">
            <div className="absolute right-3 text-gray-400">
              <Lock size={18} />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={isLoading || Boolean(successMessage)}
              placeholder="رمز عبور را دوباره وارد کنید"
              className={`w-full pl-10 pr-10 py-3 rounded-xl border ${
                errors.confirmPassword
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200 bg-gray-50/50"
              } focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-sm`}
              aria-invalid={errors.confirmPassword ? "true" : "false"}
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute left-3 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-500 text-right mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Server Error */}
        {serverError && (
          <div className="p-3 bg-red-50 border border-red-100 rounded-xl">
            <p className="text-sm text-red-600 text-center font-medium">
              {serverError}
            </p>
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-center gap-2">
            <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
            <p className="text-sm text-emerald-700 text-center font-medium">
              {successMessage}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || Boolean(successMessage)}
          className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 transition-all focus:outline-none focus:ring-4 focus:ring-emerald-500/50 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              <span>در حال ثبت‌نام...</span>
            </>
          ) : (
            <span>ثبت‌نام در تاپ‌تول</span>
          )}
        </button>
      </form>

      {/* Footer link */}
      <div className="mt-8 text-center text-sm text-gray-500">
        قبلاً ثبت‌نام کرده‌اید؟{" "}
        <Link
          href="/login"
          className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors"
        >
          ورود به حساب کاربری
        </Link>
      </div>
    </div>
  );
}