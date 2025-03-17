import { HomeHeader } from '@components/HomeHeader'
import { VStack } from '@components/ui/vstack'

export function Home() {
    return (
        <VStack className="flex-1">
            <HomeHeader />
        </VStack>
    )
}