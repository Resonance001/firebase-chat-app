import { Pressable, StyleSheet, Text, TextStyle, View } from 'react-native';
import React from 'react';
import { COLORS } from '@/constants/Colors';

type StyledButtonVariants = 'primary' | 'secondary' | 'tertiary';

interface StyledButtonProps extends TextStyle {
    variant?: StyledButtonVariants;
    color?: string;
    loading?: boolean;
    onPress: () => void;
    children: React.ReactNode;
}

const StyledButton = ({
    variant = 'primary',
    color = COLORS.HIGHLIGHT.DARKEST,
    onPress,
    loading = false,
    children,
    ...props
}: StyledButtonProps) => {
    const style = styles({ variant, color });

    return (
        <View style={style.container}>
            <Pressable onPress={onPress} disabled={loading}>
                <Text style={style.textStyle} {...props}>
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
