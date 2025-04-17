import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import KeyboardView from '@/common/components/KeyboardView';
import { getRoomId } from '@/common/utils/helper';
import { COLORS } from '@/constants/Colors';
import { TYPOGRAPHY } from '@/constants/typography';
import Toast from 'react-native-toast-message';
import { sendMessage, UsersCollection } from '@/lib/firebase-service';
import MessageList from '@/common/ui/room/MessageList';
import { useAuth } from '@/common/hooks/useAuth';
import { useGetChatMessages } from '@/common/hooks/useGetChatMessages';

const Room = () => {
    const { user } = useAuth();

    const { uid, name } =
        useLocalSearchParams<Omit<UsersCollection, 'email'>>();

    const [inputMessage, setInputMessage] = useState('');

    const currUserUid = user?.uid || '';
    let roomId = getRoomId(currUserUid, uid);

    const messages = useGetChatMessages(roomId);

    const handleSendMessage = async () => {
        try {
            sendMessage(roomId, user!, inputMessage);
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Failed to send message',
                visibilityTime: 2000,
                position: 'bottom',
            });
        } finally {
            setInputMessage('');
        }
    };

    return (
        <KeyboardView>
            <View style={styles.header}>
                <Feather
                    name='chevron-left'
                    size={20}
                    color={COLORS.HIGHLIGHT.DARKEST}
                />
                <Text style={styles.heading4}>{name}</Text>
                <View style={styles.avatarContainer}>
                    <Image // use expo image
                        source={require('@/assets/images/avatar.png')}
                        style={styles.avatar}
                    />
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, marginHorizontal: 16 }}>
                    <MessageList messages={messages} />
                </View>
                <View style={styles.searchRow}>
                    <Feather
                        name='plus'
                        size={16}
                        color={COLORS.HIGHLIGHT.DARKEST}
                        style={{ margin: 8 }}
                    />
                    <View style={styles.searchBox}>
                        <TextInput
                            value={inputMessage}
                            onChangeText={setInputMessage}
                            placeholder='Type message...'
                            style={{
                                flex: 1,
                                color: COLORS.NEUTRAL.DARK.DARKEST,
                                ...TYPOGRAPHY.BODY_M,
                            }}
                        />
                        <TouchableOpacity
                            onPress={handleSendMessage}
                            style={styles.sendIconContainer}
                        >
                            <Feather
                                name='send'
                                size={12}
                                color={COLORS.NEUTRAL.LIGHT.LIGHTEST}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardView>
    );
};

export default Room;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 56,
        paddingLeft: 24,
        paddingRight: 16,
    },
    heading4: {
        color: COLORS.NEUTRAL.DARK.DARKEST,
        ...TYPOGRAPHY.H4,
    },
    avatarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 40,
        borderRadius: 16,
        padding: 8,
        backgroundColor: COLORS.HIGHLIGHT.LIGHTEST,
        overflow: 'hidden',
    },
    avatar: {
        resizeMode: 'contain',
        marginTop: 10,
    },
    searchRow: {
        flexDirection: 'row',
        height: 72,
        padding: 16,
        gap: 6,
    },
    searchBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 71,
        paddingHorizontal: 16,
        backgroundColor: COLORS.NEUTRAL.LIGHT.LIGHT,
    },
    sendIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.HIGHLIGHT.DARKEST,
        height: 32,
        width: 32,
        borderRadius: 16,
    },
});
