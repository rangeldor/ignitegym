import { Input as GluestackInput, InputField } from "@components/ui/input";
import { ComponentProps } from "react";
import { FormControl, FormControlError, FormControlErrorText } from "./ui/form-control";

interface Props extends ComponentProps<typeof InputField> {
    errorMessage?: string | null
    isInvalid?: boolean
    isReadOnly?: boolean
    isDisabled?: boolean
}

export function Input({
    isReadOnly = false,
    isDisabled = false,
    errorMessage = null,
    isInvalid = false,
    ...rest
}: Props) {
    const invalid = !!errorMessage || isInvalid

    return (
        <FormControl isInvalid={invalid} className="w-full">
            <GluestackInput
                className="rounded-md bg-background-0 h-16"
                variant="outline"
                size="xl"
                isInvalid={isInvalid}
                isReadOnly={isReadOnly}
                isDisabled={isDisabled}
            >
                <InputField
                    className="
                    px-4
                "
                    {...rest}
                />
            </GluestackInput>

            <FormControlError>
                <FormControlErrorText className="text-error-500">
                    {errorMessage}
                </FormControlErrorText>
            </FormControlError>
        </FormControl>
    );
}