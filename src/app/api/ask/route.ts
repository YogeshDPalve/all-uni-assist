import { askGroqWithHistory } from "@/lib/groqChat";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { question } = await req.json();
    const result = await askGroqWithHistory(question || "");
    console.log(result);
    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
