import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    StyleSheet,
  } from 'react-native';
  import React, { useState } from 'react';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import Entypo from 'react-native-vector-icons/Entypo';
  
  const EnterText = ({placeholder, value, setValue, secure=false, style, type=null, keyboardType, multiline=false}) => {
    const [hidePassword, setHidePassword] = useState(secure)
    
    return (
      <View style={[styles.inputContainer, style]}>
        <TextInput multiline={multiline} keyboardType={keyboardType} value={value} onChangeText={setValue} placeholder={placeholder} secureTextEntry={hidePassword} style={{width: '100%'}} />
        {
          type === 'password' ? (
            <TouchableOpacity onPress={() => setHidePassword(!hidePassword)} style={{marginLeft: -wp('8%'), padding: 8}}>
              {
                hidePassword ? (
                  <Entypo name='eye-with-line' size={20} color={'black'} />
                ) : (
                  <Entypo name='eye' size={20} color={'black'} />
                )
              }       
            </TouchableOpacity>
          ) : null
        }
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    inputContainer: {
      width: '100%',
      alignSelf: 'center',
      backgroundColor: 'lightgrey',
      borderRadius: 10,
      height: 60,
      flexDirection: 'row',
      paddingHorizontal: 10,
      alignItems: 'center'
    },
  });
  
  export default EnterText;
  