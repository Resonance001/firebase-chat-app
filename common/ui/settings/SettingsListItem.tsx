import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Divider from '@/common/components/Divider';
import { COLORS } from '@/constants/Colors';
import { TYPOGRAPHY } from '@/constants/typography';
import { Ionicons } from '@expo/vector-icons';

interface SettingsListItemProps {
    label: string;
    showDivider?: boolean;
    onPress?: () => void;
}

const SettingsListItem = ({
    label,
    showDivider = false,
    onPress,
}: SettingsListItemProps) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <Text style={styles.label}> {label} </Text>
                <Ionicons
                    name='chevron-forward'
                    size={12}
                    color={COLORS.NEUTRAL.LIGHT.DARKEST}
                />
            </View>
            {showDivider && <Divider />}
        </TouchableOpacity>
    );
};

export default SettingsListItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
    },
    label: {
        color: COLORS.NEUTRAL.DARK.DARKEST,
        ...TYPOGRAPHY.BODY_M,
    },
});
