import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    User,
    UserCredential,
} from 'firebase/auth';
import { auth, db, usersRef } from './firebase-config';
import {
    addDoc,
    collection,
    doc,
    DocumentReference,
    DocumentSnapshot,
    getDoc,
    getDocs,
    Query,
    query,
    QuerySnapshot,
    setDoc,
    Timestamp,
    where,
} from 'firebase/firestore';

/** Firebase Auth */

export const getCurrentUser = async () => {
    try {
        return new Promise((resolve) => {
            const unsubscribe = auth.onAuthStateChanged((user) => {
                unsubscribe();
                resolve(user ? { user } : null);
            });
        });
    } catch (error) {
        throw error;
    }
};

export const login = async (
    email: string,
    password: string
): Promise<FirebaseUserResponse | undefined> => {
    try {
        const userCredential: UserCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        return { user: userCredential.user };
    } catch (error) {
        throw error;
    }
};
export const logout = async (): Promise<void> => {
    try {
        await signOut(auth);
    } catch (error) {
        throw error;
    }
};

export const register = async (
    email: string,
    password: string,
    name?: string
): Promise<FirebaseUserResponse | undefined> => {
    try {
        const userCredential: UserCredential =
            await createUserWithEmailAndPassword(auth, email, password);
        if (name) {
            await updateProfile(userCredential.user, { displayName: name });
        }
        return { user: userCredential.user };
    } catch (error) {
        throw error;
    }
};

/** Firebase Firestore */

export const getUsers = async (
    searchText?: string
): Promise<UsersCollection[]> => {
    const q: Query = searchText
        ? query(
              usersRef,
              where('name', '>=', searchText),
              where('name', '<=', searchText + '\uf8ff')
          )
        : query(usersRef);

    const querySnapshot: QuerySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => doc.data() as UsersCollection);
};

export const createRoom = async (roomId: string) => {
    const d: DocumentReference = doc(db, 'rooms', roomId);
    const docSnapshot: DocumentSnapshot = await getDoc(d);

    if (docSnapshot.exists()) {
        return;
    }

    await setDoc(d, {
        roomId,
        createdAt: Timestamp.fromDate(new Date()),
    });
};

export const sendMessage = async (
    roomId: string,
    user: User,
    message: string
) => {
    try {
        message = message.trim();

        if (!message) return;

        const docRef = doc(db, 'rooms', roomId);
        const messagesRef = collection(docRef, 'messages');

        await addDoc(messagesRef, {
            userId: user?.uid,
            text: message,
            senderName: user?.displayName,
            createdAt: Timestamp.fromDate(new Date()),
        });
    } catch (error) {
        console.error('Send message error: ', error);
        throw error;
    }
};

/** TYPES */

export interface FirebaseUserResponse {
    user: User;
}

export interface UsersCollection {
    name: string;
    email: string;
    uid: string;
}

export interface MessagesCollection {
    createdAt: Timestamp;
    senderName: string;
    text: string;
    userId: string;
}
