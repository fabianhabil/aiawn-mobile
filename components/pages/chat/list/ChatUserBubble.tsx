import type { ChatModels } from 'models/chat/chat';
import { Text, XStack } from 'tamagui';

const ChatUserBubble = ({ data }: { data: ChatModels.Response.Detail }) => {
    return (
        <>
            <XStack
                alignSelf='flex-end'
                p='$3'
                style={{
                    backgroundColor: 'rgba(217,217,217,0.3)',
                    width: '85%',
                    borderRadius: 8
                }}
            >
                <Text>{data.message}</Text>
            </XStack>
        </>
    );
};

export default ChatUserBubble;
