import { ScrollView, Image, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';


import { Text } from '~/components/ui/text';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';
import { IMAGE }from '~/mocks'

export default function ExploreScreen() {
  const {colorScheme} = useColorScheme();
  const theme = colorScheme === 'dark' ? NAV_THEME.dark : NAV_THEME.light;

  const featuredDestinations = [
    {
      id: '1',
      name: 'Kyoto, Japan',
      image: IMAGE.KYOTO,
      description:
        'Ancient temples, traditional gardens, and cultural experiences',
    },
    {
      id: '2',
      name: 'Barcelona, Spain',
      image: IMAGE.BARCELONA,
      description:
        'Modernist architecture, vibrant culture, and Mediterranean charm',
    },
  ];

  const localExperiences = [
    {
      id: '1',
      title: 'Traditional Tea Ceremony',
      location: 'Kyoto',
      image: IMAGE.KYOTO,
      price: '$45',
    },
    {
      id: '2',
      title: 'Tapas Walking Tour',
      location: 'Barcelona',
      image: IMAGE.BARCELONA,
      price: '$35',
    },
  ];

  return (
    <ScrollView className="flex-1" style={{ backgroundColor: theme.background }}>
      <View className="bg-card pt-10 pb-5 px-5">
        <Text className="text-sm" style={{color: theme.text}}>Good morning</Text>
        <Text className="text-2xl font-bold mt-1" style={{color: theme.primary}}>
          Where to next?
        </Text>
      </View>

      <View style={{ marginHorizontal: 20, backgroundColor: theme.card, borderRadius: 12, flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 16, paddingVertical: 12 }}>
        <Ionicons name="search" size={20} color={theme.text} />
        <Input placeholder="Search destinations" className="flex-1" style={{ borderWidth: 0, color: theme.text }} placeholderTextColor={theme.text} />
      </View>

      <View className="mb-6">
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.primary, marginLeft: 20, marginTop: 20, marginBottom: 10 }}>
          Featured Destinations
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="gap-4 px-5"
        >
          {featuredDestinations.map((destination) => (
            <Card
              key={destination.id}
              className="w-72 rounded-2xl overflow-hidden shadow-md border-0"
              style={{ backgroundColor: theme.card }}
            >
              <Image
                source={{ uri: destination.image }}
                className="w-full h-40"
              />
              <CardContent className="p-4">
                <CardTitle style={{ fontSize: 18, fontWeight: 'bold', color: theme.primary }}>
                  {destination.name}
                </CardTitle>
                <CardDescription style={{ fontSize: 14, color: theme.text }}>
                  {destination.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </ScrollView>
      </View>

      <View className="mb-6">
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.primary, marginLeft: 20, marginTop: 20, marginBottom: 10 }}>
          Local Experiences
        </Text>
        {localExperiences.map((experience) => (
          <Link key={experience.id} href="/modal" asChild>
            <Card className="mx-5 mb-3 rounded-xl overflow-hidden shadow-md border-0" style={{ backgroundColor: theme.card }}>
              <View style={styles.cardContentContainer}>
                <Image source={{ uri: experience.image }} className="w-24 h-24" />
                <View className="flex-1 p-3">
                  <CardTitle style={{ fontSize: 16, fontWeight: 'bold', color: theme.primary }}>
                    {experience.title}
                  </CardTitle>
                  <Text style={{ fontSize: 14, color: theme.text, marginTop: 5 }}>
                    <Ionicons name="location" size={14} color={theme.text} />
                    {' ' + experience.location}
                  </Text>
                  <Text className="font-bold text-sky-500 mt-2">{experience.price}</Text>
                </View>
              </View>
            </Card>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardContentContainer: {
    flexDirection: 'row',
  },
});
