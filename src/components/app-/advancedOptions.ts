import React from "react"
import { useGenerateStoryStore } from "@/stores/useGenerateStoryStore"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown } from "lucide-react" // Replace with your actual import

function AdvancedOptions() {
    const {
        characters,
        setCharacters,
        settingAtmosphere,
        setSettingAtmosphere,
        conflict,
        setConflict,
        themes,
        setThemes,
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
        reset
    } = useGenerateStoryStore()

    const [displayAdvancedOptions, setDisplayAdvancedOptions] = React.useState(false)

    return (
        <div className= "flex flex-col items-start gap-4 w-full" >
        <button
                className="flex justify-center items-center gap-1 opacity-80 hover:opacity-100 underline duration-200"
    onClick = {() => setDisplayAdvancedOptions(state => !state)
}
            >
    <span className="font-medium capitalize" > advanced options </span>
        < ChevronDown className = {`${displayAdvancedOptions ? "rotate-180" : ""} duration-200`} />
            </button>
            < AnimatePresence initial = { true} >
            {
                displayAdvancedOptions &&
                <motion.div
                        className="gap-4 grid grid-cols-1 md:grid-cols-2 w-full overflow-hidden"
initial = {{ maxHeight: 0, opacity: 0 }}
animate = {{ maxHeight: 1000, opacity: 1 }}
exit = {{ maxHeight: 0, opacity: 0 }}
transition = {{ duration: 0.5, ease: "linear" }}
                    >
    <div className="flex flex-col gap-2" >
        {/* Characters */ }
        < label htmlFor = "characters" className = { className.label } >
            Describe Your Characters
                </label>
                < textarea
id = "characters"
className = { className.textarea }
placeholder = "Provide details about your main characters (e.g., personality, appearance, motivations)..."
value = { characters }
onChange = {(e) => setCharacters(e.target.value)}
                            />

{/* Setting and Atmosphere */ }
<label htmlFor="settingAtmosphere" className = { className.label } >
    Describe the Setting & Atmosphere
        </label>
        < textarea
id = "settingAtmosphere"
className = { className.textarea }
placeholder = "Describe the environment, mood, and atmosphere of the story (e.g., dark and stormy night, futuristic city)..."
value = { settingAtmosphere }
onChange = {(e) => setSettingAtmosphere(e.target.value)}
                            />

{/* Central Conflict */ }
<label htmlFor="conflict" className = { className.label } >
    Describe the Central Conflict
        </label>
        < textarea
id = "conflict"
className = { className.textarea }
placeholder = "What is the main conflict driving the story (e.g., protagonist vs. antagonist, internal struggle, societal issue)..."
value = { conflict }
onChange = {(e) => setConflict(e.target.value)}
                            />

{/* Themes */ }
<label htmlFor="themes" className = { className.label } >
    List the Themes You Want to Explore
        </label>
        < textarea
id = "themes"
className = { className.textarea }
placeholder = "List any themes you want the story to explore (e.g., love, betrayal, justice, freedom)..."
value = { themes }
onChange = {(e) => setThemes(e.target.value)}
                            />
    </div>
    < div className = "flex flex-col gap-2" >
        {/* Genre */ }
        < label htmlFor = "genre" className = { className.label } >
            Genre
            </label>
            < select
id = "genre"
className = { className.select }
value = { genre }
onChange = {(e) => setGenre(e.target.value)}
                            >
    <option value="adventure" > Adventure </option>
        < option value = "mystery" > Mystery </option>
            < option value = "romance" > Romance </option>
                < option value = "fantasy" > Fantasy </option>
                    < option value = "sciFi" > Sci - Fi </option>
                        < option value = "horror" > Horror </option>
                            < option value = "historical" > Historical </option>
                                < option value = "thriller" > Thriller </option>
                                    < option value = "drama" > Drama </option>
                                        < option value = "action" > Action </option>
                                            < option value = "comedy" > Comedy </option>
                                                < option value = "sliceOfLife" > Slice of Life </option>
                                                    < option value = "supernatural" > Supernatural </option>
                                                        < option value = "dystopian" > Dystopian </option>
                                                            < option value = "comingOfAge" > Coming of Age </option>
                                                                < option value = "magicRealism" > Magic Realism </option>
                                                                    </select>

{/* Narrative Perspective */ }
<label htmlFor="narrativePerspective" className = { className.label } >
    Narrative Perspective
        </label>
        < select
id = "narrativePerspective"
className = { className.select }
value = { narrativePerspective }
onChange = {(e) => setNarrativePerspective(e.target.value)}
                            >
    <option value="firstPerson" > First Person </option>
        < option value = "thirdPerson" > Third Person </option>
            < option value = "omniscient" > Omniscient </option>
                < option value = "secondPerson" > Second Person </option>
                    < option value = "limitedThirdPerson" > Limited Third Person </option>
                        < option value = "unreliableNarrator" > Unreliable Narrator </option>
                            </select>

{/* Story Structure */ }
<label htmlFor="storyStructure" className = { className.label } >
    Story Structure
        </label>
        < select
id = "storyStructure"
className = { className.select }
value = { storyStructure }
onChange = {(e) => setStoryStructure(e.target.value)}
                            >
    <option value="threeAct" > 3 - Act Structure </option>
        < option value = "linear" > Linear </option>
            < option value = "nonlinear" > Nonlinear </option>
                < option value = "heroJourney" > Hero's Journey</option>
                    < option value = "circular" > Circular </option>
                        < option value = "inMediasRes" > In Medias Res </option>
                            < option value = "frameStory" > Frame Story </option>
                                < option value = "episodic" > Episodic </option>
                                    < option value = "parallelStorylines" > Parallel Storylines </option>
                                        </select>

{/* Tone & Style */ }
<label htmlFor="toneStyle" className = { className.label } >
    Tone & Style
    </label>
    < select
id = "toneStyle"
className = { className.select }
value = { toneStyle }
onChange = {(e) => setToneStyle(e.target.value)}
                            >
    <option value="formal" > Formal </option>
        < option value = "casual" > Casual </option>
            < option value = "dark" > Dark </option>
                < option value = "humorous" > Humorous </option>
                    < option value = "lighthearted" > Lighthearted </option>
                        < option value = "sarcastic" > Sarcastic </option>
                            < option value = "optimistic" > Optimistic </option>
                                < option value = "melancholic" > Melancholic </option>
                                    < option value = "realistic" > Realistic </option>
                                        < option value = "satirical" > Satirical </option>
                                            < option value = "mysterious" > Mysterious </option>
                                                < option value = "tragic" > Tragic </option>
                                                    </select>

{/* Story Length */ }
<label htmlFor="storyLength" className = { className.label } >
    Story Length
        </label>
        < select
id = "storyLength"
className = { className.select }
value = { storyLength }
onChange = {(e) => setStoryLength(e.target.value)}
                            >
    <option value="short" > Short </option>
        < option value = "medium" > Medium </option>
            < option value = "long" > Long </option>
                < option value = "veryLong" > Very Long </option>
                    </select>

{/* Audience Age Group */ }
<label htmlFor="audienceAgeGroup" className = { className.label } >
    Audience Age Group
        </label>
        < select
id = "audienceAgeGroup"
className = { className.select }
value = { audienceAgeGroup }
onChange = {(e) => setAudienceAgeGroup(e.target.value)}
                            >
    <option value="kids" > Kids </option>
        < option value = "teens" > Teens </option>
            < option value = "adults" > Adults </option>
                < option value = "allAges" > All Ages </option>
                    </select>
                    </div>
                    </motion.div>
                }
</AnimatePresence>
{/* Optional: Reset Button */ }
<button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
onClick = { reset }
    >
    Reset Advanced Options
        </button>
        </div>
    )
}
