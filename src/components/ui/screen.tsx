export function Screen({ children }: { children: React.ReactNode }) {
    return (
        <div
            className="relative flex flex-col justify-center items-center bg-dark w-screen h-screen overflow-hidden"
            role="main"
            aria-label="Main Screen"
        >
            {children}
        </div>
    )
}