import { H3, H4, Paragraph, ScrollView, View, XStack, YStack } from 'tamagui';
import CustomSafeAreaView from 'components/ui/CustomSafeAreaView';
import { Circle, Path, Svg } from 'react-native-svg';
import { Mic } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { useAuth } from 'contexts/AuthContext';

export default function TabOneScreen() {
    const router = useRouter();

    const { isAuthenticated } = useAuth();
    return (
        <>
            <CustomSafeAreaView
                topBackgroundColor='#00B24F'
                backgroundColor='white'
                fullBackgroundColorParent
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

                <XStack
                    gap='$4'
                    px='$4'
                    style={{
                        top: 25,
                        width: '100%',
                        flex: 1,
                        position: 'absolute'
                    }}
                >
                    <View
                        style={{
                            backgroundColor: 'white',
                            width: 50,
                            height: 50,
                            borderRadius: 10,
                            shadowColor: '#000000',
                            shadowOffset: { width: 0, height: 8 },
                            shadowOpacity: 0.15,
                            shadowRadius: 10,
                            elevation: 8
                        }}
                    />
                    <View
                        style={{
                            backgroundColor: 'white',
                            height: 50,
                            flex: 1,
                            borderRadius: 10,
                            shadowColor: '#000000',
                            shadowOffset: { width: 0, height: 8 },
                            shadowOpacity: 0.15,
                            shadowRadius: 10,
                            elevation: 8
                        }}
                    />
                </XStack>

                <YStack
                    px='$4'
                    gap='$6'
                    mt='$10'
                    style={{ paddingBottom: 100 }}
                >
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        <XStack gap='$5'>
                            {[...Array(10)].map((_, index) => {
                                return (
                                    <YStack key={index} gap='$3'>
                                        <View
                                            style={{
                                                width: 65,
                                                height: 65,
                                                borderRadius: '50%',
                                                backgroundColor:
                                                    'rgba(0,178,79,0.3)'
                                            }}
                                        />

                                        <View
                                            style={{
                                                width: 65,
                                                height: 15,
                                                backgroundColor: '#F0F0F0'
                                            }}
                                        />
                                    </YStack>
                                );
                            })}
                        </XStack>
                    </ScrollView>

                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        <XStack gap='$4'>
                            <YStack
                                style={{
                                    height: 75,
                                    backgroundColor: '#F9F9F9',
                                    width: 150
                                }}
                            ></YStack>
                            <YStack
                                style={{
                                    height: 75,
                                    backgroundColor: '#F9F9F9',
                                    width: 200
                                }}
                            ></YStack>
                            <YStack
                                style={{
                                    height: 75,
                                    backgroundColor: '#F9F9F9',
                                    width: 130
                                }}
                            ></YStack>
                        </XStack>
                    </ScrollView>

                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        <XStack gap='$4'>
                            <YStack gap='$4'>
                                <H3>Yuk, Makan Hemat</H3>
                                <View
                                    style={{
                                        width: 350,
                                        height: 170,
                                        backgroundColor: 'rgba(0,178,79,0.2)',
                                        borderRadius: 8
                                    }}
                                />
                                <YStack>
                                    <H4>Hemat Bukan Main</H4>
                                    <Paragraph>Restoran X</Paragraph>
                                </YStack>
                            </YStack>

                            <YStack gap='$4'>
                                <H3>Yuk, Makan Hemat</H3>
                                <View
                                    style={{
                                        width: 350,
                                        height: 170,
                                        backgroundColor: 'rgba(0,178,79,0.2)',
                                        borderRadius: 8
                                    }}
                                />
                                <YStack>
                                    <H4>Hemat Bukan Main</H4>
                                    <Paragraph>Restoran Y</Paragraph>
                                </YStack>
                            </YStack>
                        </XStack>
                    </ScrollView>
                </YStack>
            </CustomSafeAreaView>

            <XStack
                bottom='$3'
                ai={'center'}
                px='$2'
                display='flex'
                jc={'space-between'}
                w={'100%'}
                style={{
                    borderRadius: 10,
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.1,
                    shadowRadius: 20,
                    elevation: 8,
                    height: 60,
                    backgroundColor: 'white',
                    position: 'absolute',
                    left: 8,
                    width: '95%'
                }}
                onPress={() => {
                    if (isAuthenticated) {
                        router.push('/aiawn');
                    } else {
                        router.push('/login');
                    }
                }}
            >
                <XStack ai='center' gap='$4'>
                    <Svg width='42' height='42' viewBox='0 0 42 42' fill='none'>
                        <Circle cx='21' cy='21' r='21' fill='#D9D9D9' />
                        <Path
                            d='M32.1831 18.591C32.4785 17.6978 32.5803 16.7519 32.482 15.8162C32.3837 14.8806 32.0874 13.9765 31.6128 13.1642C30.9071 11.9371 29.8303 10.9657 28.5372 10.3897C27.2442 9.81367 25.8018 9.66285 24.4176 9.95893C23.6314 9.0843 22.6289 8.4319 21.5108 8.06723C20.3927 7.70257 19.1984 7.63847 18.0477 7.88137C16.897 8.12428 15.8305 8.66564 14.9552 9.4511C14.0799 10.2366 13.4266 11.2385 13.061 12.3562C12.1392 12.5463 11.2683 12.9305 10.5065 13.4831C9.74457 14.0358 9.10904 14.7443 8.64214 15.5615C7.92986 16.7872 7.62556 18.2076 7.77317 19.6175C7.92078 21.0274 8.51266 22.354 9.46335 23.4056C9.16545 24.2983 9.06163 25.2443 9.15884 26.1804C9.25605 27.1165 9.55205 28.021 10.027 28.8335C10.733 30.0616 11.8108 31.0338 13.105 31.6099C14.3991 32.1859 15.8428 32.3361 17.2278 32.0388C17.8532 32.7418 18.621 33.3036 19.4803 33.6871C20.3395 34.0705 21.2705 34.2667 22.2115 34.2626C23.6301 34.2632 25.0123 33.8133 26.1588 32.9778C27.3054 32.1424 28.157 30.9644 28.591 29.6138C29.5127 29.4236 30.3833 29.0394 31.1449 28.4868C31.9066 27.9341 32.542 27.2257 33.0088 26.4086C33.7126 25.1848 34.0117 23.7699 33.8634 22.3659C33.7152 20.962 33.1271 19.6408 32.1831 18.591ZM22.2115 32.5273C21.0498 32.5289 19.9247 32.122 19.0327 31.3778L19.1886 31.2883L24.4706 28.24C24.6015 28.1624 24.7101 28.0524 24.786 27.9205C24.8619 27.7886 24.9025 27.6394 24.9039 27.4873V20.0411L27.1365 21.3321C27.1476 21.3376 27.1572 21.3457 27.1645 21.3557C27.1718 21.3657 27.1766 21.3773 27.1785 21.3896V27.5602C27.1756 28.8767 26.6513 30.1384 25.7205 31.0693C24.7896 32.0001 23.5279 32.5244 22.2115 32.5273ZM11.5346 27.967C10.9516 26.9608 10.7422 25.7811 10.9433 24.6357L11.1002 24.7297L16.3867 27.7791C16.5174 27.8558 16.6662 27.8963 16.8178 27.8963C16.9693 27.8963 17.1181 27.8558 17.2488 27.7791L23.7069 24.0555V26.6329C23.7064 26.6464 23.7029 26.6595 23.6966 26.6714C23.6902 26.6833 23.6813 26.6936 23.6704 26.7015L18.3209 29.7862C17.1794 30.4434 15.8238 30.6209 14.5516 30.2799C13.2793 29.9388 12.1943 29.107 11.5346 27.967ZM10.142 16.4634C10.73 15.4515 11.6559 14.6793 12.757 14.2827V20.5573C12.7554 20.7089 12.7943 20.8582 12.8697 20.9898C12.945 21.1213 13.0542 21.2303 13.1859 21.3056L19.613 25.0126L17.3803 26.3036C17.3682 26.3096 17.3547 26.3127 17.3411 26.3127C17.3275 26.3127 17.3141 26.3096 17.3019 26.3036L11.9635 23.2243C10.8236 22.5641 9.99194 21.4791 9.65053 20.2069C9.30912 18.9347 9.48584 17.579 10.142 16.4369V16.4634ZM28.486 20.7242L22.039 16.9807L24.2661 15.6941C24.2783 15.6881 24.2918 15.685 24.3054 15.685C24.319 15.685 24.3324 15.6881 24.3446 15.6941L29.683 18.7789C30.4998 19.2497 31.1656 19.9431 31.6029 20.7783C32.0402 21.6134 32.2308 22.5557 32.1524 23.4951C32.0741 24.4345 31.73 25.3323 31.1604 26.0834C30.5909 26.8346 29.8193 27.4081 28.9359 27.7371V21.4614C28.9312 21.3101 28.8873 21.1625 28.8085 21.0333C28.7296 20.904 28.6185 20.7975 28.486 20.7242ZM30.7076 17.383L30.5518 17.289L25.2752 14.2142C25.1435 14.1375 24.9938 14.0971 24.8414 14.0971C24.689 14.0971 24.5393 14.1375 24.4076 14.2142L17.9551 17.9378V15.3592C17.9542 15.3463 17.9565 15.3334 17.962 15.3216C17.9674 15.3098 17.9756 15.2996 17.986 15.2918L23.3245 12.2115C24.1427 11.7405 25.0782 11.5122 26.0214 11.5532C26.9646 11.5942 27.8767 11.9029 28.651 12.443C29.4253 12.9832 30.0299 13.7326 30.3941 14.6037C30.7583 15.4747 30.867 16.4314 30.7076 17.362V17.383ZM16.7371 21.9532L14.5045 20.6667C14.4932 20.66 14.4836 20.6508 14.4764 20.6399C14.4691 20.629 14.4644 20.6167 14.4625 20.6037V14.4507C14.4643 13.5069 14.7347 12.5832 15.2419 11.7873C15.7492 10.9914 16.4724 10.3563 17.3271 9.95607C18.1819 9.55588 19.1329 9.40714 20.069 9.52723C21.0051 9.64731 21.8877 10.0313 22.6138 10.6342L22.4568 10.7227L17.1759 13.771C17.0448 13.8484 16.9359 13.9584 16.8598 14.0903C16.7837 14.2221 16.743 14.3714 16.7415 14.5237L16.7371 21.9532ZM17.9496 19.3393L20.8255 17.6814L23.7069 19.3393V22.654L20.8365 24.3119L17.9551 22.654L17.9496 19.3393Z'
                            fill='#696969'
                        />
                    </Svg>

                    <Paragraph>
                        Take me to Grab office with $5 only...
                    </Paragraph>
                </XStack>

                <Mic size={28} color={'rgba(105,105,105,0.7)'} />
            </XStack>
        </>
    );
}
