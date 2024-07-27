import CustomSafeAreaView from 'components/ui/CustomSafeAreaView';
import { Tabs } from 'expo-router';
import { Text } from 'tamagui';

export default function Login() {
    return (
        <>
            <Tabs.Screen
                options={{
                    title: 'Home',
                    headerShown: false
                }}
            />

            <CustomSafeAreaView
                backgroundColor='#00B24F'
                topBackgroundColor='#00B24F'
            >
                <Text>Login Page</Text>
            </CustomSafeAreaView>
        </>
    );
}
