import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomStack from './BottomStack';
import Subscription from '../screens/mainScreens/Subscription';
import EditProfile from '../screens/mainScreens/EditProfile';
import ChatScreen from '../screens/mainScreens/ChatScreen';
import WhatULooking from '../screens/mainScreens/WhatULooking';
import messaging from '@react-native-firebase/messaging';
import ChangePassword from '../screens/mainScreens/ChangePassword';
import { useSelector } from 'react-redux';
import UserProfile from '../screens/mainScreens/UserProfile';

const Stack = createNativeStackNavigator();

const MainStack = ({ navigation }) => {
  const formStatus = useSelector(state => state.user.formStatus)
  const subscriptionPlan = useSelector(state => state.user.subscriptionPlan)
  console.log('formStatus', formStatus)
  // Add navigation as a dependency

  return (
    <Stack.Navigator initialRouteName={'WhatULooking'} screenOptions={{ headerShown: false }}>
      {formStatus == 0 ? (
        <Stack.Screen name='WhatULooking' component={WhatULooking} />
      ) : (
        <>
          {subscriptionPlan !== "Basic" ? (
            <>
              <Stack.Screen name='BottomStack' component={BottomStack} />
              <Stack.Screen name='ChatScreen' component={ChatScreen} />
              <Stack.Screen name='Subscription' component={Subscription} />
              <Stack.Screen name='EditProfile' component={EditProfile} />
              <Stack.Screen name='ChangePassword' component={ChangePassword} />
              <Stack.Screen name='UserProfile' component={UserProfile} />
            </>
          ) : (
            <>
            <Stack.Screen name='Subscription' component={Subscription} />
            <Stack.Screen name='ChangePassword' component={ChangePassword} />
            </>
            
          )}
        </>
      )}

    </Stack.Navigator>
  );
};

export default MainStack;
