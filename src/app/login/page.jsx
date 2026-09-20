import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/v1/auth/[...nextauth]/auth";
import LoginForm from "@/components/auth/LoginForm";
import Logo from "@/components/navbar/Logo";

export const metadata = {
  title: "ورود به حساب کاربری",
  description: "وارد حساب کاربری تاپ‌تول خود شوید.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/"); // Redirect to home or dashboard if already logged in
  }

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white overflow-hidden text-gray-900 font-sans" dir="rtl">
      
      {/* Mobile Header (Hidden on Desktop) */}
      <div className="md:hidden flex flex-col items-center justify-center bg-emerald-600 bg-gradient-to-br from-emerald-500 to-emerald-800 pt-12 pb-24 px-4 relative">
        <div className="absolute inset-0 bg-black/10 z-0"></div>
        <div className="relative z-10 flex flex-col items-center">
          <Logo className="brightness-0 invert opacity-100" />
          <p className="mt-4 text-white/90 text-sm font-medium text-center">
            تولیدکننده پیشرو ابزارهای صنعتی و کارگاهی حرفه‌ای
          </p>
        </div>
      </div>

      {/* Right Column - Form Container (First in RTL flex) */}
      <div className="flex-1 flex justify-center items-start md:items-center p-4 md:p-8 
                      md:bg-emerald-600 md:bg-gradient-to-br md:from-emerald-500 md:to-emerald-800 
                      md:rounded-l-[60px] lg:rounded-l-[100px] shadow-2xl relative z-20 
                      -mt-12 md:mt-0">
        <LoginForm />
      </div>

      {/* Left Column - Branding (Hidden on Mobile, Second in RTL flex) */}
      <div className="hidden md:flex flex-1 flex-col justify-center items-center p-8 bg-white z-10">
        <div className="flex flex-col items-center">
          <Logo className="scale-150 mb-8" />
          <p className="text-gray-500 text-lg font-medium tracking-wide">
            تولیدکننده پیشرو ابزارهای صنعتی و کارگاهی حرفه‌ای با استانداردهای جهانی
          </p>
        </div>
      </div>

    </div>
  );
}
