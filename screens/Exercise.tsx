import { GoBackButton } from '@components/GoBackButton'
import BodySvg from '@assets/body.svg'
import { VStack } from '@components/ui/vstack'
import { HStack } from '@components/ui/hstack'
import { Heading } from '@components/ui/heading'
import { Text } from '@components/ui/text'
import { Card } from '@components/ui/card'
import { Image } from '@components/ui/image'
import { ScrollView } from 'react-native'
import SeriesSvg from '@assets/series.svg'
import RepetitionsSvg from '@assets/repetitions.svg'
import { Box } from '@components/ui/box'
import { Button } from '@components/Button'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { ExerciseDTO } from '@dtos/ExerciseDTO'
import { useToast } from '@components/ui/toast'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { ToastMessage } from '@components/ToastMessage'
import { Loading } from '@components/Loading'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

type RouteParamsProps = {
    exerciseId: string;
}

export function Exercise() {
    const [sendingRegister, setSendingRegister] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);

    const navigation = useNavigation<AppNavigatorRoutesProps>()

    const route = useRoute();
    const toast = useToast();

    const { exerciseId } = route.params as RouteParamsProps;

    const fetchExerciseDetails = async () => {
        try {
            setIsLoading(true);
            const response = await api.get(`/exercises/${exerciseId}`);

            setExercise(response.data);

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

    const handleExerciseHistoryRegister = async () => {
        try {
            setSendingRegister(true);

            await api.post('/history', { exercise_id: exerciseId });

            toast.show({
                placement: 'top',
                duration: 6000,
                render: ({ id }) => (
                    <ToastMessage
                        id={id}
                        title='Erro!'
                        description='Parabéns! Exercício registrado no seu histórico.'
                        action='success'
                        onClose={() => toast.close(id)}
                    />
                )
            })

            navigation.navigate('history');
        } catch (error) {
            const isAppError = error instanceof AppError;
            const description = isAppError ? error.message : 'Não foi possível registrar exercício.';

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
            setSendingRegister(false);
        }
    }

    useEffect(() => {
        fetchExerciseDetails();
    }, [exerciseId])

    return (
        <VStack>
            <Card className='pt-16'>
                <VStack>
                    <VStack>
                        <GoBackButton />
                    </VStack>

                    <HStack className='justify-between items-center pb-4 pt-16'>
                        <Heading className='font-heading text-lg shrink'>
                            {exercise.name}
                        </Heading>

                        <HStack className='items-center'>
                            <BodySvg />

                            <Text className='capitalize ml-1'>
                                {exercise.group}
                            </Text>
                        </HStack>
                    </HStack>
                </VStack>
            </Card>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 32 }}
            >
                {isLoading ? <Loading /> :
                    <VStack className='p-4'>
                        <Image
                            source={{ uri: `${api.defaults.baseURL}/exercise/demo/${exercise?.demo}` }}
                            alt="Exercício"
                            className='mb-2 rounded-lg w-full'
                            resizeMode="contain"
                            size="2xl"
                        />

                        <Box className='bg-background-0 rounded-md py-4 px-4 mt-4'>
                            <HStack space='lg' className='items-center justify-center mb-6 mt-5'>
                                <HStack space='sm'>
                                    <SeriesSvg />
                                    <Text>
                                        {exercise.series} séries
                                    </Text>
                                </HStack>

                                <HStack space='sm'>
                                    <RepetitionsSvg />
                                    <Text>
                                        {exercise.repetitions} repetições
                                    </Text>
                                </HStack>
                            </HStack>

                            <Button
                                action='positive'
                                variant='solid'
                                size='xl'
                                title='Marcar como realizado'
                                isLoading={sendingRegister}
                                onPress={handleExerciseHistoryRegister}
                            />
                        </Box>
                    </VStack>
                }
            </ScrollView>
        </VStack>
    )
}