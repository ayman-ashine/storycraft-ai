import { useEditorStore } from "@/stores/useEditorStore"
import { useEffect, useRef, useState } from "react"
import { Copy, Save, Sparkle } from "lucide-react"
import Image from "next/image"
import { generateStoryTitle } from "@/api/ai"
import { Loader } from "@/components/ui"

export function Editor() {

    const { story } = useEditorStore()

    return story ? (
        <div className="flex flex-col flex-1 justify-center gap-4">
            <StoryTitle />
            <Story />
            <Controls />
        </div>
    ) : <PlaceHolder />
}

function StoryTitle() {

    const { story, title, setTitle } = useEditorStore()
    const [isLoading, setIsLoading] = useState(false)

    const handleGenerateStoryTitle = async () => {
        if (story || !isLoading) {
            setIsLoading(true)
            generateStoryTitle(story)
                .then(title => {
                    if (title) setTitle(title)
                    setIsLoading(false)
                })
        }
    }

    return (
        <div className="relative flex justify-stretch items-center bg-surface p-2 rounded-xl w-full">
            <input
                className="bg-transparent placeholder:opacity-50 pl-2 w-full font-[600] text-xl placeholder:text-light capitalize outline-none"
                placeholder="Story title"
                onChange={e => setTitle(e.target.value)}
                value={title}
            />
            <button
                className="relative bg-light hover:opacity-70 p-2 rounded-full transition-opacity duration-200 aspect-square ease-in-out"
                onClick={handleGenerateStoryTitle}
            >
                <Sparkle className="stroke-dark" />
                {isLoading && <Loader />}
            </button>
        </div>
    )
}

function Story() {

    const { story, setStory } = useEditorStore()
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {

        if (!textareaRef.current) return;
        textareaRef.current.style.height = "30px";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;

    }, [story])

    return (
        <div className="bg-surface p-4 rounded-xl overflow-hidden">
            <textarea
                ref={textareaRef}
                className="bg-transparent w-full h-full outline-none resize-none"
                onChange={e => setStory(e.target.value)}
                value={story}
                autoFocus
            >
            </textarea>
        </div>
    )
}

function Controls() {

    const { title, story } = useEditorStore()

    const handleCopyStory = () => {
        const content = title ? `${title}\n\n${story}` : story
        navigator.clipboard.writeText(content).then(() => {
            alert("Text copied to clipboard!");
        }).catch(() => {
            console.error("Failed to copy text");
        });
    }

    return (
        <div className="flex justify-end items-center gap-2 w-full">
            <button
                className="flex items-center gap-2 bg-light hover:opacity-70 px-4 py-2 rounded-full transition-opacity duration-200 ease-in-out"
                onClick={handleCopyStory}
            >
                <Copy className="stroke-dark" size={20} />
                <span className="font-[600] text-dark text-nowrap text-sm capitalize">Copy</span>
            </button>
            <button className="flex items-center gap-2 bg-light hover:opacity-70 px-4 py-2 rounded-full transition-opacity duration-200 ease-in-out">
                <Save className="stroke-dark" size={20} />
                <span className="font-[600] text-dark text-nowrap text-sm capitalize">Save</span>
            </button>
        </div>
    )
}

function PlaceHolder() {
    return (
        <div className="flex flex-col flex-1 justify-center items-center gap-2 opacity-50">
            <Image
                className="w-[100px] h-[100px] object-cover"
                src={"/file-notfound.svg"}
                width={100}
                height={100}
                alt="File Not Found"
            />
            <h1 className="font-[600] text-xl">
                {"No story available."}
            </h1>
            <p className="font-[600] text-center">
                {"Go to the prompt section to create one."}
            </p>
        </div>
    )
}