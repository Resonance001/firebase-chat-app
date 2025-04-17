import { AuthProvider } from '@/context/AuthProvider';
import { Slot, SplashScreen } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import {
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
    useFonts,
} from '@expo-google-fonts/inter';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
    const [appIsReady, setAppIsReady] = useState(false);

    const [fontsLoaded, fontsError] = useFonts({
        Inter_100Thin,
        Inter_200ExtraLight,
        Inter_300Light,
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
        Inter_700Bold,
        Inter_800ExtraBold,
        Inter_900Black,
    });

    useEffect(() => {
        async function prepare() {
            try {
                await new Promise((resolve) => setTimeout(resolve, 1000));
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(() => {
        if (appIsReady && fontsLoaded) {
            SplashScreen.hide();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return (
        <AuthProvider>
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: 'white',
                }}
                onLayout={onLayoutRootView}
            >
                <Slot />
                <Toast />
            </SafeAreaView>
        </AuthProvider>
    );
}
