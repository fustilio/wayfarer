import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, Pressable } from 'react-native';

interface Note {
  id: string;
  location: string;
  date: string;
  text: string;
  imageUri?: string;
}

const MyTravelNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNoteText, setNewNoteText] = useState('');
  const [newNoteLocation, setNewNoteLocation] = useState('');

  const addNote = () => {
    if (newNoteText && newNoteLocation) {
      const newNote: Note = {
        id: String(Date.now()),
        location: newNoteLocation,
        date: new Date().toLocaleDateString(),
        text: newNoteText,
      };
      setNotes([...notes, newNote]);
      setNewNoteText('');
      setNewNoteLocation('');
    }
  };

  const renderItem = ({ item }: { item: Note }) => (
    <View style={styles.noteItem}>
      <Text style={styles.noteLocation}>{item.location}</Text>
      <Text style={styles.noteDate}>{item.date}</Text>
      {item.imageUri && <Image source={{ uri: item.imageUri }} style={styles.noteImage} />}
      <Text style={styles.noteText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Travel Notes</Text>
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={newNoteLocation}
        onChangeText={setNewNoteLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Add a new note"
        value={newNoteText}
        onChangeText={setNewNoteText}
      />
      <Pressable style={styles.addButton} onPress={addNote}>
        <Text style={styles.addButtonText}>Add Note</Text>
      </Pressable>
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#2563EB',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noteItem: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
  },
  noteLocation: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  noteDate: {
    fontSize: 12,
    color: '#666',
  },
  noteText: {
    marginTop: 8,
  },
  noteImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 8,
  },
});

export default MyTravelNotes;