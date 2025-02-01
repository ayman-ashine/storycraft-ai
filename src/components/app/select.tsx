"use client"

import React, { useRef, useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"

export function Select({
    label,
    icon,
    option,
    setOption,
    options
}: {
    label: string,
    icon: React.ReactNode,
    option: string,
    setOption: (option: string) => void,
    options: string[]
}) {

    const [display, setDisplay] = useState(false)
    const select = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (select.current && !select.current.contains(target)) {
                setDisplay(false);
            }
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <div
            ref={select}
            className={`select-none relative flex justify-between items-center gap-2 bg-surface px-4 py-2 border-2 rounded-xl w-full cursor-pointer ${display ? "border-primary" : "border-surfaceOutline"}`}
            onClick={() => setDisplay(state => !state)}
        >
            {
                option ?
                    <span className="capitalize">{option}</span>
                    :
                    <div className="flex items-center gap-2">
                        {icon}
                        <span className="capitalize">{label}</span>
                    </div>
            }
            <ChevronDown className={`duration-200 ${display ? "rotate-180" : ""}`} />
            {
                display &&
                <div className="top-full left-0 z-50 absolute border-surfaceOutline bg-surface shadow-md shadow-shadow mt-2 border rounded-xl w-full overflow-hidden">
                    {
                        options.map(option => {
                            return (
                                <div
                                    key={option}
                                    className="hover:bg-primary px-4 py-2 text-sm capitalize"
                                    onClick={() => setOption(option)}
                                >
                                    {option}
                                </div>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}