import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

export default function Header({ navigation }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <Image
          source={require('../assets/logos/logo.png')}
          style={styles.logo}
        />

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setMenuOpen(!menuOpen)}
        >
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      </View>

      {menuOpen && (
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.menuLink}>Inicio</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Listado')}>
            <Text style={styles.menuLink}>Plantilla</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.menuLink}>Noticias</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.search}
            placeholder="Buscar"
            placeholderTextColor="rgba(237,242,244,0.7)"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#2B2D42',
    paddingTop: 44,
    paddingBottom: 18,
    paddingHorizontal: 24,
  },

  headerTop: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 18,
  },

  logo: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },

  menuButton: {
    width: 42,
    height: 34,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(237,242,244,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  menuIcon: {
    color: '#EDF2F4',
    fontSize: 22,
    lineHeight: 24,
  },

  menu: {
    marginTop: 26,
    gap: 14,
  },

  menuLink: {
    color: '#EDF2F4',
    fontSize: 18,
    fontWeight: '800',
  },

  search: {
    marginTop: 8,
    height: 38,
    borderRadius: 999,
    paddingHorizontal: 14,
    color: '#EDF2F4',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
});
