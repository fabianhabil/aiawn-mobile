import React, { type ReactNode } from 'react';
import {
    StatusBar,
    ScrollView,
    View,
    type RefreshControlProps,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import {
    SafeAreaProvider,
    SafeAreaView,
    useSafeAreaInsets
} from 'react-native-safe-area-context';
import { styled } from 'tamagui';

const CustomSafeAreaView = ({
    children,
    backgroundColor,
    topBackgroundColor,
    fullBackgroundColorParent,
    refreshControl,
    topInsetHeight = 0,
    scrollAbleScreen = true
}: {
    children: ReactNode;
    topBackgroundColor?: string;
    backgroundColor?: string;
    fullBackgroundColorParent?: boolean;
    refreshControl?: React.ReactElement<RefreshControlProps> | undefined;
    topInsetHeight?: number;
    scrollAbleScreen?: boolean;
}) => {
    const insets = useSafeAreaInsets();

    const TopInset = styled(View, {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: insets.top + topInsetHeight,
        backgroundColor: topBackgroundColor ?? '$colorTransparent'
    });

    const Container = styled(SafeAreaView, {
        flex: 1,
        backgroundColor: fullBackgroundColorParent
            ? topBackgroundColor ?? ''
            : '$colorTransparent',
        marginTop: topInsetHeight
    });

    return (
        <SafeAreaProvider>
            <StatusBar
                barStyle='light-content'
                backgroundColor={backgroundColor}
            />
            <TopInset />
            <Container>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                >
                    {scrollAbleScreen ? (
                        <ScrollView
                            contentContainerStyle={{
                                flexGrow: 1,
                                backgroundColor:
                                    backgroundColor ?? '$colorTransparent'
                            }}
                            refreshControl={refreshControl}
                            scrollEventThrottle={refreshControl ? 16 : 0}
                        >
                            {children}
                        </ScrollView>
                    ) : (
                        <View
                            style={{
                                flexGrow: 1,
                                backgroundColor:
                                    backgroundColor ?? '$colorTransparent'
                            }}
                        >
                            {children}
                        </View>
                    )}
                </KeyboardAvoidingView>
            </Container>
        </SafeAreaProvider>
    );
};

export default CustomSafeAreaView;
