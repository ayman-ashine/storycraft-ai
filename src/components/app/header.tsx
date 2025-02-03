import { Home, Pen } from "lucide-react";

export default function Header() {
    return (
        <header className="w-full see">
            <nav className="flex gap-4">
                <button
                    className="flex items-center gap-2 bg-sheen px-4 py-2 rounded-md"
                >
                    <Home size={18}/>
                    <span className="font-[600] text-nowrap text-sm capitalize">home</span>
                </button>
                <button
                    className="flex items-center gap-2 bg-sheen px-4 py-2 rounded-md"
                >
                    <Pen size={18}/>
                    <span className="font-[600] text-nowrap text-sm capitalize">edit</span>
                </button>
                <button
                    className="flex items-center gap-2 bg-sheen px-4 py-2 rounded-md"
                >
                    <Home size={18}/>
                    <span className="font-[600] text-nowrap text-sm capitalize">home</span>
                </button>
            </nav>
        </header>
    )
}