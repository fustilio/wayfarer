import { View, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { PROVIDER_GOOGLE } from 'react-native-maps';

import { Text } from "~/components/ui/text";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import { Card, CardContent } from "~/components/ui/card";
import MapView from 'react-native-maps';

export default function StoriesScreen() {
  const stories = [
    {
      id: '1',
      author: 'Yuki Tanaka',
      location: 'Kyoto, Japan',
      title: 'The Art of Tea Ceremony',
      image: 'https://images.unsplash.com/photo-1545048702-79362697d413',
      likes: 245,
      comments: 18,
    },
    {
      id: '2',
      author: 'Maria Garcia',
      location: 'Barcelona, Spain',
      title: 'Hidden Tapas Bars of El Born',
      image: 'https://images.unsplash.com/photo-1515443961218-a51367888e4b',
      likes: 189,
      comments: 24,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text className="text-2xl font-bold" style={styles.title}>Local Stories</Text>
        <Text className="text-muted-foreground" style={styles.subtitle}>
          Discover authentic experiences shared by locals
        </Text>
      </View>
      <MapView
        style={{ width: '100%',
          height: 300,  }}  // Adjust height as needed
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />

      {stories.map((story) => (
        <Card key={story.id} style={styles.storyCard}>
          <Image source={{ uri: story.image }} style={styles.storyImage} />
          <CardContent style={styles.storyContent}>
            <View style={styles.authorRow}>
              <Avatar style={styles.authorImage} alt={''}>
                <AvatarImage source={{ uri: `https://i.pravatar.cc/100?u=${story.id}` }} />
                <AvatarFallback><Text>YT</Text></AvatarFallback>
              </Avatar>
              <View style={styles.authorInfo}>
                <Text className="font-bold" style={styles.authorName}>{story.author}</Text>
                <Text className="text-muted-foreground" style={styles.location}>
                  <Ionicons name="location" size={14} color="#6B7280" />
                  {' ' + story.location}
                </Text>
              </View>
            </View>
            <Text className="text-xl font-bold" style={styles.storyTitle}>{story.title}</Text>
            <View style={styles.statsRow}>
              <Text className="text-muted-foreground" style={styles.stat}>
                <Ionicons name="heart" size={14} color="#6B7280" />
                {' ' + story.likes}
              </Text>
              <Text className="text-muted-foreground" style={styles.stat}>
                <Ionicons name="chatbubble" size={14} color="#6B7280" />
                {' ' + story.comments}
              </Text>
            </View>
          </CardContent>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    lineHeight: 24,
  },
  storyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  storyImage: {
    width: "100%",
    height: 200,
  },
  storyContent: {
    padding: 16,
  },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  authorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },
  location: {
    fontSize: 14,
    color: "#6B7280",
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  stat: {
    fontSize: 14,
    color: "#6B7280",
    marginRight: 16,
  },
});
