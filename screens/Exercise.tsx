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

export function Exercise() {
    return (
        <VStack>
            <Card className='pt-16'>
                <VStack>
                    <VStack>
                        <GoBackButton />
                    </VStack>

                    <HStack className='justify-between items-center pb-4 pt-16'>
                        <Heading className='font-heading text-lg shrink'>
                            Puxada frontal
                        </Heading>

                        <HStack className='items-center'>
                            <BodySvg />

                            <Text className='capitalize ml-1'>
                                Costas
                            </Text>
                        </HStack>
                    </HStack>
                </VStack>
            </Card>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 32 }}
            >
                <VStack className='p-4'>
                    <Image
                        source={{
                            uri: 'https://static.wixstatic.com/media/2edbed_60c206e178ad4eb3801f4f47fc6523df~mv2.webp/v1/fill/w_350,h_375,al_c/2edbed_60c206e178ad4eb3801f4f47fc6523df~mv2.webp',
                        }}
                        alt="Exercício"
                        className='mb-2 rounded-lg w-full'
                        resizeMode="cover"
                        size="2xl"
                    />

                    <Box className='bg-background-0 rounded-md py-4 px-4 mt-4'>
                        <HStack space='lg' className='items-center justify-center mb-6 mt-5'>
                            <HStack space='sm'>
                                <SeriesSvg />
                                <Text>
                                    3 séries
                                </Text>
                            </HStack>

                            <HStack space='sm'>
                                <RepetitionsSvg />
                                <Text>
                                    12 repetições
                                </Text>
                            </HStack>
                        </HStack>

                        <Button action='positive' variant='solid' size='xl' title='Marcar como realizado' />
                    </Box>
                </VStack>
            </ScrollView>
        </VStack>
    )
}