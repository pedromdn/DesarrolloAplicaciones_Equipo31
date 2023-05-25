import React,{useState,useEffect} from 'react';
import { View,Text,Button,TextInput,ScrollView,StyleSheet } from 'react-native';
import {collection,doc,setDoc,updateDoc} from 'firebase/firestore'
import Ionicons from "react-native-vector-icons/Ionicons";
import ColorPalette from 'react-native-color-palette'
import db from '../database/firebase'

 const UpdateContactScreen = ({navigation,route}) => {
  const contact = route.params.contact;
  const contact_id = route.params.contact_id;

  const [state, setState] = useState({
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    address: contact.address,
    color: contact.color?contact.color:''

  })
  useEffect(() => {
    setState(contact);
  }, [])
  const updateContact =  (id)  => {
    try {
      updateDoc(doc(db,"contacts",id),{
        name: state.name,
        email: state.email,
        phone: state.phone,
        address: state.address,
        color: state.color?state.color:''

      })
      navigation.navigate('Contactos');     
      
    } catch (error) {
      alert(error)
      
    }
    
    

  }

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
          value={state.name}
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
          value={state.email}
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
          placeholder="Numero de telefono"
          value={state.phone}
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
          value={state.address}
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
    defaultColor={state.color?state.color:''}
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
        <Button 
        title='Guardar'
        onPress={()=> updateContact(contact_id)}/>
        </View>
      </View>
    </ScrollView>
   
  );
}

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
export default UpdateContactScreen;
