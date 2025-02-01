import { ArrowUp } from "lucide-react"

export default function Dev() {
    return (
        <Screen>
            <Container>
                <Prompt />
                <div className="opacity-50 text-center text-sm">
                    Share your ideas, make your own story, and bring it to life with your words.
                </div>
            </Container>
        </Screen>
    )
}

function Screen({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex justify-center items-center bg-dark w-screen h-screen overflow-hidden">
            {children}
        </div>
    )
}

function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-4 p-4 w-full max-w-2xl overflow-y-scroll">
            {children}
        </div>
    )
}

function Prompt() {
    return (
        <div className="flex flex-col gap-4 bg-surface shadow-md shadow-shadow p-4 rounded-xl w-full h-fit">
            <textarea
                className="bg-transparent placeholder:opacity-50 h-10 placeholder:text-light capitalize outline-none resize-none"
                placeholder="what story in your mind?"
            >
            </textarea>
            <button
                className="bg-light opacity-50 hover:opacity-100 p-2 rounded-full aspect-square self-end"
            >
                <ArrowUp size={20} className="stroke-dark" />
            </button>
        </div>
    )
}