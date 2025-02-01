import {
    ChevronDown,
    BookOpen,
    Layers,
    Cctv,
    Film,
    Hourglass,
    Users,
    Earth,
    Castle,
    Swords,
    Lightbulb
} from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { motion } from "motion/react"
import { useGenerateStoryStore } from "@/stores/useGenerateStoryStore";

// Local
import { Select } from "./select"

export function AdvancedOptions() {

    const [display, setDisplay] = useState(false)

    return (
        <div className="flex flex-col gap-4">
            <button
                className="hover:brightness-110 flex items-center gap-2 active:scale-95 bg-surface px-4 py-2 rounded-xl w-fit"
                onClick={() => setDisplay(state => !state)}
            >
                <span className="capitalize">advanced options</span>
                <ChevronDown className={`${display ? "rotate-180" : ""} duration-200`} />
            </button>
            <AnimatePresence initial={true}>
                {display &&
                    <motion.div
                        className="flex lg:flex-row flex-col items-start gap-4"
                        initial={{ maxHeight: 0, opacity: 0 }}
                        animate={{ maxHeight: 1000, opacity: 1 }}
                        exit={{ maxHeight: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "linear" }}
                    >

                        <StoryTextareaOptions />
                        <StorySelectOptions />
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}

function StoryTextareaOptions() {

    const {
        characters,
        setCharacters,
        settingAtmosphere,
        setSettingAtmosphere,
        conflict,
        setConflict,
        themes,
        setThemes,
    } = useGenerateStoryStore()

    return (
        <div className="flex flex-col gap-4 md:w-1/2">
            {/* Characters */}
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="characters"
                    className="flex items-center gap-2"
                >
                    <Users />
                    <span className="font-medium text-sm capitalize">Describe Your Characters</span>
                </label>
                <textarea
                    className="border-surfaceOutline focus:border-primary bg-surface p-2 border rounded-xl outline-none"
                    placeholder="Provide details about your main characters (e.g., personality, appearance, motivations)..."
                    value={characters}
                    onChange={e => setCharacters(e.target.value)}
                />
            </div>
            {/* Setting and Atmosphere */}
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="settingAtmosphere"
                    className="flex items-center gap-2"
                >
                    <Castle />
                    <span className="font-medium text-sm capitalize">Describe the Setting & Atmosphere</span>
                </label>
                <textarea
                    className="border-surfaceOutline focus:border-primary bg-surface p-2 border rounded-xl outline-none"
                    placeholder="Describe the environment, mood, and atmosphere of the story (e.g., dark and stormy night, futuristic city)..."
                    value={settingAtmosphere}
                    onChange={e => setSettingAtmosphere(e.target.value)}
                />
            </div>
            {/* Central Conflict */}
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="conflict"
                    className="flex items-center gap-2"
                >
                    <Swords />
                    <span className="font-medium text-sm capitalize">Describe the Central Conflict</span>
                </label>
                <textarea
                    className="border-surfaceOutline focus:border-primary bg-surface p-2 border rounded-xl outline-none"
                    placeholder="What is the main conflict driving the story (e.g., protagonist vs. antagonist, internal struggle, societal issue)..."
                    value={conflict}
                    onChange={e => setConflict(e.target.value)}
                />
            </div>
            {/* Themes */}
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="themes"
                    className="flex items-center gap-2"
                >
                    <Lightbulb />
                    <span className="font-medium text-sm capitalize">List the Themes You Want to Explore</span>
                </label>
                <textarea
                    className="border-surfaceOutline focus:border-primary bg-surface p-2 border rounded-xl outline-none"
                    placeholder="List any themes you want the story to explore (e.g., love, betrayal, justice, freedom)..."
                    value={themes}
                    onChange={e => setThemes(e.target.value)}
                />
            </div>
        </div>
    )
}

function StorySelectOptions() {

    const {
        genre,
        setGenre,
        narrativePerspective,
        setNarrativePerspective,
        storyStructure,
        setStoryStructure,
        toneStyle,
        setToneStyle,
        storyLength,
        setStoryLength,
        audienceAgeGroup,
        setAudienceAgeGroup,
        language,
        setLanguage
    } = useGenerateStoryStore()
    const genreOptions = ["Adventure", "Mystery", "Romance", "Fantasy", "Sci-Fi", "Horror", "Historical", "Thriller", "Drama", "Action", "Comedy", "Slice of Life", "Supernatural", "Dystopian", "Coming of Age", "Magic Realism"];
    const perspectiveOptions = ["First Person", "Third Person", "Omniscient", "Second Person", "Limited Third Person", "Unreliable Narrator"];
    const structureOptions = ["3-Act Structure", "Linear", "Nonlinear", "Hero's Journey", "Circular", "In Medias Res", "Frame Story", "Episodic", "Parallel Storylines"];
    const toneOptions = ["Formal", "Casual", "Dark", "Humorous", "Lighthearted", "Sarcastic", "Optimistic", "Melancholic", "Realistic", "Satirical", "Mysterious", "Tragic"];
    const lengthOptions = ["Short", "Medium", "Long", "Very Long"];
    const ageGroupOptions = ["Kids", "Teens", "Adults", "All Ages"];
    const languageOptions = ["English", "Spanish", "French", "German", "Chinese", "Hindi", "Arabic", "Portuguese", "Russian", "Japanese", "Italian", "Korean", "Dutch", "Turkish", "Swedish", "Polish", "Vietnamese", "Thai", "Greek", "Hebrew", "Finnish", "Czech", "Danish", "Norwegian", "Hungarian", "Ukrainian", "Indonesian", "Malay", "Romanian", "Bulgarian", "Tamil", "Urdu", "Persian", "Swahili", "Zulu", "Xhosa", "Afrikaans", "Tagalog", "Nepali", "Sinhala", "Burmese", "Khmer", "Lao", "Mongolian", "Tibetan", "Javanese", "Sundanese", "Other"];

    return (
        <div className="gap-4 grid grid-cols-1 lg:grid-cols-2 md:w-1/2">
            <Select
                label="Genre"
                icon={<BookOpen />}
                option={genre}
                setOption={setGenre}
                options={genreOptions}
            />
            <Select
                label="Story Structure"
                icon={<Layers />}
                option={storyStructure}
                setOption={setStoryStructure}
                options={structureOptions}
            />
            <Select
                label="Narrative Perspective"
                icon={<Cctv />}
                option={narrativePerspective}
                setOption={setNarrativePerspective}
                options={perspectiveOptions}
            />
            <Select
                label="Tone & Style"
                icon={<Film />}
                option={toneStyle}
                setOption={setToneStyle}
                options={toneOptions}
            />
            <Select
                label="Story Length"
                icon={<Hourglass />}
                option={storyLength}
                setOption={setStoryLength}
                options={lengthOptions}
            />
            <Select
                label="Audience Age Group"
                icon={<Users />}
                option={audienceAgeGroup}
                setOption={setAudienceAgeGroup}
                options={ageGroupOptions}
            />
            <Select
                label="Language"
                icon={<Earth />}
                option={language}
                setOption={setLanguage}
                options={languageOptions}
            />

        </div>
    );
}

// function Select({
//     label,
//     icon,
//     options,
//     value,
//     handle
// }: {
//     label: string,
//     icon: React.ReactNode,
//     options: string[],
//     value: string,
//     handle: (e: React.ChangeEvent<HTMLSelectElement>) => void
// }) {
//     return (
//         <div className="flex flex-col gap-2">
//             <label
//                 htmlFor={label}
//                 className="flex items-center gap-2"
//             >
//                 {icon}
//                 <span className="font-medium text-sm capitalize">{label}</span>
//             </label>
//             <select
//                 className="border-surfaceOutline focus:border-primary bg-surface p-2 border rounded-xl outline-none"
//                 onChange={handle}
//                 value={value}
//             >
//                 <option value="">None</option>
//                 {
//                     options.map(option => {
//                         return <option key={option} value={option} className="capitalize">{option}</option>
//                     })
//                 }
//             </select>
//         </div>
//     )
// }
