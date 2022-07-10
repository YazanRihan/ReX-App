import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { NativeBaseProvider, Box, extendTheme} from 'native-base';
import { View, Text, Button, Switch } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Recycle from './RecycleMain';
import Filters from './Filters';

const Stack = createStackNavigator();

export default function App({navigation}) {
  
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Filters">
    <Stack.Screen options={
      {title:"Bins Map", headerStyle: {backgroundColor:"#27272f"}, headerTintColor:"#ffffff",}}
        name="Recycle" component={Recycle} />
    <Stack.Screen options={
      {title:"Filters", headerStyle: {backgroundColor:"#27272f"}, headerTintColor:"#ffffff",}}
       name="Filters" component={Filters} />
    </Stack.Navigator>
    </NavigationContainer>
    
  );
}

