export function parseStoryPrompt(
    {
        prompt,
        characters,
        settingAtmosphere,
        conflict,
        themes,
        genre,
        narrativePerspective,
        storyStructure,
        toneStyle,
        storyLength,
        audienceAgeGroup,
        language
    }: {
        prompt: string;
        characters: string;
        settingAtmosphere: string;
        conflict: string;
        themes: string;
        genre: string;
        narrativePerspective: string;
        storyStructure: string;
        toneStyle: string;
        storyLength: string;
        audienceAgeGroup: string;
        language: string;
    }
) {
    return `\
    Generate a story based on the following details. \
    Ensure the story is engaging, well-structured, and aligns with the provided specifications:
    <concept>: """${prompt}"""
    <characters>: """${characters || "choose"}"""
    <setting atmosphere>: """${settingAtmosphere || "choose"}"""
    <conflict>: """${conflict || "choose"}"""
    <themes>: """${themes || "choose"}"""
    <genre>: """${genre || "choose"}"""
    <narrative perspective>: """${narrativePerspective || "choose"}"""
    <structure>: """${storyStructure || "choose"}"""
    <tone style>: """${toneStyle || "choose"}"""
    <length>: """${storyLength || "choose"}"""
    <audience age group>: """${audienceAgeGroup || "choose"}"""
    <language>: """${language || "en"}"""
    If any details are unspecified, use your creativity to fill in the gaps while maintaining coherence and depth. The story should be original, emotionally resonant, and tailored to the provided guidelines.
`;
}