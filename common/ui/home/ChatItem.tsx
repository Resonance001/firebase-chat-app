import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { formatDate, getRoomId } from '@/common/utils/helper';
import { TYPOGRAPHY } from '@/constants/typography';
import { COLORS } from '@/constants/Colors';
import { UsersCollection } from '@/lib/firebase-service';
import { useAuth } from '@/common/hooks/useAuth';
import { useGetChatMessages } from '@/common/hooks/useGetChatMessages';

export const ChatItem = ({ item }: { item: UsersCollection }) => {
    const { user } = useAuth();

    const currUserUid = user?.uid || '';

    let roomId = getRoomId(currUserUid, item.uid);

    const messages = useGetChatMessages(roomId);
    const lastMessage = messages ? messages[messages.length - 1] : null;

    const openRoom = () => {
        const { email, ...params } = item;
        router.push({
            pathname: '/(main)/(chats)/room',
            params,
        });
    };

    const renderLastMessage = () => {
        if (!lastMessage) return 'Say Hi';

        if (currUserUid !== lastMessage?.userId) {
            return 'You: ' + lastMessage?.text;
        }
        return lastMessage?.text;
    };

    const renderTime = () => {
        if (lastMessage) {
            let date = lastMessage?.createdAt;
            return ' \u2022 ' + formatDate(new Date(date?.seconds * 1000));
        }
    };

    return (
        <TouchableOpacity onPress={openRoom} style={styles.chatItemContainer}>
            <View style={styles.avatarContainer}>
                <Image // use expo image
                    source={require('@/assets/images/avatar.png')}
                    style={styles.avatar}
                />
            </View>
            <View style={{ flex: 1, gap: 4 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.lastMessage}>
                    {renderLastMessage()}
                    {renderTime()}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    chatItemContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 72,
        gap: 16,
    },
    avatarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 40,
        borderRadius: 16,
        padding: 8,
        overflow: 'hidden',
        backgroundColor: COLORS.HIGHLIGHT.LIGHTEST,
    },
    avatar: {
        resizeMode: 'contain',
        marginTop: 10,
    },
    name: {
        color: COLORS.NEUTRAL.DARK.DARKEST,
        ...TYPOGRAPHY.H5,
    },
    lastMessage: {
        color: COLORS.NEUTRAL.DARK.LIGHT,
        ...TYPOGRAPHY.BODY_S,
    },
});
