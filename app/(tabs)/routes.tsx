import { View, StyleSheet, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

export default function RoutesScreen() {
  // For web platform, we'll use an iframe with OpenStreetMap
  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <iframe
          src="https://www.openstreetmap.org/export/embed.html?bbox=135.7481,34.9916,135.7881,35.0316&layer=mapnik"
          style={{
            width: '100%',
            height: '100%',
            border: 'none'
          }}
          title="Map"
        />
      </View>
    );
  }

  // For native platforms, we'll use WebView with OpenStreetMap
  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: 'https://www.openstreetmap.org/export/embed.html?bbox=135.7481,34.9916,135.7881,35.0316&layer=mapnik'
        }}
        style={styles.map}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});