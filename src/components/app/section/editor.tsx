import { useEditorStore } from "@/stores/useEditorStore"
import { useEffect, useRef, useState } from "react"
import { Copy, Save, Sparkle } from "lucide-react"
import { generateStoryTitle } from "@/api/ai"
import { Spinner } from "@/components/ui"
import { useToastStore } from "@/stores/useToastStore"

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

    const handleGenerateStoryTitle = () => {
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
                className="btn-circle btn-reverse"
                onClick={handleGenerateStoryTitle}
            >
                <Sparkle className="stroke-dark" />
                {isLoading && <Spinner bgColor="light" spinnerColor="dark" />}
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
        <div className="border-surfaceHover bg-surface p-4 border rounded-xl overflow-hidden">
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

    const { setToast } = useToastStore()
    const { title, story } = useEditorStore()

    const handleCopyStory = () => {
        const content = title ? `${title}\n\n${story}` : story
        navigator.clipboard.writeText(content).then(() => {
            setToast({
                title: "Text copied! You can now paste it anywhere.",
                type: "success"
            })
        }).catch(() => {
            setToast({
                title: "Oops! Couldn't copy the text.",
                type: "danger"
            })
        });
    }

    return (
        <div className="flex justify-end items-center gap-2 w-full">
            <button
                className="btn btn-surface"
                onClick={handleCopyStory}
            >
                <Copy />
                <span>copy</span>
            </button>
            <button className="btn btn-surface">
                <Save className="stroke-dark" size={20} />
                <span>save</span>
            </button>
        </div>
    )
}

function PlaceHolder() {
    return (
        <div className="flex flex-col flex-1 justify-center items-center gap-2 opacity-50">
            <svg className="stroke-2 stroke-light" width="100px" height="100px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none">
                <polyline points="34.48 54.28 11.06 54.28 11.06 18.61 23.02 5.75 48.67 5.75 48.67 39.42" />
                <polyline points="23.04 5.75 23.02 18.61 11.06 18.61" />
                <line x1="16.21" y1="45.68" x2="28.22" y2="45.68" />
                <line x1="16.21" y1="39.15" x2="31.22" y2="39.15" />
                <line x1="16.21" y1="33.05" x2="43.22" y2="33.05" />
                <line x1="16.21" y1="26.95" x2="43.22" y2="26.95" />
                <circle cx="42.92" cy="48.24" r="10.01" strokeLinecap="round" />
                <line x1="39.05" y1="44.36" x2="46.8" y2="52.11" />
                <line x1="39.05" y1="52.11" x2="46.8" y2="44.36" />
            </svg>
            <h1 className="font-[600] text-xl">
                {"No story available."}
            </h1>
            <p className="font-[600] text-center">
                {"Go to the prompt section to create one."}
            </p>
        </div>
    )
}