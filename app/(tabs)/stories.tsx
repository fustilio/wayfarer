import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
        <Text style={styles.title}>Local Stories</Text>
        <Text style={styles.subtitle}>
          Discover authentic experiences shared by locals
        </Text>
      </View>

      {stories.map((story) => (
        <Pressable key={story.id} style={styles.storyCard}>
          <Image source={{ uri: story.image }} style={styles.storyImage} />
          <View style={styles.storyContent}>
            <View style={styles.authorRow}>
              <Image
                source={{ uri: `https://i.pravatar.cc/100?u=${story.id}` }}
                style={styles.authorImage}
              />
              <View style={styles.authorInfo}>
                <Text style={styles.authorName}>{story.author}</Text>
                <Text style={styles.location}>
                  <Ionicons name="location" size={14} color="#6B7280" />
                  {' ' + story.location}
                </Text>
              </View>
            </View>
            <Text style={styles.storyTitle}>{story.title}</Text>
            <View style={styles.statsRow}>
              <Text style={styles.stat}>
                <Ionicons name="heart" size={14} color="#6B7280" />
                {' ' + story.likes}
              </Text>
              <Text style={styles.stat}>
                <Ionicons name="chatbubble" size={14} color="#6B7280" />
                {' ' + story.comments}
              </Text>
            </View>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#FFFFFF',
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
  storyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  storyImage: {
    width: '100%',
    height: 200,
  },
  storyContent: {
    padding: 16,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontWeight: 'bold',
    color: '#111827',
  },
  location: {
    fontSize: 14,
    color: '#6B7280',
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stat: {
    fontSize: 14,
    color: '#6B7280',
    marginRight: 16,
  },
});