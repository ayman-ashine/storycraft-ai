import { ArrowUp } from "lucide-react"
import { useGenerateStoryStore } from "@/stores/useGenerateStoryStore"


export default function Prompt() {

    const { prompt, setPrompt, isGenerating, setIsGenerating } = useGenerateStoryStore()

    const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.target.style.height = "30px";
        e.target.style.height = `${e.target.scrollHeight}px`;
        setPrompt(e.target.value)
    }

    const handleGenerateStory = () => {
        if(prompt && !isGenerating) setIsGenerating(true)
    }

    return (
        <div className="flex gap-4 bg-surface shadow-md p-4 rounded-xl w-full">
            <textarea
                className="bg-transparent placeholder:opacity-50 w-full h-[30px] placeholder:text-light placeholder:capitalize overflow-hidden outline-none resize-none self-center"
                placeholder="prompt..."
                onChange={handleOnChange}
                value={prompt}
                maxLength={2000}
            >
            </textarea>
            <button
                className="relative bg-light hover:opacity-80 disabled:opacity-50 p-2 rounded-full disabled:cursor-default select-none aspect-square self-end"
                onClick={handleGenerateStory}
                disabled={prompt === ""}
            >
                <ArrowUp size={20} className="stroke-dark" />
                {
                    isGenerating &&
                    <div className="top-0 left-0 absolute flex justify-center items-center bg-light rounded-full w-full h-full">
                        <div className="border-2 border-dark border-b-transparent rounded-full animate-spin size-[20px]"></div>
                    </div>
                }
            </button>
        </div>
    )
}