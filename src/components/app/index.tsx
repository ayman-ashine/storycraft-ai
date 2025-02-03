"use client"

import Screen from "./screen"
import Container from "./container"
// import Header from "./header"
import Prompt from "./prompt"
import Options from "./options"
import StoryGenerator from "./storyGenerator"
import Preview from "./preview"

export default function App() {
    return (
        <Screen>
            <Container>
                {/* <Header/> */}
                <Preview/>
                <Prompt />
                <Options />
                <StoryGenerator/>
            </Container>
        </Screen>
    )
}