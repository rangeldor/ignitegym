
import { useAuth } from '@hooks/useAuth'
import { Card } from './ui/card'
import { Heading } from './ui/heading'
import { HStack } from './ui/hstack'
import { Icon } from './ui/icon'
import { Text } from './ui/text'
import { VStack } from './ui/vstack'
import { UserPhoto } from './UserPhoto'

import { LogOut } from 'lucide-react-native'

import defaultUserPhotoImg from '@assets/userPhotoDefault.png'
import { Button, ButtonIcon } from './ui/button'

export function HomeHeader() {
    const { user, signOut } = useAuth()

    return (
        <Card variant='filled'>
            <HStack className='mt-10 pb-5 items-center gap-4'>
                <UserPhoto source={user.avatar ? { uri: user.avatar } : defaultUserPhotoImg} alt='Foto do usuário' size='sm' />
                <VStack className="flex-1">
                    <Text>Olá,</Text>
                    <Heading>{user.name}</Heading>
                </VStack>

                <Button variant='link' size='xl' className='justify-start items-center' onPress={signOut}>
                    <ButtonIcon
                        size='xl'
                        as={LogOut}
                    />
                </Button>
            </HStack>
        </Card>
    )
}