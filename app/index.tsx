import { ActivityIndicator, View } from 'react-native';
import React, { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { useAuth } from '@/common/hooks/useAuth';
export default function App() {
    const { user, isLoading } = useAuth();

    useEffect(() => {}, [user, isLoading]);

    if (!isLoading) {
        const path = user ? '/(main)/(chats)/home' : '/(auth)/sign-in';

        return <Redirect href={path} />;
    }

    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <ActivityIndicator size='large' />
        </View>
    );
}
