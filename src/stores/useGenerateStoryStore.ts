import { create } from "zustand"

interface GenerateStoryStore {
    prompt: string
    setPrompt: (prompt: string) => void

    // Advanced Options Properties
    characters: string
    setCharacters: (characters: string) => void

    settingAtmosphere: string
    setSettingAtmosphere: (settingAtmosphere: string) => void

    conflict: string
    setConflict: (conflict: string) => void

    themes: string
    setThemes: (themes: string) => void

    genre: string
    setGenre: (genre: string) => void

    narrativePerspective: string
    setNarrativePerspective: (narrativePerspective: string) => void

    storyStructure: string
    setStoryStructure: (storyStructure: string) => void

    toneStyle: string
    setToneStyle: (toneStyle: string) => void

    storyLength: string
    setStoryLength: (storyLength: string) => void

    audienceAgeGroup: string
    setAudienceAgeGroup: (audienceAgeGroup: string) => void

    language: string
    setLanguage: (language: string) => void

    // Reset Function
    reset: () => void
}

export const useGenerateStoryStore = create<GenerateStoryStore>((set) => ({
    prompt: "",
    setPrompt: (prompt) => set({ prompt }),

    characters: "",
    setCharacters: (characters) => set({ characters }),

    settingAtmosphere: "",
    setSettingAtmosphere: (settingAtmosphere) => set({ settingAtmosphere }),

    conflict: "",
    setConflict: (conflict) => set({ conflict }),

    themes: "",
    setThemes: (themes) => set({ themes }),

    genre: "",
    setGenre: (genre) => set({ genre }),

    narrativePerspective: "",
    setNarrativePerspective: (narrativePerspective) => set({ narrativePerspective }),

    storyStructure: "",
    setStoryStructure: (storyStructure) => set({ storyStructure }),

    toneStyle: "",
    setToneStyle: (toneStyle) => set({ toneStyle }),

    storyLength: "",
    setStoryLength: (storyLength) => set({ storyLength }),

    audienceAgeGroup: "",
    setAudienceAgeGroup: (audienceAgeGroup) => set({ audienceAgeGroup }),

    language: "",
    setLanguage: (language) => set({ language }),

    reset: () => set({
        prompt: "",
        characters: "",
        settingAtmosphere: "",
        conflict: "",
        themes: "",
        genre: "",
        narrativePerspective: "",
        storyStructure: "",
        toneStyle: "",
        storyLength: "",
        audienceAgeGroup: "",
    }),
}))
