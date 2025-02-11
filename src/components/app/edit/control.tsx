import { useEditorStore } from "@/stores/useEditorStore"
import { useStoriesArchiveStore } from "@/stores/useStoriesArchiveStore"
import { useToastStore } from "@/stores/useToastStore"
import { Copy, Save, X } from "lucide-react"

export function Controls() {

    const { setToast } = useToastStore()
    const { story, setStory } = useEditorStore()
    const { stories, addStory, editStory } = useStoriesArchiveStore()

    const handleCloseStory = () => {
        setStory(null)
    }

    const handleCopyStory = () => {
        if (!story) return
        const content = story.title ? `${story.title}\n\n${story.content}` : story.content
        navigator.clipboard.writeText(content).then(() => {
            setToast({
                title: "Text copied! You can now paste it anywhere.",
                type: "success"
            })
        }).catch(() => {
            setToast({
                title: "Oops! Couldn't copy the text!",
                type: "danger"
            })
        });
    }

    const handleSaveStory = () => {
        if (!story) return
        if (!story.title) {
            setToast({
                title: "Please provide a title for the story to save it.",
                type: "warning"
            });
            return
        }
        if (!story.content) {
            setToast({
                title: "Please provide a story to save it.",
                type: "warning"
            })
            return
        }
        if (!stories.filter(s => s.id === story.id)[0]) {
            addStory({ ...story, updatedAt: new Date().toISOString() })
        } else {
            editStory({ ...story, updatedAt: new Date().toISOString() })
        }
        setToast({
            title: "Story has been saved successfully!",
            type: "success"
        });
    }

    return (
        <div className="flex justify-end items-center gap-2">
            <button
                className="btn-surface"
                onClick={handleCloseStory}
            >
                <X />
                <span className="hidden sm:inline">close</span>
            </button>
            <button
                className="btn-surface"
                onClick={handleCopyStory}
            >
                <Copy />
                <span className="hidden sm:inline">copy</span>
            </button>
            <button
                className="btn-reverse"
                onClick={handleSaveStory}
            >
                <Save />
                <span className="hidden sm:inline">save</span>
            </button>
        </div>
    )
}