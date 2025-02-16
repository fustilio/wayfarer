import React, { useState, useEffect } from 'react';
import { View, Alert, Platform } from 'react-native';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { Input } from '~/components/ui/input';
import { PointOfInformation } from '~/lib/schemas';
import * as Location from 'expo-location';

interface PoiFormProps {
  onSubmit: (poi: PointOfInformation) => void;
  initialValues?: PointOfInformation;
  onCancel?: () => void;
}

const PoiForm: React.FC<PoiFormProps> = ({
  onSubmit,
  initialValues,
  onCancel,
}) => {
  const [name, setName] = useState(initialValues?.name || '');
  const [description, setDescription] = useState(
    initialValues?.description || ''
  );
  const [latitude, setLatitude] = useState(
    String(initialValues?.coordinates.latitude || '')
  );
  const [longitude, setLongitude] = useState(
    String(initialValues?.coordinates.longitude || '')
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android') {
        setErrorMsg(
          'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
    })();
  }, []);

 const getCurrentLocation = async () => {
    let { status } = await Location.getForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Location permission denied',
        'Please enable location permissions in your device settings to use this feature.'
      );
      return;
    }
    try {
      let location = await Location.getCurrentPositionAsync({});
      setLatitude(String(location.coords.latitude));
      setLongitude(String(location.coords.longitude));
    } catch (error) {
      Alert.alert('Error getting location', error.message);
    }
  };

  const handleSubmit = () => {
    const poi: PointOfInformation = {
      name: name,
      description: description,
      coordinates: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
    };
    onSubmit(poi);
  };

  return (
    <View className="grid gap-4 py-4">
      <View className="grid gap-2">
        <Text>Name</Text>
        <Input placeholder="Name" value={name} onChangeText={setName} />
      </View>
      <View className="grid gap-2">
        <Text>Description</Text>
        <Input
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
      </View>
      <View className="grid gap-2">
        <Text>Latitude</Text>
        <Input
          placeholder="Latitude"
          value={latitude}
          onChangeText={(text) => setLatitude(text)}
        />
      </View>
      <View className="grid gap-2">
        <Text>Longitude</Text>
        <Input
          placeholder="Longitude"
          value={longitude}
          onChangeText={(text) => setLongitude(text)}
        />
      </View>
      <Button onPress={getCurrentLocation}>
        <Text>Get Current Location</Text>
      </Button>
      {errorMsg && <Text>Error: {errorMsg}</Text>}
      <View className="flex flex-row justify-end">
        {onCancel && (
          <Button variant="secondary" className="mr-2" onPress={onCancel}>
            <Text>Cancel</Text>
          </Button>
        )}
        <Button onPress={handleSubmit}>
          <Text>Submit</Text>
        </Button>
      </View>
    </View>
  );
};

export default PoiForm;
