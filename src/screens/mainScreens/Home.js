import { Text, View, TouchableOpacity, Image, FlatList, ActivityIndicator, } from 'react-native'
import React, { useEffect, useState } from 'react'
import Modal from "react-native-modal";
import UserCard from '../../Components/UserCard';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { useSelector } from 'react-redux';
import axios from 'axios';
import io from 'socket.io-client';
import Toast from 'react-native-toast-message';
import { baseUrl } from '../../assets/Utils/BaseUrl';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import socketServices from '../../../socket/Socket_Service';
import messaging from '@react-native-firebase/messaging';

const Home = ({ navigation, route }) => {

    const userDetails = useSelector(state => state.user.user)
    const [isLoading, setIsLoading] = useState(false)
    const userId = userDetails._id
    const [allUsers, setAllUsers] = useState([]);
    const [showNoUsers, setNoUsers] = useState(false)
    const [modalVisible, setModalVisible] = useState(true)
    const [showModal, setShowModal] = useState(true)
    const [fcmToken, setFcmToken] = useState()
    // useEffect(() => {
    //     console.log('userdetailsss', userDetails)
    //     // const checkToken = async () => {
    //     //     const fcmToken = await messaging().getToken();
    //     //     console.log('fcm')
    //     //     if (fcmToken) {
    //     //         setFcmToken(fcmToken)
    //     //         console.log('fcm token', fcmToken);
    //     //     }
    //     // };

    //     // checkToken();
    //     // socketServices.emit('login', { ...userDetails, fcmToken });

    // }, []);

    const getAllUsers = () => {
        setIsLoading(true)
        let data = '';

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/get-all-users`,
            headers: {
                'Authorization': `Bearer ${userDetails.token}`
            },
            data: data
        };

        axios.request(config)
            .then((response) => {

                setIsLoading(false)
                const data = response.data
                if (route.params?.country) {
                    const users = data.message.map((area, index) => {
                        if (area.country === route.params?.country) {
                            const imageUrl = `https://appsdemo.pro/happyeverafter/${area.image}`;
                            const isLiked = checkLiked(area.isLike, userId);
                            return {
                                uid: index,
                                withSticker: { uri: imageUrl },
                                name: area.name,
                                _id: area._id,
                                occupation: area?.occupation,
                                isLiked: isLiked,
                                country: area?.country
                            };
                        }
                        return null;
                    }).filter(user => user !== null);
                    setAllUsers(users);
                    console.log("filtered users", users)
                    {
                        users.length < 1 ?
                            (
                                setModalVisible(false),
                                showToast('info', `No Users In ${route.params?.country
                                    }`)
                            )
                            :
                            (setModalVisible(true))
                    }
                }
                else {
                    const data = response.data
                    data.message.map((area, index) => {
                        const imageUrl = `https://appsdemo.pro/happyeverafter/${area.image}`;
                        const isLiked = checkLiked(area.isLike, userId);
                        setAllUsers((prevUsers) => [
                            ...prevUsers,
                            {
                                uid: index,
                                withSticker: {
                                    uri: imageUrl,
                                },
                                name: area.name,
                                _id: area._id,
                                occupation: area?.occupation,
                                isLiked: isLiked,
                                country: area?.country
                            },
                        ]);
                    });
                }

            })
            .catch((error) => {
                setIsLoading(false)
                console.log(error);
            });
    }


    useEffect(() => {
        setNoUsers(false)
        console.log('params', route.params);
        setAllUsers([])
        getAllUsers()
        console.log('allusers', allUsers.length)
        // allUsers.length > 1 ? setModalVisible(true) : null
    }, [route.params?.stateChange]);

    const showToast = (type, message) => {
        Toast.show({
            type: type,
            text1: message,
        });
    };

    const checkLiked = (isLikeArray, userIdToCheck) => {
        return isLikeArray.includes(userIdToCheck);
    }

    const onSwipe = (direction) => {
        allUsers.pop()
        console.log("users", allUsers)
        if (allUsers.length < 1) {
            setNoUsers(true)
            showToast('info', "User List Finished")
        }
        console.log("set user state", showNoUsers)
    }

    return (
        <View style={{ flex: 1 }}>

            {/* {
                showModal ?
                    ( */}

            {/* ) : null
            } */}

            <View style={{ flex: 1, alignItems: 'center', marginTop: hp('20%'), zIndex: 150 }}>

                <View style={{ marginTop: -hp('15%'), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={{ uri: `https://appsdemo.pro/happyeverafter/${userDetails.image}` }} style={{ height: 50, width: 50, borderRadius: 200, backgroundColor: 'lightgrey', borderWidth: 1.5, borderColor: 'gray' }} />
                        <Text style={{ fontWeight: 'bold', fontSize: hp('2.8%'), color: 'black', marginLeft: 10 }}>
                            Discover
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
                        <EvilIcons
                            name={'bell'}
                            color={'black'}
                            size={30}
                        />
                    </TouchableOpacity>
                </View>

                {isLoading ? (
                    <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center', zIndex: 150, }}>
                        <ActivityIndicator size={'25'} />
                    </View>
                ) : (
                    <Modal style={{ height: '100%', position: 'absolute', zIndex: 100, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }} backdropOpacity={0} isVisible={modalVisible}>


                        <View style={{ backgroundColor: 'white', zIndex: 100, padding: 40, borderRadius: 10, alignItems: 'center', gap: 20 }}>
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={{ position: 'absolute', alignSelf: 'flex-end', padding: 10 }}>
                                <MaterialIcons name='cancel' size={25} />
                            </TouchableOpacity>
                            <Text style={{ color: 'black', fontSize: 20, textAlign: 'center' }}>Want To Buy Subscription?</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                                <TouchableOpacity onPress={() => setModalVisible(false)} style={{ backgroundColor: 'rgb(0, 123, 255)', padding: 10, width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}><Text style={{ color: 'white', fontSize: 18 }}>No</Text></TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate('Suscription')
                                    setModalVisible(false)
                                }} style={{ backgroundColor: 'rgb(40, 167, 69)', padding: 10, width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}><Text style={{ color: 'white', fontSize: 18 }}>Yes</Text></TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                )}
                {
                    showNoUsers &&
                    (
                        <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 25, gap: 10, }}>Users  List  Finished</Text>
                        </View>
                    )
                }
                {allUsers.map((user, index) => {
                    return (
                        <View key={index} style={{ position: 'absolute', top: 0 }}>
                            <UserCard
                                userId={user}
                                onSwipe={onSwipe}
                                cards={user}
                            />
                        </View>
                    )
                })
                }
            </View>
        </View>
    )
}

export default Home

