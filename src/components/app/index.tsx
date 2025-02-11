"use client"

import { Screen, Container, Scroll } from "@/components/ui"
import { useSectionStore, SECTION } from "@/stores/useSectionStore"
import { Header } from "./header"
import { Generate } from "./generate"
import { Edit } from "./edit"
import { Archive } from "./archive"
import { AnimateDisplay } from "./animateDisplay"
import { Toast } from "./toast"


export function App() {

    const { section } = useSectionStore()

    return (
        <Screen>
            <Header />
            <Scroll>
                <Container>
                    <AnimateDisplay key={section}>
                        {section === SECTION.GENERATE && <Generate />}
                        {section === SECTION.EDIT && <Edit />}
                        {section === SECTION.ARCHIVE && <Archive />}
                    </AnimateDisplay>
                </Container>
            </Scroll>
            <Toast />
        </Screen>
    )
}