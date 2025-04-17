import { StyleSheet, View } from 'react-native';
import React from 'react';
import StyledButton from '@/common/components/StyledButton';
import { useAuth } from '@/common/hooks/useAuth';
const Settings = () => {
    const { signOut } = useAuth();

    const signOutHandler = async () => {
        try {
            await signOut();
        } catch (error) {}
    };
    return (
        <View
            style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 16 }}
        >
            <StyledButton onPress={signOutHandler}>Sign Out</StyledButton>
        </View>
    );
};

export default Settings;

const styles = StyleSheet.create({});
