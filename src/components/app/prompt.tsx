import { useGenerateStoryStore } from "@/stores/useGenerateStoryStore"
import { useRef, useState } from "react"
import { Sparkle } from "lucide-react"
import { motion } from 'motion/react';
import { parseStoryPrompt } from "@/utils/parseStoryPrompt";
import { useStoryStore } from "@/stores/useStoryStore";

export function Prompt() {

    const { prompt, setPrompt } = useGenerateStoryStore()
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if(!textareaRef.current) return;
        textareaRef.current.style.height = "30px"; // Reset height
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set new height
        setPrompt(e.target.value);
    };

    const handleWrite = () => {
        if(!prompt) return;
    }

    return (
        <div className="flex gap-2 border-surfaceOutline focus-within:border-primary bg-surface p-2 border rounded-xl">
            <textarea
                ref={textareaRef}
                className="bg-transparent placeholder:opacity-50 px-2 w-full h-[30px] placeholder:text-light overflow-hidden outline-none resize-none self-center"
                placeholder="What's the core of your story?"
                onInput={handleInput}
                value={prompt}
                maxLength={1000}
                autoFocus
            >
            </textarea>
            {/* <button
                className="hover:brightness-110 active:scale-95 disabled:hover:brightness-100 flex items-center gap-2 bg-gradient-to-tr from-primary to-secondary disabled:active:scale-100 disabled:from-surfaceOutline disabled:to-surfaceOutline px-4 py-2 rounded-xl disabled:cursor-default self-end"
                disabled={prompt === ""}
                onClick={handleWrite}
            >
                <Sparkle size={20} />
                <span className="capitalize">write</span>
            </button> */}
            <WriteButton/>
        </div>
    )
}

function WriteButton() {

    const {
        prompt,
        characters,
        settingAtmosphere,
        conflict,
        themes,
        genre,
        narrativePerspective,
        storyStructure,
        toneStyle,
        storyLength,
        audienceAgeGroup,
        language
        // reset
    } = useGenerateStoryStore()
    const { setStory } = useStoryStore()
    const [isLoading, setIsLoading] = useState(false)

    const handleGenerateStory = async () => {
        if (!prompt) return
        setIsLoading(true)
        const storyPrompt = parseStoryPrompt({
            prompt,
            characters,
            settingAtmosphere,
            conflict,
            themes,
            genre,
            narrativePerspective,
            storyStructure,
            toneStyle,
            storyLength,
            audienceAgeGroup,
            language
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
            setStory(story);
            setIsLoading(false)
        } catch (error) {
            console.error("Error generating story:", error);
            setIsLoading(false)
        }
    }

    return (
        <button
            className={`relative flex justify-center items-center overflow-hidden gap-2 bg-primary hover:bg-primaryHover px-4 py-2 rounded-xl w-fit duration-200 ${!prompt ? "opacity-80 cursor-not-allowed" : ""}`}
            onClick={handleGenerateStory}
        >
            {
                isLoading &&
                <div className="top-0 left-0 absolute flex justify-center items-center bg-primary w-full h-full">
                    <motion.div
                        className="border-2 border-b-transparent border-light rounded-full size-6"
                        animate={{
                            rotate: 360
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                    </motion.div>
                </div>
            }
            <Sparkle />
            <span className="capitalize">write</span>
        </button>
    )
}