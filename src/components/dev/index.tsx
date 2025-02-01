"use client"

import Screen from "./screen"
import Container from "./container"
import Prompt from "./prompt"
import Options from "./options"

export default function App() {
    return (
        <Screen>
            <Container>
                <Prompt />
                <Options />
            </Container>
        </Screen>
    )
}