import { Stack } from 'expo-router';

export default function AppLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: {
                    backgroundColor: 'white',
                },
            }}
        >
            <Stack.Screen name='home' />
            <Stack.Screen name='room' />
        </Stack>
    );
}
