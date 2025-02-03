export default function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-4 p-4 w-full max-w-4xl max-h-full overflow-y-scroll">
            {children}
        </div>
    )
}