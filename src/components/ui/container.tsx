export function Container({ children }: { children: React.ReactNode }) {
    return (
        <div
            className="flex flex-col gap-4 mx-auto p-4 w-full max-w-6xl h-full overflow-y-auto"
            role="region"
            aria-label="Content Container"
        >
            {children}
        </div>
    );
}
