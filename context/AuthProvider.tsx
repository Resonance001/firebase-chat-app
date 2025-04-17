import { firebaseAuthErrors } from '@/constants/firebaseAuthErrors';
import { auth } from '@/lib/firebase-config';
import { login, logout, register } from '@/lib/firebase-service';
import { FirebaseError } from 'firebase/app';
import { onAuthStateChanged, User } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';

interface AuthContextType {
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (
        email: string,
        password: string,
        name?: string
    ) => Promise<User | undefined>;
    signOut: () => Promise<void>;
    user: User | null;
    isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
    signIn: async () => {},
    signUp: async () => undefined,
    signOut: async () => {},
    isLoading: true,
    user: null,
});

export const AuthProvider = (props: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signIn = async (email: string, password: string) => {
        try {
            const response = await login(email, password);

            if (response?.user) {
                router.replace('/(main)/(chats)/home');
            }
        } catch (error) {
            let message = '';
            if (error instanceof FirebaseError) {
                message = firebaseAuthErrors[error.code] || 'Error encountered';
            }

            Toast.show({
                type: 'error',
                text1: message,
                visibilityTime: 2000,
                position: 'bottom',
            });
        }
    };

    const signUp = async (email: string, password: string, name?: string) => {
        try {
            const response = await register(email, password, name);
            return response?.user;
        } catch (error) {
            let message = '';
            if (error instanceof FirebaseError) {
                message = firebaseAuthErrors[error.code] || 'Error encountered';
            }

            Toast.show({
                type: 'error',
                text1: message,
                visibilityTime: 2000,
                position: 'bottom',
            });
            return undefined;
        }
    };

    const signOut = async () => {
        try {
            await logout().then(() => {
                setUser(null);
                router.replace('/sign-in');
            });
        } catch (error) {
            let message = '';
            if (error instanceof FirebaseError) {
                message = firebaseAuthErrors[error.code] || 'Error encountered';
            }

            Toast.show({
                type: 'error',
                text1: message,
                visibilityTime: 2000,
                position: 'bottom',
            });
        }
    };

    return (
        <AuthContext.Provider
            value={{
                signIn,
                signUp,
                signOut,
                user,
                isLoading,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};
