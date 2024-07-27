import CustomSafeAreaView from 'components/ui/CustomSafeAreaView';
import { useAuth } from 'contexts/AuthContext';
import { Tabs, useRouter } from 'expo-router';
import {
    Button,
    H3,
    Input,
    Label,
    View,
    XStack,
    YStack,
    useTheme
} from 'tamagui';
import { removeItem } from 'utils/AsyncStorage';

export default function TabTwoScreen() {
    const { user, refetchAuth } = useAuth();

    const theme = useTheme();

    const router = useRouter();

    const logout = async () => {
        await removeItem('user-data');

        refetchAuth();

        router.replace('/');
    };

    return (
        <>
            <Tabs.Screen
                options={{
                    headerShown: false
                }}
            />

            <CustomSafeAreaView
                topBackgroundColor='#00B24F'
                backgroundColor='white'
            >
                <View
                    style={{
                        height: 50,
                        top: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: '#00B24F'
                    }}
                />

                <YStack px='$4' gap='$4' mt='$4'>
                    <H3 alignSelf='center'>Your Profile</H3>

                    <YStack style={{ width: '100%' }} gap='$1'>
                        <Label color='#878787' fontWeight={'bold'}>
                            Name
                        </Label>

                        <Input
                            borderWidth={1}
                            borderColor={'rgba(105,105,105,0.2)'}
                            backgroundColor={'$colorTransparent'}
                            placeholder='John Doe'
                            flex={1}
                            value={user?.name}
                            disabled
                        />
                    </YStack>

                    <YStack style={{ width: '100%' }} gap='$1'>
                        <Label color='#878787' fontWeight={'bold'}>
                            Phone Number
                        </Label>

                        <XStack style={{ width: '100%' }} gap='$3'>
                            <Input
                                borderWidth={1}
                                borderColor={'rgba(105,105,105,0.2)'}
                                backgroundColor={'$colorTransparent'}
                                placeholder='🇮🇩 +62'
                                style={{ width: 90 }}
                                disabled
                            />

                            <YStack style={{ flex: 1 }}>
                                <Input
                                    borderWidth={1}
                                    borderColor={'rgba(105,105,105,0.2)'}
                                    backgroundColor={'$colorTransparent'}
                                    placeholder='Your Phone Number'
                                    flex={1}
                                    disabled
                                    value={
                                        user?.phoneNumber.split('+62')[
                                            user.phoneNumber.split.length - 1
                                        ]
                                    }
                                />
                            </YStack>
                        </XStack>
                    </YStack>

                    <Button
                        alignSelf='center'
                        backgroundColor={theme.red10.val}
                        color='white'
                        px='$8'
                        mt='$4'
                        fontWeight={'bold'}
                        fontSize={14}
                        shadowColor='rgba(0, 0, 0, 0.2)'
                        shadowOffset={{ width: 0, height: 4 }}
                        shadowOpacity={0.2}
                        shadowRadius={4}
                        onPress={logout}
                    >
                        Log Out
                    </Button>
                </YStack>
            </CustomSafeAreaView>
        </>
    );
}
