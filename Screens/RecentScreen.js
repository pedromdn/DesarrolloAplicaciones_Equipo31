import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { ListItem, Avatar, Box } from "react-native-elements";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import EmptyState from "../Empty-state/EmptyState";
import db from "../database/firebase";

const RecentScreen = ({ navigation }) => {
  const [recents, setContacts] = useState([]);
  useEffect(() => {
    const dbRef = collection(db, "recents");
    onSnapshot(dbRef, (docsSnap) => {
      const recents = [];
      docsSnap.forEach((doc) => {
        recents.push({
          id: doc.id,
          name: doc.data().name,
          email: doc.data().email,
          phone: doc.data().phone,
          address: doc.data().address,
        });
      });
      setContacts(recents);
    });
  }, []);
  return (
    <ScrollView contentContainerStyle={styles.main_container}>
      {recents.length > 0 ? (
        recents.map((contact) => {
          return (
            <ListItem
              key={contact.id}
              bottomDivider
              onPress={() => {
                contact.phone
                  ? navigation.navigate("Detalles", {
                      contact_id: contact.id,
                      contact_name: contact.name,
                    })
                  : navigation.navigate("Agregar contacto", {
                      contact: contact,
                    });
              }}
            >
              <MaterialIcons name={"call-made"} size={25} color={"#000"} />

              <ListItem.Content>
                <ListItem.Title>{contact.name}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          );
        })
      ) : (
        <EmptyState icon={"time-outline"} text={"No hay llamadas recientes"} />
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  main_container: {
    display: "flex",
    flex: 1,
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

export default RecentScreen;
