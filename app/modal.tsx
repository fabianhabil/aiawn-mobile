import { Anchor, Paragraph, View, XStack } from 'tamagui';

export default function ModalScreen() {
    return (
        <View flex={1} alignItems='center' justifyContent='center'>
            <XStack gap='$2'>
                <Paragraph ta='center'>Boilerplate made by</Paragraph>
                <Anchor
                    col='$blue10'
                    href='https://fabianhabil.my.id'
                    target='_blank'
                >
                    fabian habil,
                </Anchor>
                <Anchor
                    color='$purple10'
                    href='https://github.com/fabianhabil/expo-tamagui-boilerplate'
                    target='_blank'
                    rel='noreferrer'
                >
                    give it a ⭐️
                </Anchor>
            </XStack>
        </View>
    );
}
