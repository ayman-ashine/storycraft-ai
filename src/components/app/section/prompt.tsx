import { useState } from "react"
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
import { Loader, Select } from "@/components/ui"
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
} from "@/data/const"

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
    const {setSection} = useSectionStore()
    const [isLoading, setIsLoading] = useState(false)

    const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.target.style.height = "30px"
        e.target.style.height = `${e.target.scrollHeight}px`
        setConcept(e.target.value)
    }

    const handleGenerateStory = async () => {
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
            }).then(story => {
                if (story) {
                    setStory(story)
                    setSection(SECTION.EDITOR)
                }
                setIsLoading(false)
            })
        }
    }

    return (
        <div className="flex flex-col gap-2 border-2 border-surfaceHover bg-surface p-4 rounded-2xl w-full">
            {/* <p className="w-full text-sm">
                {"Provide your story idea, main characters, setting (time, place, and atmosphere), conflict (central struggle), and theme (core message or idea)..."}
            </p> */}
            <textarea
                className="bg-transparent placeholder:opacity-50 w-full h-[30px] placeholder:text-light overflow-hidden outline-none resize-none"
                placeholder="A lonely robot finds a friend in a kind girl, but they must escape humans who fear robots..."
                onChange={handleOnChange}
                value={concept}
                maxLength={2000}
            >
            </textarea>
            <button
                className="relative flex items-center gap-2 bg-light hover:opacity-70 disabled:opacity-50 px-4 py-2 rounded-full transition-opacity duration-200 disabled:cursor-default select-none ease-in-out self-end"
                onClick={handleGenerateStory}
                disabled={concept === ""}
            >
                <Sparkle size={20} className="stroke-dark" />
                <span className="font-[600] text-dark text-sm capitalize">generate</span>
                {isLoading && <Loader />}
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
                className="flex items-center gap-2 bg-surface hover:bg-surfaceHover px-4 py-2 rounded-xl w-fit transition-colors duration-200 select-none ease-in-out self-end"
                onClick={() => setOpen(state => !state)}
            >
                <Settings size={20} />
                <span className="font-[600] text-nowrap text-sm capitalize">
                    {"advanced options"}
                </span>
                <ChevronDown size={20} className={open ? "rotate-180" : ""} />
            </button>
            <AnimatePresence initial={true}>
                {
                    open &&
                    <motion.div
                        className="gap-2 border-2 border-surface grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-2 rounded-xl w-full origin-top"
                        initial={{ translateY: "-10%", opacity: 0 }}
                        animate={{ translateY: "0%", opacity: 1 }}
                        exit={{ translateY: "-10%", opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        layout
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