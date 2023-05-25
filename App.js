import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// import StackNavigator1 from './Navigations/StackNavigator1'
import BottomTabNavigator1 from './Navigations/BottomTabNavigator1'
import StackNavigator2 from './Navigations/StackNavigator2'



export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator2/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
