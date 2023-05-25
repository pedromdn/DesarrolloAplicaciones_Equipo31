import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { ListItem, Avatar, Box } from "react-native-elements";
import EmptyState from "../Empty-state/EmptyState";
import db from "../database/firebase";
import {avatarLetters} from '../functions/Functions'


const FavoritesScreen = ({navigation}) => {
  const [favorites, setContacts] = useState([]);
  useEffect(() => {
    const dbRef = collection(db, "favorites");
    onSnapshot(dbRef, (docsSnap) => {
      const favorites = [];
      docsSnap.forEach((doc) => {
        favorites.push({
          id: doc.id,
          name: doc.data().name,
          email: doc.data().email,
          phone: doc.data().phone,
          address: doc.data().address,
        });
      });
      setContacts(favorites);
    });
  }, []);
  return (
    <ScrollView contentContainerStyle={styles.main_container}>
      {favorites.length > 0 ? (
        favorites.map((contact) => {
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
                titleStyle={{ color: "white",fontSize:15 }}
                containerStyle={{ backgroundColor: "gray" }}
                activeOpacity={0.7}
              />

              <ListItem.Content>
                <ListItem.Title>{contact.name}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          );
        })
      ) : (
        <EmptyState icon={"star-outline"} text={"No hay favoritos"} />
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  main_container: {
    display: "flex",
    flex: 1,
    // justifyContent: "center",
  },
  empty_container: {
    display: "flex",
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
  },
});

export default FavoritesScreen;
