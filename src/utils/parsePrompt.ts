export function parseGenerateStoryPrompt({
    concept,
    genre,
    narrativePerspective,
    toneAndStyle,
    audienceAgeGroup,
    storyLength,
    language
}: {
    concept: string,
    genre: string,
    narrativePerspective: string,
    toneAndStyle: string,
    audienceAgeGroup: string,
    storyLength: string,
    language: string
}) {
    return `\
Your task is to generate a detailed and engaging story based on the following properties and instructions.
Each property is enclosed in angle brackets, and its value is enclosed in triple double quotes.

Properties:
<Story Concept>: """${concept}"""
<Genre>: """${genre}"""
<Narrative Perspective>: """${narrativePerspective}"""
<Tone And Style>: """${toneAndStyle}"""
<Audience Age Group>: """${audienceAgeGroup}"""
<Story Length>: """${storyLength}"""
<Language>: """${language}"""

Instructions:
1. Read and understand the properties carefully.
2. Generate a **detailed and engaging story** based on the provided properties.
3. Ensure the story has a clear **beginning, middle, and end**.
4. The story should **fit** the provided properties (concept, genre, narrative perspective, etc.).
5. If any property is missing or unclear, randomly select a fitting value and integrate it naturally into the story.
6. **Output only the story**—no extra commentary, explanations, or details.
7. The story should be well-structured, engaging, and appropriate for the **audience age group**.
8. Ensure the story is in the **specified language**.
`
}

export function parseGenerateStoryTitlePrompt({
    story,
}: {
    story: string,
}) {
    return `\
Your task is to generate a compelling and concise **title** based on the story and instructions below.

Story (delimited by triple double quotes):
"""${story}"""

Instructions:
1. The title must be between **1 and 12 words**.
2. It should accurately reflect the essence of the story.
4. Ensure the title is written in the same language as the story.
5. Output only the title—no extra commentary, explanations, or special characters.
`
}