import { useStoryStore } from "@/stores/useStoryStore"
import { AnimatePresence, motion } from "motion/react"
import { useEffect, useRef } from "react"

export default function Preview() {

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
                    className="bg-surface p-4 rounded-xl overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                >
                    <textarea
                        ref={textareaRef}
                        className="bg-transparent w-full h-full outline-none resize-none"
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