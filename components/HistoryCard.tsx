import { Card } from "./ui/card";
import { Heading } from "./ui/heading";
import { HStack } from "./ui/hstack";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";

export function HistoryCard() {
    return (
        <Card variant="filled" className="w-full px-5 py-4 mb-3">
            <HStack className="items-center justify-between">
                <VStack className="flex-1 mr-5">
                    <Heading numberOfLines={1} className="text-md font-semibold capitalize">
                        Costas
                    </Heading>

                    <Text className="text-lg" numberOfLines={1}>
                        Puxada frontal
                    </Text>
                </VStack>

                <Text className="text-md">
                    08:56
                </Text>
            </HStack>
        </Card>
    )
}