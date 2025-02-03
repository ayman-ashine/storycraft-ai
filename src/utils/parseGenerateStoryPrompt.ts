export default function parseGenerateStoryPrompt({
    prompt,
    genre,
    narrativePerspective,
    toneAndStyle,
    audienceAgeGroup,
    storyLength,
    language
}: {
    prompt: string,
    genre: string,
    narrativePerspective: string,
    toneAndStyle: string,
    audienceAgeGroup: string,
    storyLength: string,
    language: string
}) {
    return `\
Your task is to generate a detailed and engaging story \
based on the following properties and instructions. Each property is enclosed in angle brackets, \
and its value is enclosed in triple double quotes.

Properties:
<Story Idea>: """${prompt}"""
<Genre>: """${genre}"""
<Narrative Perspective>: """${narrativePerspective}"""
<Tone And Style>: """${toneAndStyle}"""
<Audience Age Group>: """${audienceAgeGroup}"""
<Story Length>: """${storyLength}"""
<Language>: """${language}"""

Instructions:
Follow these instructions carefully and generate **only** the story, \
without any additional commentary, explanations, or details. \
Ensure that the story is well-structured, engaging, and fits the given properties. \
The output should be a narrative with a clear beginning, middle, and end. \
Do not include any introductory text or clarifications; just provide the story.
`
}
