import { TextStyle, ViewStyle } from "react-native";

export interface Chat {
    id: string;
    userName: string;
    userAvatar: string;
    lastMessage: string;
    timestamp: Date;
    unreadCount: number;
    isOnline: boolean;
    isTyping: boolean;
}

export interface ChatListItemProps {
    chat: Chat;
    onPress: () => void;
}

export interface UserProfile {
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

export interface ProfileHeaderProps {
    user: UserProfile;
    onEditPress: () => void;
}

export interface ProfileCardProps {
    profile: UserProfile;
    onPress: () => void;
    delay?: number;
}

export interface Message {
    id: string;
    text: string;
    timestamp: Date;
    isOwn: boolean;
    status: 'sending' | 'sent' | 'delivered' | 'read';
    type: 'text' | 'image' | 'voice';
    imageUrl?: string;
}

export interface MessageBubbleProps {
    message: Message;
    showAvatar: boolean;
    userAvatar: string;
}

export interface NoFoundScreenProps {
    searchQuery?: string;
    onClearSearch?: () => void;
    onRefresh?: () => void;
    onAddNew?: () => void;
    onResetFilters?: () => void;
    type?: 'search' | 'filter' | 'empty';
}

export interface FloatingActionButtonProps {
    onPress: () => void;
    icon: React.ReactNode;
}

export interface GradientButtonProps {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    colors?: string[];
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export interface TypingIndicatorProps {
    userAvatar: string;
}

export interface WavesIconBoxProps {
    width?: number;
    height?: number;
}

export interface AnimatedCardProps {
    children: React.ReactNode;
    delay?: number;
    style?: ViewStyle;
}