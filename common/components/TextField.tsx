import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS } from '@/constants/Colors';
import { TYPOGRAPHY } from '@/constants/typography';

interface TextFieldProps {
    title?: string;
    value?: string;
    onChangeText?: (e: string) => void;
    placeholder?: string;
    variant?: 'empty' | 'typing' | 'filled' | 'error' | 'inactive';
    showIcon?: boolean;
}

const TextField = ({
    title,
    value = undefined,
    onChangeText,
    placeholder = undefined,
    variant = 'empty',
    showIcon = false,
}: TextFieldProps) => {
    const [isSecure, setisSecure] = useState(showIcon);

    const style = styles({ variant });

    return (
        <View style={style.container}>
            {title && <Text style={style.title}> {title} </Text>}
            <View style={style.field}>
                <TextInput
                    style={style.inputStyle}
                    defaultValue={value}
                    placeholder={placeholder}
                    placeholderTextColor={COLORS.NEUTRAL.DARK.LIGHTEST}
                    secureTextEntry={isSecure}
                    onChangeText={onChangeText}
                />
                {showIcon && (
                    <Pressable
                        onPress={() => setisSecure((isSecure) => !isSecure)}
                    >
                        <Image
                            source={require('@/assets/icons/eye-with-line.png')}
                            style={style.trailingIcon}
                        />
                    </Pressable>
                )}
            </View>
        </View>
    );
};

export default TextField;

const styles = ({
    variant,
}: {
    variant: 'empty' | 'typing' | 'filled' | 'error' | 'inactive';
}) =>
    StyleSheet.create({
        container: {
            gap: 4,
        },
        field: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'stretch',
            padding: 14,
            gap: 8,
            borderWidth: 2,
            borderRadius: 12,
            borderColor: (() => {
                switch (variant) {
                    case 'empty':
                        return COLORS.NEUTRAL.LIGHT.DARKEST;
                    case 'typing':
                        return COLORS.HIGHLIGHT.DARKEST;
                    case 'filled':
                        return COLORS.NEUTRAL.LIGHT.DARKEST;
                    case 'error':
                        return COLORS.SUPPORT.ERROR.MEDIUM;
                    case 'inactive':
                        return COLORS.NEUTRAL.LIGHT.DARKEST;
                    default:
                        return 'white';
                }
            })(),
        },
        title: {
            color: COLORS.NEUTRAL.DARK.DARK,
            ...TYPOGRAPHY.H5,
        },
        inputStyle: {
            flex: 1,
            padding: 0,
            ...TYPOGRAPHY.BODY_M,
        },
        trailingIcon: {
            height: 16,
            width: 16,
        },
    });
