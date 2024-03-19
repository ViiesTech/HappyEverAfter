import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import Routes from './src/routes/Routes'
import { Provider } from 'react-redux'
import { store } from './src/redux/Store'
import Toast from 'react-native-toast-message'


const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <Routes />
      </SafeAreaView>
      <Toast />
    </Provider>
  )
}

export default App