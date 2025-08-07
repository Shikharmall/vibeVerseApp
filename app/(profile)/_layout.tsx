import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="ProfileForm" options={{ headerShown: false }} />
            <Stack.Screen name="ProfileView" options={{ headerShown: false }} />
            <Stack.Screen name="ProfileCard" options={{ headerShown: false }} />
        </Stack>
    );
}