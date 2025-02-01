import { useStoryStore } from "@/stores/useStoryStore"
import { AnimatePresence, motion } from "motion/react"
import { useEffect, useRef } from "react"

export function Preview() {

    const { story, setStory } = useStoryStore()
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {

        if (!textareaRef.current) return;
        textareaRef.current.style.height = "30px"; // Reset height
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set new height

    }, [story])

    return (
        <AnimatePresence initial={true}>
            {
                story &&
                <motion.div
                    className="border-2 border-surfaceOutline focus-within:border-primary bg-surface p-2 rounded-xl h-fit overflow-hidden"
                    initial={{ maxHeight: 0, opacity: 0 }}
                    animate={{ maxHeight: 100000, opacity: 1 }}
                    exit={{ maxHeight: 0, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <textarea
                        ref={textareaRef}
                        className="bg-transparent placeholder:opacity-50 w-full h-full placeholder:text-light outline-none resize-none"
                        onChange={e => setStory(e.target.value)}
                        value={story}
                        autoFocus
                    >
                    </textarea>
                </motion.div>
            }
        </AnimatePresence>
    )
}