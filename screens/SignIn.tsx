import { VStack } from "@components/ui/vstack";
import { Image } from "@components/ui/image";

import BackgroundImg from '@assets/background.png';
import Logo from '@assets/logo.svg'

import { Center } from "@components/ui/center";
import { Text } from "@components/ui/text";

export function SignIn() {
    return (
        <VStack className="flex-1 ">
            <Image
                source={BackgroundImg}
                defaultSource={BackgroundImg}
                className="absolute w-full h-[624]"
                alt="Pessoas treinando"
            />

            <Center className="my-24">
                <Logo />

                <Text className="color-gray-100 text-sm">
                    Treine sua mente e o seu corpo.
                </Text>
            </Center>
        </VStack>
    )
}