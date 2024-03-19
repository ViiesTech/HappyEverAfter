import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/authScreens/Login';
import Signup from '../screens/authScreens/Signup';
import Home from '../screens/mainScreens/Home';
import LikedPeople from '../screens/mainScreens/LikedPeople';
import Chat from '../screens/mainScreens/ChatList';
import Profile from '../screens/mainScreens/Profile';
import BottomStack from './BottomStack';
import Subscription from '../screens/mainScreens/Subscription';
import EditProfile from '../screens/mainScreens/EditProfile';
import ChatScreen from '../screens/mainScreens/ChatScreen';
import WhatULooking from '../screens/mainScreens/WhatULooking';
const Stack = createNativeStackNavigator()


const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName='WhatULooking' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='BottomStack' component={BottomStack} />
      <Stack.Screen name='ChatScreen' component={ChatScreen} />
      <Stack.Screen name='Suscription' component={Subscription} />
      <Stack.Screen name='EditProfile' component={EditProfile} />
      <Stack.Screen name='WhatULooking' component={WhatULooking} />


    </Stack.Navigator>
  )
}

export default MainStack