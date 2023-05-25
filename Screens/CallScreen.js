import React from "react";
import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import db from "../database/firebase";

const CallScreen = ({ route, navigation }) => {
  const contact = route.params.contact;
  const dialed = route.params.number ? route.params.number : contact.name;
  const contact_id = route.params.contact_id;

  const endCall = () => {
    addToRecent(contact_id, contact);
    navigation.goBack(null);
  };

  const addToRecent = async (id, contact) => {
    if (id) {
      setDoc(doc(db, "recents", id), {
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        address: contact.address,
      });
    } else {
      addDoc(collection(db, "recents"), {
        name: dialed,
      });
    }
  };

  return (
    <View style={styles.main_container}>
      <View style={styles.numer_container}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={styles.text}>Llamando a </Text>
          <Text style={styles.number_text}>{dialed}</Text>
        </View>
      </View>
      <View style={styles.button_container}>
        <Pressable style={styles.call} onPress={() => endCall()}>
          <MaterialIcons name={"call-end"} size={25} color={"#fff"} />
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  main_container: {
    display: "flex",
    flex: 1,
    gap: 100,
    justifyContent: "center",
  },
  numer_container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button_container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  call: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: "#f7392f",
  },
  text: {
    fontSize: 25,
    color: "#000",
  },
  number_text: {
    fontSize: 30,
    color: "#2196f3",
  },
});
export default CallScreen;
