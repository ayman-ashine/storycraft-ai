import {
    BookOpenText,
    Eye,
    ChevronDown,
    Earth,
    Hourglass,
    Users,
    Drama,
    Settings
} from "lucide-react"
import { useEffect, useRef, useState } from "react"
import clsx from "clsx"
import {
    AUDIENCE_AGE_GROUPS,
    GENRES_OPTIONS,
    LANGUAGES,
    NARRATIVE_PERSPECTIVES,
    STORY_LENGTHS,
    TONE_STYLES
} from "@/data/const"
import { useGenerateStoryStore } from "@/stores/useGenerateStoryStore"


export default function Options() {
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
                className="flex items-center gap-2 border-2 hover:border-sheen bg-surface shadow-md px-4 py-2 border-transparent rounded-full w-fit select-none"
                onClick={() => setOpen(state => !state)}
            >
                <Settings size={20} />
                <span className="font-[600] text-nowrap text-sm capitalize">
                    {"advanced options"}
                </span>
                <ChevronDown size={20} className={open ? "rotate-180" : ""} />
            </button>
            {
                open &&
                <div className="gap-4 border-2 border-surface grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-2 rounded-xl w-full">
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
                </div>
            }
        </div>
    )
}

function Select({
    name,
    icon,
    option,
    setOption,
    options
}: {
    name: string,
    icon: React.ReactNode,
    option: string,
    setOption: (option: string) => void,
    options: string[]
}) {
    const [open, setOpen] = useState(false)
    const selectRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (
                selectRef.current &&
                !selectRef.current.contains(event.target as HTMLElement)
            ) {
                setOpen(false)
            }
        }

        document.addEventListener("click", handleClick)

        return () => {
            document.removeEventListener("click", handleClick)
        }
    }, [])

    return (
        <button
            ref={selectRef}
            className={clsx(
                "relative flex justify-between items-center border-2 hover:border-sheen px-4 py-2 rounded-full w-full",
                open ? "border-sheen" : "border-transparent",
                option ? "bg-sheen" : "bg-surface",
            )}
            onClick={() => setOpen(state => !state)}
        >
            {/* Name & Icons */}
            <div className="flex items-center gap-2 w-full overflow-hidden">
                {icon}
                <span className="font-[600] text-nowrap text-sm truncate capitalize">
                    {option || name}
                </span>
            </div>
            <ChevronDown size={20} className={open ? "rotate-180" : ""} />
            {/* Menu */}
            {
                open &&
                <div
                    className="top-full left-0 z-50 absolute bg-surface shadow-md mt-2 rounded-md w-full overflow-hidden"
                >
                    <div className="flex flex-col max-h-[300px] overflow-x-hidden overflow-y-auto">
                        <div
                            onClick={() => setOption("")}
                            className="hover:bg-sheen px-4 py-2 w-full text-nowrap text-sm text-start capitalize"
                        >
                            none
                        </div>
                        {
                            options.map(option => {
                                return (
                                    <div
                                        key={option}
                                        onClick={() => setOption(option)}
                                        className="hover:bg-sheen px-4 py-2 w-full text-nowrap text-sm text-start capitalize"
                                    >
                                        {option}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </button>
    )
}