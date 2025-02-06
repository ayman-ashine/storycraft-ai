import clsx from "clsx";
import { Newspaper, LibraryBig, Archive, Menu, Sparkle } from "lucide-react";
import { useSectionStore, SECTION } from "@/stores/useSectionStore";
import { useEffect, useRef, useState } from "react";
import { motion } from 'motion/react';

export function Header() {

    const { section, setSection } = useSectionStore()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const menuRef = useRef<HTMLElement>(null)
    const menuButtonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (
                menuRef.current &&
                menuButtonRef.current &&
                !menuRef.current.contains(event.target as HTMLElement) &&
                !menuButtonRef.current.contains(event.target as HTMLElement)
            ) {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener("click", handleClick)

        return () => {
            document.removeEventListener("click", handleClick)
        }
    }, [])

    return (
        <header className="top-0 z-[1000] sticky flex md:flex-row flex-col justify-between md:items-center gap-4 w-full select-none">
            {/* Logo */}
            <div className="flex items-between items-center gap-2">
                <div className="flex items-center gap-2 w-full">
                    <LibraryBig className="size-6 sm:size-8" />
                    <span className="text-xl sm:text-2xl orbitron">
                        {"StoryCraft AI"}
                    </span>
                </div>
                <button
                    ref={menuButtonRef}
                    className="md:hidden btn-circle btn-reverse"
                    onClick={() => setIsMenuOpen(state => !state)}
                >
                    <Menu />
                </button>
            </div>
            <motion.nav
                key={String(isMenuOpen)}
                ref={menuRef}
                className={`flex md:flex-row flex-col absolute top-full shadow-md md:shadow-none mt-4 md:mt-0 justify-center md:static items-center gap-1 bg-surface p-1 rounded-md w-full md:w-fit ${!isMenuOpen ? "hidden md:flex" : ""}`}
                animate={{ opacity: [0, 1], translateY: [50, 0] }}
                transition={{ duration: 0.2 }}
            >
                <button
                    className={clsx(
                        "flex items-center gap-2 px-4 py-2 rounded-md w-full transition-colors duration-200 ease-in-out",
                        section === SECTION.GENERATE ? "bg-primary" : "hover:bg-surfaceHover"
                    )}
                    onClick={() => { setSection(SECTION.GENERATE); setIsMenuOpen(false); }}
                >
                    <Sparkle size={20} />
                    <span className="font-[600] text-nowrap text-sm capitalize">
                        generate
                    </span>
                </button>
                <button
                    className={clsx(
                        "flex items-center gap-2 px-4 py-2 rounded-md w-full transition-colors duration-200 ease-in-out",
                        section === SECTION.EDIT ? "bg-primary" : "hover:bg-surfaceHover"
                    )}
                    onClick={() => { setSection(SECTION.EDIT); setIsMenuOpen(false); }}
                >
                    <Newspaper size={20} />
                    <span className="font-[600] text-nowrap text-sm capitalize">
                        edit
                    </span>
                </button>
                <button
                    className={clsx(
                        "flex items-center gap-2 px-4 py-2 rounded-md w-full transition-colors duration-200 ease-in-out",
                        section === SECTION.ARCHIVE ? "bg-primary" : "hover:bg-surfaceHover"
                    )}
                    onClick={() => { setSection(SECTION.ARCHIVE); setIsMenuOpen(false); }}
                >
                    <Archive size={20} />
                    <span className="font-[600] text-nowrap text-sm capitalize">
                        archive
                    </span>
                </button>
            </motion.nav>
        </header>
    )
}