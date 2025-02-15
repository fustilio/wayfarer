import { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, Pressable, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function RouteDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [newPoi, setNewPoi] = useState('');
  const [editingPoiId, setEditingPoiId] = useState<string | null>(null);
  const [editedPoiText, setEditedPoiText] = useState('');

  // Mock curatedRoutes data (replace with actual data fetching)
  const [curatedRoutes, setCuratedRoutes] = useState([
    {
      id: '1',
      title: 'Historical Kyoto',
      description: "Explore Kyoto's most iconic temples and shrines.",
      duration: 'Full-day',
      image: 'https://images.unsplash.com/photo-1557330311-99d2c80536ca',
      pois: [
        'Kinkaku-ji (Golden Pavilion)',
        'Fushimi Inari Shrine',
        'Kiyomizu-dera Temple',
      ],
      coordinates: [
        { latitude: 34.9916, longitude: 135.7481 }, // Example coordinates for Kinkaku-ji
        { latitude: 34.9670, longitude: 135.7684 }, // Example coordinates for Fushimi Inari Shrine
        { latitude: 34.9851, longitude: 135.7856 }, // Example coordinates for Kiyomizu-dera Temple
      ],
    },
    {
      id: '2',
      title: "Barcelona's Modernist Architecture",
      description: 'Discover the architectural wonders of Antoni Gaudí.',
      duration: 'Full-day',
      image: 'https://images.unsplash.com/photo-1560184845-78c0849ada71',
      pois: [
        'Sagrada Familia',
        'Park Güell',
        'Casa Batlló',
      ],
      coordinates: [
        { latitude: 41.4036, longitude: 2.1744 }, // Example coordinates for Sagrada Familia
        { latitude: 41.4148, longitude: 2.1544 }, // Example coordinates for Park Güell
        { latitude: 41.3919, longitude: 2.1640 }, // Example coordinates for Casa Batlló
      ],
    },
  ]);

  // Find the selected route based on the id
  const route = curatedRoutes.find((route) => route.id === id);

  if (!route) {
    return (
      <View style={styles.container}>
        <Text>Route not found</Text>
      </View>
    );
  }

  const handleAddPoi = () => {
    if (newPoi) {
      const updatedRoutes = curatedRoutes.map((r) =>
        r.id === id ? { ...r, pois: [...r.pois, newPoi] } : r
      );
      setCuratedRoutes(updatedRoutes);
      setNewPoi('');
    }
  };

  const handleEditPoi = (poiId: string, poiText: string) => {
    setEditingPoiId(poiId);
    setEditedPoiText(poiText);
  };

  const handleSavePoi = (index: number) => {
    const updatedRoutes = curatedRoutes.map((r) =>
      r.id === id
        ? {
            ...r,
            pois: r.pois.map((poi, i) => (i === index ? editedPoiText : poi)),
          }
        : r
    );
    setCuratedRoutes(updatedRoutes);
    setEditingPoiId(null);
    setEditedPoiText('');
  };

  const handleDeletePoi = (index: number) => {
    Alert.alert(
      'Delete POI',
      'Are you sure you want to delete this point of interest?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            const updatedRoutes = curatedRoutes.map((r) =>
              r.id === id ? { ...r, pois: r.pois.filter((_, i) => i !== index) } : r
            );
            setCuratedRoutes(updatedRoutes);
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: route.image }} style={styles.routeImage} />
      <View style={styles.routeInfo}>
        <Text style={styles.routeTitle}>{route.title}</Text>
        <Text style={styles.routeDescription}>{route.description}</Text>
        <Text style={styles.routeDuration}>Duration: {route.duration}</Text>
        <Text style={styles.routePoisTitle}>Points of Interest:</Text>

        {route.pois.map((poi, index) => (
          <View key={index} style={styles.poiItem}>
            {editingPoiId === String(index) ? (
              <TextInput
                style={styles.editPoiInput}
                value={editedPoiText}
                onChangeText={setEditedPoiText}
                onBlur={() => handleSavePoi(index)}
              />
            ) : (
              <Text style={styles.routePoi}>- {poi}</Text>
            )}

            {editingPoiId === String(index) ? (
              <View style={styles.editButtons}>
                <Pressable onPress={() => handleSavePoi(index)} style={styles.saveButton}>
                  <Text style={styles.buttonText}>Save</Text>
                </Pressable>
                <Pressable onPress={() => setEditingPoiId(null)} style={styles.cancelButton}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>
              </View>
            ) : (
              <View style={styles.editButtons}>
                <Pressable onPress={() => handleEditPoi(String(index), poi)} style={styles.editButton}>
                  <Text style={styles.buttonText}>Edit</Text>
                </Pressable>
                <Pressable onPress={() => handleDeletePoi(index)} style={styles.deleteButton}>
                  <Text style={styles.buttonText}>Delete</Text>
                </Pressable>
              </View>
            )}
          </View>
        ))}

        <View style={styles.addPoiContainer}>
          <TextInput
            style={styles.addPoiInput}
            placeholder="Add a new point of interest"
            value={newPoi}
            onChangeText={setNewPoi}
          />
          <Pressable onPress={handleAddPoi} style={styles.addPoiButton}>
            <Text style={styles.buttonText}>Add POI</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  routeImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  routeInfo: {
    padding: 15,
  },
  routeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  routeDescription: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
  routeDuration: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  routePoisTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  poiItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  routePoi: {
    fontSize: 16,
    color: '#333',
  },
  editButtons: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#3498db',
    padding: 5,
    borderRadius: 5,
    marginLeft: 5,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    padding: 5,
    borderRadius: 5,
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
  },
  addPoiContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  addPoiInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
  },
  addPoiButton: {
    backgroundColor: '#27ae60',
    padding: 10,
    borderRadius: 5,
  },
  editPoiInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    marginRight: 5,
  },
  saveButton: {
    backgroundColor: '#27ae60',
    padding: 5,
    borderRadius: 5,
    marginLeft: 5,
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
    padding: 5,
    borderRadius: 5,
    marginLeft: 5,
  },
});
