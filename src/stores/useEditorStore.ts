import { create } from "zustand"
import { Story } from "@/data/types"

interface EditorStore {
    story: Story | null
    setStory: (story: Story) => void
    editStory: (updatedStory: Partial<Story>) => void
}

export const useEditorStore = create<EditorStore>((set) => ({
    story: null,
    setStory: (story) => set(({ story })),
    editStory: (updatedStory) => set((state) => ({
        story: state.story
            ? { ...state.story, ...updatedStory }
            : state.story,
    }))
}));
