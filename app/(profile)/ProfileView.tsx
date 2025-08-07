import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '@/constants/Colors';
// import { 
//   ArrowLeft, 
//   Edit3, 
//   Mail, 
//   Phone, 
//   MapPin, 
//   FileText,
//   CheckCircle 
// } from 'lucide-react-native';
// import { UserProfile } from '../App';

interface UserProfile {
    id: string;
    name: string;
    email: string;
    bio: string;
    avatar: string;
    phone: string;
    location: string;
    website: string;
    joinDate: string;
}

export default function ProfileView() {
    const navigation = useNavigation();
    const route = useRoute();
    // const { profileData } = route.params as { profileData: UserProfile };

    const profileData = {
        id: '555',
        name: 'Shivam Gupta',
        email: 'shivam@gmail.com',
        phone: '9885967896',
        bio: 'SDE',
        location: 'Gorakhpur',
        website: 'www.shivam.com',
        avatar: 'https://avatar.iran.liara.run/public/92',
        joinDate: 'Nov, 2025'
    }

    const InfoItem = ({ icon: Icon, label, value }: any) => {
        if (!value) return null;

        return (
            <View style={styles.infoItem}>
                <View style={styles.infoIcon}>
                    <MaterialIcons name={Icon} size={20} color="#667eea" />
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
                colors={[Colors.from, Colors.to]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.header}
            >
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <MaterialIcons name="arrow-left" size={24} color="#ffffff" />
                </TouchableOpacity>

                <View style={styles.profileHeader}>
                    <View style={styles.avatarContainer}>
                        <Image source={{ uri: profileData.avatar }} style={styles.avatar} />
                        <View style={styles.successBadge}>
                            <MaterialIcons name="check-circle" size={20} color="#ffffff" />
                        </View>
                    </View>

                    <Text style={styles.profileName}>{profileData.name}</Text>
                    <Text style={styles.profileEmail}>{profileData.email}</Text>

                    <TouchableOpacity style={styles.editButton}>
                        <MaterialIcons name="edit" size={16} color="#ffffff" />
                        <Text style={styles.editButtonText}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.successMessage}>
                    <MaterialIcons name="check-circle" size={24} color="#48bb78" />
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
                        value={profileData.email}
                    />

                    <InfoItem
                        icon={'call'}
                        label="Phone"
                        value={profileData.phone}
                    />

                    <InfoItem
                        icon={'location-pin'}
                        label="Location"
                        value={profileData.location}
                    />

                    <InfoItem
                        icon={'assignment-ind'}
                        label="Bio"
                        value={profileData.bio}
                    />
                </View>

                <View style={styles.actionButtons}>
                    <TouchableOpacity
                        style={styles.primaryActionButton}
                        onPress={() => navigation.navigate('Chat' as never)}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={['#ed8936', '#dd6b20']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.actionButtonGradient}
                        >
                            <Text style={styles.actionButtonText}>Start Chatting</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.secondaryActionButton}
                        onPress={() => navigation.navigate('Home' as never)}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.secondaryActionText}>Back to Home</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
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
        marginBottom: 20,
        padding: 5,
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
        backgroundColor: '#48bb78',
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
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
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
