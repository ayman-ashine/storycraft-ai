"use client"

import { Screen, Container } from "@/components/ui"
import { Header } from "./header"
import { Section } from "./section"

export function App() {
    return (
        <Screen>
            <Container>
                <Header />
                <Section />
            </Container>
        </Screen>
    )
}