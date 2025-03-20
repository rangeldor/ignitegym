import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { ScreenHeader } from '@components/ScreenHeader'
import { Center } from '@components/ui/center'
import { Heading } from '@components/ui/heading'
import { Text } from '@components/ui/text'
import { VStack } from '@components/ui/vstack'
import { UserPhoto } from '@components/UserPhoto'
import { ScrollView, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { useState } from 'react'
import { useToast } from '@components/ui/toast'
import { ToastMessage } from '@components/ToastMessage'

export function Profile() {
    const [userPhoto, setUserPhoto] = useState('https://github.com/rangeldor.png')

    const toast = useToast()

    const handleUserPhotoSelect = async () => {
        try {
            const photoSelected = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                aspect: [4, 4],
                quality: 1,
            })

            if (photoSelected.canceled) return

            const photoUri = photoSelected.assets[0].uri

            if (photoUri) {
                const photoInfo = (await FileSystem.getInfoAsync(photoUri))

                if (photoInfo.exists) {
                    if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
                        toast.show({
                            placement: 'top',
                            duration: 6000,
                            render: ({ id }) => (
                                <ToastMessage
                                    id={id}
                                    title='Tamanho da imagem excede o limite'
                                    description='Escolha uma imagem de até 5MB'
                                    action='error'
                                    onClose={() => toast.close(id)}
                                />
                            )
                        })
                    } else {
                        setUserPhoto(photoSelected.assets[0].uri)
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <VStack className="flex-1">
            <ScreenHeader title='Perfil' />

            <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
                <Center className='mt-8 px-10'>
                    <UserPhoto
                        source={{ uri: userPhoto }}
                        alt='Foto do usuário'
                        size='xl'
                    />

                    <TouchableOpacity onPress={handleUserPhotoSelect}>
                        <Text className='text-primary-500 text-md mt-4 mb-8 font-heading'>
                            Alterar Foto
                        </Text>
                    </TouchableOpacity>

                    <Center className='w-full gap-4 mt-8'>
                        <Input placeholder="Nome" />
                        <Input value="arthur@email.com" isReadOnly />
                    </Center>

                    <Heading className='self-start mt-16 mb-4'>Alterar senha</Heading>

                    <Center className='w-full gap-4'>
                        <Input placeholder="Senha antiga" secureTextEntry />
                        <Input placeholder="Nova senha" secureTextEntry />
                        <Input placeholder="Confirme a nova senha" secureTextEntry />

                        <Button action='primary' variant='solid' size='xl' title='Atualizar' />
                    </Center>
                </Center>
            </ScrollView>
        </VStack>
    )
}