
import { Card } from './ui/card'
import { Heading } from './ui/heading'
import { HStack } from './ui/hstack'
import { Icon } from './ui/icon'
import { Text } from './ui/text'
import { VStack } from './ui/vstack'
import { UserPhoto } from './UserPhoto'

import { LogOut } from 'lucide-react-native'

export function HomeHeader() {
    return (
        <Card variant='filled'>
            <HStack className='pt-16 pb-5 items-center gap-4'>
                <UserPhoto source={{ uri: 'https://github.com/rangeldor.png' }} alt='Foto do usuário' size='sm' />
                <VStack className="flex-1">
                    <Text>Olá,</Text>
                    <Heading>Daniel</Heading>
                </VStack>

                <Icon as={LogOut} size='xl' />
            </HStack>
        </Card>
    )
}