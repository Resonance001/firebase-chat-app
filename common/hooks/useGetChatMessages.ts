import { db } from '@/lib/firebase-config';
import { createRoom, MessagesCollection } from '@/lib/firebase-service';
import {
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

export const useGetChatMessages = (roomId: string) => {
    const [messages, setMessages] = useState<MessagesCollection[]>([]);

    useEffect(() => {
        (async () => {
            createRoom(roomId);

            const docRef = doc(db, 'rooms', roomId);
            const messagesRef = collection(docRef, 'messages');

            const q = query(messagesRef, orderBy('createdAt', 'asc'));

            let unsub = onSnapshot(q, (snapshot) => {
                if (snapshot.empty) {
                    return;
                }

                let allMessages: MessagesCollection[] = snapshot.docs.map(
                    (doc) => {
                        return doc.data() as MessagesCollection;
                    }
                );
                setMessages([...allMessages]);
            });

            return () => unsub();
        })();
    }, []);

    return messages;
};
