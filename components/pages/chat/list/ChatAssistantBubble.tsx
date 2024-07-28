import { DollarSign, StarFull } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import type { ChatModels } from 'models/chat/chat';
import { useMutation, useQuery } from 'react-query';
import { Paragraph, Text, View, XStack, YStack } from 'tamagui';
import api from 'utils/axios';

export type PriceLevelType =
    | 'PRICE_LEVEL_INEXPENSIVE'
    | 'PRICE_LEVEL_MODERATE'
    | 'PRICE_LEVEL_EXPENSIVE'
    | 'PRICE_LEVEL_VERY_EXPENSIVE';

interface PriceLevelProps {
    priceLevel: PriceLevelType;
}

const getPriceLevel = (priceLevel: string) => {
    switch (priceLevel) {
        case 'PRICE_LEVEL_INEXPENSIVE':
            return 1;
        case 'PRICE_LEVEL_MODERATE':
            return 2;
        case 'PRICE_LEVEL_EXPENSIVE':
            return 3;
        case 'PRICE_LEVEL_VERY_EXPENSIVE':
            return 4;
        default:
            return 0;
    }
};

const PriceLevel: React.FC<PriceLevelProps> = ({ priceLevel }) => {
    const level = getPriceLevel(priceLevel);
    const totalStars = 4;

    return (
        <XStack>
            {[...Array(totalStars)].map((_, index) => (
                <DollarSign
                    key={index}
                    size={20}
                    color={index < level ? 'black' : '#D2D2D2'}
                />
            ))}
        </XStack>
    );
};

const formatNumber = (num: number): string => {
    if (num < 1000) {
        return num.toString();
    }

    const suffixes = ['', 'K', 'M', 'B', 'T'];
    const suffixIndex = Math.floor(Math.log10(num) / 3);
    const shortNumber = num / Math.pow(10, suffixIndex * 3);

    const formattedNumber =
        shortNumber % 1 === 0 ? shortNumber.toFixed(0) : shortNumber.toFixed(1);

    return `(${formattedNumber}${suffixes[suffixIndex]}+)`;
};

const ChatAssistantBubble = ({
    data,
    chatRoomId,
    isActive
}: {
    data: ChatModels.Response.Detail;
    chatRoomId: string;
    isActive: boolean;
}) => {
    const router = useRouter();

    const { data: attachmentData } = useQuery({
        queryKey: ['chat-attachment', data.messageId],
        enabled: data.attachment && data.attachment.length !== 0,
        queryFn: async (): Promise<ChatModels.Response.Attachment[]> => {
            const response = await api.post('/attachments', {
                attachments: data?.attachment
                    ? data?.attachment.slice(0, 3)
                    : []
            });

            return response.data;
        }
    });

    console.log(chatRoomId);

    const { mutate: finishChat } = useMutation({
        mutationFn: async () => {
            const data = await api.post('/chat/_finalize', {
                chat_room_id: chatRoomId
            });

            return data.data;
        },
        onSuccess: () => {
            router.push('/aiawn/finish');
        }
    });

    return (
        <>
            <YStack gap='$4'>
                <XStack
                    gap='$3'
                    ai={'center'}
                    style={{
                        width: '85%',
                        borderRadius: 8
                    }}
                >
                    <View
                        style={{
                            width: 40,
                            height: 40,
                            backgroundColor: 'rgba(217,217,217,0.5)',
                            borderRadius: 20
                        }}
                    />
                    <Text>{data.message}</Text>
                </XStack>

                <YStack gap='$4'>
                    {attachmentData?.map((data) => (
                        <XStack
                            key={data.id}
                            p='$4'
                            px='$3'
                            style={{
                                width: '100%',
                                height: 120,
                                backgroundColor: 'white',
                                borderRadius: 12,
                                shadowColor: '#000000',
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.15,
                                shadowRadius: 4,
                                elevation: 4
                            }}
                            ai={'center'}
                            gap='$4'
                            onPress={() => {
                                if (isActive) {
                                    finishChat();
                                }
                            }}
                        >
                            <View
                                style={{
                                    height: 100,
                                    width: 100,
                                    backgroundColor: '#F0F0F0',
                                    borderRadius: 12
                                }}
                            />

                            <YStack
                                style={{
                                    flex: 1,
                                    height: 100
                                }}
                                gap='$3'
                            >
                                <Paragraph style={{ fontWeight: 'bold' }}>
                                    {data.data.placeName}
                                </Paragraph>

                                <XStack ai='center' gap='$2'>
                                    <StarFull size={20} color='#FFB800' />
                                    <Text>{data.data.rating}</Text>
                                    {data.data.userRatingCount && (
                                        <Text color='#979797'>
                                            {formatNumber(
                                                data.data.userRatingCount
                                            )}
                                        </Text>
                                    )}
                                </XStack>

                                {data.data.priceLevel && (
                                    <PriceLevel
                                        priceLevel={
                                            data.data
                                                .priceLevel as PriceLevelType
                                        }
                                    />
                                )}
                            </YStack>
                        </XStack>
                    ))}
                </YStack>
            </YStack>
        </>
    );
};

export default ChatAssistantBubble;
