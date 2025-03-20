import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { HStack } from "./ui/hstack";
import { Image } from "./ui/image";
import { Card } from "./ui/card";
import { VStack } from "./ui/vstack";
import { Heading } from "./ui/heading";
import { Text } from "./ui/text";
import { Icon } from "./ui/icon";
import { ChevronRight } from "lucide-react-native";

interface Props extends TouchableOpacityProps { }

export function ExerciseCard({ ...rest }: Props) {
    return (
        <Card className="w-full">
            <TouchableOpacity {...rest}>
                <HStack space="xl" className="items-center">
                    <Image
                        source={{ uri: "https://i.pinimg.com/originals/f5/4c/a8/f54ca8ce21eb05de3599312300b75e93.jpg" }}
                        alt="Imagem do exercício"
                        size="md"
                        className="rounded-md "
                        resizeMode="cover"
                    />

                    <VStack space="sm" className="flex-1">
                        <Heading>Puxada frontal</Heading>
                        <Text className="text-typography-500" numberOfLines={2}>3 séries x 12 repetições</Text>
                    </VStack>

                    <Icon as={ChevronRight} />
                </HStack>
            </TouchableOpacity>
        </Card>
    )
}