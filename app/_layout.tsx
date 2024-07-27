import '../tamagui-web.css';

import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { Provider } from './Provider';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [interLoaded, interError] = useFonts({
        Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
        InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf')
    });

    useEffect(() => {
        if (interLoaded || interError) {
            SplashScreen.hideAsync();
        }
    }, [interLoaded, interError]);

    if (!interLoaded && !interError) {
        return null;
    }

    return <RootLayoutNav />;
}

function RootLayoutNav() {
    const colorScheme = useColorScheme();

    return (
        <Provider>
            <ThemeProvider
                value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
            >
                <Stack>
                    <Stack.Screen
                        name='(tabs)'
                        options={{
                            headerShown: false
                        }}
                    />

                    <Stack.Screen
                        name='modal'
                        options={{
                            title: 'Tamagui + Expo + All The Stuff',
                            presentation: 'modal',
                            animation: 'slide_from_right',
                            gestureEnabled: true,
                            gestureDirection: 'horizontal'
                        }}
                    />
                </Stack>
            </ThemeProvider>
        </Provider>
    );
}
