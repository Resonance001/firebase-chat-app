import {
    Pressable,
    StyleSheet,
    Text,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';
import React from 'react';
import { COLORS } from '@/constants/Colors';

type StyledButtonVariants = 'primary' | 'secondary' | 'tertiary';

interface StyledButtonProps extends TextStyle {
    variant?: StyledButtonVariants;
    color?: string;
    loading?: boolean;
    onPress: () => void;
    children: React.ReactNode;
    style?: ViewStyle;
}

const StyledButton = ({
    variant = 'primary',
    color = COLORS.HIGHLIGHT.DARKEST,
    onPress,
    loading = false,
    children,
    style,
    ...props
}: StyledButtonProps) => {
    const buttonStyle = styles({ variant, color });

    return (
        <View style={[buttonStyle.container, style]}>
            <Pressable onPress={onPress} disabled={loading}>
                <Text style={buttonStyle.textStyle} {...props}>
                    {children}
                </Text>
            </Pressable>
        </View>
    );
};

export default StyledButton;

const styles = ({
    variant,
    color,
}: {
    variant: StyledButtonVariants;
    color: string;
}) =>
    StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: variant === 'primary' ? color : 'white',
            ...(variant === 'secondary' && {
                borderWidth: 2,
                borderColor: color,
            }),
            borderRadius: 12,
            paddingVertical: 8,
        },
        textStyle: {
            color: variant === 'primary' ? 'white' : color,
        },
    });
