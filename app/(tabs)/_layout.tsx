import { Link, Tabs } from 'expo-router';
import { Button, useTheme } from 'tamagui';
import { CircleUserRound, Compass } from '@tamagui/lucide-icons';
import CustomBottomBar from 'components/ui/CustomBottomBar';

export default function TabLayout() {
    const theme = useTheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: theme.green11.val
            }}
            tabBar={(props) => <CustomBottomBar {...props} />}
        >
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Compass color={color} size={34} />
                    ),
                    headerRight: () => (
                        <Link href='/modal' asChild>
                            <Button mr='$4' bg='$purple8' color='$purple12'>
                                Hello!
                            </Button>
                        </Link>
                    )
                }}
            />

            <Tabs.Screen
                name='account'
                options={{
                    title: 'Account',
                    tabBarIcon: ({ color }) => (
                        <CircleUserRound color={color} size={34} />
                    )
                }}
            />
        </Tabs>
    );
}
