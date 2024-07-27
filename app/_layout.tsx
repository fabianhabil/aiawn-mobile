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
import { QueryClient, QueryClientProvider } from 'react-query';
import { TamaguiProvider } from 'tamagui';
import { config } from '../tamagui.config';
import { ToastProvider, ToastViewport } from '@tamagui/toast';
import { CurrentToast } from './CurrentToast';
import { AuthContextProvider } from 'contexts/AuthContext';

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

const queryClient = new QueryClient();

function RootLayoutNav() {
    const colorScheme = useColorScheme();

    return (
        <QueryClientProvider client={queryClient}>
            <TamaguiProvider
                config={config}
                defaultTheme={colorScheme === 'dark' ? 'dark' : 'light'}
            >
                <ToastProvider swipeDirection='horizontal' duration={6000}>
                    <ThemeProvider
                        value={
                            colorScheme === 'dark' ? DarkTheme : DefaultTheme
                        }
                    >
                        <AuthContextProvider>
                            <Stack>
                                <Stack.Screen
                                    name='(tabs)'
                                    options={{
                                        headerShown: false
                                    }}
                                />
                            </Stack>
                        </AuthContextProvider>

                        <CurrentToast />
                        <ToastViewport top='$16' left={0} right={0} />
                    </ThemeProvider>
                </ToastProvider>
            </TamaguiProvider>
        </QueryClientProvider>
    );
}
