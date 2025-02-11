"use client"

import { CircleCheck, CircleX, TriangleAlert, X } from "lucide-react"
import { useEffect } from "react"
import { motion, AnimatePresence } from 'motion/react';
import { useToastStore } from "@/stores/useToastStore"

const className = {
    surface: "bg-surface border-surfaceHover border",
    danger: "bg-danger",
    warning: "bg-warning",
    success: "bg-success"
}

const icons = {
    surface: <></>,
    danger: <CircleX size={30} />,
    warning: <TriangleAlert size={30} />,
    success: <CircleCheck size={30} />,
}

export function Toast() {

    const { toast, setToast } = useToastStore()

    const handleCloseToast = () => {
        setToast(null)
    }

    useEffect(() => {
        if (!toast) return
        setTimeout(() => setToast(null), 3000)
    }, [toast, setToast])

    return (
        <AnimatePresence>
            {
                toast &&
                <motion.div
                    className={`z-[100] left-0 bottom-0 fixed flex max-w-full items-center gap-2 m-4 p-2 rounded-xl w-fit ${className[toast.type || "surface"]}`}
                    initial={{ translateX: "-100%", opacity: 0 }}
                    animate={{ translateX: "0%", opacity: 1 }}
                    exit={{ translateX: "-100%", opacity: 0 }}
                >
                    {icons[toast.type || "surface"]}
                    <div className="">
                        <h1 className="font-[600] text-light text-sm capitalize">
                            {toast.title}
                        </h1>
                        {
                            toast.description &&
                            <p className="text-sm">
                                {toast.description}
                            </p>
                        }
                    </div>
                    <button
                        className="p-1 btn-circle-reverse"
                        onClick={handleCloseToast}
                    >
                        <X />
                    </button>
                </motion.div>
            }
        </AnimatePresence>
    )
}