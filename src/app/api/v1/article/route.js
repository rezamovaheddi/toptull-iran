import { NextResponse } from "next/server";
import { getArticles } from "@/lib/articles";

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: getArticles(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "خطا در دریافت مقالات",
      },
      { status: 500 }
    );
  }
}
