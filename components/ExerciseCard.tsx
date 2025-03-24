import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { HStack } from "./ui/hstack";
import { Image } from "./ui/image";
import { Card } from "./ui/card";
import { VStack } from "./ui/vstack";
import { Heading } from "./ui/heading";
import { Text } from "./ui/text";
import { Icon } from "./ui/icon";
import { ChevronRight } from "lucide-react-native";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { api } from "@services/api";

interface Props extends TouchableOpacityProps {
    data: ExerciseDTO;
}

export function ExerciseCard({ data, ...rest }: Props) {
    return (
        <Card className="w-full">
            <TouchableOpacity {...rest}>
                <HStack space="xl" className="items-center">
                    <Image
                        source={{ uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}` }}
                        alt="Imagem do exercício"
                        size="md"
                        className="rounded-md "
                        resizeMode="cover"
                    />

                    <VStack space="sm" className="flex-1">
                        <Heading>{data.name}</Heading>
                        <Text className="text-typography-500" numberOfLines={2}>
                            {data.series} séries x {data.repetitions} repetições
                        </Text>
                    </VStack>

                    <Icon as={ChevronRight} />
                </HStack>
            </TouchableOpacity>
        </Card>
    )
}