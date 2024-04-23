import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import Routes from './src/routes/Routes'
import { Provider } from 'react-redux'
import { store } from './src/redux/Store'
import Toast from 'react-native-toast-message'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import socketServices from './socket/Socket_Service'
import messaging from '@react-native-firebase/messaging';

const App = () => {
  useEffect(() => {
    socketServices.initiaize()
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

      <Provider store={store}>
        <SafeAreaView style={{ flex: 1 }}>
          <Routes />
        </SafeAreaView>
        <Toast />
      </Provider>
    </GestureHandlerRootView>
  )
}

export default App