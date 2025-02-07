import { useEditorStore } from "@/stores/useEditorStore"
import { useEffect, useRef, useState } from "react"
import { Archive, Copy, FileX2, Save, Sparkle } from "lucide-react"
import { generateStoryTitle } from "@/api/ai"
import { Spinner } from "@/components/ui"
import { useToastStore } from "@/stores/useToastStore"
import { useStoriesArchiveStore } from "@/stores/useStoriesArchiveStore"
import { SECTION, useSectionStore } from "@/stores/useSectionStore"

export function Edit() {

    const { story } = useEditorStore()

    return (
        <div className="flex flex-col flex-1 justify-center gap-4">
            {
                story ? <>
                    <Title />
                    <Content />
                    <Controls />
                </>
                    : <PlaceHolder />
            }
        </div>
    )
}

function Title() {

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
        <div className="relative flex items-center w-full">
            <input
                className="input"
                placeholder="Title"
                onChange={e => editStory({ title: e.target.value })}
                value={story?.title}
            />
            <button
                className="group right-0 absolute mr-1 btn-circle btn-primary"
                onClick={handleGenerateStoryTitle}
            >
                <Sparkle className="group-hover:rotate-180 transition-transform group-disabled:transition-none duration-500" />
                {isLoading && <Spinner type="primary" />}
            </button>
        </div>
    )
}

function Content() {

    const { story, editStory } = useEditorStore()
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {

        if (!textareaRef.current) return;
        textareaRef.current.style.height = "30px";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;

    }, [story])

    return (
        <textarea
            ref={textareaRef}
            className="textarea"
            placeholder="Story"
            onChange={e => editStory({ content: e.target.value })}
            // onSelect={() => console.log(window.getSelection().toString())}
            value={story?.content}
        >
        </textarea>
    )
}

function Controls() {

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
                className="btn btn-surface"
                onClick={handleCloseStory}
            >
                <FileX2 />
                <span>close</span>
            </button>
            <button
                className="btn btn-surface"
                onClick={handleCopyStory}
            >
                <Copy />
                <span>copy</span>
            </button>
            <button
                className="btn btn-reverse"
                onClick={handleSaveStory}
            >
                <Save />
                <span>Save</span>
            </button>
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
                viewBox="0 0 66.826 66.826"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g>
                    <path d="M65.66,12.409H33.755l-0.002-0.002L5.723,3.888C5.366,3.779,4.985,3.844,4.688,4.066c-0.296,0.219-0.472,0.57-0.472,0.936
                    v7.407H1.168C0.523,12.409,0,12.935,0,13.577v41.286c0,0.644,0.523,1.168,1.168,1.168h24.216v4.624h-4.429v1.168v1.167h24.912
                    v-1.167v-1.168H41.44v-4.624h24.218c0.644,0,1.168-0.524,1.168-1.168V13.577C66.828,12.931,66.302,12.409,65.66,12.409z
                    M6.552,12.409V6.579l19.179,5.831l3.842,1.168l2.672,0.813v0.355v38.489L6.552,45.424V14.745v-1.168V12.409z M64.492,53.697
                    h-29.91V14.745h4.588v4.333l2.274-1.438l2.274,1.438v-4.333h20.778L64.492,53.697L64.492,53.697z M28.288,21.886l-9.105-2.77
                    v-1.538l9.105,2.774V21.886z M28.288,27.75l-9.105-2.771v-1.542l9.105,2.772V27.75z M28.288,33.661l-18.209-5.539v-1.534
                    l18.209,5.536V33.661z M28.288,39.519l-18.209-5.535v-1.54l18.209,5.535V39.519z M28.288,45.436l-18.209-5.538v-1.538l18.209,5.534
                    V45.436z M11.634,23.136l0.475-1.546l2.743,0.832l0.488,1.838l0.796,0.243l0.801,0.243l-2.555-9.089l-0.876-0.264l-0.875-0.264
                    l-2.556,7.533l0.782,0.241L11.634,23.136z M13.49,17.243l0.957,3.627l-1.915-0.582L13.49,17.243z M62.19,48.697H38.326v-1.605
                    H62.19V48.697z M62.026,23.767l-2.459-2.289l-5.401,5.797l2.459,2.287L62.026,23.767z M43.27,40.985l-1.006-0.942l11.339-12.166
                    l1.006,0.93L43.27,40.985z M55.061,29.228l1.003,0.938l-11.341,12.17L43.719,41.4L55.061,29.228z M41.698,40.65l2.463,2.287
                    l-1.756,1.889l-3.019,0.776l0.56-3.063L41.698,40.65z"/>
                </g>
            </svg>
            <h1 className="font-[600]">
                {"No story available."}
            </h1>
            <div className="flex items-center gap-2">
                <button
                    className="btn btn-primary"
                    onClick={() => setSection(SECTION.GENERATE)}
                >
                    <Sparkle />
                    <span>generate</span>
                </button>
                <span className="opacity-70 hover:opacity-100 text-sm underline capitalize duration-300 cursor-pointer"
                    onClick={() => setSection(SECTION.ARCHIVE)}
                >
                    check archive
                </span>
            </div>
        </div>
    )
}