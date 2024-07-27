import { Button, Paragraph, XStack, YStack } from 'tamagui';
import { Pressable } from 'react-native';
import { useAuth } from 'contexts/AuthContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const CustomBottomBar = ({ descriptors, navigation, state }) => {
    const insets = useSafeAreaInsets();

    const router = useRouter();

    const routes = state.routes;

    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) return null;

    if (!isAuthenticated) {
        return (
            <XStack
                w='100%'
                style={{
                    backgroundColor: 'white',
                    paddingBottom: insets.bottom
                }}
                pt='$3'
                px='$4'
                justifyContent='center'
                gap='$16'
            >
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
                    onPress={() => router.push('/login')}
                >
                    Log In
                </Button>
            </XStack>
        );
    }

    return (
        <XStack
            w='100%'
            style={{
                backgroundColor: 'white',
                paddingBottom: insets.bottom
            }}
            pt='$3'
            px='$4'
            justifyContent='center'
            gap='$16'
        >
            {routes.map((data, index) => {
                const { options } = descriptors[data.key];

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: data.key,
                        canPreventDefault: true
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(data.name, data.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: data.key
                    });
                };

                return (
                    <Pressable
                        onLongPress={onLongPress}
                        onPress={onPress}
                        key={data.key}
                    >
                        <YStack gap='$0' ai='center'>
                            {options.tabBarIcon && (
                                <options.tabBarIcon
                                    color={
                                        isFocused
                                            ? options.tabBarActiveTintColor ??
                                              'rgba(105,105,105,0.7)'
                                            : 'rgba(105,105,105,0.7)'
                                    }
                                    focused={isFocused}
                                    size={32}
                                />
                            )}
                            <Paragraph
                                fontSize={11}
                                fontWeight={'600'}
                                color={
                                    isFocused
                                        ? options.tabBarActiveTintColor ??
                                          'rgba(105,105,105,0.7)'
                                        : 'rgba(105,105,105,0.7)'
                                }
                            >
                                {options.tabBarLabel !== undefined
                                    ? options.tabBarLabel
                                    : options.title !== undefined
                                    ? options.title
                                    : data.name}
                            </Paragraph>
                        </YStack>
                    </Pressable>
                );
            })}
        </XStack>
    );
};

export default CustomBottomBar;
