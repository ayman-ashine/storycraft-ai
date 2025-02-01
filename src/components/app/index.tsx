"use client"

import { Prompt } from "./prompt"
import { Preview } from "./preview"
import { AdvancedOptions } from "./advancedOptions"

export function App() {
    return (
        <div className="bg-dark w-screen h-screen overflow-hidden">
            <div className="flex flex-col gap-4 p-4 h-full overflow-y-auto">
                <Preview />
                <Prompt />
                <AdvancedOptions/>
            </div>
        </div>
    )
}