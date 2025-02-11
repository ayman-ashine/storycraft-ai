import { generateStoryTitle } from "@/api/ai"
import { Spinner } from "@/components/ui"
import { useEditorStore } from "@/stores/useEditorStore"
import { useToastStore } from "@/stores/useToastStore"
import { getDirection } from "@/utils/getDirection"
import { Sparkle } from "lucide-react"
import { useState } from "react"

export function Title() {

    const { story, editStory } = useEditorStore()
    const { setToast } = useToastStore()
    const [isLoading, setIsLoading] = useState(false)

    const handleGenerateStoryTitle = () => {
        if (!story) return
        if (!story.content) {
            setToast({
                title: "Please provide a story to generate a title.",
                type: "warning"
            })
            return
        }
        if (!isLoading) {
            setIsLoading(true)
            generateStoryTitle(story.content)
                .then(title => {
                    if (title) editStory({ title })
                    else {
                        setToast({
                            title: "Error",
                            description: "Oops! Something went wrong while generating the story.",
                            type: "danger"
                        })
                    }
                    setIsLoading(false)
                })
        }
    }

    return (
        <div
            className="relative flex items-center w-full"
            dir={getDirection(story?.title)}
        >
            <input
                className="input"
                placeholder="Title..."
                onChange={e => editStory({ title: e.target.value })}
                value={story?.title}
            />
            <button
                className="group ltr:right-0 rtl:left-0 absolute ltr:mr-1 rtl:ml-1 btn-circle-primary"
                onClick={handleGenerateStoryTitle}
                title="Generate title"
            >
                <Sparkle className="group-hover:rotate-180 transition-transform group-disabled:transition-none duration-500" />
                {isLoading && <Spinner type="primary" />}
            </button>
        </div>
    )
}