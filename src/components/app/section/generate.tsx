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
import { useToastStore } from "@/stores/useToastStore"

export function Generate() {

    return (
        <div className="flex flex-col flex-1 justify-center gap-4">
            <Textarea />
            <Control />
        </div>
    )

}

function Textarea() {

    const { concept, setConcept } = useGenerateStoryStore()
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        if (!textareaRef.current) return
        textareaRef.current.style.height = "30px"
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }, [concept])

    return (
        <textarea
            ref={textareaRef}
            className="textarea"
            placeholder="A lonely robot finds a friend in a kind girl, but they must escape humans who fear robots..."
            onChange={e => setConcept(e.target.value)}
            value={concept}
            maxLength={2000}
            autoFocus
        >
        </textarea>
    )
}

function Control() {

    const {
        concept,
        genre,
        narrativePerspective,
        toneAndStyle,
        audienceAgeGroup,
        storyLength,
        language,
    } = useGenerateStoryStore()
    const { setStory } = useEditorStore()
    const { setSection } = useSectionStore()
    const { setToast } = useToastStore()
    const [isLoading, setIsLoading] = useState(false)
    const [isAdvancedOptionOpen, setIsAdvancedOptionsOpen] = useState(false)

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
                    setSection(SECTION.EDIT)
                } else {
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
        <div className="flex flex-col gap-4">
            <div className="flex justify-end items-center gap-2">
                <button
                    className="btn btn-surface"
                    onClick={() => setIsAdvancedOptionsOpen(state => !state)}
                >
                    <Settings />
                    <span>advanced options</span>
                    <ChevronDown className={isAdvancedOptionOpen ? "rotate-180" : ""} />
                </button>
                <button
                    className="btn btn-primary"
                    onClick={handleGenerateStory}
                    disabled={concept === ""}
                >
                    <Sparkle />
                    <span>generate</span>
                    {isLoading && <Spinner type="primary" />}
                </button>
            </div>
            <AdvancedOptions isAdvancedOptionOpen={isAdvancedOptionOpen} />
        </div>
    )
}

function AdvancedOptions({ isAdvancedOptionOpen }: { isAdvancedOptionOpen: boolean }) {

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
            <AnimatePresence initial={true}>
                {
                    isAdvancedOptionOpen &&
                    <motion.div
                        className="gap-2 border-surface-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-4 border-t"
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