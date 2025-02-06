"use client"

import { Screen, Container, Toast } from "@/components/ui"
import { Header } from "./header"
import { Section } from "./section"

export function App() {
    return (
        <Screen>
            <Header />
            <Container>
                <Section />
            </Container>
            <Toast />
        </Screen>
    )
}