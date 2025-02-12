import { useEditorStore } from "@/stores/useEditorStore";
import { getDirection } from "@/utils/getDirection";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from 'motion/react';

const options = [
    {
        name: "Fix Grammar",
        action: () => { }
    },
    {
        name: "Expand Text",
        action: () => { }
    },
    {
        name: "Summarize",
        action: () => { }
    },
    {
        name: "Rewrite",
        action: () => { }
    }
];


export function Content() {
    const { story, editStory } = useEditorStore();
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [selectedText, setSelectedText] = useState({ start: 0, end: 0 });
    const [isFocus, setIsFocus] = useState(false)
    const [editMenu, setEditMenu] = useState<{ display: boolean, text: string }>({ display: false, text: "" })

    function getRandomSelection(textLength: number): { start: number, end: number } {
        if (!textLength) return { start: 0, end: 0 };
        const maxLength = Math.min(100, textLength);
        const start = Math.floor(Math.random() * textLength) - maxLength;
        const end = start + Math.floor(Math.random() * maxLength);
        return { start, end };
    }

    function isCharSelected(index: number) {
        return index >= selectedText.start && index < selectedText.end
    }

    function handleDisplayEditTool() {
        const text = window.getSelection()?.toString() || "";
        setEditMenu({
            display: true,
            text: text,
        })
    }

    useEffect(() => {
        if (!textareaRef.current) return;
        textareaRef.current.style.height = "30px";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }, [story]);

    useEffect(() => {
        if (!story || isFocus) {
            setSelectedText(getRandomSelection(0))
            return
        }
        const interval = setInterval(() => {
            setSelectedText(getRandomSelection(story.content.length));
        }, 300);
        return () => clearInterval(interval);
    }, [story, isFocus]);

    return (
        <div
            className="relative w-full"
            dir={getDirection(story?.content)}
        >
            <textarea
                ref={textareaRef}
                className="textarea"
                placeholder="Story..."
                onChange={(e) => editStory({ content: e.target.value })}
                onSelect={handleDisplayEditTool}
                value={story?.content}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
            />
            {
                !isFocus &&
                <div className="top-0 left-0 absolute inset-0 w-full h-full break-words whitespace-pre-wrap pointer-events-none textarea">
                    {story?.content?.split("").map((char, index) => (
                        <span
                            key={index}
                            className="transition-colors duration-300"
                            style={{ backgroundColor: isCharSelected(index) ? "var(--primary)" : "transparent", }}
                        >
                            {char}
                        </span>
                    ))}
                </div>
            }
            <AnimatePresence>
                {
                    (editMenu.display && editMenu.text) &&
                    <motion.div
                        className="bottom-0 left-0 z-50 fixed flex flex-col gap-4 bg-surface p-4 border-surface-2 border-t w-screen h-fit"
                        initial={{ translateY: "100%" }}
                        animate={{ translateY: "0%" }}
                        exit={{ translateY: "100%" }}
                    >
                        <textarea
                            className="textarea"
                            placeholder="Paragraph..."
                            defaultValue={editMenu.text}
                        ></textarea>
                        <div className="flex flex-wrap gap-2">
                            {
                                options.map(option => {
                                    return (
                                        <div
                                            key={option.name}
                                            className="hover:bg-primary px-2 py-1 border border-surface-2 rounded-full text-sm capitalize transition-colors duration-200 cursor-pointer"
                                        >
                                            {option.name}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    );
}