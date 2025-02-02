import { ArrowUp} from "lucide-react"
import { useGenerateStoryStore } from "@/stores/useGenerateStoryStore"

export default function Prompt() {


    const { prompt, setPrompt } = useGenerateStoryStore()

    const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.target.style.height = "30px";
        e.target.style.height = `${e.target.scrollHeight}px`;
        setPrompt(e.target.value)
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
                className="bg-light opacity-50 hover:opacity-100 p-2 rounded-full select-none aspect-square self-end"
            >
                <ArrowUp size={20} className="stroke-dark" />
            </button>
        </div>
    )
}