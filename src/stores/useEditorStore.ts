import { create } from "zustand"

interface StoryStore {

    title: string
    setTitle: (title: string) => void

    story: string
    setStory: (story: string) => void

}

export const useEditorStore = create<StoryStore>((set) => ({

    title: "",
    setTitle: (title) => set({ title }),

    story: "",
    setStory: (story) => set(({ story })),

}))