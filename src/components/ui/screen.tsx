export function Screen({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative bg-dark w-screen h-screen overflow-hidden">
            {children}
        </div>
    )
}