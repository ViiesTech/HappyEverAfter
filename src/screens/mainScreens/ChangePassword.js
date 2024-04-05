import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Toast from 'react-native-toast-message'

const ChangePassword = ({ navigation }) => {
    const [isloading, setIsLoading] = useState(false)
    const userDetails = useSelector((state) => state.user.user);
    const showToast = (type, message) => {
        Toast.show({
            type: type,
            text1: message,
        });
    };

    const [form, setForm] = useState({
        currPass: '',
        newPass: '',
        confirmNewPass: ''
    })
    const onChangeText = (changedText, key) => {
        setForm(oldForm => {
            return { ...oldForm, [key]: changedText };
        });
    };
    const handleChangePassword = () => {
        setIsLoading(true)
        console.log('old', form.confirmNewPass)
        let data = JSON.stringify({
            "currentPassword": form.currPass,
            "newPassword": form.newPass,
            "confirmNewPassword": form.confirmNewPass
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://appsdemo.pro/happyeverafter/user/update-password',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userDetails.token}`
            },
            data: data
        };
        if (form.currPass && form.newPass && form.confirmNewPass) {

            axios.request(config)
                .then((response) => {
                    setIsLoading(false)
                    if (response.data.success) {
                        showToast('success', response.data.message)

                    } else {
                        showToast('error', response.data.message)

                    }
                    console.log(".then response", JSON.stringify(response.data));
                })
                .catch((error) => {
                    setIsLoading(false)
                    showToast('error', error.message)

                    console.log(".catch response", error);
                });
        } else {
            setIsLoading(false)
            return showToast('error', 'Plz Fill The Required Fields')
        }

    }
    return (
        <View style={{ padding: 20 }}>
            <TouchableOpacity style={{ height: 20, width: 20 }} onPress={() => navigation.goBack()}>
                <AntDesign size={25} color={'black'} name='arrowleft' />
            </TouchableOpacity>
            <Text style={{ fontSize: 18, color: 'black', marginTop: 20 }}>Change Password</Text>

            <View style={{ marginTop: 50, gap: 10 }}>
                <View>
                    <Text>Current Password</Text>
                    <TextInput onChangeText={changedText => onChangeText(changedText, 'currPass')} secureTextEntry={true} placeholder='● ● ● ● ● ● ●' style={{ borderBottomWidth: 1, borderColor: 'grey' }} />
                </View>

                <View>
                    <Text>New Password</Text>
                    <TextInput onChangeText={changedText => onChangeText(changedText, 'newPass')} secureTextEntry={true} placeholder='● ● ● ● ● ● ●' style={{ borderBottomWidth: 1, borderColor: 'grey' }} />
                </View>

                <View>
                    <Text>Confirm New Password</Text>
                    <TextInput onChangeText={changedText => onChangeText(changedText, 'confirmNewPass')} secureTextEntry={true} placeholder='● ● ● ● ● ● ●' style={{ borderBottomWidth: 1, borderColor: 'grey' }} />
                </View>

            </View>
            <TouchableOpacity onPress={handleChangePassword} style={{ marginTop: 40,justifyContent:'center' ,backgroundColor: '#007bff', borderRadius: 15, width: '100%', alignItems: 'center',height:60}}>
                {
                    isloading ? (
                        <ActivityIndicator color={'white'} size={'large'} />
                    ) : (
                        <Text style={{ color: 'white', fontSize: 16 }}>
                            Update Password
                        </Text>
                    )
                }

            </TouchableOpacity>
        </View>
    )
}

export default ChangePassword