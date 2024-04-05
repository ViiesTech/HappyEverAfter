import { Text, View, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import UserCard from '../../Components/UserCard';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { useSelector } from 'react-redux';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const Home = ({ navigation, route }) => {
    const userDetails = useSelector(state => state.user.user)
    console.log('userdetails', userDetails)
    const [isLoading, setIsLoading] = useState(false)
    const userId = userDetails._id
    const [allUsers, setAllUsers] = useState([]);
    const [showNoUsers, setNoUsers] = useState(false)

    const getAllUsers = () => {
        setIsLoading(true)
        let data = '';

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://appsdemo.pro/happyeverafter/user/get-all-users',
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
                        users.length < 1 &&
                            showToast('info', `No Users In ${route.params?.country}`)
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
            <View style={{ flex: 1, alignItems: 'center', marginTop: hp('20%') }}>

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

                {isLoading && (
                    <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size={'25'} />
                    </View>
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

