export function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-4 mx-auto p-4 w-full max-w-4xl h-full overflow-x-hidden overflow-y-auto">
            {children}
        </div>
    );
}
