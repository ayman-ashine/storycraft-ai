export function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-4 mx-auto p-4 w-full max-w-4xl min-h-full">
            {children}
        </div>
    );
}
