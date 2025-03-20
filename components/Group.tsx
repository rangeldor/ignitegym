import { ComponentProps } from "react";
import { Button } from "./ui/button";
import { Text } from "./ui/text";

interface Props extends ComponentProps<typeof Button> {
    name: string
    isActive: boolean
}

export function Group({ name, isActive, ...rest }: Props) {
    return (
        <Button
            {...rest}
            className={`
                min-w-24
                h-10
                bg-gray-600
                rounded-md
                justify-center
                items-center
                border-success-300                
                active:border
                ${isActive ? 'border' : 'border-none'}
                `}
        >
            <Text
                className={`
                ${isActive ? 'text-success-500' : 'text-typography-white'} 
                uppercase
                text-sm
                font-heading
                `}
            >
                {name}
            </Text>
        </Button>
    )
}