import { HistoryCard } from '@components/HistoryCard'
import { ScreenHeader } from '@components/ScreenHeader'
import { ToastMessage } from '@components/ToastMessage'
import { Heading } from '@components/ui/heading'
import { useToast } from '@components/ui/toast'
import { VStack } from '@components/ui/vstack'
import { HistoryByDayDTO } from '@dtos/HistoryByDayDTO'
import { useFocusEffect } from '@react-navigation/native'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { useCallback, useState } from 'react'
import { SectionList } from 'react-native'

export function History() {
    const [isLoading, setIsLoading] = useState(true);
    const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);

    const toast = useToast();

    const fetchHistory = async () => {
        try {
            setIsLoading(true);
            const response = await api.get('/history');

            setExercises(response.data);

        } catch (error) {
            const isAppError = error instanceof AppError;
            const description = isAppError ? error.message : 'Não foi possível carregar os detalhes do exercício';

            toast.show({
                placement: 'top',
                duration: 6000,
                render: ({ id }) => (
                    <ToastMessage
                        id={id}
                        title='Erro!'
                        description={description}
                        action='error'
                        onClose={() => toast.close(id)}
                    />
                )
            })
        } finally {
            setIsLoading(false);
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchHistory()
        }, [])
    )

    return (
        <VStack className="flex-1">
            <ScreenHeader title="Histórico" />
            <SectionList
                sections={exercises}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <HistoryCard data={item} />}
                renderSectionHeader={({ section: { title } }) => <Heading>{title}</Heading>}
                style={{ paddingHorizontal: 32, marginTop: 16 }}
                contentContainerStyle={exercises.length === 0 ? { flex: 1, justifyContent: 'center' } : { gap: 16 }}
                ListEmptyComponent={<Heading>Nenhum exercício realizado</Heading>}
                showsVerticalScrollIndicator={false}
            />
        </VStack>
    )
}