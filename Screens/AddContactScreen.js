import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import ColorPalette from 'react-native-color-palette'
import Ionicons from "react-native-vector-icons/Ionicons";
import db from "../database/firebase";

const AddContactScreen = ({ navigation,route }) => {
  const contact = route.params?route.params.contact:null;
  const [state, setState] = useState({
    name: "",
    email: "",
    phone: contact?contact.name:"",
    address: "",
    color: "",

  });
  

  const createUser = () => {
    try {
      addDoc(collection(db, "contacts"), {
        name: state.name,
        email: state.email,
        phone: state.phone,
        address: state.address,
        color: state.color,
      });
      navigation.navigate("Contactos");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.form_container}>
      <View style={styles.input_box}>
      <Ionicons
          name={"person-circle-outline"}
          size={25}
          color={"#000"}
        />
        <TextInput style={styles.input}
          placeholder="Nombre"
          onChangeText={(val) => setState({ ...state, name: val })}
        />
      </View>
      <View style={styles.input_box}>
      <Ionicons
          name={"mail-outline"}
          size={25}
          color={"#000"}
        />
        <TextInput
          placeholder="Correo"
          onChangeText={(val) => setState({ ...state, email: val })}
        />
      </View>
      <View style={styles.input_box}>
      <Ionicons
          name={"call-outline"}
          size={25}
          color={"#000"}
        />
        <TextInput
        value={state.phone}
          placeholder="Numero de telefono"
          onChangeText={(val) => setState({ ...state, phone: val })}
        />
      </View>
      <View style={styles.input_box}>
      <Ionicons
          name={"home-outline"}
          size={25}
          color={"#000"}
        />
        <TextInput
          placeholder="Direccion"
          onChangeText={(val) => setState({ ...state, address: val })}
        />
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          marginLeft:30
        }}
      >
     <ColorPalette
    onChange={(color) => setState({ ...state, color: color })}
    defaultColor={'#C0392B'}
    colors={['#C0392B', '#E74C3C', '#9B59B6', '#8E44AD', '#2980B9']}
    title={"Color de contacto"}
    icon={
      <Text>✔</Text>
      // <Text></Text>︎
    }
  />

      </View>
      <View style={styles.button_container}>
        <View style={styles.button}>
          <Button title="Guardar" onPress={() => createUser()} />
        </View>
        <View style={styles.button}>
          <Button title="Cancelar" />
        </View>
      </View>
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  form_container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 25,
    gap: 45,
    // backgroundColor:'#000000'
  },
  input_box: {
    display:'flex',
    flexDirection:'row',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    gap:10,
    borderColor: "#000000",
  },
  input: {
    display:'flex',
    alignSelf:'stretch'
  },
  button_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  button: {
    // display:'flex',
    flex: 1,
    alignSelf: "stretch",
  },
});
export default AddContactScreen;
