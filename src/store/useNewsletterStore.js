// store/useNewsletterStore.js
import { create } from "zustand";

// تابع کمکی اعتبارسنجی آدرس ایمیل
export const validateEmail = (email) => {
    const trimmed = (email || "").trim();
    if (!trimmed) {
        return { isValid: false, error: "لطفاً آدرس ایمیل خود را وارد کنید." };
    }
    if (/\s/.test(trimmed)) {
        return { isValid: false, error: "آدرس ایمیل نباید دارای فاصله باشد." };
    }
    if (!trimmed.includes("@")) {
        return { isValid: false, error: "آدرس ایمیل باید شامل کاراکتر @ باشد." };
    }
    const strictRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!strictRegex.test(trimmed)) {
        return {
            isValid: false,
            error: "فرمت آدرس ایمیل معتبر نیست (مثال: name@domain.com).",
        };
    }
    return { isValid: true };
};

export const useNewsletterStore = create((set, get) => ({
    // وضعیت فرم
    email: "",
    status: "idle", // 'idle' | 'loading' | 'success' | 'error'
    errorMessage: "",

    // داده‌های داینامیک آمار
    articlesCount: 240,
    subscribersCount: 18,

    // اکشن‌ها (Actions)
    setEmail: (email) => {
        set({
            email,
            errorMessage: "",
            status: get().status === "error" ? "idle" : get().status,
        });
    },

    resetForm: () => {
        set({ email: "", status: "idle", errorMessage: "" });
    },

    subscribe: async(customSubmit) => {
        const { email } = get();

        // اعتبارسنجی ایمیل قبل از ارسال
        const validation = validateEmail(email);
        if (!validation.isValid) {
            set({ status: "error", errorMessage: validation.error });
            return false;
        }

        set({ status: "loading", errorMessage: "" });

        try {
            if (customSubmit) {
                await customSubmit(email.trim());
            } else {
                // شبیه‌سازی ارسال به سرور / Next.js API Route
                await new Promise((resolve) => setTimeout(resolve, 900));
            }

            set({
                status: "success",
                errorMessage: "",
            });
            return true;
        } catch (err) {
            set({
                status: "error",
                errorMessage: "خطایی در ارسال رخ داد. لطفاً دوباره تلاش کنید.",
            });
            return false;
        }
    },

    setStats: (articlesCount, subscribersCount) => {
        set({ articlesCount, subscribersCount });
    },
}));