import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { COLORS } from '@/constants/Colors';
import StyledButton from '@/common/components/StyledButton';
import { TYPOGRAPHY } from '@/constants/typography';
import { Link, useLocalSearchParams } from 'expo-router';
import TextField from '@/common/components/TextField';
import Divider from '@/common/components/Divider';
import Logo from '@/common/components/Logo';
import { useAuth } from '@/common/hooks/useAuth';

const Login = () => {
    const { email: registeredEmail } = useLocalSearchParams<{
        email: string;
    }>();

    const [email, setEmail] = useState(registeredEmail);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { signIn } = useAuth();

    const loginHandler = async () => {
        setLoading(true);
        try {
            await signIn(email, password);
        } catch (error) {
            console.error('login handler >> ', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1, paddingHorizontal: 24 }}>
            <Image
                source={require('@/assets/images/placeholder-image.png')}
                style={{ flex: 1, width: '100%', marginTop: 16 }}
            />
            <View style={{ flex: 2, gap: 16 }}>
                <Text style={styles.headingText}> Welcome! </Text>
                <View style={styles.login}>
                    <TextField
                        placeholder='Email Address'
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextField
                        placeholder='Password'
                        onChangeText={setPassword}
                        showIcon
                    />
                    <Text style={styles.actionText}>Forgot password?</Text>
                    <StyledButton
                        onPress={loginHandler}
                        loading={loading}
                        {...styles.actionText}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </StyledButton>
                    <Text style={{ alignSelf: 'center' }}>
                        <Text
                            style={{
                                color: COLORS.NEUTRAL.DARK.LIGHT,
                                ...TYPOGRAPHY.ACTION_M,
                            }}
                        >
                            Not a member? &nbsp;
                        </Text>
                        <Link href='/sign-up'>
                            <Text style={styles.actionText}>Register now</Text>
                        </Link>
                    </Text>
                    <Divider />
                    <Text
                        style={{
                            alignSelf: 'center',
                            color: COLORS.NEUTRAL.DARK.LIGHT,
                            ...TYPOGRAPHY.BODY_S,
                        }}
                    >
                        Or continue with
                    </Text>
                    <View style={styles.logoRow}>
                        <Logo
                            imageSource={require('@/assets/images/logos/google.png')}
                            backgroundColor={COLORS.SUPPORT.ERROR.DARK}
                        />
                        <Logo
                            imageSource={require('@/assets/images/logos/apple.png')}
                            backgroundColor={COLORS.NEUTRAL.DARK.DARKEST}
                        />
                        <Logo
                            imageSource={require('@/assets/images/logos/facebook.png')}
                            backgroundColor={COLORS.HIGHLIGHT.DARKEST}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    headingText: {
        fontFamily: 'Inter_800ExtraBold',
        fontSize: 24,
        marginTop: 24,
        marginBottom: 8,
    },
    login: {
        gap: 16,
    },
    actionText: {
        color: COLORS.HIGHLIGHT.DARKEST,
        ...TYPOGRAPHY.ACTION_M,
    },
    logoRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
        marginBottom: 40,
    },
});
