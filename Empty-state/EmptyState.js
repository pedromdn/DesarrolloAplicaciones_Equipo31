import {
    View,
    Text,
    Button,
    TextInput,
    ScrollView,
    StyleSheet,
  } from "react-native";
  import Ionicons from "react-native-vector-icons/Ionicons";
  
const EmptyState = ({icon,text}) => {
    return (
      <View style={styles.empty_container}>
        <Ionicons
          name={icon}
          size={55}
          color={"#D3D3D3"}
          onPress={() => alert("fav")}
        />
        <Text>{text}</Text>
      </View>
    );
  };
  const styles = StyleSheet.create({
    empty_container:{
      display:'flex',
      flex:1,
      alignContent: 'center',
      alignItems: 'center',
      justifyContent:'center',
      gap:24,
  
    }
  })
  export default EmptyState;