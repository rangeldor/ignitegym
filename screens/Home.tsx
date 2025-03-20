import { ExerciseCard } from '@components/ExerciseCard'
import { Group } from '@components/Group'
import { HomeHeader } from '@components/HomeHeader'
import { Heading } from '@components/ui/heading'
import { HStack } from '@components/ui/hstack'
import { Text } from '@components/ui/text'
import { VStack } from '@components/ui/vstack'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { useState } from 'react'
import { FlatList } from 'react-native'

export function Home() {
    const [exercises, setExercises] = useState(['Puxada frontal', 'Remada curvada', 'Remada unilateral', 'Levantamento terra'])
    const [groups, setGroups] = useState(['Costas', 'Ombro', 'Bíceps', 'Tríceps', 'Peito', 'Pernas', 'Abdômen'])
    const [groupSelected, setGroupSelected] = useState('costas')

    const navigation = useNavigation<AppNavigatorRoutesProps>()

    const handleGoToExercise = () => {
        navigation.navigate('exercise')
    }

    return (
        <VStack className="flex-1">
            <HomeHeader />

            <FlatList
                data={groups}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Group name={item} isActive={groupSelected.toLowerCase() === item.toLowerCase()} onPress={() => setGroupSelected(item)} />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 32,
                    gap: 8
                }}
                style={{
                    marginVertical: 40,
                    maxHeight: 44,
                    minHeight: 44
                }}
            />

            <VStack className='px-8 flex-1'>
                <HStack className="justify-between mb-5 items-center">
                    <Heading>Exercícios</Heading>
                    <Text>{exercises.length}</Text>
                </HStack>

                <FlatList
                    data={exercises}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <ExerciseCard onPress={handleGoToExercise} />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        gap: 10
                    }}
                    style={{
                        marginVertical: 24
                    }}
                />
            </VStack>
        </VStack>
    )
}