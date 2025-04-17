import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Checkbox from '@/common/components/Checkbox';
import { TYPOGRAPHY } from '@/constants/typography';
import { COLORS } from '@/constants/Colors';
import TextField from '@/common/components/TextField';
import StyledButton from '@/common/components/StyledButton';
import { router } from 'expo-router';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase-config';
import { deleteUser } from 'firebase/auth';
import Toast from 'react-native-toast-message';
import { useAuth } from '@/common/hooks/useAuth';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [name, setName] = useState('');
    const [focused, setFocused] = useState(false);
    const [loading, setLoading] = useState(false);

    const { signUp } = useAuth();

    const validateForm = () => {
        if (!email || !password || !name) {
            return 'Please fill up all the fields';
        }
        if (password !== confirmedPassword) {
            return 'Passwords do not match';
        }

        if (!focused) {
            return 'Please read and agree to the Terms and Conditions';
        }
        return null;
    };

    const registrationHandler = async () => {
        setLoading(true);

        try {
            const validationError = validateForm();

            if (validationError) {
                Toast.show({
                    type: 'error',
                    text1: validationError,
                    visibilityTime: 2000,
                    position: 'bottom',
                });
                return;
            }

            const user = await signUp(email, password, name);

            if (user) {
                const uid = user.uid;
                try {
                    await setDoc(doc(db, 'users', uid), {
                        email,
                        name,
                        uid,
                    });

                    router.replace({
                        pathname: '/sign-in',
                        params: {
                            email: email,
                        },
                    });
                } catch (error) {
                    console.error('Firestore write error: ', error);
                    await deleteUser(user);
                }
            }
        } catch (error) {
            console.error('Registration handler error: ', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.headerView}>
            <View style={{ gap: 8 }}>
                <Text style={styles.heading3}> Sign up</Text>
                <Text style={styles.bodySmallText}>
                    Create an account to get started
                </Text>
            </View>
            <View style={styles.signUpForm}>
                <TextField
                    title='Name'
                    placeholder='Firstname Lastname'
                    onChangeText={setName}
                />
                <TextField
                    title='Email Address'
                    placeholder='name@email.com'
                    onChangeText={setEmail}
                />
                <TextField
                    title='Password'
                    placeholder='Create a password'
                    onChangeText={setPassword}
                    showIcon={true}
                />
                <TextField
                    placeholder='Confirm password'
                    onChangeText={setConfirmedPassword}
                    showIcon={true}
                />
            </View>
            <View style={styles.termsAndConditions}>
                <Checkbox focused={focused} setFocused={setFocused} />
                <Text style={{ flex: 1, flexWrap: 'wrap' }} numberOfLines={2}>
                    <Text style={styles.bodySmallText}>
                        I've read and agree with the&nbsp;
                    </Text>
                    <Text style={styles.actionText}>
                        Terms and Conditions&nbsp;
                    </Text>
                    <Text style={styles.bodySmallText}>and the&nbsp;</Text>
                    <Text style={styles.actionText}>Privacy Policy </Text>
                </Text>
            </View>
            <StyledButton onPress={registrationHandler} loading={loading}>
                {loading ? 'Signing up...' : 'Sign Up'}
            </StyledButton>
        </View>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    headerView: {
        flex: 1,
        marginTop: 24,
        gap: 24,
        paddingHorizontal: 24,
    },
    signUpForm: {
        gap: 16,
    },
    termsAndConditions: {
        flexDirection: 'row',
        width: '100%',
        gap: 12,
    },
    heading3: {
        color: COLORS.NEUTRAL.DARK.DARKEST,
        ...TYPOGRAPHY.H3,
    },
    heading5: {
        color: COLORS.NEUTRAL.DARK.DARK,
        ...TYPOGRAPHY.H5,
    },
    bodySmallText: {
        color: COLORS.NEUTRAL.DARK.LIGHT,
        ...TYPOGRAPHY.BODY_S,
    },
    actionText: {
        color: COLORS.HIGHLIGHT.DARKEST,
        ...TYPOGRAPHY.ACTION_M,
    },
});
