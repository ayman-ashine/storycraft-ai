import { useSectionStore, SECTION } from "@/stores/useSectionStore"
import { Prompt } from "./prompt"
import { Editor } from "./editor"
import { AnimatePresence, motion } from 'motion/react';


export function Section() {

    const { section } = useSectionStore()

    switch (section) {
        case SECTION.PROMPT: return <AnimateDisplay key={SECTION.PROMPT}><Prompt /></AnimateDisplay>
        case SECTION.EDITOR: return <AnimateDisplay key={SECTION.EDITOR}><Editor /></AnimateDisplay>
        default: return null
    }

}

function AnimateDisplay({ children }: { children: React.ReactNode }) {
    return (
        <AnimatePresence initial={true}>
            <motion.div
                className="flex flex-1"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.4, type: "spring" }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}