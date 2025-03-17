
import { Heading } from './ui/heading'
import { HStack } from './ui/hstack'
import { Icon } from './ui/icon'
import { Text } from './ui/text'
import { VStack } from './ui/vstack'
import { UserPhoto } from './UserPhoto'

import { LogOut } from 'lucide-react-native'

export function HomeHeader() {
    return (
        <HStack className='bg-gray-600 pt-16 pb-5 px-8 items-center gap-4'>
            <UserPhoto source={{ uri: 'https://github.com/rangeldor.png' }} alt='Foto do usuário' size='sm' />
            <VStack className="flex-1">
                <Text className='text-gray-100 text-sm'>Olá,</Text>
                <Heading className='text-gray-100 text-md'>Daniel</Heading>
            </VStack>

            <Icon as={LogOut} size='xl' className='color-gray-200' />
        </HStack>
    )
}