export default function Screen({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative flex justify-center items-center bg-dark w-screen h-screen overflow-hidden">
            {children}
        </div>
    )
}