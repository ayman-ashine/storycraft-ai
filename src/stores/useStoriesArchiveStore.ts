import { create } from "zustand";

type Story = {
    id: string;
    title: string;
    story: string;
    dateCreated: string;
};

interface StoriesArchiveStore {
    stories: Story[];
    addStory: (story: Story) => void;
    removeStory: (id: string) => void;
    editStory: (id: string, updatedStory: Partial<Story>) => void;
}

export const useStoriesArchiveStore = create<StoriesArchiveStore>((set) => ({
    stories: [],
    addStory: (story) =>
        set((state) => ({
            stories: [...state.stories, story]
        })),
    removeStory: (id) =>
        set((state) => ({
            stories: state.stories.filter((story) => story.id !== id)
        })),
    editStory: (id, updatedStory) =>
        set((state) => ({
            stories: state.stories.map((story) =>
                story.id === id ? { ...story, ...updatedStory } : story
            ),
        })),
}));