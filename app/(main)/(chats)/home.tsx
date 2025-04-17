import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import React, { useState } from 'react';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { TYPOGRAPHY } from '@/constants/typography';
import { COLORS } from '@/constants/Colors';
import { ChatItem } from '@/common/ui/home/ChatItem';
import { useFetchUsers } from '@/common/hooks/useFetchUsers';

const Chats = () => {
    const [searchText, setSearchText] = useState('');
    const { users, loading, fetchUsers } = useFetchUsers(searchText);

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <Text style={styles.actionText}>Edit</Text>
                <Text style={styles.heading4}>Chats</Text>
                <Feather
                    name='edit'
                    size={20}
                    color={COLORS.HIGHLIGHT.DARKEST}
                />
            </View>
            <View style={styles.searchRow}>
                <FontAwesome name='search' size={16} />
                <TextInput
                    onChangeText={setSearchText}
                    onSubmitEditing={fetchUsers}
                    placeholder='Search'
                    style={{
                        flex: 1,
                        color: COLORS.NEUTRAL.DARK.LIGHTEST,
                        ...TYPOGRAPHY.BODY_M,
                    }}
                />
            </View>
            {loading ? (
                <ActivityIndicator style={{ flex: 1 }} />
            ) : (
                <FlatList
                    data={users}
                    keyExtractor={(item: any) => item.uid}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <ChatItem item={item} />}
                    style={{
                        marginHorizontal: 16,
                        marginVertical: 8,
                    }}
                />
            )}
        </View>
    );
};

export default Chats;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 56,
        paddingHorizontal: 24,
        overflow: 'visible',
    },
    actionText: {
        color: COLORS.HIGHLIGHT.DARKEST,
        ...TYPOGRAPHY.ACTION_M,
    },
    heading4: {
        color: COLORS.NEUTRAL.DARK.DARKEST,
        ...TYPOGRAPHY.H4,
    },
    searchRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 44,
        borderRadius: 24,
        gap: 16,
        paddingHorizontal: 16,
        marginHorizontal: 16,
        backgroundColor: COLORS.NEUTRAL.LIGHT.LIGHT,
    },
});
