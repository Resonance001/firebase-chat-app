import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS } from '@/constants/Colors';
import { TYPOGRAPHY } from '@/constants/typography';
import { useAuth } from '@/common/hooks/useAuth';

const Profile = () => {
    const { user } = useAuth();

    return (
        <View style={styles.container}>
            <View style={styles.avatarContainer}>
                <Image // use expo image
                    source={require('@/assets/images/avatar.png')}
                    style={styles.avatar}
                />
            </View>

            <Text style={styles.name}> {user?.displayName} </Text>
            <Text style={styles.handle}>
                @{user?.displayName?.split(' ').join('').toLowerCase()}
            </Text>
        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: 8,
    },
    avatarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        width: 80,
        borderRadius: 32,
        overflow: 'hidden',
        backgroundColor: COLORS.HIGHLIGHT.LIGHTEST,
        marginBottom: 16,
    },
    avatar: {
        flex: 1,
        height: 98,
        width: 60,
        resizeMode: 'contain',
        marginTop: 12,
    },
    name: {
        color: COLORS.NEUTRAL.DARK.DARKEST,
        ...TYPOGRAPHY.H3,
    },
    handle: {
        color: COLORS.NEUTRAL.DARK.LIGHT,
        ...TYPOGRAPHY.BODY_S,
    },
});
