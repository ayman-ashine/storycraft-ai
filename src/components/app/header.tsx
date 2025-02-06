import clsx from "clsx";
import { Newspaper, LibraryBig, Archive, Sparkle } from "lucide-react";
import { useSectionStore, SECTION } from "@/stores/useSectionStore";

export function Header() {

    return (
        <header className="border-surface-2 bg-surface shadow-sm p-2 sm:p-4 border-b w-full">
            <div className="flex sm:flex-row flex-col justify-between items-center gap-2 mx-auto w-full max-w-4xl">
                <Logo />
                <Nav />
            </div>
        </header>
    )
}

function Logo() {
    return (
        <div className="flex items-center gap-1 [&_h1]:orbitron [&_h1]:sm:text-xl [&_svg]:sm:size-6 [&_svg]:size-4">
            <LibraryBig />
            <h1>StoryCraft AI</h1>
        </div>
    )
}

function Nav() {

    const { section, setSection } = useSectionStore()
    const className = {
        btn: "flex items-center justify-center gap-2 [&_svg]:size-4 ease-in-out w-full duration-300 transition-all rounded-full border-b-2 border-transparent hover:opacity-100 opacity-70 px-3 py-1 [&_span]:font-[600] [&_span]:text-sm [&_span]:capitalize",
        btnActive: "bg-light [&_span]:text-dark [&_svg]:stroke-dark valid:opacity-100"
    }

    return (
        <div className="flex items-center gap-2 select-none">
            <button
                className={clsx(className.btn, section === SECTION.GENERATE && className.btnActive)}
                onClick={() => { setSection(SECTION.GENERATE) }}
            >
                <Sparkle />
                <span>generate</span>
            </button>
            <button
                className={clsx(className.btn, section === SECTION.EDIT && className.btnActive)}
                onClick={() => { setSection(SECTION.EDIT) }}
            >
                <Newspaper />
                <span>edit</span>
            </button>
            <button
                className={clsx(className.btn, section === SECTION.ARCHIVE && className.btnActive)}
                onClick={() => { setSection(SECTION.ARCHIVE) }}
            >
                <Archive />
                <span>archive</span>
            </button>
        </div>
    )
}