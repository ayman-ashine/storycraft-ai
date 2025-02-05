interface SpinerProps {
    size?: number;
    bgColor?: "dark" | "light"
    spinnerColor?: "dark" | "light";
}

export function Spinner({ size = 20, bgColor = "dark", spinnerColor = "light" }: SpinerProps) {
    return (
        <div
            className={`select-none top-0 left-0 z-50 absolute flex justify-center items-center w-full h-full ${bgColor === "dark" ? "bg-dark" : "bg-light"}`}
        >
            <div
                className={`border-2 border-b-transparent rounded-full animate-spin ${spinnerColor === "dark" ? "border-dark" : "border-light"}`}
                style={{ width: size, height: size }}
            ></div>
        </div>
    );
}