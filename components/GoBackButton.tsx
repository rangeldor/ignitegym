import { Button, ButtonIcon } from '@components/ui/button'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { ArrowLeft } from 'lucide-react-native'
import { VStack } from './ui/vstack'

export function GoBackButton() {
    const navigation = useNavigation<AppNavigatorRoutesProps>()
    const handleGoBack = () => {
        navigation.goBack()
    }

    return (
        <VStack>
            <Button variant='link' size='md' className='justify-start items-center' onPress={handleGoBack}>
                <ButtonIcon
                    size='md'
                    as={ArrowLeft}
                />
            </Button>
        </VStack>
    )
}