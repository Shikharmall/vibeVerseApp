import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GradientButtonProps } from '@/constants/Entity';
import { Colors } from '@/constants/Colors';

export default function GradientButton({
    title,
    onPress,
    disabled = false,
    colors = ['#667eea', '#764ba2'],
    style,
    textStyle,
}: GradientButtonProps) {
    return (
        <TouchableOpacity
            style={[styles.container, style, disabled && styles.disabled]}
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.8}
        >
            <LinearGradient
                colors={[Colors.linerGradient.from, Colors.linerGradient.to]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
            >
                <Text style={[styles.text, textStyle]}>{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        shadowColor: '#667eea',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    gradient: {
        paddingVertical: 18,
        paddingHorizontal: 24,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
    },
    disabled: {
        opacity: 0.6,
    },
});
