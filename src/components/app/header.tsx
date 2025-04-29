import { Newspaper, Archive, Sparkle, Info } from "lucide-react";
import { useSectionStore, SECTION } from "@/stores/useSectionStore";
import Image from "next/image";
import Link from "next/link";

export function Header() {

    return (
        <header className="bg-surface p-4 border-surface-2 border-b w-full">
            <div className="flex sm:flex-row flex-col justify-between items-center gap-2 mx-auto w-full max-w-4xl">
                <Logo />
                <Nav />
            </div>
        </header>
    )
}

function Logo() {
    return (
        <div className="hidden sm:flex items-center gap-4">
            <Image src={"/icons/favicon.svg"} width={30} height={30} alt="StoryCraft AI Logo"/>
            <h1 className="text-xl orbitron">StoryCraft AI</h1>
        </div>
    )
}

function Nav() {

    const { section, setSection } = useSectionStore()

    return (
        <div className="flex items-center gap-2">
            <button
                className={section === SECTION.GENERATE ? "btn-reverse hover:opacity-100" : "btn"}
                onClick={() => { setSection(SECTION.GENERATE) }}
            >
                <Sparkle />
                <span>generate</span>
            </button>
            <button
                className={section === SECTION.EDIT ? "btn-reverse hover:opacity-100" : "btn"}
                onClick={() => { setSection(SECTION.EDIT) }}
            >
                <Newspaper />
                <span>edit</span>
            </button>
            <button
                className={section === SECTION.ARCHIVE ? "btn-reverse hover:opacity-100" : "btn"}
                onClick={() => { setSection(SECTION.ARCHIVE) }}
            >
                <Archive />
                <span>archive</span>
            </button>
            <Link
                className="btn-circle"
                href={"/how-it-works"}
            >
                <Info />
            </Link>
        </div>
    )
}