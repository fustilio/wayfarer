import { useState, useEffect, useRef } from 'react';
import { Button, View, Text, StyleSheet, Pressable, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { recognize } from 'react-native-tesseract-ocr';
import { Card, CardContent } from '~/components/ui/card';

export default function CaptureScreen() {
  const cameraRef = useRef(null); 
  const [camera, setCamera] = useState(null);
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }
  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }


  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission}>
          <Text>
          grant permission
          </Text>
        </Button>
      </View>
    );
  }


  const takePicture = async () => {
    console.log(cameraRef.current)
    if (cameraRef.current) {
      const data = await cameraRef.current.takePictureAsync(null);
      console.log('picture', data.uri);
      setCapturedImageUri(data.uri);

      try {
        const text = await recognize(data.uri, {
          lang: "eng",
          tessPath: "tessdata",
        });
        console.log("Recognized Text:", text);
        setRecognizedText(text);
        Alert.alert("Recognized Text", text);
      } catch (err) {
        console.error(err);
        Alert.alert("Error", "Could not recognize text.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text className="text-2xl font-bold" style={styles.title}>
          Capture Moments
        </Text>
        <Text className="text-muted-foreground" style={styles.subtitle}>
          Take photos of museum panels, landmarks, or anything interesting
        </Text>
      </View>
      <CameraView style={styles.camera} ref={cameraRef} facing={facing}>
        <View style={styles.buttonContainer}>
          <Pressable  onPress={toggleCameraFacing}>
            <Text >Flip Camera</Text>
          </Pressable>
        </View>
      </CameraView>

      <Pressable style={styles.captureButton} onPress={takePicture}>
        <Ionicons name="camera" size={32} color="#FFFFFF" />
        <Text style={styles.captureText}>Take Photos</Text>
      </Pressable>

      <View style={styles.featuresContainer}>
        <Card style={styles.featureItem}>
          <CardContent className="gap-4">
            <Ionicons name="text" size={24} color="#2563EB" />
            <Text className="font-bold">Text Recognition</Text>
            <Text className="text-muted-foreground">
              Automatically extract text from photos
            </Text>
          </CardContent>
        </Card>
        <Card style={styles.featureItem}>
          <CardContent className="gap-4">
            <Ionicons name="language" size={24} color="#2563EB" />
            <Text className="font-bold">Translation</Text>
            <Text className="text-muted-foreground">
              Translate captured text to your language
            </Text>
          </CardContent>
        </Card>
        <Card style={styles.featureItem}>
          <CardContent className="gap-4">
            <Ionicons name="bookmark" size={24} color="#2563EB" />
            <Text className="font-bold">Save & Organize</Text>
            <Text className="text-muted-foreground">
              Keep your captures organized by location
            </Text>
          </CardContent>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 20,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  flipButton: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  header: {
    marginTop: 40,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  captureButton: {
    backgroundColor: '#2563EB',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 40,
  },
  captureText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 12,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});
