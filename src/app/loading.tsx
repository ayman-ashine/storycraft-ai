import { Screen, Spinner } from "@/components/ui"

export default function Loading() {
    return (
        <Screen>
            <Spinner size={40} spinnerColor="dark" bgColor="light" />
        </Screen>
    )
}