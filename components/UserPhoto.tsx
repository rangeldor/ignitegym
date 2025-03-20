import { ComponentProps } from "react";
import { Image } from "./ui/image";

interface Props extends ComponentProps<typeof Image> { }

export function UserPhoto({ ...rest }: Props) {
    return <Image className="rounded-full border-2 border-primary-300 bg-primary-500" {...rest} />
}