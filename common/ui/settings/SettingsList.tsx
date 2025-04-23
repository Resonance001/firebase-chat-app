import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import SettingsListItem from './SettingsListItem';

const settingsData = [
    'Saved Messages',
    'Recent Calls',
    'Devices',
    'Notifications',
    'Appearance',
    'Language',
    'Privacy & Security',
    'Storage',
];

const SettingsList = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={settingsData}
                renderItem={({ item, index }) => (
                    <SettingsListItem
                        label={item}
                        showDivider={index !== settingsData.length - 1}
                    />
                )}
                keyExtractor={(index) => index}
            />
        </View>
    );
};

export default SettingsList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 24,
        paddingHorizontal: 16,
    },
});
