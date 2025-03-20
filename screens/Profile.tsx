import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { ScreenHeader } from '@components/ScreenHeader'
import { Center } from '@components/ui/center'
import { Heading } from '@components/ui/heading'
import { Text } from '@components/ui/text'
import { VStack } from '@components/ui/vstack'
import { UserPhoto } from '@components/UserPhoto'
import { ScrollView, TouchableOpacity } from 'react-native'

export function Profile() {
    return (
        <VStack className="flex-1">
            <ScreenHeader title='Perfil' />

            <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
                <Center className='mt-16 px-10'>
                    <UserPhoto
                        source={{ uri: 'https://github.com/rangeldor.png' }}
                        alt='Foto do usuário'
                        size='xl'
                    />

                    <TouchableOpacity>
                        <Text className='text-success-500 text-md mt-4 mb-8 font-heading'>
                            Alterar Foto
                        </Text>
                    </TouchableOpacity>

                    <Center className='w-full gap-4 mt-16'>
                        <Input placeholder="Nome" />
                        <Input value="arthur@email.com" isReadOnly />
                    </Center>

                    <Heading className='self-start mt-16 mb-4'>Alterar senha</Heading>

                    <Center className='w-full gap-4'>
                        <Input placeholder="Senha antiga" secureTextEntry />
                        <Input placeholder="Nova senha" secureTextEntry />
                        <Input placeholder="Confirme a nova senha" secureTextEntry />

                        <Button action='positive' variant='solid' size='xl' title='Atualizar' />
                    </Center>
                </Center>
            </ScrollView>
        </VStack>
    )
}