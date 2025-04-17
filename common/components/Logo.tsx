import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';
import React from 'react';

interface LogoProps {
    imageSource: ImageSourcePropType;
    backgroundColor: string;
}

const Logo = ({ imageSource, backgroundColor }: LogoProps) => {
    return (
        <View style={[styles.logoContainer, { backgroundColor }]}>
            <Image source={imageSource} style={styles.logoImage} />
        </View>
    );
};

export default Logo;

const styles = StyleSheet.create({
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 40,
        borderRadius: 20,
        padding: 16,
    },
    logoImage: {
        height: 12,
        width: 12,
    },
});
