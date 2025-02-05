import { useStoriesArchiveStore } from "@/stores/useStoriesArchiveStore"

export function Archive(){

    const {stories} = useStoriesArchiveStore()

    return stories.length ? (
        <div className="flex flex-col flex-1 justify-center gap-4">

        </div>
    ) : <PlaceHolder/>
}

function PlaceHolder() {
    return (
        <div className="flex flex-col flex-1 justify-center items-center gap-2 opacity-50">
            <svg className="stroke-2 stroke-light" width="100px" height="100px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none">
                <polyline points="34.48 54.28 11.06 54.28 11.06 18.61 23.02 5.75 48.67 5.75 48.67 39.42" />
                <polyline points="23.04 5.75 23.02 18.61 11.06 18.61" />
                <line x1="16.21" y1="45.68" x2="28.22" y2="45.68" />
                <line x1="16.21" y1="39.15" x2="31.22" y2="39.15" />
                <line x1="16.21" y1="33.05" x2="43.22" y2="33.05" />
                <line x1="16.21" y1="26.95" x2="43.22" y2="26.95" />
                <circle cx="42.92" cy="48.24" r="10.01" strokeLinecap="round" />
                <line x1="39.05" y1="44.36" x2="46.8" y2="52.11" />
                <line x1="39.05" y1="52.11" x2="46.8" y2="44.36" />
            </svg>
            <h1 className="font-[600] text-xl">
                {"No story available."}
            </h1>
            <p className="font-[600] text-center">
                {"Go to the prompt section to create one."}
            </p>
        </div>
    )
}