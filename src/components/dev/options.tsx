import clsx from "clsx"
import {
    BookOpenText,
    Eye,
    ChevronDown,
    Earth,
    Film,
    Hourglass,
    Layers,
    Users
} from "lucide-react"
import { useEffect, useRef, useState } from "react"

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
                <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 rounded-xl w-full">
                    <Select
                        name={"genre"}
                        icon={<BookOpenText size={20} />}
                    />
                    <Select
                        name={"narrative perspective"}
                        icon={<Eye size={20} />}
                    />
                    <Select
                        name={"structure"}
                        icon={<Layers size={20} />}
                    />
                    <Select
                        name={"style"}
                        icon={<Film size={20} />}
                    />
                    <Select
                        name={"audience"}
                        icon={<Users size={20} />}
                    />
                    <Select
                        name={"length"}
                        icon={<Hourglass size={20} />}
                    />
                    <Select
                        name={"language"}
                        icon={<Earth size={20} />}
                    />
                </div>
            }
        </div>
    )
}

function Select({
    name,
    icon
}: {
    name: string,
    icon: React.ReactNode
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
            className={clsx("relative flex justify-between items-center px-4 py-2 rounded-full w-full", open ? "bg-primary" : "bg-surface")}
            onClick={() => setOpen(state => !state)}
        >
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
                <div className="top-full left-0 z-50 absolute flex flex-col bg-surface shadow-md mt-2 rounded-md w-full overflow-hidden">
                    <div className="hover:bg-sheen px-4 py-2 font-medium text-nowrap text-sm text-start capitalize">
                        option
                    </div>
                    <div className="hover:bg-sheen px-4 py-2 font-medium text-nowrap text-sm text-start capitalize">
                        option
                    </div>
                    <div className="hover:bg-sheen px-4 py-2 font-medium text-nowrap text-sm text-start capitalize">
                        option
                    </div>
                    <div className="hover:bg-sheen px-4 py-2 font-medium text-nowrap text-sm text-start capitalize">
                        option
                    </div>
                    <div className="hover:bg-sheen px-4 py-2 font-medium text-nowrap text-sm text-start capitalize">
                        option
                    </div>
                </div>
            }
        </button>
    )
}