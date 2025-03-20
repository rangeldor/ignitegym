import { HistoryCard } from '@components/HistoryCard'
import { ScreenHeader } from '@components/ScreenHeader'
import { Heading } from '@components/ui/heading'
import { VStack } from '@components/ui/vstack'
import { useState } from 'react'
import { SectionList } from 'react-native'

export function History() {
    const [exercises, setExercises] = useState([
        {
            title: "22.07.24",
            data: ["Puxada frontal", "Rosca direta", "Tríceps testa"]
        },
        {
            title: "21.07.24",
            data: ["Puxada frontal", "Rosca direta", "Tríceps testa"]
        },
        {
            title: "20.07.24",
            data: ["Puxada frontal", "Rosca direta", "Tríceps testa"]
        }
    ])

    return (
        <VStack className="flex-1">
            <ScreenHeader title="Histórico" />
            <SectionList
                sections={exercises}
                keyExtractor={(item) => item}
                renderItem={({ item }) => <HistoryCard />}
                renderSectionHeader={({ section: { title } }) => <Heading>{title}</Heading>}
                style={{ paddingHorizontal: 32, marginTop: 16 }}
                contentContainerStyle={exercises.length === 0 ? { flex: 1, justifyContent: 'center' } : { gap: 16 }}
                ListEmptyComponent={<Heading>Nenhum exercício realizado</Heading>}
                showsVerticalScrollIndicator={false}
            />
        </VStack>
    )
}