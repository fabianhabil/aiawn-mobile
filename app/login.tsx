import { ArrowLeft } from '@tamagui/lucide-icons';
import CustomSafeAreaView from 'components/ui/CustomSafeAreaView';
import { Tabs, useRouter } from 'expo-router';
import {
    UserRequest,
    checkUserValidation,
    registerUserValidation,
    type UserType
} from 'models/user/user';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, H3, Input, Label, XStack, YStack, useTheme } from 'tamagui';
import { zodResolver } from '@hookform/resolvers/zod';
import { setItem } from 'utils/AsyncStorage';
import { useAuth } from 'contexts/AuthContext';
import { useMutation } from 'react-query';
import api from 'utils/axios';

export default function Login() {
    const theme = useTheme();

    const { refetchAuth } = useAuth();

    const router = useRouter();

    const [registered, setRegistered] = useState<boolean>(true);

    const {
        control: controlCheck,
        handleSubmit: handleSubmitCheck,
        getValues
    } = useForm<UserRequest.Request.Check>({
        defaultValues: {
            phoneNumber: ''
        },
        resolver: zodResolver(checkUserValidation),
        shouldFocusError: true
    });

    const {
        control: controlRegister,
        handleSubmit: handleSubmitRegister,
        setValue: setValueRegister
    } = useForm<UserRequest.Request.Register>({
        defaultValues: {
            phoneNumber: '',
            name: ''
        },
        resolver: zodResolver(registerUserValidation),
        shouldFocusError: true
    });

    const { mutate: login, isLoading: loginLoading } = useMutation({
        mutationFn: async (
            phone: string
        ): Promise<UserRequest.Response.Check> => {
            const data = await api.post('/users/_login', {
                phone
            });

            return data.data;
        },
        onSuccess: async (data) => {
            await setItem('user-data', {
                phoneNumber: data.data.phone,
                id: data.data._id,
                name: data.data.name
            } as UserType);

            refetchAuth();

            router.replace('/');
        },
        onError: (e) => {
            setValueRegister('phoneNumber', getValues('phoneNumber'));

            setRegistered(() => false);
        }
    });

    const { mutate: register, isLoading: registerLoading } = useMutation({
        mutationFn: async (
            body: UserRequest.Request.Register
        ): Promise<UserRequest.Response.Register> => {
            const data = await api.post('/users/_register', {
                name: body.name,
                phone: body.phoneNumber
            });

            return data.data;
        },

        onSuccess: async (data) => {
            await setItem('user-data', {
                phoneNumber: data.data.phone,
                id: data.data._id,
                name: data.data.name
            } as UserType);

            refetchAuth();

            router.replace('/');
        }
    });

    return (
        <>
            <Tabs.Screen
                options={{
                    title: 'Home',
                    headerShown: false
                }}
            />

            <CustomSafeAreaView
                backgroundColor='white'
                topBackgroundColor='white'
            >
                <YStack flex={1} px='$4' py='$2' gap='$4'>
                    <ArrowLeft
                        color='black'
                        size={32}
                        onPress={() => router.back()}
                        mb='$4'
                    />

                    <H3>Welcome!</H3>

                    <YStack mb='$4' gap='$3'>
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

                                {registered ? (
                                    <Controller
                                        control={controlCheck}
                                        name='phoneNumber'
                                        render={({
                                            field: { value, onChange, onBlur },
                                            fieldState: { error }
                                        }) => {
                                            return (
                                                <YStack style={{ flex: 1 }}>
                                                    <Input
                                                        borderWidth={1}
                                                        borderColor={
                                                            'rgba(105,105,105,0.2)'
                                                        }
                                                        backgroundColor={
                                                            '$colorTransparent'
                                                        }
                                                        placeholder='812 123 4567'
                                                        flex={1}
                                                        value={value}
                                                        onChangeText={(e) => {
                                                            const numericText =
                                                                e.replace(
                                                                    /[^0-9]/g,
                                                                    ''
                                                                );

                                                            onChange(
                                                                numericText
                                                            );
                                                        }}
                                                        onBlur={onBlur}
                                                        keyboardType='numeric'
                                                    />
                                                    {error && error.message && (
                                                        <Label
                                                            color={
                                                                theme.red10.val
                                                            }
                                                        >
                                                            {error.message}
                                                        </Label>
                                                    )}
                                                </YStack>
                                            );
                                        }}
                                    />
                                ) : (
                                    <Controller
                                        control={controlRegister}
                                        name='phoneNumber'
                                        render={({
                                            field: { value, onChange, onBlur },
                                            fieldState: { error }
                                        }) => {
                                            return (
                                                <YStack style={{ flex: 1 }}>
                                                    <Input
                                                        borderWidth={1}
                                                        borderColor={
                                                            'rgba(105,105,105,0.2)'
                                                        }
                                                        backgroundColor={
                                                            '$colorTransparent'
                                                        }
                                                        placeholder='812 123 4567'
                                                        flex={1}
                                                        value={value}
                                                        onChangeText={(e) => {
                                                            const numericText =
                                                                e.replace(
                                                                    /[^0-9]/g,
                                                                    ''
                                                                );

                                                            onChange(
                                                                numericText
                                                            );

                                                            setRegistered(
                                                                () => true
                                                            );
                                                        }}
                                                        onBlur={onBlur}
                                                        keyboardType='numeric'
                                                    />
                                                    {error && error.message && (
                                                        <Label
                                                            color={
                                                                theme.red10.val
                                                            }
                                                        >
                                                            {error.message}
                                                        </Label>
                                                    )}
                                                </YStack>
                                            );
                                        }}
                                    />
                                )}
                            </XStack>
                        </YStack>

                        {!registered && (
                            <YStack style={{ width: '100%' }} gap='$1'>
                                <Label color='#878787' fontWeight={'bold'}>
                                    Name
                                </Label>

                                <Controller
                                    control={controlRegister}
                                    name='name'
                                    render={({
                                        field: { value, onChange, onBlur },
                                        fieldState: { error }
                                    }) => {
                                        return (
                                            <YStack style={{ flex: 1 }}>
                                                <Input
                                                    borderWidth={1}
                                                    borderColor={
                                                        'rgba(105,105,105,0.2)'
                                                    }
                                                    backgroundColor={
                                                        '$colorTransparent'
                                                    }
                                                    placeholder='John Doe'
                                                    flex={1}
                                                    value={value}
                                                    onChangeText={(e) => {
                                                        onChange(e);
                                                    }}
                                                    onBlur={onBlur}
                                                />
                                                {error && error.message && (
                                                    <Label
                                                        color={theme.red10.val}
                                                    >
                                                        {error.message}
                                                    </Label>
                                                )}
                                            </YStack>
                                        );
                                    }}
                                />
                            </YStack>
                        )}
                    </YStack>

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
                        onPress={() => {
                            if (registered) {
                                handleSubmitCheck((e) => {
                                    login(`+62${e.phoneNumber}`);
                                })();
                            } else {
                                handleSubmitRegister(async (e) => {
                                    register({
                                        name: e.name,
                                        phoneNumber: `+62${e.phoneNumber}`
                                    });
                                })();
                            }
                        }}
                    >
                        {registered ? 'Log In' : 'Register'}
                    </Button>
                </YStack>
            </CustomSafeAreaView>
        </>
    );
}
