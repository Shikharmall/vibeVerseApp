import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
// import { Chat } from '../App';

interface Chat {
    id: string;
    userName: string;
    userAvatar: string;
    lastMessage: string;
    timestamp: Date;
    unreadCount: number;
    isOnline: boolean;
    isTyping: boolean;
}

interface ChatListItemProps {
    chat: Chat;
    onPress: () => void;
}

export default function ChatListItem({ chat, onPress }: ChatListItemProps) {
    const formatTime = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (minutes < 1) return 'now';
        if (minutes < 60) return `${minutes}m`;
        if (hours < 24) return `${hours}h`;
        if (days < 7) return `${days}d`;
        return date.toLocaleDateString();
    };

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.avatarContainer}>
                <Image source={{ uri: chat?.userAvatar }} style={styles.avatar} />
                {/* <Text>{chat?.userAvatar}</Text> */}
                {chat.isOnline && <View style={styles.onlineIndicator} />}
            </View>

            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.userName}>{chat.userName}</Text>
                    <Text style={styles.timestamp}>{formatTime(chat.timestamp)}</Text>
                </View>

                <View style={styles.messageRow}>
                    <Text
                        style={[
                            styles.lastMessage,
                            chat.unreadCount > 0 && styles.unreadMessage,
                        ]}
                        numberOfLines={1}
                    >
                        {chat.isTyping ? 'typing...' : chat.lastMessage}
                    </Text>
                    {chat.unreadCount > 0 && (
                        <View style={styles.unreadBadge}>
                            <Text style={styles.unreadCount}>
                                {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginVertical: 2,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    avatarContainer: {
        position: 'relative',
        marginRight: 15,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#e2e8f0',
    },
    onlineIndicator: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#48bb78',
        borderWidth: 2,
        borderColor: 'white',
    },
    content: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    userName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2d3748',
    },
    timestamp: {
        fontSize: 12,
        color: '#a0aec0',
    },
    messageRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    lastMessage: {
        flex: 1,
        fontSize: 14,
        color: '#718096',
        marginRight: 10,
    },
    unreadMessage: {
        color: '#2d3748',
        fontWeight: '500',
    },
    unreadBadge: {
        backgroundColor: '#667eea',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 6,
    },
    unreadCount: {
        fontSize: 12,
        fontWeight: '600',
        color: 'white',
    },
});
