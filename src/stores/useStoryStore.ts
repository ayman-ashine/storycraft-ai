import { create } from "zustand"

interface StoryStore {
    story: string
    setStory: (story: string) => void
}

export const useStoryStore = create<StoryStore>((set) => ({
    story: "",
    setStory: (story) => set(({story}))
}))