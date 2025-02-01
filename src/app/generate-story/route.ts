import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { storyPrompt } = body;

        if (!storyPrompt) {
            return Response.json(
                { error: "Missing storyPrompt" },
                { status: 400 }
            );
        }

        const result = await model.generateContent(storyPrompt);
        const response = await result.response
        const text = response.text()

        return Response.json(text, { status: 200 });
    } catch (error) {
        return Response.json(
            { error },
            { status: 500 }
        );
    }
}
