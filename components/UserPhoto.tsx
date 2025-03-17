import { ComponentProps } from "react";
import { Image } from "./ui/image";

interface Props extends ComponentProps<typeof Image> { }

export function UserPhoto({ ...rest }: Props) {
    return <Image className="rounded-full border-2 border-gray-400 bg-gray-500" {...rest} />
}