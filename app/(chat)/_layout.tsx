import { Stack } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

// import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {

    return (
        <Stack>
            <Stack.Screen name="ChatScreen" options={{ headerShown: false }} />
        </Stack>
    );
}