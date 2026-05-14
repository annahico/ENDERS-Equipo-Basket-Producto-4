import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function Footer(){
    return (
        <View style={styles.footer}>
            <Image source={require('../assets/logos/logo_uoc.png')}
            style={styles.logo}
            resizeMode="contain"
            />

            <Text style={styles.footerTitle}>Universitat Oberta de Catalunya</Text>
            <Text style={styles.footerText}>
                Desarrollo Front-End con Frameworks avanzados en entornos móviles
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        minHeight: 280,
        backgroundColor: '#EDF2F4',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 28,
        paddingVertical: 40,
    },
        logo: {
        width: 80,
        height: 80,
        marginBottom: 12,
        backgroundColor: '#2B2D42', 
        padding: 10,
        borderRadius: 10,
    },
    footerTitle: {
        color: '#2B2D42',
        fontSize: 15,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 8,
    },
    footerText: {
        color: 'rgba(43,45,66,0.65)',
        fontSize: 13,
        textAlign: 'center',
        lineHeight: 18,
    },
});