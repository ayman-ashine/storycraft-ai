import { GoogleGenerativeAI } from "@google/generative-ai"
import { API_AI_THREADS } from "@/api/ai"
import { API_ERRORS } from "@/data/errors"
import { parseGenerateStoryTitlePrompt, parseGenerateStoryPrompt } from "@/utils/parsePrompt"

const genAI = new GoogleGenerativeAI(process.env.API_KEY!)
const model = genAI.getGenerativeModel({ model: "gemini-pro" })

export async function POST(request: Request) {
    try {
        const body = await request.json();
        switch (body.thread) {
            case API_AI_THREADS.GENERATE_STORY:
                return await generateStory(body)
            case API_AI_THREADS.GENERATE_STORY_TITLE:
                return await generateStoryTitle(body)
            default:
                return Response.json(
                    {
                        message: API_ERRORS.ACTION_NOT_SPECIFIED.message,
                    },
                    {
                        status: API_ERRORS.ACTION_NOT_SPECIFIED.status
                    }
                )
        }

    } catch {
        return Response.json(
            {
                message: API_ERRORS.SERVER_ERROR.message,
            },
            {
                status: API_ERRORS.SERVER_ERROR.status
            }
        )
    }
}

async function generateStory({
    concept,
    genre,
    narrativePerspective,
    toneAndStyle,
    audienceAgeGroup,
    storyLength,
    language
}: {
    concept: string,
    genre: string,
    narrativePerspective: string,
    toneAndStyle: string,
    audienceAgeGroup: string,
    storyLength: string,
    language: string
}) {
    try {

        if (!concept) {
            return Response.json(
                {
                    message: API_ERRORS.BAD_REQUEST.message,
                },
                {
                    status: API_ERRORS.BAD_REQUEST.status
                }
            )
        }

        const prompt = parseGenerateStoryPrompt({
            concept,
            genre,
            narrativePerspective,
            toneAndStyle,
            audienceAgeGroup,
            storyLength,
            language
        })
        const result = await model.generateContent(prompt)
        const response = result.response
        const text = response.text()

        return Response.json(text, { status: 200 })

    } catch {
        return Response.json(
            {
                message: API_ERRORS.SERVER_ERROR.message,
            },
            {
                status: API_ERRORS.SERVER_ERROR.status
            }
        )
    }
}

async function generateStoryTitle({ story }: { story: string }) {
    try {

        if (!story) {
            return Response.json(
                {
                    message: API_ERRORS.BAD_REQUEST.message,
                },
                {
                    status: API_ERRORS.BAD_REQUEST.status
                }
            )
        }

        const prompt = parseGenerateStoryTitlePrompt({ story })
        const result = await model.generateContent(prompt)
        const response = result.response
        const text = response.text()

        return Response.json(text, { status: 200 })

    } catch {
        return Response.json(
            {
                message: API_ERRORS.SERVER_ERROR.message,
            },
            {
                status: API_ERRORS.SERVER_ERROR.status
            }
        )
    }
}