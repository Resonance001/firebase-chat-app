import { StyleSheet, View } from 'react-native';
import React from 'react';
import { COLORS } from '@/constants/Colors';

const Divider = () => {
    return (
        <View
            style={{
                borderBottomColor: COLORS.NEUTRAL.LIGHT.DARK,
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginVertical: 8,
            }}
        />
    );
};

export default Divider;
