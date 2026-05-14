import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";

const videosLocales = {
  'assets/videos/jugador1/video1.mp4': require('../assets/videos/jugador1/video1.mp4'),
  'assets/videos/jugador2/video1.mp4': require('../assets/videos/jugador2/video1.mp4'),
  'assets/videos/jugador3/video1.mp4': require('../assets/videos/jugador3/video1.mp4'),
  'assets/videos/jugador4/video1.mp4': require('../assets/videos/jugador4/video1.mp4'),
  'assets/videos/jugador5/video1.mp4': require('../assets/videos/jugador5/video1.mp4'),
};

export default function MultimediaScreen({ route, navigation }) {
  const { player: jugador, videoIndex = 0 } = route.params || {};
  const [indiceActual, setIndiceActual] = useState(route.params?.videoIndex ?? 0);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [silenciado, setSilenciado] = useState(false);
  const videos = jugador?.videos || [];
  const videoActual = videos[indiceActual];
  const fuenteVideoActual =
    videosLocales[videoActual] || (typeof videoActual === 'string' && videoActual.startsWith('http')
      ? videoActual
      : null);
  const reproductor = useVideoPlayer(fuenteVideoActual, video => {
    video.loop = false;
  });

  useEffect(() => {
    setIndiceActual(videoIndex);
  }, [videoIndex, jugador?.id]);

  useEffect(() => {
    setReproduciendo(false);
  }, [indiceActual]);

  useEffect(() => {
    reproductor.muted = silenciado;
  }, [silenciado, reproductor]);

  if (!jugador) {
    return (
      <View style={styles.container}>
        <Text style={{ color: '#fff', textAlign: 'center', marginTop: 40 }}>
          No se ha seleccionado ningún jugador.
        </Text>
        <TouchableOpacity style={styles.botonSecundario} onPress={() => navigation.navigate('Listado')}>
          <Text style={styles.textoSecundario}>Volver al listado</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const reproducirPausar = () => {
    if (!fuenteVideoActual) return;
    if (reproduciendo) {
      reproductor.pause();
    } else {
      reproductor.play();
    }
    setReproduciendo(valorAnterior => !valorAnterior);
  };

  const videoAnterior = () => {
    if (indiceActual > 0) setIndiceActual(indiceActual - 1);
  };

  const videoSiguiente = () => {
    if (indiceActual < videos.length - 1) setIndiceActual(indiceActual + 1);
  };

  const cambiarSonido = () => {
    setSilenciado(valorAnterior => !valorAnterior);
  };

  const reiniciarVideo = () => {
    if (!fuenteVideoActual) return;
    reproductor.replay();
    reproductor.play();
    setReproduciendo(true);
  };

  return (
    <ScrollView
      style={[styles.container, Platform.OS === 'web' && styles.webScroll]}
      contentContainerStyle={styles.content}
    >

      <Text style={styles.titulo}>Highlights</Text>
      <Text style={styles.jugador}>{jugador.nombre} {jugador.apellidos}</Text>
      <Text style={styles.contador}>Vídeo {indiceActual + 1} de {videos.length}</Text>

      <View style={styles.reproductorContainer}>
        {fuenteVideoActual ? (
          <VideoView
            key={indiceActual}
            player={reproductor}
            style={styles.video}
            contentFit="contain"
            nativeControls
          />
        ) : (
          <View style={styles.sinVideo}>
            <Text style={styles.sinVideoTexto}>Vídeo no disponible</Text>
          </View>
        )}
      </View>

      <View style={styles.botonesGrid}>

        <TouchableOpacity
          style={[styles.boton, indiceActual === 0 && styles.botonDesactivado]}
          onPress={videoAnterior}
          disabled={indiceActual === 0}
        >
          <Text style={styles.textoBoton}>⏮ Anterior</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.boton, styles.botonPrincipal]} onPress={reproducirPausar}>
          <Text style={styles.textoBoton}>{reproduciendo ? '⏸ Pausar' : '▶ Reproducir'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.boton, indiceActual === videos.length - 1 && styles.botonDesactivado]}
          onPress={videoSiguiente}
          disabled={indiceActual === videos.length - 1}
        >
          <Text style={styles.textoBoton}>Siguiente ⏭</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boton} onPress={reiniciarVideo}>
          <Text style={styles.textoBoton}>↺ Reiniciar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boton} onPress={cambiarSonido}>
          <Text style={styles.textoBoton}>{silenciado ? '🔊 Sonido' : '🔇 Silenciar'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botonSecundario} onPress={() => navigation.navigate('Listado')}>
          <Text style={styles.textoSecundario}>Volver al inicio</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#1a1a2e' 
  },
  webScroll: { 
    height: '100vh', 
    maxHeight: '100vh', 
    overflowY: 'auto' 
  },
  content: { 
    flexGrow: 1, 
    padding: 16, 
    paddingBottom: 40 
  },
  titulo: { 
    color: '#e94560', 
    fontSize: 28, 
    fontWeight: '900', 
    textAlign: 'center', 
    marginTop: 10 
  },
  jugador: { 
    color: '#fff', 
    fontSize: 16, 
    textAlign: 'center', 
    marginTop: 4 
  },
  contador: { 
    color: '#aaa', 
    fontSize: 13, 
    textAlign: 'center', 
    marginTop: 2, 
    marginBottom: 12 
  },
  reproductorContainer: { 
    width: '100%', 
    height: 220, 
    backgroundColor: '#000', 
    borderRadius: 12, 
    overflow: 'hidden', 
    marginBottom: 16 
  },
  video: { 
    width: '100%', 
    height: '100%' 
  },
  sinVideo: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  sinVideoTexto: { 
    color: '#aaa', 
    fontSize: 14 
  },
  botonesGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 10, 
    justifyContent: 'center' 
  },
  boton: { 
    backgroundColor: '#16213e', 
    borderWidth: 1, 
    borderColor: '#e94560', 
    paddingVertical: 12, 
    paddingHorizontal: 16, 
    borderRadius: 10 
  },
  botonPrincipal: { 
    backgroundColor: '#e94560' 
  },
  botonDesactivado: { 
    opacity: 0.3 
  },
  textoBoton: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 13 
  },
  botonSecundario: { 
    borderWidth: 1, 
    borderColor: '#aaa', 
    paddingVertical: 12, 
    paddingHorizontal: 16, 
    borderRadius: 10 
  },
  textoSecundario: { 
    color: '#aaa', 
    fontWeight: 'bold' 
  },
});
