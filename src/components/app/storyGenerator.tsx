import { useEffect } from "react";
import { useGenerateStoryStore } from "@/stores/useGenerateStoryStore";
import { useStoryStore } from "@/stores/useStoryStore";
import parseGenerateStoryPrompt from "@/utils/parseGenerateStoryPrompt";


export default function StoryGenerator() {

    const {
        prompt,
        genre,
        narrativePerspective,
        toneAndStyle,
        audienceAgeGroup,
        storyLength,
        language,
        isGenerating,
        setIsGenerating
    } = useGenerateStoryStore()
    const { setStory } = useStoryStore()

    useEffect(() => {

        async function generate() {
            const storyPrompt = parseGenerateStoryPrompt({
                prompt,
                genre,
                narrativePerspective,
                toneAndStyle,
                audienceAgeGroup,
                storyLength,
                language,
            })
            try {
                const response = await fetch("/generate-story", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ storyPrompt }),
                });
                if (!response.ok) {
                    throw new Error('Failed to generate story');
                }
                const story = await response.json();
                setStory(story)
                setIsGenerating(false)
            } catch (error) {
                console.error("Error generating story:", error);
                setIsGenerating(false)
            }
        }

        if (isGenerating) generate()

    }, [isGenerating])

    return null
}