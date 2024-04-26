import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS } from '../../Components/utils/constants';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { Colors } from '../../Components/styles';

const UserProfile = ({ navigation, route }) => {
    console.log('routes', route.params.userId)
    const userDetails = route.params.userId
    console.log('details', userDetails);
    return (
        <View style={{ flex: 1, padding: 15 }}>
            <TouchableOpacity style={{ height: 30, width: 30 }} onPress={() => navigation.goBack()}>
                <AntDesign name='arrowleft' size={25} color={Colors.black} />
            </TouchableOpacity>
            <View style={{ marginTop: 20, alignSelf: 'center' }}>

                <Image style={{ width: 200, height: 200, borderRadius: 100, borderWidth: 2, borderColor: 'black' }} resizeMode='cover' source={{ uri: userDetails.withSticker.uri }} />
            </View>
            <View style={{ flexDirection: 'row', gap: 20, marginTop: 40 }}>
                <Text style={{ color: Colors.black, fontSize: 18, fontWeight: '600' }}>Name :</Text>
                <Text style={{ color: Colors.black, fontSize: 18, }}>{userDetails.name}</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 20, marginTop: 20 }}>
                <Text style={{ color: Colors.black, fontSize: 18, fontWeight: '600' }}>Country :</Text>
                <Text style={{ color: Colors.black, fontSize: 18, }}>{userDetails.country}</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 20, marginTop: 20 }}>
                <Text style={{ color: Colors.black, fontSize: 18, fontWeight: '600' }}>Occupation :</Text>
                <Text style={{ color: Colors.black, fontSize: 18, }}>{userDetails.occupation}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('ChatScreen', { userDetails: userDetails })} style={{ flexDirection: 'row', gap: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2C68FF', height: 50, width: '45%', alignSelf: 'center', borderRadius: 10, marginTop: 30 }}>
                <Fontisto name='messenger' color={'white'} size={20} />
                <Text style={{ color: COLORS.white, fontSize: 14, fontWeight: '600' }}>Send Message</Text>
            </TouchableOpacity>
        </View>
    );
};

export default UserProfile;
