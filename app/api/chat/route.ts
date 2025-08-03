import { NextRequest, NextResponse } from "next/server";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText, Message, streamText } from "ai";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const messages: Message[] = await req.json();
    const lastMessage = messages[messages.length - 1];
    const prompt = lastMessage.content;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Invalid prompt" }, { status: 400 });
    }

    console.log(lastMessage);

    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      messages,
    });

    return NextResponse.json({ text }, { status: 200 });
  } catch (error: any) {
    console.error("Error generating text:", error);
    return NextResponse.json(
      { error: "Failed to generate text" },
      { status: 500 }
    );
  }
}
