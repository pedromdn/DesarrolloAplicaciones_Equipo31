import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import  FavoritesScreen  from '../Screens/FavoritesScreen';
import RecentScreen from '../Screens/RecentScreen';
import Ionicons from 'react-native-vector-icons/Ionicons'

import StackNavigator1 from './StackNavigator1'

const Tab  = createBottomTabNavigator();

export default function BottomTabNavigator1(){
    return(
        <Tab.Navigator
        initialRouteName="Contactos"
        screenOptions={{ 
            tabBarActiveTintColor: '#2196f3',
            tabBarInactiveTintColor:"#060606",
            tabBarShowLabel:true,
            tabBarLabelStyle:{
                fontSize:12
            },
            tabBarStyle:{//style
                paddingBottom:5,
                backgroundColor:"#f3f3f1"
            },
             headerShown: true 

        }}
        >
          <Tab.Screen
            name='Contactos'
            component={StackNavigator1}
            options={{
                tabBarIcon:({color})=>(
                    <Ionicons name={"people-circle"} size={25} color={color}/>
                ),
                headerShown: false
            }}>
            </Tab.Screen> 
            <Tab.Screen
            name='Recientes'
            component={RecentScreen}
            options={{
                tabBarIcon:({color})=>(
                    <Ionicons name={"time-outline"} size={25} color={color}/>
                )
            }}>
            </Tab.Screen> 
            <Tab.Screen
            name='Favoritos'
            component={FavoritesScreen}
            options={{
                tabBarIcon:({color})=>(
                    <Ionicons name={"star-outline"} size={25} color={color}/>
                )
            }}>
            </Tab.Screen>
        </Tab.Navigator>

    )
}