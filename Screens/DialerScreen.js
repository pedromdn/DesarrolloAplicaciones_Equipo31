import {
  View,
  Pressable,
  SafeAreaView,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";

const DialerScreen = ({ navigation }) => {
  
  const [dialed, setDialed] = useState("");

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setDialed("");
      return unsubscribe;
    });
  }, [navigation]);

  const call = () => {
    navigation.navigate("Call", { number: dialed });
  };

  const CustomButton = ({ label, icon, del }) => {
    const [isPressed, setIsPressed] = useState(false);

    const handlePress = () => {
      if (del) {
        if (dialed.length > 0) {
          setDialed(dialed.slice(0, -1));
        }
      } else {
        if (dialed.length <= 14) {
          setDialed(dialed + label);
        }
      }
    };
    const handlePressIn = () => {
      setIsPressed(true);
    };

    const handlePressOut = () => {
      setIsPressed(false);
    };

    const buttonStyle = isPressed ? [styles.key, styles.pressed] : styles.key;

    const textStyle = isPressed
      ? [styles.text, styles.textPressed]
      : styles.text;

    return (
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        style={buttonStyle}
      >
        {icon ? (
          <Feather name={"delete"} size={25} color={"gray"} />
        ) : (
          <Text style={textStyle}>{label}</Text>
        )}
      </Pressable>
    );
  };

  return (
    <View style={styles.main_container}>
      <View style={styles.display_conainer}>
        <View tyle={styles.auto_complete_conainer}>
          <Text></Text>
        </View>
        <View style={styles.number_conainer}>
          <Text style={styles.text}>{dialed}</Text>
        </View>
      </View>
      <View style={styles.dialer_container}>
        <View style={styles.row}>
          <View>
            <CustomButton label={1}></CustomButton>
          </View>
          <View>
            <CustomButton label={2}></CustomButton>
          </View>
          <View>
            <CustomButton label={3}></CustomButton>
          </View>
        </View>

        <View style={styles.row}>
          <View>
            <CustomButton label={4}></CustomButton>
          </View>
          <View>
            <CustomButton label={5}></CustomButton>
          </View>
          <View>
            <CustomButton label={6}></CustomButton>
          </View>
        </View>
        <View style={styles.row}>
          <View>
            <CustomButton label={7}></CustomButton>
          </View>
          <View>
            <CustomButton label={8}></CustomButton>
          </View>
          <View>
            <CustomButton label={9}></CustomButton>
          </View>
        </View>
        <View style={styles.row}>
          <View>
            <CustomButton label={"#"}></CustomButton>
          </View>
          <View>
            <CustomButton label={"0"}></CustomButton>
          </View>
          <View>
            <CustomButton label={"*"}></CustomButton>
          </View>
        </View>
        <View style={styles.row_call}>
          <View
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <View>
              <CustomButton label={""}></CustomButton>
            </View>

            <View>
              <Pressable style={styles.call} onPress={() => call()}>
                <Ionicons name={"call-outline"} size={25} color={"#fff"} />
              </Pressable>
            </View>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomButton icon={1} del={true}></CustomButton>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main_container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  display_conainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
  },
  auto_complete_conainer: {
    display: "flex",
    height: 200,
    backgroundColor: "white",
  },
  number_conainer: {
    display: "flex",
    padding: 10,
    height: 80,
    backgroundColor: "#fff",
  },
  dialer_container: {
    display: "flex",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 1,
    gap: 10,
  },
  key: {
    display: "flex",
    height: 50,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "00FFFFFF",
  },
  pressed: {
    display: "flex",
    height: 50,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dbdbd9",
  },
  text: {
    fontSize: 40,
    color: "#2196f3",
  },
  row_call: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    gap: 10,
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

export default DialerScreen;
