import { NextResponse } from "next/server";
import rawArticles from "@/lib/data";

export async function GET() {
    try {
        return NextResponse.json({
            success: true,
            data: rawArticles,
        });
    } catch (error) {
        return NextResponse({
            success: false,
            message: error,
        }, { status: 500 }, );
    }
}