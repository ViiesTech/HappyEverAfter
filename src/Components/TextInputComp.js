import {StyleSheet } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper'
import { Colors} from '../Components/styles'
const { input } = Colors;
const TextInputComp = (props) => {
    return <TextInput  {...props}  style={{...style.shadow,...style.password,...props.style}}/>
}
const style = StyleSheet.create({
  shadow: {
    shadowColor: input,
    shadowRadius: 10,
    shadowOffset: 0.6,
    elevation: 8,
    shadowOffset: { width: 0, height: 4 }
  },
  password: {
    width: '100%', height: 60, backgroundColor: 'white', borderWidth: 1, borderColor: input,
    borderRadius: 10
  }
})
export default TextInputComp