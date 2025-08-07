import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Linking,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Svg, { Path, G, Circle, Ellipse } from 'react-native-svg';
// import { Edit3, MapPin, Globe, Phone, Calendar } from 'lucide-react-native';
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

export default function ProfileScreen() {
    const [user, setUser] = useState<UserProfile | null>({
        id: "85968596",
        name: "Shivam Gupta",
        email: "shivam@gmail.com",
        bio: "SDE",
        avatar: "https://avatar.iran.liara.run/public/2",
        phone: "8569789654",
        location: "Madhuban",
        website: "www.google.com",
        joinDate: "Nov, 2023",
    });
    const navigation = useNavigation();

    useFocusEffect(
        React.useCallback(() => {
            loadUserData();
        }, [])
    );

    const loadUserData = async () => {
        try {
            // const userData = await AsyncStorage.getItem('userData');
            // if (userData) {
            //     setUser(JSON.parse(userData));
            // }
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    };

    const handleEditProfile = () => {
        navigation.navigate('EditProfile' as never);
    };

    const handleWebsitePress = () => {
        if (user?.website) {
            Linking.openURL(user.website);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
        });
    };

    if (!user) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.avatarContainer}>
                    <Image source={{ uri: user.avatar }} style={styles.avatar} />
                    {/* <Image source={require('../../assets/images/profile.png')} style={styles.avatar} /> */}
                    <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>{/* <Edit3 size={16} color="white" /> */}
                        <Svg
                            fill="#ffffff"
                            width="20px"
                            height="20px"
                            viewBox="0 0 24 24"
                        // xmlns="http://www.w3.org/2000/svg"
                        // {...props}
                        >
                            <Path d="M21,12a1,1,0,0,0-1,1v6a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V5A1,1,0,0,1,5,4h6a1,1,0,0,0,0-2H5A3,3,0,0,0,2,5V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V13A1,1,0,0,0,21,12ZM6,12.76V17a1,1,0,0,0,1,1h4.24a1,1,0,0,0,.71-.29l6.92-6.93h0L21.71,8a1,1,0,0,0,0-1.42L17.47,2.29a1,1,0,0,0-1.42,0L13.23,5.12h0L6.29,12.05A1,1,0,0,0,6,12.76ZM16.76,4.41l2.83,2.83L18.17,8.66,15.34,5.83ZM8,13.17l5.93-5.93,2.83,2.83L10.83,16H8Z" />
                        </Svg>
                    </TouchableOpacity>
                </View>

                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.email}>{user.email}</Text>

                {user.bio && (
                    <Text style={styles.bio}>{user.bio}</Text>
                )}
            </View>

            <View style={styles.infoSection}>
                <Text style={styles.sectionTitle}>Contact Information</Text>

                {user.phone && (
                    <View style={styles.infoItem}>
                        {/* <Phone size={20} color="#666" /> */}
                        <Svg
                            fill="#666"
                            width="20px"
                            height="20px"
                            viewBox="-6 -2 24 24"
                            // xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="xMinYMin"
                            className="jam jam-phone"
                        // {...props}
                        >
                            <Path d="M3 0h6a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3zm0 2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H3zm3 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                        </Svg>
                        <Text style={styles.infoText}>{user.phone}</Text>
                    </View>
                )}

                {user.location && (
                    <View style={styles.infoItem}>
                        {/* <MapPin size={20} color="#666" /> */}
                        <Svg
                            fill="#666"
                            id="Layer_1"
                            // xmlns="http://www.w3.org/2000/svg"
                            // xmlnsXlink="http://www.w3.org/1999/xlink"
                            width="20px"
                            height="20px"
                            viewBox="0 0 72 72"
                        // enableBackground="new 0 0 72 72"
                        // xmlSpace="preserve"
                        >
                            <G>
                                <Path d="M36.118,15.934c-2.454,0-4.763,0.956-6.498,2.691c-3.582,3.582-3.582,9.41,0,12.992c1.737,1.735,4.045,2.691,6.5,2.691 c2.453,0,4.762-0.956,6.496-2.691c3.582-3.582,3.582-9.41,0-12.992C40.882,16.89,38.573,15.934,36.118,15.934z M39.788,28.789 c-0.979,0.98-2.283,1.52-3.668,1.52c-1.386,0-2.69-0.541-3.671-1.52c-2.022-2.023-2.022-5.314,0-7.336 c0.981-0.981,2.284-1.52,3.669-1.52c1.387,0,2.69,0.539,3.67,1.52C41.809,23.476,41.809,26.767,39.788,28.789z" />
                                <Path d="M50.32,21.823c-0.07-0.301-0.117-0.52-0.154-0.688c-0.076-0.355-0.123-0.57-0.248-0.861 c-0.218-0.507-0.809-0.736-1.314-0.523c-0.504,0.218-0.74,0.806-0.522,1.314c0.047,0.107,0.065,0.183,0.131,0.49 c0.037,0.179,0.088,0.411,0.162,0.729c0.11,0.461,0.521,0.771,0.974,0.771c0.075,0,0.153-0.009,0.229-0.028 C50.115,22.899,50.447,22.36,50.32,21.823z" />
                                <Path d="M48.382,17.217c-2.386-3.761-6.282-6.263-10.69-6.865c-0.551-0.073-1.051,0.308-1.127,0.856 c-0.076,0.547,0.308,1.051,0.856,1.126c3.822,0.52,7.201,2.691,9.271,5.955c0.19,0.3,0.515,0.464,0.847,0.464 c0.185,0,0.366-0.05,0.535-0.155C48.538,18.302,48.677,17.684,48.382,17.217z" />
                                <Path d="M36.001,3.262c-11.841,0-21.474,9.633-21.474,21.473c0,7.726,11.138,32.257,14.13,38.154c2.582,5.09,5.77,5.85,7.442,5.85 c2.896,0,5.533-2.08,7.428-5.858c2.838-5.659,13.947-30.505,13.947-38.145C57.475,12.895,47.841,3.262,36.001,3.262z  M39.951,61.088c-1.145,2.285-2.586,3.65-3.852,3.65c-1.284,0-2.695-1.334-3.875-3.66c-3.975-7.834-13.697-30.272-13.697-36.342 c0-9.635,7.839-17.473,17.474-17.473c9.636,0,17.474,7.838,17.474,17.473C53.475,30.898,43.428,54.158,39.951,61.088z" />
                            </G>
                        </Svg>
                        <Text style={styles.infoText}>{user.location}</Text>
                    </View>
                )}

                {user.website && (
                    <TouchableOpacity style={styles.infoItem} onPress={handleWebsitePress}>
                        {/* <Globe size={20} color="#007AFF" /> */}
                        <Svg
                            width="20px"
                            height="20px"
                            viewBox="0 0 24 24"
                            fill="none"
                        // xmlns="http://www.w3.org/2000/svg"
                        // {...props}
                        >
                            <Circle
                                cx={12}
                                cy={12}
                                r={10}
                                stroke="#007AFF"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <Ellipse
                                cx={12}
                                cy={12}
                                rx={10}
                                ry={4}
                                transform="rotate(90 12 12)"
                                stroke="#007AFF"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <Path
                                d="M2 12H22"
                                stroke="#007AFF"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </Svg>
                        <Text style={[styles.infoText, styles.linkText]}>{user.website}</Text>
                    </TouchableOpacity>
                )}

                <View style={styles.infoItem}>
                    {/* <Calendar size={20} color="#666" /> */}
                    <Svg
                        width="20px"
                        height="20px"
                        viewBox="0 0 15 15"
                        fill="none"
                    // xmlns="http://www.w3.org/2000/svg"
                    >
                        <Path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.5 1C4.77614 1 5 1.22386 5 1.5V2H10V1.5C10 1.22386 10.2239 1 10.5 1C10.7761 1 11 1.22386 11 1.5V2H12.5C13.3284 2 14 2.67157 14 3.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V3.5C1 2.67157 1.67157 2 2.5 2H4V1.5C4 1.22386 4.22386 1 4.5 1ZM10 3V3.5C10 3.77614 10.2239 4 10.5 4C10.7761 4 11 3.77614 11 3.5V3H12.5C12.7761 3 13 3.22386 13 3.5V5H2V3.5C2 3.22386 2.22386 3 2.5 3H4V3.5C4 3.77614 4.22386 4 4.5 4C4.77614 4 5 3.77614 5 3.5V3H10ZM2 6V12.5C2 12.7761 2.22386 13 2.5 13H12.5C12.7761 13 13 12.7761 13 12.5V6H2ZM7 7.5C7 7.22386 7.22386 7 7.5 7C7.77614 7 8 7.22386 8 7.5C8 7.77614 7.77614 8 7.5 8C7.22386 8 7 7.77614 7 7.5ZM9.5 7C9.22386 7 9 7.22386 9 7.5C9 7.77614 9.22386 8 9.5 8C9.77614 8 10 7.77614 10 7.5C10 7.22386 9.77614 7 9.5 7ZM11 7.5C11 7.22386 11.2239 7 11.5 7C11.7761 7 12 7.22386 12 7.5C12 7.77614 11.7761 8 11.5 8C11.2239 8 11 7.77614 11 7.5ZM11.5 9C11.2239 9 11 9.22386 11 9.5C11 9.77614 11.2239 10 11.5 10C11.7761 10 12 9.77614 12 9.5C12 9.22386 11.7761 9 11.5 9ZM9 9.5C9 9.22386 9.22386 9 9.5 9C9.77614 9 10 9.22386 10 9.5C10 9.77614 9.77614 10 9.5 10C9.22386 10 9 9.77614 9 9.5ZM7.5 9C7.22386 9 7 9.22386 7 9.5C7 9.77614 7.22386 10 7.5 10C7.77614 10 8 9.77614 8 9.5C8 9.22386 7.77614 9 7.5 9ZM5 9.5C5 9.22386 5.22386 9 5.5 9C5.77614 9 6 9.22386 6 9.5C6 9.77614 5.77614 10 5.5 10C5.22386 10 5 9.77614 5 9.5ZM3.5 9C3.22386 9 3 9.22386 3 9.5C3 9.77614 3.22386 10 3.5 10C3.77614 10 4 9.77614 4 9.5C4 9.22386 3.77614 9 3.5 9ZM3 11.5C3 11.2239 3.22386 11 3.5 11C3.77614 11 4 11.2239 4 11.5C4 11.7761 3.77614 12 3.5 12C3.22386 12 3 11.7761 3 11.5ZM5.5 11C5.22386 11 5 11.2239 5 11.5C5 11.7761 5.22386 12 5.5 12C5.77614 12 6 11.7761 6 11.5C6 11.2239 5.77614 11 5.5 11ZM7 11.5C7 11.2239 7.22386 11 7.5 11C7.77614 11 8 11.2239 8 11.5C8 11.7761 7.77614 12 7.5 12C7.22386 12 7 11.7761 7 11.5ZM9.5 11C9.22386 11 9 11.2239 9 11.5C9 11.7761 9.22386 12 9.5 12C9.77614 12 10 11.7761 10 11.5C10 11.2239 9.77614 11 9.5 11Z"
                            fill="#666"
                        />
                    </Svg>
                    <Text style={styles.infoText}>
                        Member since {formatDate(user.joinDate)}
                    </Text>
                </View>
            </View>

            <View style={styles.statsSection}>
                <Text style={styles.sectionTitle}>Profile Stats</Text>
                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>42</Text>
                        <Text style={styles.statLabel}>Posts</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>1.2K</Text>
                        <Text style={styles.statLabel}>Followers</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>856</Text>
                        <Text style={styles.statLabel}>Following</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#f8f9fa',
        backgroundColor: '#fef1f2',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f4f8',
    },
    header: {
        backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: 40,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#ddd',
        borderWidth: 4,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    editButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#ff6b6b',
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: 'white',
        shadowColor: '#ff6b6b',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    name: {
        fontSize: 28,
        fontWeight: '800',
        color: '#ffffff',
        marginBottom: 6,
        textAlign: 'center',
    },
    email: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        marginBottom: 16,
        textAlign: 'center',
    },
    bio: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.9)',
        textAlign: 'center',
        lineHeight: 22,
        paddingHorizontal: 20,
    },
    infoSection: {
        backgroundColor: 'white',
        margin: 20,
        marginTop: -20,
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
        alignItems: 'center',
        marginBottom: 16,
        padding: 12,
        backgroundColor: '#f7fafc',
        borderRadius: 12,
    },
    infoText: {
        fontSize: 16,
        color: '#4a5568',
        marginLeft: 16,
        flex: 1,
    },
    linkText: {
        color: '#667eea',
        fontWeight: '500',
    },
    statsSection: {
        backgroundColor: 'white',
        margin: 20,
        marginTop: 0,
        borderRadius: 20,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 6,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    statItem: {
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f7fafc',
        borderRadius: 16,
        minWidth: 80,
    },
    statNumber: {
        fontSize: 28,
        fontWeight: '800',
        color: '#667eea',
    },
    statLabel: {
        fontSize: 14,
        color: '#718096',
        marginTop: 4,
        fontWeight: '500',
    },
});
