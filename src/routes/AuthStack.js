import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/authScreens/Login';
import Signup from '../screens/authScreens/Signup';
import SignUp2 from '../screens/authScreens/Signup2';
import Splash from '../screens/authScreens/Splash';
import Sliders from '../screens/authScreens/Sliders';
import Signup3 from '../screens/authScreens/Signup3';
const Stack = createNativeStackNavigator()

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName='Splash' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Splash' component={Splash} />
      <Stack.Screen name='Sliders' component={Sliders} />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Signup' component={Signup} />
      <Stack.Screen name='Signup2' component={SignUp2} />
      <Stack.Screen name='Signup3' component={Signup3} />

    </Stack.Navigator>
  )
}

export default AuthStack