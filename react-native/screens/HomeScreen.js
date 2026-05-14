import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function HomeScreen({navigation}){
    return (
        <ScrollView contentContainerStyle={styles.page}>
            <Header navigation={navigation}/>
            <View style={styles.hero}>
                <Image source={require('../assets/images/portada1.png')} 
                style={styles.heroImage}
                resizeMode="cover"/>
            </View>
            <Text style={styles.title}>
                <Text style={styles.titleHighlight}>ENDERS</Text>
                {'\n'}TEAM{'\n'}BASKET
            </Text>
            <Footer navigation={navigation}/>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    page: {
        flexGrow: 1,
        backgroundColor: '#EDF2F4',
    },
    hero: {
        height: 400,
        backgroundColor: '#D90429',
        overflow: 'hidden',
        // alignItems: 'center',
        // justifyContent: 'center',
        // paddingHorizontal: 24,
        // paddingTop: 70,
        // paddingBottom: 60,
    },
    heroImage: {
        width: '100%',
        height: '100%',
        borderRadius: 0,
        borderWidth: 4,
        borderColor: 'rgba(255,255,255,0.15)',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 10 },
        elevation: 8,
    },
    title: {
        color: '#2B2D42',
        fontSize: 38,
        fontWeight: '900',
        textAlign: 'center',
        lineHeight: 42,
        textShadowColor: 'rgba(255,255,255,0.65)',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 18,
    },
    titleHighlight: {
        color: '#2B2D42',
    },
});