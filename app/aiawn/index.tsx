import { ArrowLeft } from '@tamagui/lucide-icons';
import ChatList from 'components/pages/chat/list/ChatList';
import CustomSafeAreaView from 'components/ui/CustomSafeAreaView';
import { useAuth } from 'contexts/AuthContext';
import { Tabs, useRouter } from 'expo-router';
import type { ChatModels } from 'models/chat/chat';
import { useQuery } from 'react-query';
import { H3, Spinner, View, XStack, YStack } from 'tamagui';
import api from 'utils/axios';

const Page = () => {
    const { user } = useAuth();

    const router = useRouter();

    const { data, isLoading } = useQuery({
        queryKey: ['chat-list', user?.id],
        queryFn: async (): Promise<ChatModels.Response.List[]> => {
            const data = await api.post('/chat/summary', {
                user_id: user?.id
            });

            return data.data.map((data) => ({ ...data, id: data._id }));
        },
        enabled: !!user?.id
    });

    if (isLoading) {
        return (
            <CustomSafeAreaView
                topBackgroundColor='#00B24F'
                backgroundColor='white'
                topInsetHeight={20}
            >
                <Tabs.Screen
                    options={{
                        headerShown: false
                    }}
                />
                <YStack flex={1} px='$4' py='$4' gap='$4'>
                    <XStack ai={'center'} gap='$4'>
                        <View
                            style={{
                                width: 44,
                                height: 44,
                                borderRadius: '50%',
                                shadowColor: '#000000',
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.25,
                                shadowRadius: 4,
                                elevation: 4
                            }}
                            ai={'center'}
                            jc={'center'}
                            backgroundColor={'white'}
                            onPress={() => router.back()}
                        >
                            <ArrowLeft color='black' size={28} />
                        </View>
                        <H3 color='#979797'>Grabek</H3>
                    </XStack>

                    <Spinner size='large' color='#00B24F' mt='$16' />
                </YStack>
            </CustomSafeAreaView>
        );
    }

    return (
        <>
            <CustomSafeAreaView
                topBackgroundColor='#00B24F'
                backgroundColor='white'
                topInsetHeight={20}
            >
                <Tabs.Screen
                    options={{
                        headerShown: false
                    }}
                />
                <YStack flex={1} px='$4' py='$4' gap='$4'>
                    <XStack ai={'center'} gap='$4'>
                        <View
                            style={{
                                width: 44,
                                height: 44,
                                borderRadius: '50%',
                                shadowColor: '#000000',
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.25,
                                shadowRadius: 4,
                                elevation: 4
                            }}
                            ai={'center'}
                            jc={'center'}
                            backgroundColor={'white'}
                            onPress={() => router.back()}
                        >
                            <ArrowLeft color='black' size={28} />
                        </View>
                        <H3 color='#979797'>Grabek</H3>
                    </XStack>

                    <ChatList chatData={data ?? []} />
                </YStack>
            </CustomSafeAreaView>
        </>
    );
};

export default Page;
