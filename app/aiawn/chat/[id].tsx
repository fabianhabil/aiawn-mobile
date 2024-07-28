import { ArrowLeft, SendHorizontal } from '@tamagui/lucide-icons';
import ChatAssistantBubble from 'components/pages/chat/list/ChatAssistantBubble';
import ChatUserBubble from 'components/pages/chat/list/ChatUserBubble';
import CustomSafeAreaView from 'components/ui/CustomSafeAreaView';
import { Tabs, useLocalSearchParams, useRouter } from 'expo-router';
import type { ChatModels } from 'models/chat/chat';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import {
    H3,
    Input,
    Paragraph,
    ScrollView,
    Spinner,
    View,
    XStack,
    YStack
} from 'tamagui';
import api from 'utils/axios';
import * as Location from 'expo-location';
import { useAuth } from 'contexts/AuthContext';
import { Platform } from 'react-native';

const Page = () => {
    const scrollViewRef = useRef<ScrollView>(null);

    const [location, setLocation] = useState<Location.LocationObject>();

    const router = useRouter();

    const { id, isActive, threadId } = useLocalSearchParams();

    const { control, handleSubmit, reset } = useForm({
        defaultValues: { message: '' }
    });

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['chat-room-detail', id],
        enabled: id !== 'new',
        queryFn: async (): Promise<ChatModels.Response.Detail[]> => {
            const data = await api.get(`/chat/${id}/history`);

            if (data.data.length === 0) {
                return [];
            }

            return data.data.map((data) => ({
                ...data,
                id: data.chatRoomId,
                messageId: data._id
            }));
        }
    });

    const { user } = useAuth();

    const {
        mutate: sendChat,
        isLoading: isLoadingSendChat,
        data: dataChat
    } = useMutation({
        mutationFn: async (msg: string) => {
            const data = await api.post('/chat/_submit', {
                user_agent: Platform.OS,
                user_id: user?.id,
                chat_room_id: id,
                thread_id:
                    threadId === 'undefined'
                        ? chatCoreData?.threadId
                        : threadId,
                message: msg,
                location: {
                    lat: location?.coords.latitude,
                    lng: location?.coords.longitude
                }
            });

            return {
                threadId: data.data.thread_id,
                chatId: data.data.chat_room_id
            };
        },
        onSuccess: () => {
            refetch();
        },
        onSettled: () => {
            console.log('selesai');
            reset();
        }
    });

    const {
        mutate: startNewChat,
        isLoading: isLoadingStartNewChat,
        data: chatCoreData
    } = useMutation({
        mutationFn: async (msg: string) => {
            const data = await api.post('/chat/_submit', {
                user_agent: Platform.OS,
                user_id: user?.id,
                chat_room_id: id,
                message: msg,
                location: {
                    lat: location?.coords.latitude,
                    lng: location?.coords.longitude
                }
            });

            return {
                threadId: data.data.thread_id,
                chatId: data.data.chat_room_id
            };
        },
        onSuccess: () => {
            refetch();
        },
        onSettled: () => {
            console.log('selesai');
            reset();
        }
    });

    console.log([dataChat, chatCoreData]);

    const sendMessage = (msg: string) => {
        if (threadId === 'undefined' && !chatCoreData) {
            console.log('new');
            startNewChat(msg);
        } else {
            console.log('existing');
            sendChat(msg);
        }
    };

    const getLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                return;
            }

            let location = await Location.getCurrentPositionAsync();

            setLocation(() => location);
        } catch (error) {
            throw new Error(`Error requesting location permission ${error}`);
        }
    };

    useEffect(() => {
        getLocation();
    }, []);

    return (
        <>
            <CustomSafeAreaView
                topBackgroundColor='#00B24F'
                backgroundColor='white'
                topInsetHeight={20}
                scrollAbleScreen={false}
            >
                <Tabs.Screen
                    options={{
                        headerShown: false
                    }}
                />

                <YStack
                    px='$4'
                    py='$4'
                    gap='$4'
                    style={{
                        backgroundColor: 'transparent'
                    }}
                >
                    <XStack ai={'center'} gap='$2' jc='space-between'>
                        <XStack ai='center' gap='$4'>
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
                                onPress={() => router.replace('/aiawn')}
                            >
                                <ArrowLeft color='black' size={28} />
                            </View>
                            <H3 color='#979797'>GRABesk Chat Room</H3>
                        </XStack>
                    </XStack>

                    <View style={{ maxHeight: '85%' }}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            ref={scrollViewRef}
                            onContentSizeChange={(w, h) =>
                                scrollViewRef.current?.scrollTo({
                                    y: h + 200,
                                    animated: true
                                })
                            }
                        >
                            {isLoading ? (
                                <Spinner
                                    size='large'
                                    color='#00B24F'
                                    mt='$16'
                                />
                            ) : (
                                <YStack gap='$4'>
                                    {data?.map((data) => {
                                        if (data.role === 'user') {
                                            return (
                                                <ChatUserBubble
                                                    data={data}
                                                    key={data.messageId}
                                                />
                                            );
                                        } else if (data.role === 'assistant') {
                                            return (
                                                <ChatAssistantBubble
                                                    data={data}
                                                    key={data.messageId}
                                                    chatRoomId={id as string}
                                                    isActive={Boolean(
                                                        isActive === 'true'
                                                    )}
                                                />
                                            );
                                        }
                                    })}
                                </YStack>
                            )}
                            {(isLoadingSendChat || isLoadingStartNewChat) && (
                                <Spinner
                                    size='large'
                                    color='#00B24F'
                                    mt='$16'
                                />
                            )}
                        </ScrollView>
                    </View>
                </YStack>

                <XStack
                    bottom='$5'
                    ai={'center'}
                    px='$2'
                    pr='$4'
                    display='flex'
                    jc={'space-between'}
                    w={'100%'}
                    gap='$4'
                    style={{
                        borderRadius: 10,
                        shadowColor: '#000000',
                        shadowOffset: { width: 0, height: 8 },
                        shadowOpacity: 0.1,
                        shadowRadius: 20,
                        elevation: 8,
                        height: 60,
                        backgroundColor: 'white',
                        position: 'absolute',
                        left: 16,
                        width: '92%'
                    }}
                >
                    {Boolean(isActive === 'true') ? (
                        <Controller
                            control={control}
                            name='message'
                            render={({
                                field: { value, onChange, onBlur }
                            }) => (
                                <>
                                    <Input
                                        flex={1}
                                        placeholder='Send GRABesk a message...'
                                        value={value}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        onSubmitEditing={() => {
                                            handleSubmit((e) => {
                                                sendMessage(e.message);
                                            })();
                                        }}
                                        key='input'
                                    />

                                    <SendHorizontal
                                        onPress={() => {
                                            handleSubmit((e) => {
                                                sendMessage(e.message);
                                            })();
                                        }}
                                    />
                                </>
                            )}
                        />
                    ) : (
                        <Paragraph style={{ marginHorizontal: 'auto' }}>
                            You cant send to an inactive chat.
                        </Paragraph>
                    )}
                </XStack>
            </CustomSafeAreaView>
        </>
    );
};

export default Page;
