import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import FollowersInfoScreen from './screens/FollowersInfoScreen';
import 'react-native-gesture-handler';


function App(): JSX.Element {
  const Stack = createStackNavigator();

  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false , headerTransparent:true}}/>
        <Stack.Screen name="FollowersInfo" component={FollowersInfoScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
