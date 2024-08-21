import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import LoginScreen from './../components/LoginScreen'
import * as SecureStore from 'expo-secure-store';

const tokenCache = {
  async getToken(key) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      // await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function RootLayout() {
  useFonts({
    'outfit':require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium':require('./../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold':require('./../assets/fonts/Outfit-Bold.ttf')
  })
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
        <SignedIn>
          <Stack screenOptions={{headerShown:false}}>
            <Stack.Screen name="(tabs)"/>
          </Stack>
        </SignedIn>
        <SignedOut>
          <LoginScreen/>
        </SignedOut>
   </ClerkProvider>
  );
}
// import { View, Text } from 'react-native';
// import React from 'react';
// import { Stack } from 'expo-router';
// import { useFonts } from 'expo-font';
// import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
// import LoginScreen from './../components/LoginScreen';
// import * as SecureStore from 'expo-secure-store';
// import * as WebBrowser from 'expo-web-browser';
// import { Platform } from 'react-native';

// const tokenCache = {
//   async getToken(key) {
//     try {
//       const item = await SecureStore.getItemAsync(key);
//       if (item) {
//         console.log(`${key} was used 🔐 \n`);
//       } else {
//         console.log("No values stored under key: " + key);
//       }
//       return item;
//     } catch (error) {
//       console.error("SecureStore get item error: ", error);
//       return null;
//     }
//   },
//   async saveToken(key, value) {
//     try {
//       return SecureStore.setItemAsync(key, value);
//     } catch (err) {
//       console.error("SecureStore save item error: ", err);
//     }
//   },
// };

// if (Platform.OS !== 'web') {
//   WebBrowser.warmUpAsync();
// }

// export default function RootLayout() {
//   const [fontsLoaded] = useFonts({
//     'outfit': require('./../assets/fonts/Outfit-Regular.ttf'),
//     'outfit-medium': require('./../assets/fonts/Outfit-Medium.ttf'),
//     'outfit-bold': require('./../assets/fonts/Outfit-Bold.ttf')
//   });

//   if (!fontsLoaded) {
//     return null; // hoặc bạn có thể hiển thị một màn hình tải tạm thời
//   }

//   return (
//     <ClerkProvider tokenCache={tokenCache} publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
//       <SignedIn>
//         <Stack screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="(tabs)" />
//         </Stack>
//       </SignedIn>
//       <SignedOut>
//         <LoginScreen />
//       </SignedOut>
//     </ClerkProvider>
//   );
// }
