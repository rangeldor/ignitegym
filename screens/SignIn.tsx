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

export function SignIn() {
    const navigation = useNavigation<AuthNavigatorRoutesProps>()

    const handleNewAccount = () => {
        navigation.navigate('signUp')
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} className="flex-grow">
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

                        <Input placeholder="E-mail" keyboardType="email-address" autoCapitalize="none" />
                        <Input placeholder="Senha" secureTextEntry />

                        <Button size="xl" action="primary" variant="solid" title="Acessar" />
                    </Center>

                    <Center className="flex-end mt-16">
                        <Text className="text-sm mb-4 font-body">
                            Ainda não tem acesso?
                        </Text>
                        <Button size="xl" action="primary" variant="outline" title="Criar conta" onPress={handleNewAccount} />
                    </Center>
                </VStack>
            </VStack>
        </ScrollView>
    )
}