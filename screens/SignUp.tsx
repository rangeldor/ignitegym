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
import { Alert } from 'react-native';
import axios from 'axios';
import { AppError } from '@utils/AppError';

import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { Controller, useForm } from "react-hook-form";

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { api } from "@services/api";
import { useToast } from "@components/ui/toast";
import { ToastMessage } from "@components/ToastMessage";
import { useState } from "react";
import { useAuth } from "@hooks/useAuth";

interface FormDataProps {
    name: string;
    email: string;
    password: string;
    password_confirm: string;
}

const signUpSchema = yup.object({
    name: yup.string().required('Informe o nome'),
    email: yup.string().required('Informe o e-mail').email('E-mail inválido'),
    password: yup.string().required('Informe a senha').min(6, 'A senha deve ter pelo menos 6 dígitos.'),
    password_confirm: yup
        .string()
        .required('Confirme a senha')
        .oneOf([yup.ref('password'), ''], 'A confirmação da senha não confere.'),
});

type FormData = yup.InferType<typeof signUpSchema>;

export function SignUp() {
    const [isLoading, setIsLoading] = useState(false);

    const toast = useToast();
    const { signIn } = useAuth();

    const navigation = useNavigation<AuthNavigatorRoutesProps>()
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(signUpSchema),
    })

    const handleBackToSignIn = () => {
        navigation.navigate('signIn')
    }

    const handleSignUp = async ({ name, email, password }: FormDataProps) => {
        try {
            setIsLoading(true)

            await api.post('/users', { name, email, password });
            await signIn(email, password)
        } catch (error) {
            const isAppError = error instanceof AppError;

            const description = isAppError ? error.message : 'Não foi possível criar a conta. Tente novamente mais tarde';

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
            setIsLoading(false);
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
                        <Heading className="text-2xl">
                            Crie sua conta
                        </Heading>

                        <Controller
                            control={control}
                            name="name"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder="Nome"
                                    onChangeText={onChange}
                                    value={value}
                                    errorMessage={errors.name?.message}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="email"
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

                        <Controller
                            control={control}
                            name="password_confirm"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder="Confirmar a Senha"
                                    secureTextEntry
                                    onChangeText={onChange}
                                    value={value}
                                    errorMessage={errors.password_confirm?.message}
                                    onSubmitEditing={handleSubmit(handleSignUp)}
                                    returnKeyType="send"
                                />
                            )}
                        />

                        <Button
                            size="xl"
                            action="primary"
                            variant="solid"
                            title="Criar e acessar"
                            onPress={handleSubmit(handleSignUp)}
                            isLoading={isLoading}
                        />
                    </Center>

                    <Center className="flex-end mt-16">
                        <Button
                            size="xl"
                            action="primary"
                            variant="outline"
                            title="Voltar para o login"
                            onPress={handleBackToSignIn}
                        />
                    </Center>
                </VStack>
            </VStack>
        </ScrollView>
    )
}