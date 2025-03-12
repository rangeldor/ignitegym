
import { Center } from "@components/ui/center"
import { Spinner } from "@components/ui/spinner"
import colors from "tailwindcss/colors"

export function Loading() {
    return (
        <Center className="flex-1">
            <Spinner size={"large"} color={colors.green[500]} />
        </Center>
    )
}