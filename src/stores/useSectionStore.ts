import { create } from "zustand"

export enum SECTION {
    GENERATE,
    EDIT,
    ARCHIVE
}

interface SectionStore {
    section: SECTION,
    previous: SECTION,
    setSection: (section: SECTION) => void,
    goBack: () => void,
}

export const useSectionStore = create<SectionStore>((set) => ({
    section: SECTION.GENERATE,
    previous: SECTION.GENERATE,
    setSection: (section) => set(state => ({section, previous: state.section})),
    goBack: () => set(state => ({section: state.previous}))
}))