import { View, Text, Image, StyleSheet, ScrollView, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'

import { StyledContainer, Colors, ScreenTitle, HeaderContainer, TextLabel, Card, TextSmall, StyledTextInput, StyledButtonTouch } from '../../Components/styles'
import Icon from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import { Images } from '../../assets/images/Appassets';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TextInputComp from '../../Components/TextInputComp';
import { TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';

const SignUp = ({ navigation }) => {
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [UserName, setUserName] = useState('');
    const [Password, setPassword] = useState('');
    const [characterLength, setCharacterLength] = useState(false);
    const [includeNumber, setIncludeNumber] = useState(false)
    const [includeSymbols, setSymbols] = useState(false)



    const [form, setForm] = useState({
        email: '',
        password: '',
    });


    const onChangeText = (changedText, key) => {
        console.log('changedText', changedText)
        setForm(oldForm => {
            return { ...oldForm, [key]: changedText };
        });
    };


    const HandleSignUp = () => {

        navigation.navigate("Login")
    }


    const showToast = (type, message) => {
        Toast.show({
            type: type,
            text1: message,
        });
    }



    return (
        <ImageBackground style={{ flex: 1 }} source={require('../../assets/images/login.png')}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <StyledContainer>

                    <HeaderContainer style={styles.headerContainer}>
                        <Text style={{ color: 'red', fontSize: 20, fontWeight: 'bold' }}>Sign up</Text>
                        <TextSmall style={{ color: 'white' }}>STEP 1/3</TextSmall>
                    </HeaderContainer>
                    <Card style={styles.card}>
                        <StyledButtonTouch style={{ backgroundColor: 'transparent' }} >
                            <View style={[styles.facbook, styles.buttonShadow]}>
                                <TextSmall style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>Facebook</TextSmall>
                            </View>
                        </StyledButtonTouch>
                        <StyledButtonTouch style={{ backgroundColor: 'transparent' }}>
                            <TouchableOpacity style={styles.google} >
                                <ImageBackground source={Images.map} resizeMode="cover" style={styles.image}>
                                    <TextSmall style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>Google</TextSmall>
                                </ImageBackground>
                            </TouchableOpacity>
                        </StyledButtonTouch>
                    </Card>
                    <Card style={styles.input}>
                        <TextLabel style={{ marginTop: 10, color: 'white', fontSize: 20, fontWeight: 'bold' }}>Email adress</TextLabel>
                        <TextInput
                            style={{ width: '100%', height: 35, border: 'none', backgroundColor: 'white', borderRadius: 10, padding: 15 }}
                            placeholder="Enter email address"
                            autoCapitalize='none'
                            keyboardType='email-address'
                            onChangeText={changedText => onChangeText(changedText, 'email')}
                        />
                    </Card>
                    <Card style={styles.input}>
                        <TextLabel style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Password</TextLabel>
                        <View style={{ width: '100%' }}>
                            <TextInput
                                placeholder='password'
                                secureTextEntry={passwordVisible}
                                onChangeText={changedText =>
                                    onChangeText(changedText, 'password')
                                }
                                style={{ marginTop: 10, height: 35, border: 'none', backgroundColor: 'white', borderRadius: 10, padding: 15 }}

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
                    </Card>
                    <View style={styles.errorView}>
                        <View style={styles.error}>
                            <Text style={characterLength ? { color: 'white', fontSize: 18, fontWeight: 'bold' } : { color: 'red', fontSize: 18, fontWeight: 'bold' }}>+ 8 characters</Text>
                            <Text style={includeSymbols ? { color: 'white', fontSize: 18, fontWeight: 'bold' } : { color: 'red', fontSize: 18, fontWeight: 'bold' }}>+ 1 symbols</Text>
                        </View>
                        <View style={styles.error}>
                            <Text style={includeNumber ? { color: 'white', fontSize: 18, fontWeight: 'bold' } : { color: 'red', fontSize: 18, fontWeight: 'bold' }}>+ 1 number</Text>
                            <Text style={{ color: 'red', fontSize: 16, fontWeight: 'bold' }}>* get our password</Text>
                        </View>
                    </View>
                    <Card style={{ paddingTop: hp('5%') }}>
                        <StyledButtonTouch style={{ backgroundColor: 'transparent' }} onPress={() => {

                            if (form.email && form.password) {
                                if (form.password.length > 7) {
                                    navigation.navigate('Signup2', { userData: { email: form.email, password: form.password } });
                                } else {
                                    return showToast('error', 'Password Must Be Eight Characters')
                                }
                            } else {
                                return showToast('error', 'Plz Fill Out The Required Fields')
                            }
                            // }

                        }}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FF4500', '#8B0000']} style={styles.buttonStyle}>
                                <TextSmall style={[styles.next, { color: 'white' }]}>Continue</TextSmall>
                            </LinearGradient>
                        </StyledButtonTouch>
                    </Card>
                    <TextSmall style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }} onPress={() => navigation.navigate('Login')}>Already have an account?<Text style={{ color: 'red', fontSize: 18, fontWeight: 'bold' }}>  Signin</Text></TextSmall>
                </StyledContainer>
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
    card: {
        flexDirection: 'row',
        width: wp('90%'),
        top: 10,
    },
    facbook: {
        width: wp('45%'),
        height: 60,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderWidth: 1,
    },
    google: {
        width: wp('45%'),
        height: 60,
        backgroundColor: 'white',

        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderWidth: 1,
    },
    buttonStyle: {
        width: wp('90%'),
        height: 60,
        justifyContent: 'center',
        backgroundColor: 'rgba(85,22,165,0.5)',
        borderRadius: 50,
    },
    image: {
        flex: 1,
        justifyContent: "center",
        width: wp('45%')
    },
    input: {
        marginTop: 20
    },
    errorView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp('75%'),
        height: hp('15%'),
        top: 30,
    },
    error: {
        justifyContent: 'flex-start',
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
export default SignUp