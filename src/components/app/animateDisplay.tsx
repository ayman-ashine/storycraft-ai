import {motion, AnimatePresence} from 'motion/react';

export function AnimateDisplay({ children }: { children: React.ReactNode }) {
    return (
        <AnimatePresence initial={true}>
            <motion.div
                className="flex flex-col flex-1 justify-center gap-4"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}