import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MessageBubble from '../../components/MessageBubble';
import TypingIndicator from '../../components/TypingIndicator';
import WavesIconBox from '@/components/ui/WavesIconBox';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Message } from '@/constants/Entity';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const mockMessages: Message[] = [
    {
        id: '1',
        text: 'Hey! How are you doing today?',
        timestamp: new Date(Date.now() - 60 * 60 * 1000),
        isOwn: false,
        status: 'read',
        type: 'text',
    },
    {
        id: '2',
        text: "I'm doing great! Just finished a big project at work 🎉",
        timestamp: new Date(Date.now() - 55 * 60 * 1000),
        isOwn: true,
        status: 'read',
        type: 'text',
    },
    {
        id: '3',
        text: 'That sounds amazing! What kind of project was it?',
        timestamp: new Date(Date.now() - 50 * 60 * 1000),
        isOwn: false,
        status: 'read',
        type: 'text',
    },
    {
        id: '4',
        text: 'It was a mobile app redesign. Took us 3 months but the results are incredible!',
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        isOwn: true,
        status: 'read',
        type: 'text',
    },
    {
        id: '5',
        text: 'I would love to see it sometime! 😊',
        timestamp: new Date(Date.now() - 40 * 60 * 1000),
        isOwn: false,
        status: 'read',
        type: 'text',
    },
    {
        id: '6',
        text: 'I can show you the demo next time we meet',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        isOwn: true,
        status: 'delivered',
        type: 'text',
    },
];

export default function ChatScreen() {
    const [messages, setMessages] = useState<Message[]>(mockMessages);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const navigation = useNavigation();
    const flatListRef = useRef<FlatList>(null);

    const userAvatar = 'https://avatar.iran.liara.run/public/8';

    useEffect(() => {
        // Simulate typing indicator
        const timer = setTimeout(() => {
            setIsTyping(true);
            setTimeout(() => setIsTyping(false), 3000);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const sendMessage = () => {
        if (inputText.trim()) {
            const newMessage: Message = {
                id: Date.now().toString(),
                text: inputText.trim(),
                timestamp: new Date(),
                isOwn: true,
                status: 'sending',
                type: 'text',
            };

            setMessages(prev => [...prev, newMessage]);
            setInputText('');

            // Simulate message status updates
            setTimeout(() => {
                setMessages(prev =>
                    prev.map(msg =>
                        msg.id === newMessage.id ? { ...msg, status: 'sent' } : msg
                    )
                );
            }, 1000);

            setTimeout(() => {
                setMessages(prev =>
                    prev.map(msg =>
                        msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
                    )
                );
            }, 2000);
            
        }
    };

    const renderMessage = ({ item, index }: { item: Message; index: number }) => {
        const previousMessage = index > 0 ? messages[index - 1] : null;
        const showAvatar = !item.isOwn && (!previousMessage || previousMessage.isOwn);

        return (
            <MessageBubble
                message={item}
                showAvatar={showAvatar}
                userAvatar={userAvatar}
            />
        );
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <LinearGradient
                    colors={[Colors.linerGradient.from, Colors.linerGradient.to]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.header}
                >
                    <View style={styles.headerContent}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}
                        >
                            <MaterialIcons name="arrow-back" size={24} color={Colors.white} />
                        </TouchableOpacity>


                        <View style={styles.userInfo}>
                            <WavesIconBox width={50} height={50} svgWidth={25} svgHeight={25} />
                            <View style={styles.userDetails}>
                                <Text style={styles.userStatus}>
                                    Chat with
                                </Text>
                                <Text style={styles.userName}>Alex</Text>
                            </View>
                        </View>

                        <View style={styles.headerActions}>
                            <TouchableOpacity style={styles.actionButton}>
                                <MaterialIcons name="call" size={30} color={Colors.white} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>

                <KeyboardAvoidingView
                    style={styles.chatContainer}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
                >
                    <FlatList
                        ref={flatListRef}
                        data={messages}
                        keyExtractor={(item) => item.id}
                        renderItem={renderMessage}
                        style={styles.messagesList}
                        contentContainerStyle={styles.messagesContainer}
                        showsVerticalScrollIndicator={false}
                        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
                    />

                    {isTyping && <TypingIndicator userAvatar={userAvatar} />}

                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <TouchableOpacity style={styles.attachButton}>
                                <MaterialCommunityIcons name="paperclip" size={24} color="#555" />
                            </TouchableOpacity>

                            <TextInput
                                style={styles.textInput}
                                value={inputText}
                                onChangeText={setInputText}
                                placeholder="Type a message..."
                                placeholderTextColor="#a0aec0"
                                multiline
                                maxLength={1000}
                            />

                            <TouchableOpacity style={styles.emojiButton}>
                                <MaterialCommunityIcons name="emoticon-happy-outline" size={25} color="#667eea" />
                            </TouchableOpacity>
                        </View>
                        <LinearGradient
                            colors={[Colors.linerGradient.from, Colors.linerGradient.to]}
                            style={[
                                styles.sendButton,
                                inputText.trim() && styles.sendButtonActive,
                            ]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <TouchableOpacity
                                style={[styles.sendButton, inputText.trim() && styles.sendButtonActive]}
                                onPress={sendMessage}
                                disabled={!inputText.trim()}
                                activeOpacity={0.8}
                            >
                                <MaterialIcons name="send" size={20} color={Colors.white} />
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor,
        paddingBottom: 50,
    },
    header: {
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: 15,
    },
    userInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    userDetails: {
        flex: 1,
    },
    userName: {
        fontSize: 20,
        fontWeight: '700',
        color: 'white',
    },
    userStatus: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        marginTop: 2,
    },
    headerActions: {
        flexDirection: 'row',
    },
    actionButton: {
        padding: 5,
    },
    chatContainer: {
        flex: 1,
    },
    messagesList: {
        flex: 1,
    },
    messagesContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
    },
    inputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        backgroundColor: '#f7fafc',
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginRight: 10,
    },
    attachButton: {
        marginRight: 10,
        padding: 5,
        transform: [{ rotate: '45deg' }]
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        color: '#2d3748',
        maxHeight: 100,
        paddingVertical: 5,
    },
    emojiButton: {
        marginLeft: 10,
        padding: 5,
    },
    sendButton: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        //backgroundColor: '#f142abff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButtonActive: {
        // backgroundColor: '#667eea',
        // shadowColor: '#667eea',
        // shadowOffset: { width: 0, height: 4 },
        // shadowOpacity: 0.3,
        // shadowRadius: 8,
        // elevation: 6,
    },
});
