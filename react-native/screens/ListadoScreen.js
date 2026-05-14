import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Platform,
} from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase.config';
import Header from '../components/Header';
import Footer from '../components/Footer';

const playerImages = {
  'assets/images/jugador1.png': require('../assets/images/jugador1.png'),
  'assets/images/jugador2.png': require('../assets/images/jugador2.png'),
  'assets/images/jugador3.png': require('../assets/images/jugador3.png'),
  'assets/images/jugador4.png': require('../assets/images/jugador4.png'),
  'assets/images/jugador5.png': require('../assets/images/jugador5.png'),
  'assets/images/jugador6.png': require('../assets/images/jugador6.png'),
  'assets/images/jugador7.png': require('../assets/images/jugador7.png'),
  'assets/images/jugador8.png': require('../assets/images/jugador8.png'),
  'assets/images/jugador9.png': require('../assets/images/jugador9.png'),
  'assets/images/jugador10.png': require('../assets/images/jugador10.png'),
};

export default function ListadoScreen({ navigation }) {
  const [players, setPlayers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [ageFilter, setAgeFilter] = useState('');

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'players'), snapshot => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPlayers(data);
    });

    return () => unsub();
  }, []);

  const filteredPlayers = useMemo(() => {
    return players.filter(player => {
      const fullName = `${player.nombre} ${player.apellidos}`.toLowerCase();
      const matchName = fullName.includes(searchText.toLowerCase());

      const matchPosition =
        positionFilter === '' || player.posicion === positionFilter;

      const maxAge = Number(ageFilter);
      const matchAge = ageFilter === '' || player.edad <= maxAge;

      return matchName && matchPosition && matchAge;
    });
  }, [players, searchText, positionFilter, ageFilter]);

  const renderPlayer = ({ item }) => {
    const imageSource = playerImages[item.foto]
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Detalle', { player: item })}
      >
        {imageSource && (
          <Image source={imageSource} style={styles.foto} />
        )}

        <View style={styles.info}>
          <Text style={styles.nombre}>
            {item.nombre} {item.apellidos}
          </Text>

          <Text style={styles.detalle}>
            <Text style={styles.bold}>Posición:</Text> {item.posicion}
          </Text>

          <Text style={styles.detalle}>
            <Text style={styles.bold}>Edad:</Text> {item.edad} años
          </Text>

          <Text style={styles.detalle}>
            <Text style={styles.bold}>Altura:</Text> {item.altura} m
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      style={[styles.list, Platform.OS === 'web' && styles.webScroll]}
      data={filteredPlayers}
      keyExtractor={item => item.id}
      renderItem={renderPlayer}
      ListHeaderComponent={
        <>
          <Header navigation={navigation} />

          <View style={styles.screenHeader}>
            <Text style={styles.title}>Plantilla del equipo Enders</Text>

            <View style={styles.filters}>
              <TextInput
                style={styles.input}
                placeholder="Buscar jugador"
                placeholderTextColor="rgba(43,45,66,0.55)"
                value={searchText}
                onChangeText={setSearchText}
              />

              <View style={styles.positionGroup}>
                {['Base', 'Escolta', 'Alero', 'Ala-Pivot', 'Pivot'].map(pos => (
                  <TouchableOpacity
                    key={pos}
                    style={[
                      styles.positionButton,
                      positionFilter === pos && styles.positionButtonActive,
                    ]}
                    onPress={() =>
                      setPositionFilter(positionFilter === pos ? '' : pos)
                    }
                  >
                    <Text
                      style={[
                        styles.positionText,
                        positionFilter === pos && styles.positionTextActive,
                      ]}
                    >
                      {pos}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TextInput
                style={styles.input}
                placeholder="Edad máxima"
                placeholderTextColor="rgba(43,45,66,0.55)"
                value={ageFilter}
                onChangeText={setAgeFilter}
                keyboardType="numeric"
              />
            </View>
          </View>
        </>
      }
      ListFooterComponent={<Footer />}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },

  webScroll: {
    height: '100vh',
    maxHeight: '100vh',
    overflowY: 'auto',
  },

  listContent: {
    flexGrow: 1,
    backgroundColor: '#D90429',
  },

  screenHeader: {
    paddingHorizontal: 18,
    paddingTop: 24,
    paddingBottom: 18,
    backgroundColor: '#D90429',
  },

  title: {
    color: '#EDF2F4',
    fontSize: 26,
    fontWeight: '900',
    lineHeight: 30,
    marginBottom: 18,
  },

  filters: {
    gap: 12,
    marginBottom: 12,
  },

  input: {
    height: 42,
    borderRadius: 14,
    backgroundColor: '#EDF2F4',
    paddingHorizontal: 14,
    color: '#2B2D42',
    fontSize: 14,
  },

  positionGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  positionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.45)',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },

  positionButtonActive: {
    backgroundColor: '#EDF2F4',
  },

  positionText: {
    color: '#EDF2F4',
    fontSize: 13,
    fontWeight: '700',
  },

  positionTextActive: {
    color: '#D90429',
  },

  card: {
  flexDirection: 'row',
  alignItems: 'center',
  marginHorizontal: 14,
  marginBottom: 14,
  borderRadius: 18,
  backgroundColor: '#F9EAED',
  overflow: 'hidden',
  borderWidth: 1,
  borderColor: 'rgba(255,255,255,0.55)',
  shadowColor: '#000',
  shadowOpacity: 0.16,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 6 },
  elevation: 4,
  },

  foto: {
    width: 112,
    height: 132,
    resizeMode: 'cover',
  },

  info: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },

  nombre: {
    color: '#2B2D42',
    fontWeight: '900',
    fontSize: 18,
    marginBottom: 8,
  },

  detalle: {
    color: 'rgba(43,45,66,0.72)',
    fontSize: 14,
    marginBottom: 4,
  },

  bold: {
    fontWeight: '900',
    color: '#2B2D42',
  },
});
