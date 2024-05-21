import * as React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Typography } from '@mui/material';
import { Text,Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LineGraph from './Fetchdata';
const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Maintable'>
        <Stack.Screen name="Maintable" component={LineGraph} />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;