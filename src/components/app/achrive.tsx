import { PenLine, Trash2, Clock, Copy, RotateCw, Sparkle, Search } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { useStoriesArchiveStore } from "@/stores/useStoriesArchiveStore"
import { useToastStore } from "@/stores/useToastStore"
import { Story } from "@/data/types"
import { useEditorStore } from "@/stores/useEditorStore"
import { SECTION, useSectionStore } from "@/stores/useSectionStore"
import { useState } from "react"
import { getDirection } from "@/utils/getDirection"

export function Archive() {

    const { stories } = useStoriesArchiveStore()
    const [searchText, setSearchText] = useState("")

    return (
        <div className="flex flex-col flex-1 gap-4">
            {
                stories.length > 0 ?
                    <>
                        <div className="relative w-full" dir={getDirection(searchText)}>
                            <input
                                className="peer input"
                                placeholder="Search..."
                                onChange={e => setSearchText(e.target.value)}
                                value={searchText}
                            />
                            <Search
                                className="top-1/2 ltr:right-0 rtl:left-0 absolute stroke-surface-2 peer-focus:stroke-primary -translate-y-1/2 ltr:-translate-x-4 rtl:translate-x-4 duration-200 pointer-events-none"
                                size={20}
                            />
                        </div>
                        {
                            stories.map(story => {
                                if (searchText) {
                                    return (
                                        story.title.toLowerCase().includes(searchText.toLowerCase()) ||
                                        story.content.toLowerCase().includes(searchText.toLowerCase())
                                    ) && (
                                            <StoryCard key={story.id} story={story} />
                                        )
                                }
                                return <StoryCard key={story.id} story={story} />
                            })
                        }
                    </>
                    : <PlaceHolder />
            }
        </div>
    )
}

function StoryCard({ story }: { story: Story }) {

    const { setToast } = useToastStore()
    const { removeStory } = useStoriesArchiveStore()
    const { setStory } = useEditorStore()
    const { setSection } = useSectionStore()

    const handleEditStory = () => {
        setStory(story)
        setSection(SECTION.EDIT)
    }

    const handleCopyStory = () => {
        const content = `${story.title}\n\n${story.content}`
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

    const handleRemoveStory = () => {
        removeStory(story.id)
        setToast({
            title: "Story was removed.",
            type: "danger"
        })
    }

    return (
        <div className="group flex flex-col items-stretch bg-dark bg-surface shadow-md p-4 rounded-xl ring-1 ring-surface-2 hover:ring-primary overflow-hidden duration-200 ease-in-out">
            {/* title */}
            <h1
                className="font-[900] text-lg capitalize"
                dir={getDirection(story?.title)}
            >
                {story.title}
            </h1>
            {/* content preview */}
            <div
                className="pt-2 w-full line-clamp-3"
                dir={getDirection(story?.content)}
            >
                {story.content}
            </div>
            {/* time information */}
            <div className="flex sm:flex-row flex-col gap-2 opacity-50 pt-2 w-full">
                <div className="flex items-center gap-1">
                    <Clock size={15} />
                    <span className="font-[600] text-xs">
                        {`Created ${formatDistanceToNow(story.createdAt).replace('about ', '')}`}
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    <RotateCw size={15} />
                    <span className="font-[600] text-xs">
                        {`Updated ${formatDistanceToNow(story.updatedAt).replace('about ', '')}`}
                    </span>
                </div>
            </div>
            <div className="group-hover:pt-4 flex justify-end gap-2 opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-[100px] duration-200">
                <button
                    className="btn-reverse"
                    onClick={handleRemoveStory}
                >
                    <Trash2 />
                    <span className="hidden sm:inline">delete</span>
                </button>
                <button
                    className="btn-reverse"
                    onClick={handleCopyStory}
                >
                    <Copy />
                    <span className="hidden sm:inline">copy</span>
                </button>
                <button
                    className="btn-reverse"
                    onClick={handleEditStory}
                >
                    <PenLine />
                    <span className="hidden sm:inline">edit</span>
                </button>
            </div>
        </div>
    )
}

function PlaceHolder() {

    const { setSection } = useSectionStore()

    return (
        <div className="flex flex-col flex-1 justify-center items-center gap-4">
            <svg
                className="fill-light"
                width="100px"
                height="100px"
                viewBox="0 0 58.692 58.691"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g>
                    <path d="M58.69,13.144v-1.295L32.332,2.791L0,21.566v0.318v0.656v0.323v4.454v0.976v0.318l2.238,0.769L0,30.682v0.316v0.657v0.321
                    v4.455v0.977v0.317l2.238,0.769L0,39.799v0.314v0.657v0.324v4.452v0.977v0.319L26.358,55.9l32.334-18.775V35.83l-0.881-0.338
                    v-3.611l0.881-0.511v-1.294l-2.237-0.769l2.237-1.301V26.71l-0.881-0.334v-3.611l0.881-0.512v-1.293l-2.237-0.769l2.237-1.301
                    v-1.297l-0.881-0.333v-3.611L58.69,13.144z M33.571,3.957L2.838,21.802l-1.161-0.397L32.41,3.56L33.571,3.957z M1.427,27.317
                    v-0.319V26.45v-3.095v-0.322l0.809,0.278v0.322v2.323v0.548v1.088v0.495L1.427,27.81V27.317z M4.275,30.08L2.84,30.912
                    l-1.161-0.397l1.437-0.833L4.275,30.08z M1.427,36.43v-0.321v-0.546v-3.095v-0.322l0.809,0.276v0.324v2.324v0.545v1.086v0.497
                    l-0.809-0.276V36.43z M4.275,39.194L2.84,40.027l-1.161-0.402l1.437-0.83L4.275,39.194z M1.427,45.547v-0.323v-0.543v-3.096v-0.321
                    l0.809,0.273v0.324v2.326v0.543v1.088v0.5L1.427,46.04V45.547z M3.169,46.633v-0.497v-1.98v-0.547v-1.431v-0.326l1.843,0.635
                    l0.575,0.195l20.773,7.141L53.176,34.23l0.521-0.303l3.18-1.851v0.34v2.715v0.502v0.705v0.535L26.36,54.599L3.169,46.633z
                    M55.051,28.826l-0.005,0.002L54.65,29.06l-0.396,0.234l-5.056,2.932l-0.521,0.306L26.358,45.492l-16.223-5.579L9.56,39.717
                    l-3.888-1.332l-1.159-0.399l-0.439-0.15l-0.439-0.146l-0.465-0.159v-0.495v-1.979v-0.548v-1.433V32.75l1.843,0.635l0.575,0.196
                    l3.219,1.105l0.439,0.148l0.437,0.148l1.161,0.399l3.732,1.282l0.575,0.198l11.212,3.853l17.327-10.074l0.521-0.305l4.861-2.826
                    l0.401-0.233l0.383-0.225l0.014-0.009l3.308-1.92l0.521-0.303l3.184-1.85v0.341v2.714v0.5v0.703v0.541L55.051,28.826z
                    M55.051,19.714l-0.584-0.201l-0.005,0.002l0.584,0.201l-0.396,0.231l-0.396,0.234l-5.056,2.936l-0.521,0.301l-3.479,2.021
                    l-0.024,0.014l-0.379,0.219l-0.399,0.233l-4.692,2.726l-0.521,0.305l-12.825,7.445l-6.664-2.288l-0.575-0.196l-3.59-1.233
                    l-1.159-0.399l-0.439-0.148l-0.439-0.148l-3.359-1.154l-0.575-0.196l-3.889-1.335l-1.158-0.4l-0.439-0.149L3.63,28.583
                    l-0.465-0.159v-0.495v-1.981v-0.546v-1.434v-0.323l1.843,0.633l0.575,0.196l3.219,1.107l0.439,0.149l0.437,0.149l1.161,0.399
                    l3.732,1.282l0.575,0.2l3.518,1.209l0.44,0.149l0.439,0.149l1.158,0.398l3.434,1.18l0.575,0.196l1.652,0.57l7.837-4.561
                    l0.521-0.301l4.5-2.617l0.399-0.234l0.369-0.212l0.032-0.022l3.67-2.131l0.521-0.305l4.861-2.826l0.401-0.234l0.388-0.224
                    l0.014-0.009l3.308-1.921l0.52-0.303l3.18-1.85v0.341v2.714v0.5v0.703v0.54L55.051,19.714z"/>
                </g>
            </svg>
            <h1 className="font-[600]">
                {"The archive is currently empty."}
            </h1>
            <button
                className="btn btn-primary"
                onClick={() => setSection(SECTION.GENERATE)}
            >
                <Sparkle />
                <span>generate</span>
            </button>
        </div>
    )
}