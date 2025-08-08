import ZoomingIcon from '@/components/ui/ZoomingIcon';
import { Colors } from '@/constants/Colors';
import { UserProfile } from '@/constants/Entity';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    BackHandler,
} from 'react-native';
import { db } from '../../../utils/firebaseConfig';

export default function ProfileView() {
    const navigation = useNavigation();
    const { profileId } = useLocalSearchParams();

    const [profileData, setProfileData] = useState<UserProfile | null>(null);

    const fetchProfile = async () => {
        try {
            const profileRef = doc(db, 'users', profileId as string);
            const profileSnap = await getDoc(profileRef);

            if (profileSnap.exists()) {
                setProfileData(profileSnap.data() as UserProfile);
            } else {
                console.warn('No such profile found!');
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    useEffect(() => {
        if (profileId) {
            fetchProfile();
        }
    }, [profileId]);

    const backAction = () => {
        navigation.navigate('Home' as never)
        return true;
    };

    useFocusEffect(
        useCallback(() => {
            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );

            return () => backHandler.remove();
        }, [])
    );


    const InfoItem = ({ icon: Icon, label, value }: any) => {
        if (!value) return null;

        return (
            <View style={styles.infoItem}>
                <View style={styles.infoIcon}>
                    <MaterialIcons name={Icon} size={20} color={Colors.icon.color} />
                </View>
                <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>{label}</Text>
                    <Text style={styles.infoValue}>{value}</Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={[Colors.linerGradient.from, Colors.linerGradient.to]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.header}
            >
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate('Home' as never)}
                >
                    <MaterialIcons name="arrow-left" size={24} color={Colors.white} />
                </TouchableOpacity>

                <View style={styles.profileHeader}>
                    <View style={styles.avatarContainer}>
                        <Image source={{ uri: profileData?.avatar }} style={styles.avatar} />
                        <View style={styles.successBadge}>
                            <MaterialIcons name="check-circle" size={20} color={Colors.white} />
                        </View>
                    </View>

                    {/* <Text>{profileId}</Text> */}
                    <Text style={styles.profileName}>{profileData?.name}</Text>
                    <Text style={styles.profileEmail}>{profileData?.email || "-"}</Text>

                    <TouchableOpacity style={styles.editButton}>
                        <MaterialIcons name="edit" size={16} color={Colors.white} />
                        <Text style={styles.editButtonText}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.successMessage}>
                    {/* <MaterialIcons name="check-circle" size={24} color={Colors.green} /> */}
                    <ZoomingIcon />
                    <Text style={styles.successText}>Profile Created Successfully!</Text>
                    <Text style={styles.successSubtext}>
                        Your profile has been saved and is ready to use.
                    </Text>
                </View>

                <View style={styles.infoSection}>
                    <Text style={styles.sectionTitle}>Profile Information</Text>

                    <InfoItem
                        icon={'email'}
                        label="Email"
                        value={profileData?.email}
                    />

                    <InfoItem
                        icon={'call'}
                        label="Phone"
                        value={profileData?.phone}
                    />

                    <InfoItem
                        icon={'location-pin'}
                        label="Location"
                        value={profileData?.location}
                    />

                    <InfoItem
                        icon={'assignment-ind'}
                        label="Bio"
                        value={profileData?.bio}
                    />
                </View>

                <View style={styles.actionButtons}>
                    <TouchableOpacity
                        style={styles.primaryActionButton}
                        onPress={() => navigation.navigate('Home' as never)}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={[Colors.linerGradient.from, Colors.linerGradient.to]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.actionButtonGradient}
                        >
                            <Text style={styles.actionButtonText}>Back to Home</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor,
    },
    header: {
        paddingTop: 20,
        paddingBottom: 40,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    backButton: {
        alignSelf: 'flex-start',
        // marginBottom: 20,
        // padding: 5,
        marginTop: 30
    },
    profileHeader: {
        alignItems: 'center',
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 3,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    successBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: Colors.green,
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white',
    },
    profileName: {
        fontSize: 24,
        fontWeight: '800',
        color: 'white',
        marginBottom: 4,
    },
    profileEmail: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.9)',
        marginBottom: 20,
    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    editButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 6,
    },
    content: {
        flex: 1,
    },
    successMessage: {
        backgroundColor: 'white',
        margin: 20,
        marginTop: -20,
        padding: 24,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 6,
    },
    successText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2d3748',
        marginTop: 12,
        marginBottom: 8,
    },
    successSubtext: {
        fontSize: 14,
        color: '#718096',
        textAlign: 'center',
        lineHeight: 20,
    },
    infoSection: {
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 20,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 6,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#2d3748',
        marginBottom: 20,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    infoIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.icon.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    infoContent: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#718096',
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 16,
        color: '#2d3748',
        lineHeight: 22,
    },
    actionButtons: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    primaryActionButton: {
        borderRadius: 16,
        marginBottom: 16,
        shadowColor: '#ed8936',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8,
    },
    actionButtonGradient: {
        paddingVertical: 18,
        paddingHorizontal: 24,
        borderRadius: 16,
        alignItems: 'center',
    },
    actionButtonText: {
        fontSize: 18,
        fontWeight: '700',
        color: 'white',
    },
    secondaryActionButton: {
        backgroundColor: 'white',
        paddingVertical: 18,
        paddingHorizontal: 24,
        borderRadius: 16,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#e2e8f0',
    },
    secondaryActionText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#667eea',
    },
});
