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
        <div className="flex flex-col flex-1 justify-start gap-4">
            <Illustration />
            <motion.div
                className="flex flex-col gap-4 w-full"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
            >
                <Textarea />
                <Control />
            </motion.div>
        </div>
    )

}

function Illustration() {
    return (
        <motion.div
            className="w-full h-40 sm:h-80"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            <motion.svg
                className="w-full h-full fill-light stroke-light"
                width="50px"
                height="50px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                initial={{ translateY: -100 }}
                animate={{ translateY: 0 }}
                exit={{ translateY: -100 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                <path d="M3.84453 3.84453C2.71849 4.97056 2.71849 6.79623 3.84453 7.92226L5.43227 9.51C5.44419 9.49622 5.45669 9.48276 5.46978 9.46967L9.46978 5.46967C9.48284 5.45662 9.49625 5.44415 9.50999 5.43226L7.92226 3.84453C6.79623 2.71849 4.97056 2.71849 3.84453 3.84453Z" />
                <path d="M10.5679 6.49012C10.556 6.50386 10.5435 6.51728 10.5304 6.53033L6.53044 10.5303C6.51735 10.5434 6.5039 10.5559 6.49011 10.5678L16.0777 20.1555C17.2038 21.2815 19.0294 21.2815 20.1555 20.1555C21.2815 19.0294 21.2815 17.2038 20.1555 16.0777L10.5679 6.49012Z" />
                <path d="M16.1 2.30719C16.261 1.8976 16.8385 1.8976 16.9994 2.30719L17.4298 3.40247C17.479 3.52752 17.5776 3.62651 17.7022 3.67583L18.7934 4.1078C19.2015 4.26934 19.2015 4.849 18.7934 5.01054L17.7022 5.44252C17.5776 5.49184 17.479 5.59082 17.4298 5.71587L16.9995 6.81115C16.8385 7.22074 16.261 7.22074 16.1 6.81116L15.6697 5.71587C15.6205 5.59082 15.5219 5.49184 15.3973 5.44252L14.3061 5.01054C13.898 4.849 13.898 4.26934 14.3061 4.1078L15.3973 3.67583C15.5219 3.62651 15.6205 3.52752 15.6697 3.40247L16.1 2.30719Z" />
                <path d="M19.9672 9.12945C20.1281 8.71987 20.7057 8.71987 20.8666 9.12945L21.0235 9.5288C21.0727 9.65385 21.1713 9.75284 21.2959 9.80215L21.6937 9.95965C22.1018 10.1212 22.1018 10.7009 21.6937 10.8624L21.2959 11.0199C21.1713 11.0692 21.0727 11.1682 21.0235 11.2932L20.8666 11.6926C20.7057 12.1022 20.1281 12.1022 19.9672 11.6926L19.8103 11.2932C19.7611 11.1682 19.6625 11.0692 19.5379 11.0199L19.14 10.8624C18.732 10.7009 18.732 10.1212 19.14 9.95965L19.5379 9.80215C19.6625 9.75284 19.7611 9.65385 19.8103 9.5288L19.9672 9.12945Z" />
                <path d="M5.1332 15.3072C5.29414 14.8976 5.87167 14.8976 6.03261 15.3072L6.18953 15.7065C6.23867 15.8316 6.33729 15.9306 6.46188 15.9799L6.85975 16.1374C7.26783 16.2989 7.26783 16.8786 6.85975 17.0401L6.46188 17.1976C6.33729 17.2469 6.23867 17.3459 6.18953 17.471L6.03261 17.8703C5.87167 18.2799 5.29414 18.2799 5.1332 17.8703L4.97628 17.471C4.92714 17.3459 4.82852 17.2469 4.70393 17.1976L4.30606 17.0401C3.89798 16.8786 3.89798 16.2989 4.30606 16.1374L4.70393 15.9799C4.82852 15.9306 4.92714 15.8316 4.97628 15.7065L5.1332 15.3072Z" />
            </motion.svg>
        </motion.div>
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
                    className="group btn btn-primary"
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