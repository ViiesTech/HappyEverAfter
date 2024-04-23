import { View, Text, StyleSheet, ScrollView, ImageBackground, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import { UserLogin, makeLoadingFalse } from '../../redux/Slices';
import Toast from 'react-native-toast-message';
import { baseUrl } from '../../assets/Utils/BaseUrl';
import messaging from '@react-native-firebase/messaging';

const Login = ({ navigation }) => {
  const dispatch = useDispatch()
  const detailssss = useSelector(state => state.user)
  const isLoading = useSelector(state => state.user.isLoading)
  const [fcmToken, setFcmToken] = useState()

  useEffect(() => {
    const checkToken = async () => {
      const fcmToken = await messaging().getToken();
      console.log('fcm')
      if (fcmToken) {
        setFcmToken(fcmToken)

        console.log('fcm token', fcmToken);

      }
    };
    checkToken();
  }, []);
  useEffect(() => {
    console.log('detailllllsss', detailssss)
    dispatch(makeLoadingFalse())
  }, [])

  const [passwordVisible, setPasswordVisible] = useState(true);
  const [Message, setMessage] = useState();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const showToast = (type, message) => {
    Toast.show({
      type: type,
      text1: message,
    });
  }
  const onChangeText = (changedText, key) => {
    setForm(oldForm => {
      return { ...oldForm, [key]: changedText };
    });
  };
  const handleSignIn = () => {

    console.log("emailpass", form.email, form.password)
    let data = JSON.stringify({
      "email": form.email,
      "password": form.password,
      "fcm_token": fcmToken
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}/login`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    };
    if (form.email && form.password) {
      dispatch(UserLogin(config))

    } else {

      return showToast('error', "Plz Fill The Required Fields")

    }
  }

  return (
    <ImageBackground style={{ flex: 1 }} source={require('../../assets/images/login.png')} >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ alignItems: 'center' }}>
          <View style={{ width: wp('90%'), height: hp('30%'), alignItems: 'center', justifyContent: 'center' }}>
          </View>
          <View style={{ width: wp('90%'), height: hp('60%') }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Email</Text>
            <TextInput
              placeholder='Email Address'
              keyboardType='email-address'
              style={{ marginTop: 10, height: 60, backgroundColor: 'white', borderRadius: 10, marginBottom: 10, padding: 15 }}
              onChangeText={changedText =>
                onChangeText(changedText, 'email')
              }
            />
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Password</Text>
            <View>
              <TextInput
                placeholder='password'
                secureTextEntry={passwordVisible}
                onChangeText={changedText =>
                  onChangeText(changedText, 'password')
                }
                style={{ marginTop: 10, height: 60, backgroundColor: 'white', borderRadius: 10, padding: 15 }}

              />
              <View style={{ position: 'absolute', right: 10, top: 5, height: '100%', alignSelf: 'center', alignContent: 'center', justifyContent: 'center' }}>
                {
                  passwordVisible ? (
                    <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                      <Icon name='eye-with-line' color={'black'} size={25} />
                    </TouchableOpacity>
                  )
                    : (
                      <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                        <Icon name='eye' color={'black'} size={25} />
                      </TouchableOpacity>
                    )
                }


              </View>
            </View>
            <Text style={{ color: "red" }}>{Message}</Text>
            <View style={{ height: hp('25%'), marginTop: 20 }}>
              <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#D23073', '#C22B8D', '#AE24AC', '#9C1EC8']} style={styles.buttonStyle}>
                <TouchableOpacity style={{ backgroundColor: 'transparent', justifyContent: 'center' }}
                  onPress={() => { handleSignIn() }}>
                  <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FF4500', '#8B0000']} style={styles.buttonStyle}>
                    <Text style={[styles.next, { textAlign: 'center', color: 'white' }]}>
                      {isLoading ? <ActivityIndicator size={'large'} color={'black'} /> : 'Continue'}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </LinearGradient>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={{ marginTop: 10, gap: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <Text
                  style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
                  Create new Account?
                </Text>

                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 17 }}>
                  SignUp</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
  shadow: {
    shadowRadius: 10,
    shadowOffset: 0.6,
    elevation: 8,
    shadowOffset: { width: 0, height: 4 }
  },
  buttonStyle: {
    width: wp('90%'),
    height: 60,
    justifyContent: 'center',
    borderRadius: 50,

  },
  next: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  password: {
    width: '100%', height: 60, backgroundColor: 'white', borderWidth: 1,
    borderRadius: 10
  }
})
export default Login