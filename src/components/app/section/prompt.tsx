import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from 'motion/react'
import {
    BookOpenText,
    Eye,
    ChevronDown,
    Earth,
    Hourglass,
    Users,
    Drama,
    Settings,
    Sparkle
} from "lucide-react"
import { Spinner } from "@/components/ui"
import { useGenerateStoryStore } from "@/stores/useGenerateStoryStore"
import { useEditorStore } from "@/stores/useEditorStore"
import { useSectionStore, SECTION } from "@/stores/useSectionStore"
import { generateStory } from "@/api/ai"
import {
    AUDIENCE_AGE_GROUPS,
    GENRES_OPTIONS,
    LANGUAGES,
    NARRATIVE_PERSPECTIVES,
    STORY_LENGTHS,
    TONE_STYLES
} from "@/data/options"
import { Select } from "./select"
import { generateUniqueId } from "@/utils/generateUniqueId"

export function Prompt() {

    return (
        <div className="flex flex-col flex-1 justify-center gap-4">
            <ConceptInput />
            <AdvancedOptions />
        </div>
    )

}

function ConceptInput() {

    const {
        concept,
        setConcept,
        genre,
        narrativePerspective,
        toneAndStyle,
        audienceAgeGroup,
        storyLength,
        language,
    } = useGenerateStoryStore()
    const { setStory } = useEditorStore()
    const { setSection } = useSectionStore()
    const [isLoading, setIsLoading] = useState(false)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        if (!textareaRef.current) return
        textareaRef.current.style.height = "30px"
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }, [concept])

    const handleGenerateStory = () => {
        if (concept && !isLoading) {
            setIsLoading(true)
            generateStory({
                concept,
                genre,
                narrativePerspective,
                toneAndStyle,
                audienceAgeGroup,
                storyLength,
                language,
            }).then(content => {
                if (content) {
                    setStory({
                        id: generateUniqueId(),
                        content: content,
                        title: "",
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    })
                    setSection(SECTION.EDITOR)
                }
                setIsLoading(false)
            })
        }
    }

    return (
        <div className="flex flex-col gap-2 border-surfaceHover bg-surface p-4 border rounded-2xl w-full">
            {/* <p className="w-full text-sm">
                {"Provide your story idea, main characters, setting (time, place, and atmosphere), conflict (central struggle), and theme (core message or idea)..."}
            </p> */}
            <textarea
                ref={textareaRef}
                className="bg-transparent placeholder:opacity-50 w-full h-[30px] placeholder:text-light overflow-hidden outline-none resize-none"
                placeholder="A lonely robot finds a friend in a kind girl, but they must escape humans who fear robots..."
                onChange={e => setConcept(e.target.value)}
                value={concept}
                maxLength={2000}
            >
            </textarea>
            <button
                className="btn btn-reverse self-end"
                onClick={handleGenerateStory}
                disabled={concept === ""}
            >
                <Sparkle />
                <span>generate</span>
                {isLoading && <Spinner bgColor="light" spinnerColor="dark" />}
            </button>
        </div>
    )
}

function AdvancedOptions() {
    const [open, setOpen] = useState(false)
    const {
        genre,
        setGenre,
        narrativePerspective,
        setNarrativePerspective,
        toneAndStyle,
        setToneAndStyle,
        audienceAgeGroup,
        setAudienceAgeGroup,
        storyLength,
        setStoryLength,
        language,
        setLanguage
    } = useGenerateStoryStore()

    return (
        <div className="flex flex-col gap-4">
            <button
                className="btn btn-surface self-center"
                onClick={() => setOpen(state => !state)}
            >
                <Settings />
                <span>{"advanced options"}</span>
                <ChevronDown className={open ? "rotate-180" : ""} />
            </button>
            <hr className="border-surface" />
            <AnimatePresence initial={true}>
                {
                    open &&
                    <motion.div
                        className="gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                        initial={{ translateY: "25%", opacity: 0 }}
                        animate={{ translateY: "0%", opacity: 1 }}
                        exit={{ translateY: "25%", opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                        <Select
                            name={"genre"}
                            icon={<Drama size={20} />}
                            option={genre}
                            setOption={setGenre}
                            options={GENRES_OPTIONS}
                        />
                        <Select
                            name={"narrative perspective"}
                            icon={<Eye size={20} />}
                            option={narrativePerspective}
                            setOption={setNarrativePerspective}
                            options={NARRATIVE_PERSPECTIVES}
                        />
                        <Select
                            name={"tone & style"}
                            icon={<BookOpenText size={20} />}
                            option={toneAndStyle}
                            setOption={setToneAndStyle}
                            options={TONE_STYLES}
                        />
                        <Select
                            name={"audience age group"}
                            icon={<Users size={20} />}
                            option={audienceAgeGroup}
                            setOption={setAudienceAgeGroup}
                            options={AUDIENCE_AGE_GROUPS}
                        />
                        <Select
                            name={"length"}
                            icon={<Hourglass size={20} />}
                            option={storyLength}
                            setOption={setStoryLength}
                            options={STORY_LENGTHS}
                        />
                        <Select
                            name={"language"}
                            icon={<Earth size={20} />}
                            option={language}
                            setOption={setLanguage}
                            options={LANGUAGES}
                        />
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}