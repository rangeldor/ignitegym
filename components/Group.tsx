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
                bg-background-0
                rounded-md
                justify-center
                items-center
                border-primary-500                
                active:border
                active:border-primary-500  
                ${isActive ? 'border' : 'border-none'}
                `}
        >
            <Text
                className={`
                ${isActive ? 'text-primary-500' : 'text-typography-900'} 
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