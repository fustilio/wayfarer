import { Link, Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

import { Text } from "~/components/ui/text";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <Text className="text-lg" style={styles.text}>This screen doesn't exist.</Text>
        <Link href="/" style={styles.link}>
          <Text className="text-primary">Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

