import React, { useEffect, useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { useSelector } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import BottomStack from './BottomStack';
import Notifications from '../screens/mainScreens/Notifications';

const Stack = createNativeStackNavigator();

const Routes = () => {
    const userToken = useSelector((state) => state.user.token);
    const navigateRef = useRef(null);

    useEffect(() => {
        const handleNotificationOpened = (remoteMessage) => {
            console.log('app opened by clicking on notification', remoteMessage);
            navigateRef.current?.navigate('BottomStack', { screen: 'Notifications' });
        };

        const unsubscribeOpened = messaging().onNotificationOpenedApp(handleNotificationOpened);

        messaging()
            .getInitialNotification()
            .then((remoteMessage) => {
                if (remoteMessage) {
                    console.log('app opened from quit state', remoteMessage);
                    navigateRef.current?.navigate('BottomStack', { screen: 'Notifications' });
                }
            });

        return () => {
            unsubscribeOpened();
        };
    }, []);

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
