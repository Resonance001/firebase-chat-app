import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS } from '@/constants/Colors';
import { TYPOGRAPHY } from '@/constants/typography';
import { useAuth } from '@/common/hooks/useAuth';
import { MessagesCollection } from '@/lib/firebase-service';

interface MessageItemProps {
    message: MessagesCollection;
    showSenderName: boolean;
}

const MessageItem = ({ message, showSenderName }: MessageItemProps) => {
    const { user } = useAuth();

    const isMyMessage = user?.uid === message.userId;
    const style = styles(isMyMessage);

    return (
        <View style={style.messageItemContainer}>
            {showSenderName && (
                <Text style={style.senderName}>{message.senderName}</Text>
            )}
            <Text style={style.message}>{message.text}</Text>
        </View>
    );
};

export default MessageItem;

const styles = (isMyMessage: boolean) =>
    StyleSheet.create({
        messageItemContainer: {
            alignSelf: isMyMessage ? 'flex-end' : 'flex-start',
            maxWidth: '80%',
            paddingVertical: 12,
            paddingHorizontal: 16,
            gap: 4,
            borderRadius: 20,
            backgroundColor: isMyMessage
                ? COLORS.HIGHLIGHT.DARKEST
                : COLORS.NEUTRAL.LIGHT.LIGHT,
        },
        senderName: {
            color: isMyMessage
                ? COLORS.HIGHLIGHT.LIGHT
                : COLORS.NEUTRAL.DARK.LIGHT,
            ...TYPOGRAPHY.H5,
        },
        message: {
            color: isMyMessage
                ? COLORS.NEUTRAL.LIGHT.LIGHTEST
                : COLORS.NEUTRAL.DARK.DARKEST,
            ...TYPOGRAPHY.BODY_M,
        },
    });
