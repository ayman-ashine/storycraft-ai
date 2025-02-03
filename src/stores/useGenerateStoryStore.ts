import { create } from "zustand"

interface GenerateStoryStore {
    prompt: string
    setPrompt: (prompt: string) => void

    // Advanced Options
    genre: string
    setGenre: (genre: string) => void

    narrativePerspective: string
    setNarrativePerspective: (narrativePerspective: string) => void

    toneAndStyle: string
    setToneAndStyle: (toneAndStyle: string) => void

    storyLength: string
    setStoryLength: (storyLength: string) => void

    audienceAgeGroup: string
    setAudienceAgeGroup: (audienceAgeGroup: string) => void

    language: string
    setLanguage: (language: string) => void

    // Generate status
    isGenerating: boolean
    setIsGenerating: (isGenerating: boolean) => void

    // Reset Function
    reset: () => void
}

export const useGenerateStoryStore = create<GenerateStoryStore>((set) => ({
    prompt: "",
    setPrompt: (prompt) => set({ prompt }),

    genre: "",
    setGenre: (genre) => set({ genre }),

    narrativePerspective: "",
    setNarrativePerspective: (narrativePerspective) => set({ narrativePerspective }),

    toneAndStyle: "",
    setToneAndStyle: (toneAndStyle) => set({ toneAndStyle }),

    storyLength: "",
    setStoryLength: (storyLength) => set({ storyLength }),

    audienceAgeGroup: "",
    setAudienceAgeGroup: (audienceAgeGroup) => set({ audienceAgeGroup }),

    language: "",
    setLanguage: (language) => set({ language }),

    isGenerating: false,
    setIsGenerating: (isGenerating) => set({ isGenerating }),

    reset: () => set({
        prompt: "",
        genre: "",
        narrativePerspective: "",
        toneAndStyle: "",
        storyLength: "",
        audienceAgeGroup: "",
    }),
}))
