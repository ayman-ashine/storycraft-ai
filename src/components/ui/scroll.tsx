export function Scroll({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-full overflow-x-hidden overflow-y-auto">
            {children}
        </div>
    )
}