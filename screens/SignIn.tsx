import { ScrollView } from "react-native";

import BackgroundImg from '@assets/background.png';
import Logo from '@assets/logo.svg'

import { VStack } from "@components/ui/vstack";
import { Center } from "@components/ui/center";
import { Image } from "@components/ui/image";
import { Text } from "@components/ui/text";
import { Heading } from "@components/ui/heading";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { useAuth } from "@hooks/useAuth";
import { Controller, useForm } from "react-hook-form";
import { useToast } from "@components/ui/toast";
import { AppError } from "@utils/AppError";
import { ToastMessage } from "@components/ToastMessage";
import { useState } from "react";

interface FormData {
    email: string
    password: string
}

export function SignIn() {
    const { signIn } = useAuth()
    const toast = useToast();
    const navigation = useNavigation<AuthNavigatorRoutesProps>()

    const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>()

    const handleNewAccount = () => {
        navigation.navigate('signUp')
    }

    async function handleSignIn({ email, password }: FormData) {

        try {
            await signIn(email, password);
        } catch (error) {
            const isAppError = error instanceof AppError;

            const description = isAppError ? error.message : 'Não foi possível entrar. Tente novamente mais tarde.'

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
        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} className="flex-grow bg-background-0 h-full">
            <VStack className="w-full flex-1" space="md">
                <Image
                    source={BackgroundImg}
                    defaultSource={BackgroundImg}
                    className="absolute w-full h-[624]"
                    alt="Pessoas treinando"
                />

                <VStack space="4xl" className="px-10 pb-16 flex-1">
                    <Center className="my-24">
                        <Logo />

                        <Text className="text-sm">
                            Treine sua mente e o seu corpo.
                        </Text>
                    </Center>

                    <Center className="gap-4 flex-1">
                        <Heading className=" text-2xl">
                            Acesse sua conta
                        </Heading>

                        <Controller
                            control={control}
                            name="email"
                            rules={{ required: 'Informe o e-mail' }}
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder="E-mail"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    onChangeText={onChange}
                                    value={value}
                                    errorMessage={errors.email?.message}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="password"
                            rules={{ required: 'Informe a senha' }}
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder="Senha"
                                    secureTextEntry
                                    onChangeText={onChange}
                                    value={value}
                                    errorMessage={errors.password?.message}
                                />
                            )}
                        />

                        <Button
                            size="xl"
                            action="primary"
                            variant="solid"
                            title="Acessar"
                            onPress={handleSubmit(handleSignIn)}
                            isLoading={isSubmitting}
                        />
                    </Center>

                    <Center className="flex-end mt-16">
                        <Text className="text-sm mb-4 font-body">
                            Ainda não tem acesso?
                        </Text>
                        <Button
                            size="xl"
                            action="primary"
                            variant="outline"
                            title="Criar conta"
                            onPress={handleNewAccount}
                            isDisabled={isSubmitting}
                        />
                    </Center>
                </VStack>
            </VStack>
        </ScrollView>
    )
}