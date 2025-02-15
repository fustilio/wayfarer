import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { Image } from 'expo-image';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '~/lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import { useSession } from '~/lib/auth';

export default function ImageManagerScreen() {
  const { session } = useSession();
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user) {
      fetchImages(session.user.id);
    }
  }, [session]);

  const fetchImages = async (userId: string) => {
    console.log('fetching user id', userId);
    try {
      const { data, error } = await supabase.storage
        .from('pictures')
        .list(userId);

      console.log(
        'data',
        JSON.stringify(
          {
            data,
            error,
          },
          null,
          2
        )
      );

      if (error) {
        Alert.alert(error.message);
      } else {
        const publicUrls = data.map((image) => {
          console.log('image', JSON.stringify(image, null, 2));
          return supabase.storage
            .from('pictures')
            .getPublicUrl(`${userId}/${image.name}`).data.publicUrl;
        });
        console.log('public urls', JSON.stringify(publicUrls, null, 2));
        setImages(publicUrls);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      Alert.alert('Error fetching images');
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      console.log('trying to upload images, ', JSON.stringify(result, null, 2));
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (imageUri: string) => {
    if (!session?.user) {
      Alert.alert('User not signed in');
      return;
    }
    try {
      console.log(
        'trying to fetch from',
        JSON.stringify({
          imageUri: imageUri ?? 'not available',
        })
      );
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const filename = `${Date.now()}.png`;

      const { data, error } = await supabase.storage
        .from('pictures')
        .upload(filename, blob, {
          contentType: 'image/png',
          upsert: false,
        });

      console.log(
        'ERROR',
        JSON.stringify(
          {
            data,
            error,
          },
          null,
          2
        )
      );

      if (error) {
        Alert.alert(error.message);
      } else {
        Alert.alert('Image uploaded successfully!');
        fetchImages(session.user.id);
      }
    } catch (error) {
      console.error('Error uploading image:', JSON.stringify(error, null, 2));
      Alert.alert('Error uploading image');
    }
  };

  const deleteImage = async (imageUrl: string) => {
    try {
      const imageName = imageUrl.split('/').pop();
      const userId = session?.user?.id;
      if (!userId) {
        Alert.alert('User not signed in');
        return;
      }
      const { error } = await supabase.storage
        .from('pictures')
        .remove([`${userId}/${imageName}`]);

      if (error) {
        Alert.alert(error.message);
      } else {
        Alert.alert('Image deleted successfully!');
        fetchImages(userId);
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      Alert.alert('Error deleting image');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Image Manager</Text>

      <Pressable style={styles.uploadButton} onPress={pickImage}>
        <Text style={styles.uploadButtonText}>Upload Image</Text>
      </Pressable>

      <View style={styles.imagesContainer}>
        {images.map((imageUrl) => (
          <View key={imageUrl} style={styles.imageWrapper} >
            <Image
              source={imageUrl}
              // contentFit="cover"
              // transition={1000}
              style={{
                width: 40,
                height: 40
              }}
            />
        
            <Pressable
              style={styles.deleteButton}
              onPress={() => deleteImage(imageUrl)}
            >
              <Ionicons name="trash" size={24} color="white" />
            </Pressable>
          </View>
        ))}
        {images.length === 0 ? <Text>No images found</Text> : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#111827',
  },
  uploadButton: {
    backgroundColor: '#2563EB',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  imageWrapper: {
    width: '30%',
    marginBottom: 20,
    position: 'relative',
    marginRight: '3%',
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    padding: 5,
  },
});
