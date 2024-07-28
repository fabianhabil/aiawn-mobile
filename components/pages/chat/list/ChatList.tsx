import { useAuth } from 'contexts/AuthContext';
import dayjs from 'dayjs';
import { useRouter } from 'expo-router';
import type { ChatModels } from 'models/chat/chat';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { Button, H4, Paragraph, XStack, YStack, useTheme } from 'tamagui';
import api from 'utils/axios';

interface ChatListType {
    chatData: ChatModels.Response.List[];
}

const ChatList = ({ chatData }: ChatListType) => {
    const router = useRouter();

    const theme = useTheme();

    const [currenlyActiveChat, setCurrentlyActiveChat] =
        useState<boolean>(false);

    useEffect(() => {
        if (chatData) {
            chatData.map((data) => {
                if (data.is_active) {
                    setCurrentlyActiveChat(() => true);
                    return;
                }
            });
        }
    }, [chatData]);

    const { user } = useAuth();

    const { mutate: startNewChat } = useMutation({
        mutationFn: async () => {
            const data = await api.post('/chat/chatroom', {
                user_id: user?.id
            });

            return data.data;
        },
        onSuccess: (data) => {
            router.push(
                `/aiawn/chat/${data._id}?isActive=true&threadId=undefined`
            );
        }
    });

    return (
        <>
            <Button
                backgroundColor={'#00B24F'}
                color='white'
                px='$8'
                fontWeight={'bold'}
                fontSize={14}
                shadowColor='rgba(0, 0, 0, 0.2)'
                shadowOffset={{ width: 0, height: 4 }}
                shadowOpacity={0.2}
                shadowRadius={4}
                mt='$2'
                onPress={() => {
                    startNewChat();
                }}
                opacity={currenlyActiveChat ? 0.5 : 1}
                disabled={currenlyActiveChat}
            >
                Start New Chat
            </Button>

            <H4>Your Chat History</H4>

            <YStack gap='$4'>
                {chatData.length === 0 && (
                    <Paragraph alignSelf='center'>No Chat Available.</Paragraph>
                )}

                {chatData.map((data) => {
                    const shadowActive = !data.is_active
                        ? {}
                        : {
                              shadowColor: 'rgba(0, 0, 0, 0.2)',
                              shadowOffset: { width: 0, height: 4 },
                              shadowOpacity: 0.2,
                              shadowRadius: 4
                          };

                    return (
                        <YStack gap='$2' key={data.id}>
                            {data.is_active && (
                                <Paragraph color={theme.green10.val}>
                                    Your Currently Active Chat
                                </Paragraph>
                            )}
                            <XStack
                                style={{
                                    width: '100%',
                                    height: 60,
                                    backgroundColor: data.is_active
                                        ? 'white'
                                        : 'rgba(217,217,217,0.3)',
                                    borderRadius: 8
                                }}
                                ai={'center'}
                                px='$4'
                                {...shadowActive}
                                onPress={() =>
                                    router.push(
                                        `/aiawn/chat/${data.id}?isActive=${data.is_active}&threadId=${data.threadId}`
                                    )
                                }
                            >
                                <Paragraph>
                                    {data?.summary
                                        ? `${data.summary} - ${dayjs(
                                              data.timestamps
                                          ).format(
                                              'dddd, DD-MM-YYYY HH:mm:ss'
                                          )}`
                                        : `${dayjs(data.timestamps).format(
                                              'dddd, DD-MM-YYYY HH:mm:ss'
                                          )}`}
                                </Paragraph>
                            </XStack>
                        </YStack>
                    );
                })}
            </YStack>
        </>
    );
};

export default ChatList;
