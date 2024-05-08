import { Stack, SplashScreen } from 'expo-router';
import { Colors } from '../shared/const/tokens';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  const [loaded, error] = useFonts({
    FiraSans: require('../assets/fonts/FiraSans-Regular.ttf'),
    FiraSansSemiBold: require('../assets/fonts/FiraSans-SemiBold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          statusBarColor: Colors.black,
          contentStyle: { backgroundColor: Colors.black, paddingTop: insets.top },
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="restore" options={{ presentation: 'modal' }} />
      </Stack>
    </SafeAreaProvider>
  );
}
