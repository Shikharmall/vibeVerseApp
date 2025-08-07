import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Animated,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ProfileCardProps } from '@/constants/Entity';

export default function ProfileCard({ profile, onPress, delay = 0 }: ProfileCardProps) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                delay,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 600,
                delay,
                useNativeDriver: true,
            }),
        ]).start();
    }, [fadeAnim, slideAnim, delay]);

    const formatJoinDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric',
        });
    };

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }],
                },
            ]}
        >
            <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
                <View style={styles.header}>
                    <View style={styles.avatarContainer}>
                        <Image source={{ uri: profile.avatar }} style={styles.avatar} />
                        <View style={styles.onlineBadge} />
                    </View>

                    <View style={styles.headerInfo}>
                        <Text style={styles.name} numberOfLines={1}>{profile.name}</Text>
                        <View style={styles.locationContainer}>
                            {/* <MapPin size={14} color="#718096" /> */}
                            <MaterialIcons name="location-pin" size={14} color="#718096" />
                            <Text style={styles.location} numberOfLines={1}>
                                {profile.location}
                            </Text>
                        </View>
                        <Text style={styles.joinDate}>
                            Joined {formatJoinDate(profile.joinDate)}
                        </Text>
                    </View>

                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.actionButton}>
                            {/* <Heart size={18} color="#e53e3e" /> */}
                            <MaterialIcons name="monitor-heart" size={18} color="#e53e3e" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton}>
                            {/* <MessageCircle size={18} color="#667eea" /> */}
                            <MaterialIcons name="message" size={18} color="#667eea" />
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={styles.bio} numberOfLines={2}>
                    {profile.bio}
                </Text>

                <View style={styles.footer}>
                    <View style={styles.contactInfo}>
                        {/* <Mail size={14} color="#718096" /> */}
                        <MaterialIcons name="email" size={14} color="#718096" />
                        <Text style={styles.email} numberOfLines={1}>
                            {profile.email}
                        </Text>
                    </View>

                    <View style={styles.tags}>
                        <View style={styles.tag}>
                            <Text style={styles.tagText}>Designer</Text>
                        </View>
                        <View style={styles.tag}>
                            <Text style={styles.tagText}>Creative</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 8,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 6,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    avatarContainer: {
        position: 'relative',
        marginRight: 16,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#e2e8f0',
    },
    onlineBadge: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#48bb78',
        borderWidth: 2,
        borderColor: 'white',
    },
    headerInfo: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2d3748',
        marginBottom: 4,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    location: {
        fontSize: 14,
        color: '#718096',
        marginLeft: 4,
        flex: 1,
    },
    joinDate: {
        fontSize: 12,
        color: '#a0aec0',
    },
    actions: {
        flexDirection: 'row',
        gap: 8,
    },
    actionButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#f7fafc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bio: {
        fontSize: 15,
        color: '#4a5568',
        lineHeight: 22,
        marginBottom: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    contactInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    email: {
        fontSize: 13,
        color: '#718096',
        marginLeft: 6,
        flex: 1,
    },
    tags: {
        flexDirection: 'row',
        gap: 6,
    },
    tag: {
        backgroundColor: '#edf2f7',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    tagText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#667eea',
    },
});
