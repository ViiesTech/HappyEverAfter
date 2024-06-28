import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import {baseUrl} from '../../assets/Utils/BaseUrl';
import {HandleChangePassword} from '../../globalFunctions/ChangePassword';

const ChangePassword = ({navigation}) => {
  const [isloading, setIsLoading] = useState(false);
  const userDetails = useSelector(state => state.user.user);
  const showToast = (type, message) => {
    Toast.show({
      type: type,
      text1: message,
    });
  };

  const [form, setForm] = useState({
    currPass: '',
    newPass: '',
    confirmNewPass: '',
  });
  const onChangeText = (changedText, key) => {
    setForm(oldForm => {
      return {...oldForm, [key]: changedText};
    });
  };
  const handleChangePassword = async () => {
    setIsLoading(true);
    console.log('old', form.confirmNewPass);

    if (form.currPass && form.newPass && form.confirmNewPass) {
      try {
        const response = await HandleChangePassword(
          form.currPass,
          form.newPass,
          form.confirmNewPass,
          userDetails.token,
        );
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      return showToast('error', 'Plz Fill The Required Fields');
    }
  };
  return (
    <ScrollView contentContainerStyle={{padding: 20}}>
      <TouchableOpacity
        style={{height: 20, width: 20}}
        onPress={() => navigation.goBack()}>
        <AntDesign size={25} color={'black'} name="arrowleft" />
      </TouchableOpacity>
      <Text style={{fontSize: 18, color: 'black', marginTop: 20}}>
        Change Password
      </Text>

      <View style={{marginTop: 50}}>
        <View>
          <Text style={{color:'black'}}>Current Password</Text>
          <TextInput
            onChangeText={changedText => onChangeText(changedText, 'currPass')}
            secureTextEntry={true}
            placeholderTextColor={'gray'}
            placeholder="● ● ● ● ● ● ●"
            style={{borderBottomWidth: 1, borderColor: 'grey', marginTop: 10,color:'gray'}}
          />
        </View>

        <View style={{marginTop: 20}}>
          <Text style={{color:'black'}}>New Password</Text>
          <TextInput
            onChangeText={changedText => onChangeText(changedText, 'newPass')}
            secureTextEntry={true}
            placeholderTextColor={'gray'}

            placeholder="● ● ● ● ● ● ●"
            style={{borderBottomWidth: 1, borderColor: 'grey', marginTop: 10,color:'gray'}}
          />
        </View>

        <View style={{marginTop: 20}}>
          <Text style={{color:'black'}}>Confirm New Password</Text>
          <TextInput
            placeholderTextColor={'gray'}

            onChangeText={changedText =>
              onChangeText(changedText, 'confirmNewPass')
            }
            secureTextEntry={true}
            placeholder="● ● ● ● ● ● ●"
            style={{borderBottomWidth: 1, borderColor: 'grey', marginTop: 10,color:'gray'}}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={handleChangePassword}
        style={{
          marginTop: 40,
          justifyContent: 'center',
          backgroundColor: '#007bff',
          borderRadius: 15,
          width: '100%',
          alignItems: 'center',
          height: 60,
        }}>
        {isloading ? (
          <ActivityIndicator color={'white'} size={'large'} />
        ) : (
          <Text style={{color: 'white', fontSize: 16}}>Update Password</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ChangePassword;
