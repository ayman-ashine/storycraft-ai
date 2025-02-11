import { useEditorStore } from "@/stores/useEditorStore";
import { getDirection } from "@/utils/getDirection";
import { useEffect, useRef, useState } from "react";

export function Content() {
    const { story, editStory } = useEditorStore();
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [selectedText, setSelectedText] = useState({ start: 0, end: 0 });
    const [isFocus, setIsFocus] = useState(false)
    const [editMenu, setEditMenu] = useState<{display: boolean, text: string, x: number, y: number}>({display: false, text: "", x: 0, y:0})

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

    function handleDisplayEditTool(e: any) {
        console.log(e)
        setEditMenu({display: true, text: ""})
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
            {
                editMenu.display &&
                <div
                className="fixed flex flex-col bg-surface border border-surface-2 rounded-md w-full max-w-xl"
                style={{left: editMenu.x, top: editMenu.y}}
                >
                    <textarea className="textarea"></textarea>
                    <div className="hover:bg-primary p-4 text-sm capitalize">correct</div>
                    <div className="hover:bg-primary p-4 text-sm capitalize">expand</div>
                    <div className="hover:bg-primary p-4 text-sm capitalize">summerize</div>
                    <div className="hover:bg-primary p-4 text-sm capitalize">translate</div>
                </div>
            }
        </div>
    );
}