import { ScrollView, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import MessageItem from './MessageItem';
import { MessagesCollection } from '@/lib/firebase-service';

const MessageList = ({ messages }: { messages: MessagesCollection[] }) => {
    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        if (messages.length > 0) {
            setTimeout(() => {
                scrollViewRef?.current?.scrollToEnd({ animated: true });
            }, 50);
        }
    }, [messages]);

    return (
        <ScrollView
            ref={scrollViewRef}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ marginTop: 8 }}
        >
            <View style={{ gap: 10 }}>
                {messages.map((message: MessagesCollection, index: number) => {
                    const showSenderName =
                        index === 0 ||
                        messages[index - 1].userId != message.userId;

                    return (
                        <MessageItem
                            message={message}
                            key={index}
                            showSenderName={showSenderName}
                        />
                    );
                })}
            </View>
        </ScrollView>
    );
};

export default MessageList;
