import { Input as GluestackInput, InputField } from "@components/ui/input";
import { ComponentProps } from "react";

interface Props extends ComponentProps<typeof InputField> {
    isReadOnly?: boolean
}

export function Input({ isReadOnly = false, ...rest }: Props) {
    return (
        <GluestackInput
            className="rounded-md bg-background-0 h-16"
            variant="outline"
            size="xl"
            isReadOnly={isReadOnly}
            isDisabled={isReadOnly}
        >
            <InputField
                className="
                    px-4
                    focus:border-2
                    focus:border-green-700                
                    dark:focus:border-green-500 
                "
                {...rest}
            />
        </GluestackInput>
    );
}