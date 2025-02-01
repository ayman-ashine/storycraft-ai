"use client"

/**
 * A reusable loder component with customizable styles and animation.
 * Relative parent position is required
 */

import { motion, AnimatePresence } from "motion/react"

export function Loader({ isLoading }: { isLoading: boolean }) {
    return (
        <AnimatePresence initial={true}>
            {
                isLoading &&
                <motion.div
                    className="top-0 left-0 z-50 absolute flex justify-center items-center w-full h-full select-none"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: .3 }}
                >
                    <motion.div
                        className="absolute border-2 border-b-transparent border-light rounded-full size-8"
                        animate={{
                            rotate: 360
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                    </motion.div>
                    <motion.div
                        className="absolute border-2 border-b-transparent border-light rounded-full size-4"
                        animate={{
                            rotate: -360
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                    </motion.div>
                </motion.div>
            }
        </AnimatePresence>
    )
}