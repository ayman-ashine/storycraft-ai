export function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="mx-auto w-full max-w-6xl">
            {children}
        </div>
    )
}