import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '@/constants/Colors';

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

export default function CreateProfile() {
    const navigation = useNavigation();
    const [formData, setFormData] = useState<UserProfile>({
        id: '555',
        name: '',
        email: '',
        phone: '',
        bio: '',
        location: '',
        website: '',
        avatar: 'https://avatar.iran.liara.run/public/92',
        joinDate: '555'
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        // Validate form
        if (!formData.name || !formData.email) {
            Alert.alert('Error', 'Please fill in at least your name and email');
            return;
        }

        setLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Navigate to profile view with data
            // navigation.navigate('ProfileView' as never, { profileData: formData } as never);
        } catch (error) {
            Alert.alert('Error', 'Failed to save profile');
        } finally {
            setLoading(false);
        }
    };

    const InputField = ({
        icon: Icon,
        placeholder,
        value,
        onChangeText,
        multiline = false,
        keyboardType = 'default' as any
    }: any) => (
        <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
                <MaterialIcons name={Icon} size={20} color="#c288efff" style={styles.inputIcon} />
                <TextInput
                    style={[styles.input, multiline && styles.multilineInput]}
                    placeholder={placeholder}
                    placeholderTextColor="#a0aec0"
                    value={value}
                    onChangeText={onChangeText}
                    multiline={multiline}
                    numberOfLines={multiline ? 3 : 1}
                    keyboardType={keyboardType}
                />
            </View>
        </View>
    );

    const navigateToProfile = () => {
        navigation.navigate('ProfileView' as never);
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
                    <MaterialIcons name="arrow-left" size={24} color={Colors.white} />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Create Profile</Text>
                <Text style={styles.headerSubtitle}>Tell us about yourself</Text>
            </LinearGradient>

            <KeyboardAvoidingView
                style={styles.formContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    style={styles.form}
                    contentContainerStyle={styles.formContent}
                    showsVerticalScrollIndicator={false}
                >
                    <InputField
                        icon={'perm-identity'}
                        placeholder="Full Name *"
                        value={formData.name}
                        onChangeText={(text: string) => setFormData({ ...formData, name: text })}
                    />

                    <InputField
                        icon={'email'}
                        placeholder="Email Address *"
                        value={formData.email}
                        onChangeText={(text: string) => setFormData({ ...formData, email: text })}
                        keyboardType="email-address"
                    />

                    <InputField
                        icon={'call'}
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChangeText={(text: string) => setFormData({ ...formData, phone: text })}
                        keyboardType="phone-pad"
                    />

                    <InputField
                        icon={'location-pin'}
                        placeholder="Location"
                        value={formData.location}
                        onChangeText={(text: string) => setFormData({ ...formData, location: text })}
                    />

                    <InputField
                        icon={'assignment-ind'}
                        placeholder="Bio - Tell us about yourself"
                        value={formData.bio}
                        onChangeText={(text: string) => setFormData({ ...formData, bio: text })}
                        multiline={true}
                    />

                    <TouchableOpacity
                        style={[styles.submitButton, loading && styles.submitButtonDisabled]}
                        onPress={handleSubmit}
                        disabled={loading}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            // colors={['#667eea', '#764ba2']}
                            colors={['#e145a2', '#9834e4']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.submitGradient}
                        >
                            <Text style={styles.submitText}>
                                {loading ? 'Creating Profile...' : 'Create Profile'}
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <Text style={styles.requiredText}>* Required fields</Text>

                    <TouchableOpacity
                        style={[styles.submitButton, loading && styles.submitButtonDisabled]}
                        onPress={navigateToProfile}
                        disabled={loading}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={['#667eea', '#764ba2']}
                            // colors={['#e145a2', '#9834e4']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.submitGradient}
                        >
                            <Text style={styles.submitText}>
                                Profile View
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
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
        paddingBottom: 30,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 20,
        padding: 5,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: 'white',
        textAlign: 'center',
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.9)',
        textAlign: 'center',
    },
    formContainer: {
        flex: 1,
    },
    form: {
        flex: 1,
    },
    formContent: {
        padding: 20,
        paddingTop: 30,
    },
    inputContainer: {
        marginBottom: 20,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#2d3748',
    },
    multilineInput: {
        minHeight: 80,
        textAlignVertical: 'top',
    },
    submitButton: {
        marginTop: 20,
        marginBottom: 10,
        borderRadius: 16,
        shadowColor: '#48bb78',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8,
    },
    submitButtonDisabled: {
        opacity: 0.6,
    },
    submitGradient: {
        paddingVertical: 18,
        paddingHorizontal: 24,
        borderRadius: 16,
        alignItems: 'center',
    },
    submitText: {
        fontSize: 18,
        fontWeight: '700',
        color: 'white',
    },
    requiredText: {
        fontSize: 14,
        color: '#718096',
        textAlign: 'center',
        marginTop: 10,
    },
});
