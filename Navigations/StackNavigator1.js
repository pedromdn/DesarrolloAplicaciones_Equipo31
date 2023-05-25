import { createStackNavigator } from "@react-navigation/stack";
import ContactListScreen from "../Screens/ContactListScreen";
import AddContactScreen from "../Screens/AddContactScreen";
import UpdateContactScreen from "../Screens/UpdateContactScreen";
import DialerScreen from "../Screens/DialerScreen";

import ContactDetailScreen from "../Screens/ContactDetailScreen";
import React, { useState, useEffect } from "react";


const Stack = createStackNavigator();

export default function StackNavigator1({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Contactos"
        component={ContactListScreen}
      ></Stack.Screen>

      <Stack.Screen
        name="Agregar contacto"
        component={AddContactScreen}
      ></Stack.Screen>
      <Stack.Screen
        name="Actualizar contacto"
        component={UpdateContactScreen}
      ></Stack.Screen>

      <Stack.Screen
        name="Detalles"
        component={ContactDetailScreen}
        options={{
          headerShown: false,
        }}
      ></Stack.Screen>
       <Stack.Screen
        name="Dialer"
        component={DialerScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
