
import { Center } from "@components/ui/center"
import { Spinner } from "@components/ui/spinner"
import colors from "tailwindcss/colors"

export function Loading() {
    return (
        <Center className="flex-1">
            <Spinner size={"large"} className="color-green-500" />
        </Center>
    )
}