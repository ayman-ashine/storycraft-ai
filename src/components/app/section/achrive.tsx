import { PenLine, Trash2, Clock, Copy, RotateCw } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { useStoriesArchiveStore } from "@/stores/useStoriesArchiveStore"
import { useToastStore } from "@/stores/useToastStore"
import { Story } from "@/data/types"
import { useEditorStore } from "@/stores/useEditorStore"
import { SECTION, useSectionStore } from "@/stores/useSectionStore"

export function Archive() {

    const { stories } = useStoriesArchiveStore()

    return stories.length ? (
        <div className="flex flex-col flex-1 justify-center gap-4">
            {
                stories.map(story => {
                    return (
                        <StoryCard
                            key={story.id}
                            id={story.id}
                            title={story.title}
                            content={story.content}
                            createdAt={story.createdAt}
                            updatedAt={story.updatedAt}
                        />
                    )
                })
            }

        </div>
    ) : <PlaceHolder />
}

function StoryCard({
    id,
    title,
    content,
    createdAt,
    updatedAt,
}: Story) {

    const { setToast } = useToastStore()
    const { removeStory } = useStoriesArchiveStore()
    const { setStory } = useEditorStore()
    const { setSection } = useSectionStore()

    const handleEditStory = () => {
        setStory({
            id,
            title,
            content,
            createdAt,
            updatedAt
        })
        setSection(SECTION.EDIT)
    }

    const handleCopyStory = () => {
        const story = `${title}\n\n${content}`
        navigator.clipboard.writeText(story).then(() => {
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

    const handleRemoveStory = () => {
        removeStory(id)
        setToast({
            title: "Story was removed.",
            type: "success"
        })
    }

    return (
        <div className="group flex flex-col items-stretch gap-2 border-2 border-surfaceHover hover:border-primary hover:shadow-md p-4 rounded-xl duration-200 overflow-hidden ease-in-out item">
            {/* Title and actions */}
            <div className="flex md:flex-row flex-col-reverse justify-between items-end md:items-center gap-2 overflow-hidden">
                <div className="w-full font-[600] capitalize">
                    {title}
                </div>
                <div className="group-hover:h-fit flex flex-grow items-center gap-2 opacity-0 group-hover:opacity-100 w-fit h-0 md:h-fit duration-200 overflow-hidden ease-in-out">
                    <button
                        className="btn-circle btn-primary"
                        onClick={handleEditStory}
                    >
                        <PenLine />
                        {/* <span className="hidden">edit</span> */}
                    </button>
                    <button
                        className="btn-circle btn-surface"
                        onClick={handleCopyStory}
                    >
                        <Copy />
                        {/* <span className="hidden">copy</span> */}
                    </button>
                    <button
                        className="btn-circle btn-danger"
                        onClick={handleRemoveStory}
                    >
                        <Trash2 />
                        {/* <span className="hidden">remove</span> */}
                    </button>
                </div>
            </div>
            {/* Story preview content */}
            <div className="line-clamp-2 overflow-hidden">
                {content}
            </div>
            {/* Date information */}
            <div className="flex flex-wrap gap-2 w-full">
                <div className="flex items-center gap-1 opacity-50 self-end">
                    <Clock size={15} />
                    <span className="font-[600] text-xs">
                        {`Created ${formatDistanceToNow(createdAt).replace('about ', '')}`}
                    </span>
                </div>
                <div className="flex items-center gap-1 opacity-50 self-end">
                    <RotateCw size={15} />
                    <span className="font-[600] text-xs">
                        {`Updated ${formatDistanceToNow(updatedAt).replace('about ', '')}`}
                    </span>
                </div>
            </div>
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
                {"The archive is currently empty."}
            </h1>
            <p className="font-[600] text-center">
                {"You need to generate stories first."}
            </p>
        </div>
    )
}