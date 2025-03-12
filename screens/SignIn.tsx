import { VStack } from "@components/ui/vstack";
import { Image } from "@components/ui/image";

import BackgroundImg from '@assets/background.png';

export function SignIn() {
    return (
        <VStack className="flex-1">
            <Image
                source={BackgroundImg}
                defaultSource={BackgroundImg}
                className="absolute w-full h-[624]"
                alt="Pessoas treinando"
            />
        </VStack>
    )
}