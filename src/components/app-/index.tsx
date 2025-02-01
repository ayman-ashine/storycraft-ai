"use client"

import { AnimatePresence, motion } from "motion/react"
import { Screen, Scroll, Container } from "@/components/ui"
import { useGenerateStoryStore } from "@/stores/useGenerateStoryStore"
import { ChevronDown, Sparkle } from "lucide-react"
import { useState } from "react"
import { parseStoryPrompt } from "@/utils/parseStoryPrompt"
import { useStoryStore } from "@/stores/useStoryStore"

const className = {
    textarea: "bg-transparent p-4 rounded-xl min-h-[80px] placeholder:text-light placeholder:opacity-50 border-2 border-surface focus:border-primary duration-200 w-full outline-none",
    label: "block font-medium text-sm",
    select: "bg-surface px-4 py-2 rounded-xl focus:border-primary border-2 w-full outline-none border-transparent"
}

export function AppScreen() {
    return (
        <Screen>
            <Scroll>
                <Container>
                    <div className="flex flex-col gap-4 p-4">
                        <PromptInput />
                        <AdvancedOptions />
                        <WriteButton />
                        <StoryPreview />
                    </div>
                </Container>
            </Scroll>
        </Screen>
    )
}

function PromptInput() {

    const { prompt, setPrompt } = useGenerateStoryStore()

    return (
        <textarea
            className={className.textarea}
            placeholder="What's the core of your story?"
            onChange={e => setPrompt(e.target.value)}
            value={prompt}
        >
        </textarea>
    )
}

function AdvancedOptions() {

    const [displayAdvancedOptions, setDisplayAdvancedOptions] = useState(false)
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
        language,
        setLanguage
    } = useGenerateStoryStore()

    return (
        <div className="flex flex-col items-start gap-4 w-full">
            <button
                className="flex justify-center items-center gap-1 opacity-80 hover:opacity-100 underline duration-200"
                onClick={() => setDisplayAdvancedOptions(state => !state)}
            >
                <span className="font-medium capitalize">advanced options</span>
                <ChevronDown className={`${displayAdvancedOptions ? "rotate-180" : ""} duration-200`} />
            </button>
            <AnimatePresence initial={true}>
                {
                    displayAdvancedOptions &&
                    <motion.div
                        className="gap-4 grid grid-cols-1 md:grid-cols-2 w-full overflow-hidden"
                        initial={{ maxHeight: 0, opacity: 0 }}
                        animate={{ maxHeight: 1000, opacity: 1 }}
                        exit={{ maxHeight: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "linear" }}
                    >
                        <div className="flex flex-col gap-2">
                            {/* Characters */}
                            <label
                                htmlFor="characters"
                                className={className.label}
                            >
                                Describe Your Characters
                            </label>
                            <textarea
                                className={className.textarea}
                                placeholder="Provide details about your main characters (e.g., personality, appearance, motivations)..."
                                value={characters}
                                onChange={e => setCharacters(e.target.value)}
                            />

                            {/* Setting and Atmosphere */}
                            <label
                                htmlFor="settingAtmosphere"
                                className={className.label}
                            >
                                Describe the Setting & Atmosphere
                            </label>
                            <textarea
                                className={className.textarea}
                                placeholder="Describe the environment, mood, and atmosphere of the story (e.g., dark and stormy night, futuristic city)..."
                                value={settingAtmosphere}
                                onChange={e => setSettingAtmosphere(e.target.value)}
                            />

                            {/* Central Conflict */}
                            <label
                                htmlFor="conflict"
                                className={className.label}
                            >
                                Describe the Central Conflict
                            </label>
                            <textarea
                                className={className.textarea}
                                placeholder="What is the main conflict driving the story (e.g., protagonist vs. antagonist, internal struggle, societal issue)..."
                                value={conflict}
                                onChange={e => setConflict(e.target.value)}
                            />
                            {/* Themes */}
                            <label
                                htmlFor="themes"
                                className={className.label}
                            >
                                List the Themes You Want to Explore
                            </label>
                            <textarea
                                className={className.textarea}
                                placeholder="List any themes you want the story to explore (e.g., love, betrayal, justice, freedom)..."
                                value={themes}
                                onChange={e => setThemes(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            {/* Genre */}
                            <label
                                htmlFor="genre"
                                className={className.label}
                            >
                                Genre
                            </label>
                            <select
                                className={className.select}
                                onChange={e => setGenre(e.target.value)}
                                value={genre}
                            >
                                <option value="">None</option>
                                <option value="adventure">Adventure</option>
                                <option value="mystery">Mystery</option>
                                <option value="romance">Romance</option>
                                <option value="fantasy">Fantasy</option>
                                <option value="sciFi">Sci-Fi</option>
                                <option value="horror">Horror</option>
                                <option value="historical">Historical</option>
                                <option value="thriller">Thriller</option>
                                <option value="drama">Drama</option>
                                <option value="action">Action</option>
                                <option value="comedy">Comedy</option>
                                <option value="sliceOfLife">Slice of Life</option>
                                <option value="supernatural">Supernatural</option>
                                <option value="dystopian">Dystopian</option>
                                <option value="comingOfAge">Coming of Age</option>
                                <option value="magicRealism">Magic Realism</option>
                            </select>

                            {/* Narrative Perspective */}
                            <label
                                htmlFor="narrativePerspective"
                                className={className.label}
                            >
                                Narrative Perspective
                            </label>
                            <select
                                className={className.select}
                                onChange={e => setNarrativePerspective(e.target.value)}
                                value={narrativePerspective}
                            >
                                <option value="">None</option>
                                <option value="firstPerson">First Person</option>
                                <option value="thirdPerson">Third Person</option>
                                <option value="omniscient">Omniscient</option>
                                <option value="secondPerson">Second Person</option>
                                <option value="limitedThirdPerson">Limited Third Person</option>
                                <option value="unreliableNarrator">Unreliable Narrator</option>
                            </select>

                            {/* Story Structure */}
                            <label
                                htmlFor="storyStructure"
                                className={className.label}
                            >
                                Story Structure
                            </label>
                            <select
                                className={className.select}
                                onChange={e => setStoryStructure(e.target.value)}
                                value={storyStructure}
                            >
                                <option value="">None</option>
                                <option value="threeAct">3-Act Structure</option>
                                <option value="linear">Linear</option>
                                <option value="nonlinear">Nonlinear</option>
                                <option value="heroJourney">{`Hero's Journey`}</option>
                                <option value="circular">Circular</option>
                                <option value="inMediasRes">In Medias Res</option>
                                <option value="frameStory">Frame Story</option>
                                <option value="episodic">Episodic</option>
                                <option value="parallelStorylines">Parallel Storylines</option>
                            </select>

                            {/* Tone & Style */}
                            <label
                                htmlFor="toneStyle"
                                className={className.label}
                            >
                                Tone & Style
                            </label>
                            <select
                                className={className.select}
                                onChange={e => setToneStyle(e.target.value)}
                                value={toneStyle}
                            >
                                <option value="">None</option>
                                <option value="formal">Formal</option>
                                <option value="casual">Casual</option>
                                <option value="dark">Dark</option>
                                <option value="humorous">Humorous</option>
                                <option value="lighthearted">Lighthearted</option>
                                <option value="sarcastic">Sarcastic</option>
                                <option value="optimistic">Optimistic</option>
                                <option value="melancholic">Melancholic</option>
                                <option value="realistic">Realistic</option>
                                <option value="satirical">Satirical</option>
                                <option value="mysterious">Mysterious</option>
                                <option value="tragic">Tragic</option>
                            </select>

                            {/* Story Length */}
                            <label
                                htmlFor="storyLength"
                                className={className.label}
                            >
                                Story Length
                            </label>
                            <select
                                className={className.select}
                                onChange={e => setStoryLength(e.target.value)}
                                value={storyLength}
                            >
                                <option value="">None</option>
                                <option value="short">Short</option>
                                <option value="medium">Medium</option>
                                <option value="long">Long</option>
                                <option value="veryLong">Very Long</option>
                            </select>

                            {/* Audience Age Group */}
                            <label
                                htmlFor="audienceAgeGroup"
                                className={className.label}
                            >
                                Audience Age Group
                            </label>
                            <select
                                className={className.select}
                                onChange={e => setAudienceAgeGroup(e.target.value)}
                                value={audienceAgeGroup}
                            >
                                <option value="">None</option>
                                <option value="kids">Kids</option>
                                <option value="teens">Teens</option>
                                <option value="adults">Adults</option>
                                <option value="allAges">All Ages</option>
                            </select>

                            {/* Language */}
                            <label htmlFor="language" className={className.label}>
                                Language
                            </label>
                            <select
                                className={className.select}
                                onChange={e => setLanguage(e.target.value)}
                                value={language}
                            >
                                <option value="">None</option>
                                <option value="en">English</option>
                                <option value="es">Spanish</option>
                                <option value="fr">French</option>
                                <option value="de">German</option>
                                <option value="zh">Chinese</option>
                                <option value="hi">Hindi</option>
                                <option value="ar">Arabic</option>
                                <option value="pt">Portuguese</option>
                                <option value="ru">Russian</option>
                                <option value="ja">Japanese</option>
                                <option value="it">Italian</option>
                                <option value="ko">Korean</option>
                                <option value="nl">Dutch</option>
                                <option value="tr">Turkish</option>
                                <option value="sv">Swedish</option>
                                <option value="pl">Polish</option>
                                <option value="vi">Vietnamese</option>
                                <option value="th">Thai</option>
                                <option value="el">Greek</option>
                                <option value="he">Hebrew</option>
                                <option value="fi">Finnish</option>
                                <option value="cs">Czech</option>
                                <option value="da">Danish</option>
                                <option value="no">Norwegian</option>
                                <option value="hu">Hungarian</option>
                                <option value="uk">Ukrainian</option>
                                <option value="id">Indonesian</option>
                                <option value="ms">Malay</option>
                                <option value="ro">Romanian</option>
                                <option value="bg">Bulgarian</option>
                                <option value="ta">Tamil</option>
                                <option value="ur">Urdu</option>
                                <option value="fa">Persian</option>
                                <option value="sw">Swahili</option>
                                <option value="zu">Zulu</option>
                                <option value="xh">Xhosa</option>
                                <option value="af">Afrikaans</option>
                                <option value="tl">Tagalog</option>
                                <option value="ne">Nepali</option>
                                <option value="si">Sinhala</option>
                                <option value="my">Burmese</option>
                                <option value="km">Khmer</option>
                                <option value="lo">Lao</option>
                                <option value="mn">Mongolian</option>
                                <option value="bo">Tibetan</option>
                                <option value="jw">Javanese</option>
                                <option value="su">Sundanese</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}

function WriteButton() {

    const {
        prompt,
        characters,
        settingAtmosphere,
        conflict,
        themes,
        genre,
        narrativePerspective,
        storyStructure,
        toneStyle,
        storyLength,
        audienceAgeGroup,
        language
        // reset
    } = useGenerateStoryStore()
    const { setStory } = useStoryStore()
    const [isLoading, setIsLoading] = useState(false)

    const handleGenerateStory = async () => {
        if (!prompt) return
        setIsLoading(true)
        const storyPrompt = parseStoryPrompt({
            prompt,
            characters,
            settingAtmosphere,
            conflict,
            themes,
            genre,
            narrativePerspective,
            storyStructure,
            toneStyle,
            storyLength,
            audienceAgeGroup,
            language
        })
        try {
            const response = await fetch("/generate-story", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ storyPrompt }),
            });
            if (!response.ok) {
                throw new Error('Failed to generate story');
            }
            const story = await response.json();
            setStory(story);
            setIsLoading(false)
        } catch (error) {
            console.error("Error generating story:", error);
            setIsLoading(false)
        }
    }

    return (
        <button
            className={`relative flex justify-center items-center overflow-hidden gap-2 bg-primary hover:bg-primaryHover px-4 py-2 rounded-xl w-fit duration-200 ${!prompt ? "opacity-80 cursor-not-allowed" : ""}`}
            onClick={handleGenerateStory}
        >
            {
                isLoading &&
                <div className="top-0 left-0 absolute flex justify-center items-center bg-primary w-full h-full">
                    <motion.div
                        className="border-2 border-b-transparent border-light rounded-full size-6"
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
                </div>
            }
            <Sparkle />
            <span className="capitalize">write</span>
        </button>
    )
}

function StoryPreview() {

    const { story, setStory } = useStoryStore()

    return story && (
        <div className="bg-primary shadow-md shadow-shadow p-4 rounded-xl w-full font-normal text-base text-light">
            {story}
        </div>
    )
}