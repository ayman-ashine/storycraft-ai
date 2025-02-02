import {
    BookOpenText,
    Eye,
    ChevronDown,
    Earth,
    Hourglass,
    Users,
    Drama
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


export default function Options() {
    const [open, setOpen] = useState(false)

    return (
        <div className="flex flex-col gap-4">
            <button
                className="flex items-center gap-1 border-2 border-surface hover:bg-surface shadow-md px-4 py-2 rounded-full w-fit select-none"
                onClick={() => setOpen(state => !state)}
            >
                {/* <Settings size={20} /> */}
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
                        options={GENRES_OPTIONS}
                    />
                    <Select
                        name={"narrative perspective"}
                        icon={<Eye size={20} />}
                        options={NARRATIVE_PERSPECTIVES}
                    />
                    <Select
                        name={"tone & style"}
                        icon={<BookOpenText size={20} />}
                        options={TONE_STYLES}
                    />
                    <Select
                        name={"audience"}
                        icon={<Users size={20} />}
                        options={AUDIENCE_AGE_GROUPS}
                    />
                    <Select
                        name={"length"}
                        icon={<Hourglass size={20} />}
                        options={STORY_LENGTHS}
                    />
                    <Select
                        name={"language"}
                        icon={<Earth size={20} />}
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
    options
}: {
    name: string,
    icon: React.ReactNode,
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
                "relative flex justify-between items-center px-4 py-2 rounded-full w-full",
                open ? "bg-primary" : "bg-surface"
            )}
            onClick={() => setOpen(state => !state)}
        >
            {/* Name & Icons */}
            <div className="flex items-center gap-2">
                {icon}
                <span className="font-[600] text-nowrap text-sm capitalize">
                    {name}
                </span>
            </div>
            <ChevronDown size={20} className={open ? "rotate-180" : ""} />
            {/* Menu */}
            {
                open &&
                <div
                    className="top-full left-0 z-50 absolute bg-surface shadow-xl mt-2 rounded-md w-full overflow-hidden"
                >
                    <div className="flex flex-col max-h-[300px] overflow-y-auto">
                        {
                            options.map(option => {
                                return (
                                    <div
                                        key={option}
                                        className="hover:bg-sheen px-4 py-2 w-full text-sm text-start capitalize"
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