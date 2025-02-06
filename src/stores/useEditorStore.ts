import { create } from "zustand"
import { Story } from "@/data/types"

interface EditorStore {
    story: Story | null
    setStory: (story: Story | null) => void
    editStory: (updatedStory: Partial<Story>) => void
}

export const useEditorStore = create<EditorStore>((set) => ({
    story: {
        id: "",
        title: "",
        content: "",
        createdAt: "",
        updatedAt: "",
    },
    setStory: (story) => set(({ story })),
    editStory: (updatedStory) => set((state) => ({
        story: state.story
            ? { ...state.story, ...updatedStory, updatedAt: new Date().toISOString() }
            : state.story,
    }))
}));
