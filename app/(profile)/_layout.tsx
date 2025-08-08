import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function RootLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        />
    );
}


/*

<Stack>
    <Stack.Screen name="CreateProfile" options={{ headerShown: false }} />
     <Stack.Screen name="ProfileView/[profileId]" options={{ headerShown: false }} />
     <Stack.Screen name="ProfileCard" options={{ headerShown: false }} />
</Stack>
        
*/