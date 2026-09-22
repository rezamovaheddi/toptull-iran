import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/v1/auth/[...nextauth]/auth";
import ProfileDashboard from "@/components/profile/ProfileDashboard";

export const metadata = {
  title: "حساب کاربری | تاپ‌تول",
  description: "مشاهده و مدیریت حساب کاربری تاپ‌تول",
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return <ProfileDashboard user={session.user} />;
}

