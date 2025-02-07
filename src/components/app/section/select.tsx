import { ChevronDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import clsx from "clsx"
import { AnimatePresence, motion } from 'motion/react';

export function Select({
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
    const [flip, setFlip] = useState(false)
    const selectRef = useRef<HTMLButtonElement>(null)
    const menuRef = useRef<HTMLDivElement>(null)

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

    useEffect(() => {
        if (!menuRef.current || !selectRef.current) return
        const selectRect = selectRef.current?.getBoundingClientRect()
        const menuRect = menuRef.current?.getBoundingClientRect()
        setFlip(
            (menuRect.height +
                selectRect.y +
                selectRect.height +
                10
            ) > window.innerHeight
        )
    }, [open])

    return (
        <button
            ref={selectRef}
            className={`w-full relative px-4 py-2 flex items-center justify-center gap-2 rounded-full transition-colors duration-200 ease-in-out ${
                option ? "bg-primary" : open ? "bg-surface-2" : "bg-surface hover:bg-surface-2"
            }`}
            onClick={() => setOpen(state => !state)}
        >
            {/* Name & Icons */}
            <div className="flex items-center gap-2 w-full overflow-hidden">
                {icon}
                <span className="font-[600] text-nowrap text-sm truncate capitalize">
                    {option || name}
                </span>
            </div>
            <ChevronDown className={clsx("transition-transform duration-200", open && "rotate-180")} />
            {/* Menu */}
            <AnimatePresence initial={true}>
                {
                    open &&
                    <motion.div
                        className={clsx(
                            "left-0 z-50 absolute bg-surface-2 shadow-md rounded-md w-full overflow-hidden outline outline-1 outline-surface-2",
                            flip ? "bottom-full mb-2" : "top-full mt-2"
                        )}
                        initial={{ maxHeight: 0, opacity: 0 }}
                        animate={{ maxHeight: 250, opacity: 1 }}
                        exit={{ maxHeight: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                        <div
                            ref={menuRef}
                            className="flex flex-col max-h-[250px] overflow-x-hidden overflow-y-auto"
                        >
                            <div
                                onClick={() => setOption("")}
                                className="hover:bg-primary px-4 py-2 w-full text-nowrap text-sm text-start capitalize"
                            >
                                none
                            </div>
                            <hr className="border-surface-2" />
                            {
                                options.map(option => {
                                    return (
                                        <div
                                            key={option}
                                            onClick={() => setOption(option)}
                                            className="hover:bg-primary px-4 py-2 w-full text-nowrap text-sm text-start capitalize"
                                        >
                                            {option}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </button>
    )
}