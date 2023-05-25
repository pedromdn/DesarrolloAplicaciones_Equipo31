import { createStackNavigator } from "@react-navigation/stack";
import CallScreen from "../Screens/CallScreen";
import BottomTabNavigator1 from './BottomTabNavigator1'
import React, { useState, useEffect } from "react";

const Stack = createStackNavigator();

export default function StackNavigator2({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={BottomTabNavigator1}
        options={{
            headerShown: false,
          }}
      ></Stack.Screen>

      <Stack.Screen
        name="Call"
        component={CallScreen}
        options={{
            headerShown: false,
          }}
      ></Stack.Screen>
     
    </Stack.Navigator>
  );
}
