import { AnimatePresence, motion } from 'motion/react';
import { useSectionStore, SECTION } from "@/stores/useSectionStore"
import { Generate } from "./generate"
import { Edit } from "./edit"
import { Archive } from "./achrive"

export function Section() {

    const { section } = useSectionStore()

    switch (section) {
        case SECTION.GENERATE:
            return (
                <AnimateDisplay
                    key={SECTION.GENERATE}
                >
                    <Generate />
                </AnimateDisplay>
            )
        case SECTION.EDIT:
            return (
                <AnimateDisplay
                    key={SECTION.EDIT}
                >
                    <Edit />
                </AnimateDisplay>
            )
        case SECTION.ARCHIVE:
            return (
                <AnimateDisplay
                    key={SECTION.ARCHIVE}
                >
                    <Archive />
                </AnimateDisplay>
            )
        default:
            return null
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