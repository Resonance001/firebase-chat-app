import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TYPOGRAPHY } from '@/constants/typography';
import { COLORS } from '@/constants/Colors';
import SettingsList from '@/common/ui/settings/SettingsList';
import Profile from '@/common/ui/settings/Profile';

const Settings = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}> Settings </Text>
            <Profile />
            <SettingsList />
        </View>
    );
};

export default Settings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        paddingBottom: 16,
    },
    header: {
        alignSelf: 'center',
        paddingVertical: 20,
        color: COLORS.NEUTRAL.DARK.DARKEST,
        ...TYPOGRAPHY.H4,
    },
});
