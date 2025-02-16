import React, { useState } from 'react';
import { View } from 'react-native';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { Input } from '~/components/ui/input';
import { PointOfInformation } from '~/lib/schemas';

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
        <Text>Text</Text>
        <Input
          placeholder="Text"
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
      <View className="flex flex-row justify-end">
        {onCancel && (
          <Button variant="secondary" className="mr-2" onPress={onCancel}>
            Cancel
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
