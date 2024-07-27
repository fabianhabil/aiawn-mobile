import { useColorScheme } from 'react-native';
import { TamaguiProvider, type TamaguiProviderProps } from 'tamagui';
import { ToastProvider, ToastViewport } from '@tamagui/toast';
import { CurrentToast } from './CurrentToast';
import { config } from '../tamagui.config';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export function Provider({
    children,
    ...rest
}: Omit<TamaguiProviderProps, 'config'>) {
    const colorScheme = useColorScheme();

    return (
        <QueryClientProvider client={queryClient}>
            <TamaguiProvider
                config={config}
                defaultTheme={colorScheme === 'dark' ? 'dark' : 'light'}
                {...rest}
            >
                <ToastProvider swipeDirection='horizontal' duration={6000}>
                    {children}
                    <CurrentToast />
                    <ToastViewport top='$1' left={0} right={0} />
                </ToastProvider>
            </TamaguiProvider>
        </QueryClientProvider>
    );
}
