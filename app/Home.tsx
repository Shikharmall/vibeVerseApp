import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ImageBackground,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '@/constants/Colors';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import WavesIconBox from '@/components/ui/WavesIconBox';

const { height } = Dimensions.get('window');

export default function Home() {
    const navigation = useNavigation();

    const navigateToProfile = () => {
        navigation.navigate('(profile)' as never);
    };

    const navigateToChat = () => {
        navigation.navigate('(chat)' as never);
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={{ flex: 1 }}>

                    {/* Top background image */}
                    <ImageBackground
                        source={require('../assets/images/bg.jpg')}
                        style={styles.backgroundImageContainer}
                        resizeMode="cover"
                    >
                        <View style={styles.gradientOverlay}>
                            <LinearGradient
                                colors={['transparent', Colors.linerGradientBlur.from, Colors.linerGradient.from]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0, y: 1 }}
                                style={StyleSheet.absoluteFill}
                            />
                        </View>
                    </ImageBackground>

                    {/* Content with gradient background */}
                    <LinearGradient
                        colors={[Colors.linerGradient.from, Colors.linerGradient.to]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={styles.contentBackground}
                    >
                        <View style={styles.content}>
                            <View style={styles.header}>
                                <Text style={styles.title}>Welcome!</Text>
                                <Text style={styles.subtitle}>
                                    Choose what you'd like to do today
                                </Text>
                            </View>

                            <View style={styles.header}>
                                <View style={styles.iconContainer}>
                                    <WavesIconBox />
                                </View>

                            </View>

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={styles.primaryButton}
                                    onPress={navigateToProfile}
                                    activeOpacity={0.8}
                                >
                                    <LinearGradient
                                        colors={['#48bb78', '#38a169']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={styles.buttonGradient}
                                    >
                                        <View style={styles.buttonIcon}>
                                            <MaterialIcons name="person" size={24} color="#ffffff" />
                                        </View>
                                        <View style={styles.buttonTextContainer}>
                                            <Text style={styles.buttonTitle}>Profile</Text>
                                            <Text style={styles.buttonSubtitle}>Create or view your profile</Text>
                                        </View>
                                    </LinearGradient>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.primaryButton}
                                    onPress={navigateToChat}
                                    activeOpacity={0.8}
                                >
                                    <LinearGradient
                                        colors={['#ed8936', '#dd6b20']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={styles.buttonGradient}
                                    >
                                        <View style={styles.buttonIcon}>
                                            <MaterialIcons name="chat" size={24} color="#ffffff" />
                                        </View>
                                        <View style={styles.buttonTextContainer}>
                                            <Text style={styles.buttonTitle}>Chat with Alex</Text>
                                            <Text style={styles.buttonSubtitle}>Start a conversation</Text>
                                        </View>
                                    </LinearGradient>
                                </TouchableOpacity>

                            </View>

                            <View style={styles.footer}>
                                <Text style={styles.footerText}>
                                    Your personal space for profiles and conversations
                                </Text>
                            </View>
                        </View>
                    </LinearGradient>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImageContainer: {
        height: height * 0.25,
        width: '100%',
    },
    gradientOverlay: {
        ...StyleSheet.absoluteFillObject,
    },
    blurView: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 30,
    },
    contentBackground: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 40,
        justifyContent: 'space-between',
    },
    header: {
        alignItems: 'center',
        marginTop: 20,
    }, 
    iconContainer: {
        width:  80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: 20,
    },
    title: {
        fontSize: 36,
        fontWeight: '800',
        color: 'white',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: 'rgba(255, 255, 255, 0.9)',
        textAlign: 'center',
        lineHeight: 24,
    },
    buttonContainer: {
        gap: 20,
    },
    primaryButton: {
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8,
    },
    buttonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 24,
        borderRadius: 20,
    },
    buttonIcon: {
        marginRight: 16,
    },
    buttonTextContainer: {
        flex: 1,
    },
    buttonTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: 'white',
        marginBottom: 4,
    },
    buttonSubtitle: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.9)',
    },
    footer: {
        alignItems: 'center',
        marginTop: 20,
    },
    footerText: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
        lineHeight: 22,
    },
});
