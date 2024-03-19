import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AuthStack from './AuthStack'
import MainStack from './MainStack'
import { useSelector } from 'react-redux'

const Stack = createNativeStackNavigator()
const Routes = () => {
    const userToken = useSelector(state => state.user.token)

    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName='AuthStack' screenOptions={{ headerShown: false }}>
                {
                    userToken ? (
                        <Stack.Screen name='MainStack' component={MainStack}></Stack.Screen>

                    ) : (

                        <Stack.Screen name='AuthStack' component={AuthStack}></Stack.Screen>
                    )
                }

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes