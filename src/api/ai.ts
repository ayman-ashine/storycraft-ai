import axios from "axios"

export enum API_AI_THREADS {
    GENERATE_STORY,
    GENERATE_STORY_TITLE
}

async function createAiPost(params: Record<string, string | number | boolean>, logError: boolean = false) {
    try {
        const { status, data } = await axios.post("/ai", params)
        return status === 200 ? data : null
    } catch (error) {
        if (logError) console.error("Error creating ai post:", error)
        return null
    }
}

export async function generateStory({
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
    return await createAiPost({
        thread: API_AI_THREADS.GENERATE_STORY,
        concept,
        genre,
        narrativePerspective,
        toneAndStyle,
        audienceAgeGroup,
        storyLength,
        language
    })
}

export async function generateStoryTitle(story: string) {
    return await createAiPost({
        thread: API_AI_THREADS.GENERATE_STORY_TITLE,
        story
    })
}