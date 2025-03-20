import { ComponentProps } from 'react';
import { Button as GluestackButton, ButtonText, ButtonSpinner } from '@components/ui/button';

interface Props extends ComponentProps<typeof GluestackButton> {
    title: string;
    isLoading?: boolean;
}

export function Button({ title, isLoading = false, ...rest }: Props) {
    return (
        <GluestackButton
            {...rest}
            className='w-full rounded-md'
            disabled={isLoading}
        >
            {isLoading ? <ButtonSpinner size={"small"} /> :
                <ButtonText>
                    {title}
                </ButtonText>
            }
        </GluestackButton>
    )
}