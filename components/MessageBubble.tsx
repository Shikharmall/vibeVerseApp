import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface Message {
    id: string;
    text: string;
    timestamp: Date;
    isOwn: boolean;
    status: 'sending' | 'sent' | 'delivered' | 'read';
    type: 'text' | 'image' | 'voice';
    imageUrl?: string;
}

interface MessageBubbleProps {
    message: Message;
    showAvatar: boolean;
    userAvatar: string;
}

export default function MessageBubble({ message, showAvatar, userAvatar }: MessageBubbleProps) {
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    };

    const getStatusIcon = () => {
        switch (message.status) {
            case 'sending':
                return <View style={styles.sendingIndicator} />;
            case 'sent':
                return <MaterialIcons name="check" size={14} color="#a0aec0" />;
            case 'delivered':
                return <MaterialIcons name="done-all" size={14} color="#a0aec0" />;
            case 'read':
                return <MaterialIcons name="done-all" size={14} color="#a0aec0" />;
            default:
                return null;
        }
    };


    // const getStatusIcon = () => {
    //     switch (message.status) {
    //         case 'sending':
    //             return <View style={styles.sendingIndicator} />;
    //         case 'sent':
    //             return <Check size={14} color="#a0aec0" />;
    //         case 'delivered':
    //             return <CheckCheck size={14} color="#a0aec0" />;
    //         case 'read':
    //             return <CheckCheck size={14} color="#667eea" />;
    //         default:
    //             return null;
    //     }
    // };

    return (
        <View style={[styles.container, message.isOwn && styles.ownContainer]}>
            {!message.isOwn && showAvatar && (
                <Image source={{ uri: userAvatar }} style={styles.avatar} />
            )}

            {!message.isOwn && !showAvatar && <View style={styles.avatarSpacer} />}

            <View style={[styles.bubble, message.isOwn && styles.ownBubble]}>
                {message.isOwn ? (
                    <LinearGradient
                        // colors={['#667eea', '#764ba2']}

                        colors={['#e145a2', '#9834e4']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.gradientBubble}
                    >
                        <Text style={styles.ownMessageText}>{message.text}</Text>
                        <View style={styles.messageFooter}>
                            <Text style={styles.ownTimestamp}>{formatTime(message.timestamp)}</Text>
                            {getStatusIcon()}
                        </View>
                    </LinearGradient>
                ) : (
                    <View style={styles.receivedBubble}>
                        <Text style={styles.receivedMessageText}>{message.text}</Text>
                        <Text style={styles.receivedTimestamp}>{formatTime(message.timestamp)}</Text>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 2,
        alignItems: 'flex-end',
    },
    ownContainer: {
        justifyContent: 'flex-end',
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 8,
        marginBottom: 4,
    },
    avatarSpacer: {
        width: 38,
    },
    bubble: {
        maxWidth: '75%',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    ownBubble: {
        alignSelf: 'flex-end',
    },
    gradientBubble: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 20,
    },
    receivedBubble: {
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 20,
        borderBottomLeftRadius: 4,
    },
    ownMessageText: {
        fontSize: 16,
        color: 'white',
        lineHeight: 20,
    },
    receivedMessageText: {
        fontSize: 16,
        color: '#2d3748',
        lineHeight: 20,
    },
    messageFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 4,
    },
    ownTimestamp: {
        fontSize: 11,
        color: 'rgba(255, 255, 255, 0.8)',
        marginRight: 4,
    },
    receivedTimestamp: {
        fontSize: 11,
        color: '#a0aec0',
        marginTop: 4,
        alignSelf: 'flex-end',
    },
    sendingIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
    },
});
