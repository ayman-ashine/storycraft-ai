import { useEditorStore } from "@/stores/useEditorStore";
import { getDirection } from "@/utils/getDirection";
import { useEffect, useRef } from "react";


export function Content() {
    const { story, editStory } = useEditorStore();
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (!textareaRef.current) return;
        textareaRef.current.style.height = "30px";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }, [story]);

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
                value={story?.content}
            />
        </div>
    );
}