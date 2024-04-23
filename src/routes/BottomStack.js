import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../screens/mainScreens/Profile';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../screens/mainScreens/Home';
import Chat from '../screens/mainScreens/ChatList';
import Map from '../screens/mainScreens/Map';
import Notifications from '../screens/mainScreens/Notifications';

const Tab = createBottomTabNavigator();

function BottomStack() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarStyle: { padding: 0, height: 60 } }}
    >
      <Tab.Screen
        options={({ route }) => ({
          tabBarIcon: ({ focused, size }) => (
            <AntDesign name="home" size={30} color={focused ? 'black' : 'gray'} />
          ),
          tabBarShowLabel: false,
        })}
        name='Home'
        component={Home}
      />

      <Tab.Screen
        options={({ route }) => ({
          tabBarIcon: ({ focused, size }) => (
            <AntDesign name="hearto" size={30} color={focused ? 'black' : 'gray'} />
          ),
          tabBarShowLabel: false,
        })}
        name='Notifications'
        component={Notifications}
      />
      <Tab.Screen
        options={({ route }) => ({
          tabBarIcon: ({ focused, size }) => (
            <MaterialCommunityIcons name="map-marker-outline" size={30} color={focused ? 'black' : 'gray'} />
          ),
          tabBarShowLabel: false,
        })}
        name='Map'
        component={Map}
      />

      <Tab.Screen
        options={({ route }) => ({
          tabBarIcon: ({ focused, size }) => (
            <Ionicons name="chatbubble-outline" size={30} color={focused ? 'black' : 'gray'} />
          ),
          tabBarShowLabel: false,
        })}
        name='Chat'
        component={Chat}
      />

      <Tab.Screen
        options={({ route }) => ({
          tabBarIcon: ({ focused, size }) => (
            <AntDesign name="user" size={30} color={focused ? 'black' : 'gray'} />
          ),
          tabBarShowLabel: false,
        })}
        name='Profile'
        component={Profile}
      />
    </Tab.Navigator>
  );
}

export default BottomStack;
