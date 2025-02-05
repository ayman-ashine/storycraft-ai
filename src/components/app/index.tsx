"use client"

import { Screen, Container, Toast } from "@/components/ui"
import { Header } from "./header"
import { Section } from "./section"

export function App() {
    return (
        <Screen>
            <Container>
                <Header />
                <Section />
                <Toast/>
            </Container>
        </Screen>
    )
}