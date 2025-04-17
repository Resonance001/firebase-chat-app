import { Pressable, StyleSheet, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import React from 'react';
import { COLORS } from '@/constants/Colors';

interface CheckboxProps {
    focused: boolean;
    setFocused: React.Dispatch<React.SetStateAction<boolean>>;
}

const Checkbox = ({ focused, setFocused }: CheckboxProps) => {
    const style = styles(focused);
    return (
        <View style={style.container}>
            <Pressable
                style={style.pressable}
                onPress={() => setFocused(!focused)}
            >
                <Icon name='check' style={{ color: 'white' }} />
            </Pressable>
        </View>
    );
};

export default Checkbox;

const styles = (focused: boolean) =>
    StyleSheet.create({
        container: {
            height: 24,
            width: 24,
            backgroundColor: focused ? COLORS.HIGHLIGHT.DARKEST : 'transparent',
            borderRadius: 8,
            borderWidth: !focused ? 2 : 0,
            borderColor: !focused ? COLORS.NEUTRAL.LIGHT.DARKEST : undefined,
        },
        pressable: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
    });
