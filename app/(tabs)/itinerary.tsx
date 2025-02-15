import { View, Text, StyleSheet } from 'react-native';

export default function ItineraryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Past Itinerary</Text>
      <Text>This is where you'll see your past trips visualized on a map.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
