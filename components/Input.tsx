import { Input as GluestackInput, InputField } from "@components/ui/input";
import { ComponentProps } from "react";

interface Props extends ComponentProps<typeof InputField> { }

export function Input({ ...rest }: Props) {
    return (
        <GluestackInput
            className="rounded-md bg-white dark:bg-gray-800"
            variant="outline"
            size="xl"
        >
            <InputField
                className="
                    focus:border-2
                    focus:border-green-700
                    placeholder:color-gray-500                 
                    dark:focus:border-green-500 
                    dark:placeholder:color-white 
                "
                {...rest}
            />
        </GluestackInput>
    );
}