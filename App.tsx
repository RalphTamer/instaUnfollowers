import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import FollowersInfoScreen from './screens/FollowersInfoScreen';
import 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageBackground, StatusBar, StyleSheet } from 'react-native';
import LostFollowersScreen from './screens/LostFollowersScreen';

function App(): JSX.Element {
  const Stack = createStackNavigator();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white', // Adjust the background color as needed
    },
  });
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false , headerTransparent:true}}/>
        <Stack.Screen name="FollowersInfo" component={FollowersInfoScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="LostFollowers" component={LostFollowersScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
