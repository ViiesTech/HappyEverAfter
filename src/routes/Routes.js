import React, { useEffect, useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { useSelector } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import BottomStack from './BottomStack';
import Notifications from '../screens/mainScreens/Notifications';
import UserProfile from '../screens/mainScreens/UserProfile';

const Stack = createNativeStackNavigator();

const Routes = () => {
    const userToken = useSelector((state) => state.user.token);
    const navigateRef = useRef(null);

 
    return (
        <NavigationContainer ref={navigateRef}>
            <Stack.Navigator initialRouteName="AuthStack" screenOptions={{ headerShown: false }}>
                {userToken ? (
                    <>
                        <Stack.Screen name="MainStack" component={MainStack} />
                        <Stack.Screen name="BottomStack" component={BottomStack} />
                        <Stack.Screen name="Notifications" component={Notifications} />

                    </>
                ) : (
                    <Stack.Screen name="AuthStack" component={AuthStack} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;
