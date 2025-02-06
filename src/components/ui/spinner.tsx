interface SpinerProps {
    size?: number;
    type?: "dark" | "light" | "primary"
}

const className = {
    dark: "bg-dark [&_div]:border-light [&_div]:border-2 [&_div]:border-b-transparent",
    light: "bg-light [&_div]:border-dark [&_div]:border-2 [&_div]:border-b-transparent",
    primary: "bg-primary [&_div]:border-light [&_div]:border-2 [&_div]:border-b-transparent",
}

export function Spinner({ size = 20, type = "dark" }: SpinerProps) {
    return (
        <div
            className={`select-none top-0 left-0 z-50 absolute flex justify-center items-center w-full h-full ${className[type]}`}
        >
            <div
                className="rounded-full animate-spin"
                style={{ width: size, height: size }}
            ></div>
        </div>
    );
}