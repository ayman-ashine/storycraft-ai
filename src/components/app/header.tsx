import clsx from "clsx";
import { Terminal, Newspaper, LibraryBig } from "lucide-react";
import { useSectionStore, SECTION } from "@/stores/useSectionStore";

export function Header() {

    const { section, setSection } = useSectionStore()

    return (
        <header className="flex sm:flex-row flex-col justify-between items-center gap-4 w-full select-none">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <LibraryBig size={30} className="stroke-primary"/>
                <span className="text-2xl text-primary orbitron">
                    {"StoryCraft AI"}
                </span>
            </div>
            <nav className="flex justify-center items-center gap-2 bg-surface p-2 rounded-xl w-fit">
                <button
                    className={clsx(
                        "flex items-center gap-2 px-4 py-2 rounded-xl transition-colors duration-200 ease-in-out",
                        section === SECTION.PROMPT ? "bg-primary" : "hover:bg-surfaceHover"
                    )}
                    onClick={() => setSection(SECTION.PROMPT)}
                >
                    <Terminal size={20} />
                    <span className="font-[600] text-nowrap text-sm capitalize">
                        prompt
                    </span>
                </button>
                <button
                    className={clsx(
                        "flex items-center gap-2 px-4 py-2 rounded-xl transition-colors duration-200 ease-in-out",
                        section === SECTION.EDITOR ? "bg-primary" : "hover:bg-surfaceHover"
                    )}
                    onClick={() => setSection(SECTION.EDITOR)}
                >
                    <Newspaper size={20} />
                    <span className="font-[600] text-nowrap text-sm capitalize">
                        editor
                    </span>
                </button>
            </nav>
        </header>
    )
}