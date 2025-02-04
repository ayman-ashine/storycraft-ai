import { create } from "zustand"

export enum SECTION {
    PROMPT,
    EDITOR
}

interface SectionStore {
    section: SECTION,
    setSection: (section: SECTION) => void
}

export const useSectionStore = create<SectionStore>((set) => ({
    section: SECTION.PROMPT,
    setSection: (section) => set({section})
}))