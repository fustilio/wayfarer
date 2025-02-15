import { View, Image, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemeToggle } from '~/components/shared/theme-toggle';

import { Text } from "~/components/ui/text";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar"; 

export default function ProfileScreen() {
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
          <AvatarFallback><Text>SJ</Text></AvatarFallback>
        </Avatar>
        <Text className="text-2xl font-bold text-foreground">Sarah Johnson</Text>
        <Text className="text-muted-foreground">Travel enthusiast | Culture explorer</Text>
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
        <Text className="text-lg font-bold text-foreground mb-3">Past Trips</Text>
        {pastTrips.map((trip) => (
          <Pressable key={trip.id} className="bg-card rounded-xl overflow-hidden mb-3 shadow-md">
            <Image source={{ uri: trip.image }} className="w-full h-36" />    
            <View className="p-3">
              <Text className="text-lg font-bold text-foreground">{trip.destination}</Text>
              <Text className="text-muted-foreground">
                <Ionicons name="calendar" size={14} color="#6B7280" />        
                {' ' + trip.dates}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
                                                                              
      <View className="bg-card py-2 mt-5">
        <Pressable className="flex-row items-center px-4 py-3 border-b        
border-border">
          <Ionicons name="settings-outline" size={24} color="#111827" />      
          <Text className="flex-1 ml-3 text-foreground">Settings</Text>       
          <Ionicons name="chevron-forward" size={24} color="#6B7280" />       
        </Pressable>
        <Pressable className="flex-row items-center px-4 py-3 border-b        
border-border">
          <Ionicons name="help-circle-outline" size={24} color="#111827" />   
          <Text className="flex-1 ml-3 text-foreground">Help & Support</Text> 
          <Ionicons name="chevron-forward" size={24} color="#6B7280" />       
        </Pressable>
        <Pressable className="flex-row items-center px-4 py-3 border-b        
border-border">
          <Ionicons name="log-out-outline" size={24} color="#111827" />       
          <Text className="flex-1 ml-3 text-foreground">Log Out</Text>        
          <Ionicons name="chevron-forward" size={24} color="#6B7280" />       
        </Pressable>
        <ThemeToggle />
      </View>
    </ScrollView>
  );
}