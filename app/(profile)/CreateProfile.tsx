import { Colors } from '@/constants/Colors';
import { UserProfile } from '@/constants/Entity';
import { isValidEmail, isValidPhone, isValidWebsite } from '@/constants/Validation';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { db } from '../../utils/firebaseConfig';

export default function CreateProfile() {

    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState<UserProfile>({
        name: '',
        email: '',
        phone: '',
        location: '',
        bio: '',
        website: '',
        avatar: 'https://avatar.iran.liara.run/public/92',
        joinDate: ''
    });

    const handleSubmit = async () => {
        if (!formData.name || !formData.email) {
            Alert.alert('Error', 'Please fill in at least your name and email.');
            return;
        }

        if (!isValidEmail(formData?.email)) {
            Alert.alert('Error', 'Please fill correct email.');
            return;
        }

        if (formData?.phone !== "" && !isValidPhone(formData?.phone)) {
            Alert.alert('Error', 'Please fill correct phone number.');
            return;
        }

        if (formData?.website !== "" && !isValidWebsite(formData?.website)) {
            Alert.alert('Error', 'Please fill correct website.');
            return;
        }

        setLoading(true);

        try {
            const docRef = await addDoc(collection(db, 'users'), {
                ...formData,
                joinDate: new Date(),
            });

            setFormData({
                name: '',
                email: '',
                phone: '',
                location: '',
                bio: '',
                website: '',
                avatar: 'https://avatar.iran.liara.run/public/92',
                joinDate: '',
            })

            // Alert.alert('Success', `Profile created! ID: ${docRef.id}`);

            router.push({
                pathname: '/(profile)/ProfileView/[profileId]',
                params: { profileId: docRef?.id },
            });

        } catch (error) {
            console.error('Firestore Error:', error);
            Alert.alert('Error', 'Failed to save profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={[Colors.linerGradient.from, Colors.linerGradient.to]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.header}
            >

                <View>

                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <MaterialIcons name="arrow-back" size={24} color={Colors.white} />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>Create Profile</Text>
                    <Text style={styles.headerSubtitle}>Tell us about yourself</Text>

                </View>
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

                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <MaterialIcons name='perm-identity' size={20} color={Colors.icon.color} style={styles.inputIcon} />
                            <TextInput
                                style={[styles.input]}
                                placeholder="Full Name *"
                                placeholderTextColor="#a0aec0"
                                value={formData?.name}
                                onChangeText={(text: string) => setFormData({ ...formData, name: text })}
                            />
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <MaterialIcons name='email' size={20} color={Colors.icon.color} style={styles.inputIcon} />
                            <TextInput
                                style={[styles.input, { color: isValidEmail(formData?.email) ? '#2d3748' : 'red' }]}
                                placeholder="Email Address *"
                                placeholderTextColor="#a0aec0"
                                value={formData?.email}
                                onChangeText={(text: string) => setFormData({ ...formData, email: text })}
                                keyboardType="email-address"
                            />
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <MaterialIcons name='call' size={20} color={Colors.icon.color} style={styles.inputIcon} />
                            <TextInput
                                style={[styles.input, { color: isValidPhone(formData?.phone) ? '#2d3748' : 'red' }]}
                                placeholder="Phone Number (IND)"
                                placeholderTextColor="#a0aec0"
                                value={formData?.phone}
                                onChangeText={(text: string) => setFormData({ ...formData, phone: text })}
                                keyboardType="phone-pad"
                            />
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <MaterialIcons name='location-pin' size={20} color={Colors.icon.color} style={styles.inputIcon} />
                            <TextInput
                                style={[styles.input]}
                                placeholder="Location"
                                placeholderTextColor="#a0aec0"
                                value={formData?.location}
                                onChangeText={(text: string) => setFormData({ ...formData, location: text })}
                            />
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <MaterialIcons name='web' size={20} color={Colors.icon.color} style={styles.inputIcon} />
                            <TextInput
                                style={[styles.input, { color: isValidWebsite(formData?.website) ? '#2d3748' : 'red' }]}
                                placeholder="Enter website"
                                placeholderTextColor="#a0aec0"
                                value={formData?.website}
                                onChangeText={(text: string) => setFormData({ ...formData, website: text })}
                            />
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <MaterialIcons name='assignment-ind' size={20} color={Colors.icon.color} style={styles.inputIcon} />
                            <TextInput
                                style={[styles.input]}
                                placeholder="Bio - Tell us about yourself"
                                placeholderTextColor="#a0aec0"
                                value={formData?.bio}
                                onChangeText={(text: string) => setFormData({ ...formData, bio: text })}
                                multiline={true}
                            />
                        </View>
                    </View>

                    <TouchableOpacity
                        style={[styles.submitButton, loading && styles.submitButtonDisabled]}
                        onPress={handleSubmit}
                        disabled={loading}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={[Colors.linerGradient.from, Colors.linerGradient.to]}
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
    headerContent: {
        flexDirection: 'row',
    },
    backButton: {
        justifyContent: 'flex-end',
        // padding: 5,
        marginTop: 30,
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
        marginBottom: 30
    },
});
