import { Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useEffect, useState, } from 'react'
import UserCard from '../../Components/UserCard';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Modal from "react-native-modal";
import Cross from 'react-native-vector-icons/Entypo'
import { useSelector } from 'react-redux';

const Home = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(true)
    const userDetails = useSelector(state => state.user.user)
    useEffect(()=>{
console.log('redux user', userDetails)
    },[])
    console.log('userdetailsss', userDetails.image)
    const [allUsers, setAllUsers] = useState([
        { uid: 1, withSticker: require('../../assets/images/backgroun1.png'), name: "James" },
        { uid: 2, withSticker: require('../../assets/images/background8.png'), name: "Michael" },
        { uid: 3, withSticker: require('../../assets/images/background9.png'), name: "Alexa" },
        { uid: 4, withSticker: require('../../assets/images/backgroun1.png'), name: "Perry" },
        { uid: 5, withSticker: require('../../assets/images/backgroun1.png'), name: "Johnson" },
        { uid: 6, withSticker: require('../../assets/images/backgroun1.png'), name: "Ferry" },
        { uid: 7, withSticker: require('../../assets/images/backgroun1.png'), name: "John" },
        { uid: 8, withSticker: require('../../assets/images/backgroun1.png'), name: "Franklin" },
        { uid: 9, withSticker: require('../../assets/images/backgroun1.png'), name: "Sam" }
    ]);
    const onSwipe = (direction, uid) => {
        console.log("direction", direction + 1)

    }
    const data = [
        {
            id: 1,
            name: 'USA'
        },
        {
            id: 2,
            name: 'England'
        },
        {
            id: 3,
            name: 'Australia'
        },
        {
            id: 4,
            name: 'Canada'
        },
        {
            id: 5,
            name: 'Russia'
        },
        {
            id: 6,
            name: 'Brazil'
        },
        {
            id: 7,
            name: 'Phillipine'
        },
        {
            id: 8,
            name: 'India'
        },
        {
            id: 9,
            name: 'Argentina'
        },
        {
            id: 10,
            name: 'Bangladesh'
        },
        {
            id: 11,
            name: 'Austria'
        },
        {
            id: 12,
            name: 'Germany'
        },
        {
            id: 13,
            name: 'France'
        },
        {
            id: 14,
            name: 'SriLanka'
        },
        {
            id: 15,
            name: 'China'
        },
        {
            id: 16,
            name: 'North Korea'
        },
        {
            id: 17,
            name: 'South Korea'
        },
        {
            id: 18,
            name: 'Pakistan'
        },
        {
            id: 19,
            name: 'Hungary'
        },
        {
            id: 20,
            name: 'Kenya'
        },
        {
            id: 21,
            name: 'South Africa'
        },
        {
            id: 22,
            name: 'Afghanistan'
        },

    ]
    const renderItem = ({ item }) => {
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => {
                    setModalVisible(!modalVisible)
                    navigation.navigate('Suscription')
                }} style={{ margin: 10 }}>
                    <Text style={{ color: 'white', fontSize: 18, }}>{item.name}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, alignItems: 'center', marginTop: hp('20%'), }}>

                <View style={{ marginTop: -hp('15%'), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={{ uri: `https://appsdemo.pro/happyeverafter/${userDetails.image}` }} style={{ height: 50, width: 50, borderRadius: 200, backgroundColor: 'lightgrey', borderWidth: 1.5, borderColor: 'gray' }} />
                        <Text style={{ fontWeight: 'bold', fontSize: hp('2.8%'), color: 'black', marginLeft: 10 }}>
                            Discover
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('LikedPeople')}>
                        <EvilIcons
                            name={'bell'}
                            color={'black'}
                            size={30}
                        />
                    </TouchableOpacity>
                </View>
                <Modal isVisible={modalVisible} backdropOpacity={0}>
                    <View style={{ backgroundColor: 'black', height: 600, borderRadius: 20, width: '100%', padding: 15 }}>
                        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={{ position: 'absolute', right: 0, padding: 10 }}>
                            <Cross name='cross' color={'white'} size={30} />

                        </TouchableOpacity>
                        <View>
                            <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', marginTop: 25, textAlign: 'center' }}>Select A City Name</Text>
                        </View>

                        <View style={{ marginTop: 20, flex: 1 }}>
                            <FlatList contentContainerStyle={{ paddingBottom: 10 }} data={data} renderItem={renderItem} />
                        </View>
                    </View>
                </Modal>
                {
                    allUsers.map((user, index) => {
                        return (
                            <View key={index} style={{ position: 'absolute', top: 0 }}  >
                                <UserCard
                                    userId={user.uid}
                                    onSwipe={onSwipe}
                                    cards={user}
                                // userData={data}
                                />
                            </View>
                        )
                    })
                }

                <View style={{ flexDirection: 'row', position: 'absolute', bottom: hp('2%'), width: wp('50%'), alignSelf: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity style={{ height: 50, width: 50, borderRadius: 200, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'white', backgroundColor: 'black' }}>
                        <Entypo
                            name={"cross"}
                            color={'white'}
                            size={30}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ height: 70, width: 70, borderRadius: 200, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'white', backgroundColor: 'black' }}>
                        <AntDesign
                            name={"heart"}
                            color={'red'}
                            size={30}

                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ height: 50, width: 50, borderRadius: 200, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'white', backgroundColor: 'black' }}>
                        <AntDesign
                            name={"star"}
                            color={'white'}
                            size={25}

                        />
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    )
}

export default Home

