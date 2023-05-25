import React, { useState, useEffect } from "react";
import { View, Alert, Text, Pressable, StyleSheet } from "react-native";
import {
  collection,
  getDoc,
  doc,
  setDoc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import {avatarLetters} from '../functions/Functions'
import { Header,Avatar } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";


import db from "../database/firebase";

const ContactDetailScreen = ({ navigation,route }) => {
  const contact_id = route.params.contact_id;
  const rightButtons = () => {
    return (
      <View style={{ flexDirection: "row", gap: 20, padding: 20,paddingRight:0 }}>
        <Ionicons
          name={favorite.isInFavorites?"star":"star-outline"}
          size={25}
          color={favorite.isInFavorites ? "#ffff00" : "#fff"}
          onPress={() => addToFavorites(contact_id, state)}
        />
        <Ionicons
          name={"create-outline"}
          size={25}
          color={"#fff"}
          onPress={() => { 
          navigation.navigate("Actualizar contacto",{
            contact:state,
            contact_id:contact_id
          })
          }}
        />
        <Ionicons
          name={"trash-outline"}
          size={25}
          color={"#fff"}
          onPress={() => showAlert(contact_id)}
        />
      </View>
    );
  };

  const [state, setState] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    color: "",
  });

  const [favorite, setFavorite] = useState({
    isInFavorites: false,
  });

 const call = () => {
    navigation.navigate('Call',{contact:state,contact_id:contact_id});
  }

  const getById = (id) => {
    const deleteRef = doc(db, "contacts", id);
    let contact;
    getDoc(deleteRef).then((snapshot) => {
      contact = snapshot.data();
      setState(contact);
    });

    checkFavorites(id);
  };
  const checkFavorites = (id) => {
    const dbRef = collection(db, "favorites");
    onSnapshot(dbRef, (docsSnap) => {
      const contacts = [];
      docsSnap.forEach((doc) => {
        if (doc.id === id) setFavorite({ isInFavorites: true });
      });
    });
  };
  const addToFavorites = async (id, contact) => {
    if (favorite.isInFavorites) {
      deleteDoc(doc(db, "favorites", id));
      setFavorite({ isInFavorites: false });
    } else {
      setDoc(doc(db, "favorites", id), {
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        address: contact.address,
      });
    }
  };
  const deleteContact = async (id) => {
    deleteDoc(doc(db, "contacts", id));
    navigation.navigate("Contactos");
  };
  const showAlert = (id) =>
    Alert.alert("Eliminando", "Seguro que desea eliminar el contacto?", [
      {
        text: "Cancel",
        onPress: () => '',
        style: "cancel",
      },
      { text: "OK", onPress: () => deleteContact(id) },
    ]);

  useEffect(() => {
    getById(contact_id);
  }, []);

  return (
    <View style={styles.main_container}>
      <Header
      containerStyle={{
        backgroundColor: state.color?state.color:'#2196f3',
        justifyContent: 'space-around',
      }}
        leftComponent={
          <View style={{ flexDirection: "row", gap: 20, padding: 20 ,paddingLeft:0}}>
             <Ionicons
            name={"arrow-back-outline"}
            size={25}
            color={"#fff"}
            onPress={() => navigation.goBack(null)}
          />
          </View>
         
        }
        centerComponent={
          <View style={{ flexDirection: "row", gap: 20, padding: 20 ,paddingRight:100}}>
            {/* text: route.params.contact_name,
          style: { color: "#fff" }, */}
          <Text style={{fontSize:18,color:'#fff'}}>{route.params.contact_name}</Text>
          </View>
          
        }
        rightComponent={rightButtons}
      />
      <View style={styles.avatar_container}>
      <Avatar
                size="large"
                rounded
                title={avatarLetters(state.name)}
                titleStyle={{ color: "white" }}
                containerStyle={{ backgroundColor: "gray" }}
                activeOpacity={0.7}
              />

      </View>

      <View style={styles.data_container}>
      
        <View style={styles.data_row}>
        <Ionicons
          name={"person-circle-outline"}
          size={25}
          color={"#000"}
        />
        <Text>{state.name}</Text>
        </View>
        <View style={styles.data_row}>
        <Ionicons
          name={"mail-outline"}
          size={25}
          color={"#000"}
        />
        <Text>{state.email}</Text>
        </View>
        <View style={styles.data_row}>
        <Ionicons
          name={"call-outline"}
          size={25}
          color={"#000"}
        />
        <Text>{state.phone}</Text>
        </View>
        <View style={styles.data_row}>
        <Ionicons
          name={"home-outline"}
          size={25}
          color={"#000"}
        />
        <Text>{state.address}</Text>
        </View>

      </View>
      <View style={styles.button_container}>
           
              <Pressable style={styles.call}
              onPress={()=>call()}>
                <Ionicons name={"call-outline"} size={25} color={"#fff"} />
              </Pressable>
         
          {/* </View> */}
        </View>
    </View>
  );
};
const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: "center",
    gap:30
  },
  box: {
    width: 300,
    height: 300,
    backgroundColor: "red",
    marginBottom: 30,
  },
  text: {
    fontSize: 30,
  },
  avatar_container: {
    display: 'flex',
    paddingTop:0,
    flexDirection:'column',
    alignItems:'center'
  },
  data_container: {
    display: 'flex',
    flex:1,
    padding:80,
    paddingTop:0,
    gap:20,
    flexDirection:'column',
    alignItems:'center'
  },
  data_row:{
    display:'flex',flexDirection:'row',alignItems:'center',gap:10,
    alignSelf:'stretch',
    gap:20,
    justifyContent:'flex-start',
    
  },
  button_container: {
    display: 'flex',
    flex:1,
    padding:80,
    paddingTop:0,
    gap:20,
    flexDirection:'column',
    alignItems:'center'
  },
  call: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: "green",
  },
});

export default ContactDetailScreen;
