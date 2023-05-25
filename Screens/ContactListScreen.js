import React, { useState, useEffect } from "react";
import {
  View,
  Stack,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { ListItem, Avatar, FAB } from "react-native-elements";
import { avatarLetters } from "../functions/Functions";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import db from "../database/firebase";

const ContactListScreen = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const dbRef = collection(db, "contacts");
    onSnapshot(dbRef, (docsSnap) => {
      const contacts = [];
      docsSnap.forEach((doc) => {
        contacts.push({
          id: doc.id,
          name: doc.data().name,
          email: doc.data().email,
          phone: doc.data().phone,
          address: doc.data().address,
        });
      });
      setContacts(contacts);
    });
  }, []);
  return (
    <View style={styles.main_container}>
      <View style={{ padding: 10 }}>
        <Button
          title="Nuevo contacto"
          onPress={() => navigation.navigate("Agregar contacto")}
        ></Button>
      </View>
      <ScrollView style={styles.scroll_container}>
        {contacts.map((contact) => {
          return (
            <ListItem
              key={contact.id}
              bottomDivider
              onPress={() => {
                navigation.navigate("Detalles", {
                  contact_id: contact.id,
                  contact_name: contact.name,
                });
              }}
            >
              <Avatar
                size="small"
                rounded
                title={avatarLetters(contact.name)}
                titleStyle={{ color: "white", fontSize: 15 }}
                containerStyle={{ backgroundColor: "gray" }}
                activeOpacity={0.7}
              />

              <ListItem.Content>
                <ListItem.Title>{contact.name}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          );
        })}
      </ScrollView>
      <FAB
        placement="right"
        icon={() => <MaterialIcons name="dialpad" size={25} color="#fff" />}
        color="#2196f3"
        onPress={() => navigation.navigate("Dialer")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main_container: {
    display: "flex",
    flex: 1,
  },
  scroll_container: {
    display: "flex",
    flex: 1,
  },
});

export default ContactListScreen;
