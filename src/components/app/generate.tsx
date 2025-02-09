import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
    BookOpenText,
    Eye,
    ChevronDown,
    Earth,
    Hourglass,
    Users,
    Drama,
    Settings,
    Sparkle,
} from "lucide-react";
import { Spinner } from "@/components/ui";
import { useGenerateStoryStore } from "@/stores/useGenerateStoryStore";
import { useEditorStore } from "@/stores/useEditorStore";
import { useSectionStore, SECTION } from "@/stores/useSectionStore";
import { generateStory } from "@/api/ai";
import {
    AUDIENCE_AGE_GROUPS,
    GENRES_OPTIONS,
    LANGUAGES,
    NARRATIVE_PERSPECTIVES,
    STORY_LENGTHS,
    TONE_STYLES,
} from "@/data/options";
import { Select } from "./select";
import { generateUniqueId } from "@/utils/generateUniqueId";
import { useToastStore } from "@/stores/useToastStore";
import { getDirection } from "@/utils/getDirection";

export function Generate() {
    return (
        <div className="flex flex-col gap-4">
            <Textarea />
            <Control />
        </div>
    );
}

function Textarea() {
    const { concept, setConcept } = useGenerateStoryStore();
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (!textareaRef.current) return;
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }, [concept]);

    return (
        <textarea
            ref={textareaRef}
            className="textarea"
            placeholder="A lonely robot finds a friend in a kind girl, but they must escape humans who fear robots..."
            onChange={(e) => setConcept(e.target.value)}
            value={concept}
            maxLength={2000}
            dir={getDirection(concept)}
            autoFocus
        />
    );
}


function Control() {
    const {
        concept,
        genre,
        narrativePerspective,
        toneAndStyle,
        audienceAgeGroup,
        storyLength,
        language,
    } = useGenerateStoryStore();
    const { setStory } = useEditorStore();
    const { setSection } = useSectionStore();
    const { setToast } = useToastStore();
    const [isLoading, setIsLoading] = useState(false);
    const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

    const handleGenerateStory = async () => {
        if (!concept || isLoading) return;
        setIsLoading(true);
        const content = await generateStory({
            concept,
            genre,
            narrativePerspective,
            toneAndStyle,
            audienceAgeGroup,
            storyLength,
            language,
        });

        if (content) {
            setStory({
                id: generateUniqueId(),
                content,
                title: "",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });
            setSection(SECTION.EDIT);
        } else {
            setToast({
                title: "Error",
                description: "Failed to generate the story. Please try again.",
                type: "danger",
            });
        }
        setIsLoading(false);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-end gap-2">
                <button
                    className="flex items-center gap-2 btn-surface"
                    onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                >
                    <Settings />
                    <span>Options</span>
                    <ChevronDown className={`transition-transform ${isAdvancedOpen ? "rotate-180" : ""}`} />
                </button>

                <button
                    className="flex items-center gap-2 btn-primary"
                    onClick={handleGenerateStory}
                    disabled={!concept}
                >
                    <Sparkle />
                    <span>Generate</span>
                    {isLoading && <Spinner type="primary" />}
                </button>
            </div>
            <AdvancedOptions isOpen={isAdvancedOpen} />
        </div>
    );
}

function AdvancedOptions({ isOpen }: { isOpen: boolean }) {
    const {
        genre,
        setGenre,
        narrativePerspective,
        setNarrativePerspective,
        toneAndStyle,
        setToneAndStyle,
        audienceAgeGroup,
        setAudienceAgeGroup,
        storyLength,
        setStoryLength,
        language,
        setLanguage,
    } = useGenerateStoryStore();

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-2 border-surface border-t"
                    initial={{ translateY: "10%", opacity: 0 }}
                    animate={{ translateY: "0%", opacity: 1 }}
                    exit={{ translateY: "10%", opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                    <Select name="Genre" icon={<Drama size={20} />} option={genre} setOption={setGenre} options={GENRES_OPTIONS} />
                    <Select name="Narrative Perspective" icon={<Eye size={20} />} option={narrativePerspective} setOption={setNarrativePerspective} options={NARRATIVE_PERSPECTIVES} />
                    <Select name="Tone & Style" icon={<BookOpenText size={20} />} option={toneAndStyle} setOption={setToneAndStyle} options={TONE_STYLES} />
                    <Select name="Audience Age Group" icon={<Users size={20} />} option={audienceAgeGroup} setOption={setAudienceAgeGroup} options={AUDIENCE_AGE_GROUPS} />
                    <Select name="Story Length" icon={<Hourglass size={20} />} option={storyLength} setOption={setStoryLength} options={STORY_LENGTHS} />
                    <Select name="Language" icon={<Earth size={20} />} option={language} setOption={setLanguage} options={LANGUAGES} />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
