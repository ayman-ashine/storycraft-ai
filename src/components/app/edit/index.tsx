import { useEditorStore } from "@/stores/useEditorStore"
import { Title } from "./title"
import { Content } from "./content"
import { Controls } from "./control"
import { PlaceHolder } from "./placeholder"


export function Edit() {

    const { story } = useEditorStore()

    return story ? (
        <div className="flex flex-col flex-1 justify-center gap-4 pb-[200px]">
            <Title />
            <Content />
            <Controls />
        </div>
    ) : <PlaceHolder />
}








