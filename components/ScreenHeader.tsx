import { Card } from "./ui/card";
import { Heading } from "./ui/heading";

interface Props {
    title: string
}

export function ScreenHeader({ title }: Props) {
    return (
        <Card variant="filled" size="lg" className="items-center rounded-none">
            <Heading size="lg">{title}</Heading>
        </Card>
    )
}