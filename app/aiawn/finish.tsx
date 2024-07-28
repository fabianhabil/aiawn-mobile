import CustomSafeAreaView from 'components/ui/CustomSafeAreaView';
import { Tabs, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { H4, YStack } from 'tamagui';

const Finish = () => {
    const router = useRouter();

    useEffect(() => {
        if (router) {
            setTimeout(() => {
                router.replace('/aiawn');
            }, 5000);
        }
    }, [router]);

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
                <YStack
                    flex={1}
                    px='$8'
                    py='$4'
                    gap='$4'
                    ac='center'
                    jc='center'
                >
                    <H4 ta='center'>Order Completed!</H4>
                    <H4 ta='center'>So Happy that GRABesk can help you!</H4>
                </YStack>
            </CustomSafeAreaView>
        </>
    );
};

export default Finish;
