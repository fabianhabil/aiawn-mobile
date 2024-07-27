import React, { type ReactNode } from 'react';
import { StatusBar, ScrollView } from 'react-native';
import {
    SafeAreaProvider,
    SafeAreaView,
    useSafeAreaInsets
} from 'react-native-safe-area-context';
import { styled } from 'tamagui';

const CustomSafeAreaView = ({
    children,
    backgroundColor,
    topBackgroundColor
}: {
    children: ReactNode;
    topBackgroundColor?: string;
    backgroundColor?: string;
}) => {
    const insets = useSafeAreaInsets();

    const TopInset = styled(SafeAreaView, {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: insets.top,
        backgroundColor: topBackgroundColor ?? '$colorTransparent'
    });

    const Container = styled(SafeAreaView, {
        flex: 1,
        backgroundColor: topBackgroundColor ?? '$colorTransparent'
    });

    return (
        <SafeAreaProvider>
            <StatusBar
                barStyle='light-content'
                backgroundColor={backgroundColor}
            />
            <TopInset />
            <Container>
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        backgroundColor: backgroundColor ?? '$colorTransparent'
                    }}
                >
                    {children}
                </ScrollView>
            </Container>
        </SafeAreaProvider>
    );
};

export default CustomSafeAreaView;
