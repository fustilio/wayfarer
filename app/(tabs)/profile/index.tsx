import {
  View,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeToggle } from '~/components/shared/theme-toggle';
import { Text } from '~/components/ui/text';
import { Avatar, AvatarImage, AvatarFallback } from '~/components/ui/avatar';
import { supabase } from '~/lib/supabase';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';
import { useSession } from '~/lib/auth';


export default function ProfileScreen() {
  const {session, trySignInAnonymously} = useSession();

  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);

  const router = useRouter();

  
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const uploadImage = async () => {
    if (!image || !session?.user) {
      Alert.alert('No image selected or not signed in');
      return;
    }

    try {
      const imageUri = image.uri;
      const base64 = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const decodedFile = decode(base64);
      const filename = `${Date.now()}.png`;

      const { data, error } = await supabase.storage
        .from('pictures')
        .upload(`${session.user.id}/${filename}`, decodedFile, {
          contentType: 'image/png',
          upsert: false,
        });

      if (error) {
        Alert.alert(error.message);
      } else {
        Alert.alert('Image uploaded successfully!');
        console.log(data);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error uploading image');
    }
  };

  const pastTrips = [
    {
      id: '1',
      destination: 'Kyoto',
      dates: 'Mar 15-22, 2023',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
    },
    {
      id: '2',
      destination: 'Barcelona',
      dates: 'May 1-8, 2023',
      image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded',
    },
    {
      id: '3',
      destination: 'Rome',
      dates: 'Oct 20-27, 2022',
      image: 'https://images.unsplash.com/photo-1516427872446-839984941431',
    },
  ];

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="bg-card items-center pt-10 pb-5 px-5">
        <Avatar className="mb-4" alt={''}>
          <AvatarImage source={{ uri: 'https://i.pravatar.cc/300' }} />
          <AvatarFallback>
            <Text>SJ</Text>
          </AvatarFallback>
        </Avatar>
        <Text className="text-2xl font-bold text-foreground">
          Sarah Johnson
        </Text>
        <Text className="text-muted-foreground">
          Travel enthusiast | Culture explorer
        </Text>
        <View className="flex-row justify-around w-full pt-4 border-t border-border mt-4">
          <View className="items-center">
            <Text className="text-xl font-bold text-foreground">12</Text>
            <Text className="text-muted-foreground">Trips</Text>
          </View>
          <View className="items-center">
            <Text className="text-xl font-bold text-foreground">48</Text>
            <Text className="text-muted-foreground">Places</Text>
          </View>
          <View className="items-center">
            <Text className="text-xl font-bold text-foreground">156</Text>
            <Text className="text-muted-foreground">Photos</Text>
          </View>
        </View>
      </View>

      <View className="p-5">
        <Text className="text-lg font-bold text-foreground mb-3">
          Past Trips
        </Text>
        {pastTrips.map((trip) => (
          <Pressable
            key={trip.id}
            className="bg-card rounded-xl overflow-hidden mb-3 shadow-md"
          >
            <Image source={{ uri: trip.image }} className="w-full h-36" />
            <View className="p-3">
              <Text className="text-lg font-bold text-foreground">
                {trip.destination}
              </Text>
              <Text className="text-muted-foreground">
                <Ionicons name="calendar" size={14} color="#6B7280" />
                {' ' + trip.dates}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>

      <View className="bg-card py-2 mt-5">
        <Pressable className="flex-row items-center px-4 py-3 border-b border-border">
          <Ionicons name="settings-outline" size={24} color="#111827" />
          <Text className="flex-1 ml-3 text-foreground">Settings</Text>
          <Ionicons name="chevron-forward" size={24} color="#6B7280" />
        </Pressable>
        <Pressable className="flex-row items-center px-4 py-3 border-b border-border">
          <Ionicons name="help-circle-outline" size={24} color="#111827" />
          <Text className="flex-1 ml-3 text-foreground">Help & Support</Text>
          <Ionicons name="chevron-forward" size={24} color="#6B7280" />
        </Pressable>
        <Pressable className="flex-row items-center px-4 py-3 border-b border-border">
          <Ionicons name="log-out-outline" size={24} color="#111827" />
          <Text className="flex-1 ml-3 text-foreground">Log Out</Text>
          <Ionicons name="chevron-forward" size={24} color="#6B7280" />
        </Pressable>

        {/* <ThemeToggle /> */}
      </View>
      {session ? (
        <View>
          <Text>Signed in Anonymously</Text>
          <Text>Session: {JSON.stringify(session)}</Text>
        </View>
      ) : (
        <>
          <Text>Not signed in</Text>
          <Pressable
            onPress={trySignInAnonymously}
            className="flex-row items-center px-4 py-3 border-b border-border"
          >
            <Ionicons name="finger-print-outline" size={24} color="#111827" />
            <Text className="flex-1 ml-3 text-foreground">
              Sign In Anonymously
            </Text>
            <Ionicons name="chevron-forward" size={24} color="#6B7280" />
          </Pressable>
        </>
      )}
      <Pressable
        onPress={pickImage}
        className="flex-row items-center px-4 py-3 border-b border-border"
      >
        <Ionicons name="image-outline" size={24} color="#111827" />
        <Text className="flex-1 ml-3 text-foreground">Select Image</Text>
        <Ionicons name="chevron-forward" size={24} color="#6B7280" />
      </Pressable>
      <Pressable
        onPress={uploadImage}
        className="flex-row items-center px-4 py-3 border-b border-border"
      >
        <Ionicons name="cloud-upload-outline" size={24} color="#111827" />
        <Text className="flex-1 ml-3 text-foreground">Upload Image</Text>
        <Ionicons name="chevron-forward" size={24} color="#6B7280" />
      </Pressable>
      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{ width: 200, height: 200 }}
        />
      )}
      <Pressable
        onPress={() => router.push('/(tabs)/profile/image-manager')}
        className="flex-row items-center px-4 py-3 border-b border-border"
      >
        <Ionicons name="images-outline" size={24} color="#111827" />
        <Text className="flex-1 ml-3 text-foreground">Manage Images</Text>
        <Ionicons name="chevron-forward" size={24} color="#6B7280" />
      </Pressable>
    </ScrollView>
  );
}
