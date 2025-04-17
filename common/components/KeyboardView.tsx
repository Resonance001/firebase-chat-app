import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import React from 'react';

const KeyboardView = ({ children }: { children: React.ReactNode }) => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
            style={{ flex: 1 }}
        >
            {children}
        </KeyboardAvoidingView>
    );
};

export default KeyboardView;

const styles = StyleSheet.create({});
