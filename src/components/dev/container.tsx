export default function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col justify-center gap-4 p-4 w-full max-w-4xl h-full overflow-y-scroll">
            {children}
        </div>
    )
}