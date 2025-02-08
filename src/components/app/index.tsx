"use client"

import { Screen, Container, Toast } from "@/components/ui"
import { useSectionStore, SECTION } from "@/stores/useSectionStore"
import { Header } from "./header"
import { Generate } from "./generate"
import { Edit } from "./edit"
import { Archive } from "./achrive"
import { AnimateDisplay } from "./animateDisplay"


export function App() {

    const { section } = useSectionStore()

    return (
        <Screen>
            <Header />
            <Container>
                <AnimateDisplay key={section}>
                    {section === SECTION.GENERATE && <Generate />}
                    {section === SECTION.EDIT && <Edit />}
                    {section === SECTION.ARCHIVE && <Archive />}
                </AnimateDisplay>
            </Container>
            <Toast />
        </Screen>
    )
}