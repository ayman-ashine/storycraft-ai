import { create } from "zustand";
import { Story } from "@/data/types";

interface StoriesArchiveStore {
    stories: Story[];
    addStory: (story: Story) => void;
    removeStory: (id: string) => void;
    editStory: (id: string, updatedStory: Partial<Story>) => void;
}

export const useStoriesArchiveStore = create<StoriesArchiveStore>((set) => {
    // Check if we're in the browser (client-side)
    if (typeof window !== "undefined") {
        const storedStories = localStorage.getItem("stories");
        const initialStories = storedStories ? JSON.parse(storedStories) : [];

        return {
            stories: initialStories,
            addStory: (story) => {
                set((state) => {
                    const newStories = [...state.stories, story];
                    localStorage.setItem("stories", JSON.stringify(newStories));
                    return { stories: newStories };
                });
            },
            removeStory: (id) => {
                set((state) => {
                    const newStories = state.stories.filter((story) => story.id !== id);
                    localStorage.setItem("stories", JSON.stringify(newStories));
                    return { stories: newStories };
                });
            },
            editStory: (id, updatedStory) => {
                set((state) => {
                    const newStories = state.stories.map((story) =>
                        story.id === id ? { ...story, ...updatedStory } : story
                    );
                    localStorage.setItem("stories", JSON.stringify(newStories));
                    return { stories: newStories };
                });
            },
        };
    }

    // Fallback empty state for SSR
    return {
        stories: [],
        addStory: () => {},
        removeStory: () => {},
        editStory: () => {},
    };
});
