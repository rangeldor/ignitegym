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
import { useAuth } from '@hooks/useAuth'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { AppError } from '@utils/AppError'
import { api } from '@services/api'

const profileSchema = yup.object({
    name: yup.string().required('Informe seu nome.'),
    email: yup.string().required('Informe seu email.').email('Email inválido'),
    old_password: yup.string(),
    password: yup.string().min(6, 'A senha deve ter pelo menos 6 dígitos').nullable().transform((value) => !!value ? value : null),
    confirm_password: yup
        .string()
        .nullable()
        .transform((value) => !!value ? value : null)
        .oneOf([yup.ref('password'), null], 'A confirmação da senha está incorreta')
        .when('password', {
            is: (Field: any) => Field,
            then: (schema) => schema.nullable().required('Informe a confirmação da senha.').transform((value) => !!value ? value : null)
        }),
});

type FormData = yup.InferType<typeof profileSchema>;

export function Profile() {
    const [isUpdating, setIsUpdating] = useState(false);
    const [userPhoto, setUserPhoto] = useState('https://github.com/rangeldor.png')

    const toast = useToast()
    const { user, updateUserProfile } = useAuth();
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            name: user.name,
            email: user.email
        },
        resolver: yupResolver(profileSchema)
    });

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

    const handleProfileUpdate = async (data: FormData) => {
        try {
            setIsUpdating(true);
            const userUpdated = user;
            userUpdated.name = data.name;

            await api.put('/users', data);

            await updateUserProfile(userUpdated);

            toast.show({
                placement: 'top',
                duration: 6000,
                render: ({ id }) => (
                    <ToastMessage
                        id={id}
                        title='Erro!'
                        description='Perfil atualizado com sucesso!'
                        action='success'
                        onClose={() => toast.close(id)}
                    />
                )
            })
        } catch (error) {
            const isAppError = error instanceof AppError;
            const description = isAppError ? error.message : 'Não foi possível atualizar os dados. Tente novamente mais tarde.';

            toast.show({
                placement: 'top',
                duration: 6000,
                render: ({ id }) => (
                    <ToastMessage
                        id={id}
                        title='Erro!'
                        description={description}
                        action='error'
                        onClose={() => toast.close(id)}
                    />
                )
            })
        } finally {
            setIsUpdating(false);
        }
    }

    return (
        <VStack className="flex-1 bg-background-100 h-full">
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
                        <Controller
                            control={control}
                            name="name"
                            render={({ field: { value, onChange } }) => (
                                <Input
                                    placeholder='Nome'
                                    onChangeText={onChange}
                                    value={value}
                                    errorMessage={errors.name?.message}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { value, onChange } }) => (
                                <Input
                                    placeholder="E-mail"
                                    isDisabled
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                    </Center>

                    <Heading className='self-start mt-16 mb-4'>Alterar senha</Heading>

                    <Center className='w-full gap-4'>
                        <Controller
                            control={control}
                            name="old_password"
                            render={({ field: { onChange } }) => (
                                <Input
                                    placeholder="Senha antiga"
                                    secureTextEntry
                                    onChangeText={onChange}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange } }) => (
                                <Input
                                    placeholder="Nova senha"
                                    secureTextEntry
                                    onChangeText={onChange}
                                    errorMessage={errors.password?.message}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="confirm_password"
                            render={({ field: { onChange } }) => (
                                <Input
                                    placeholder="Confirme a nova senha"
                                    secureTextEntry
                                    onChangeText={onChange}
                                    errorMessage={errors.confirm_password?.message}
                                />
                            )}
                        />

                        <Button
                            action='primary'
                            variant='solid'
                            size='xl'
                            title='Atualizar'
                            onPress={handleSubmit(handleProfileUpdate)}
                            isLoading={isUpdating}
                        />
                    </Center>
                </Center>
            </ScrollView>
        </VStack>
    )
}