import { HistoryDTO } from "@dtos/HistoryDTO";
import { Card } from "./ui/card";
import { Heading } from "./ui/heading";
import { HStack } from "./ui/hstack";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";

type Props = {
    data: HistoryDTO;
}

export function HistoryCard({ data }: Props) {
    return (
        <Card variant="filled" className="w-full px-5 py-4 mb-3">
            <HStack className="items-center justify-between">
                <VStack className="flex-1 mr-5">
                    <Heading numberOfLines={1} className="text-md font-semibold capitalize">
                        {data.group}
                    </Heading>

                    <Text className="text-lg" numberOfLines={1}>
                        {data.name}
                    </Text>
                </VStack>

                <Text className="text-md">
                    {data.hour}
                </Text>
            </HStack>
        </Card>
    )
}