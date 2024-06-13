import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import UserCard from '../../Components/UserCard';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import axios from 'axios';
import io from 'socket.io-client';
import Toast from 'react-native-toast-message';
import {baseUrl} from '../../assets/Utils/BaseUrl';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import socketServices from '../../../socket/Socket_Service';
import messaging from '@react-native-firebase/messaging';
import {ShowToast} from '../../globalFunctions/ShowToast';

const Home = ({navigation, route}) => {
  const userDetails = useSelector(state => state.user.user);
  const subscriptionPlan = useSelector(state => state.user.subscriptionPlan);
  const myCountry = userDetails.country;
  const [isLoading, setIsLoading] = useState(false);
  const userId = userDetails._id;
  const [allUsers, setAllUsers] = useState([]);
  const [showNoUsers, setNoUsers] = useState(false);
  const [changeState, setChangeState] = useState(false);

  console.log('data',route?.params)
  console.log('allUsers',allUsers)

  useEffect(() => {
    const handleNotificationOpened = remoteMessage => {
      setChangeState(!changeState);
      navigation.navigate('Notifications', {stateChange: changeState});
    };
    const unsubscribeOpened = messaging().onNotificationOpenedApp(
      handleNotificationOpened,
    );
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          navigation.navigate('Notifications');
        }
      });
    return () => {
      unsubscribeOpened();
    };
  }, []);

  const getAllUsers = () => {
    setIsLoading(true);
    let data = '';

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${baseUrl}/user/get-all-users`,
      headers: {
        Authorization: `Bearer ${userDetails.token}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        setIsLoading(false);
        const data = response.data;
        if (subscriptionPlan == 'Basic') {
          const users = data.message
            .filter(area => area.country === myCountry)

            .map((area, index) => {

              const imageUrl = `https://www.yourappdemo.com/happyeverafter/${area.image}`;
              const isLiked = checkLiked(area.isLike, userId);
              return {
                uid: index,
                withSticker: {uri: imageUrl},
                name: area.name,
                _id: area._id,
                occupation: area?.occupation,
                isLiked: isLiked,
                country: area?.country,
              };
            });

          setAllUsers(users);
          {
            users.length < 1
              ? showToast('info', `No Users In ${myCountry}`)
              : null;
          }
          return;
        }
        if (route.params?.country) {
          const users = data.message
            .map((area, index) => {
              if (area.country === route.params?.country) {
                const imageUrl = `https://www.yourappdemo.com/happyeverafter/${area.image}`;
                const isLiked = checkLiked(area.isLike, userId);
                return {
                  uid: index,
                  withSticker: {uri: imageUrl},
                  name: area.name,
                  _id: area._id,
                  occupation: area?.occupation,
                  isLiked: isLiked,
                  country: area?.country,
                };
              }
              return null;
            })
            .filter(user => user !== null);
          setAllUsers(users);
          {
            users.length < 1
              ? showToast('info', `No Users In ${route.params?.country}`)
              : null;
          }
        } else {
          const data = response.data;
          data.message.map((area, index) => {

            const imageUrl = `https://www.yourappdemo.com/happyeverafter/${area.image}`;
            const isLiked = checkLiked(area.isLike, userId);
            setAllUsers(prevUsers => [
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
                country: area?.country,
              },
          ]);
          });
        }
      })
      .catch(error => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setNoUsers(false);
    setAllUsers([]);
    getAllUsers();
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
  };

  const onSwipe = direction => {
    allUsers.pop();
    if (allUsers.length == 0) {
      setNoUsers(true);
      showToast('info', 'User List Finished');
    }
  };

  return (
    <View style={{flex: 1}}>


      <View
        style={{
          flex: 1,
          alignItems: 'center',
          marginTop: hp('15%'),
          zIndex: 150,
        }}>
        <View
          style={{
            marginTop: -hp('12%'),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '90%',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={{
                uri: `https://www.yourappdemo.com/happyeverafter/${userDetails.image}`,
              }}
              style={{
                height: 50,
                width: 50,
                borderRadius: 200,
                backgroundColor: 'lightgrey',
                borderWidth: 1.5,
                borderColor: 'gray',
              }}
            />
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: hp('2.8%'),
                color: 'black',
                marginLeft: 10,
              }}>
              Discover
            </Text>
          </View>
          <View style={{flexDirection:'row',gap:15,alignItems:'center'}}>
          <TouchableOpacity
            onPress={() => subscriptionPlan === 'Premium' ?  navigation.navigate('WhatULooking'):  ShowToast('error','Buy A Subscription To Search For A User')}
            >
            <Ionicons name={'search'} color={'black'} size={30} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Notifications')} >
            <EvilIcons name={'bell'} color={'black'} size={35} />
          </TouchableOpacity>
          </View>
        </View>

        {isLoading ? (
          <View
            style={{
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 150,
            }}>
            <ActivityIndicator size={'25'} />
          </View>
        ) : null}
        {showNoUsers && (
          <View
            style={{
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'black', fontSize: 25, gap: 10}}>
              Users List Finished
            </Text>
          </View>
        )}
        {allUsers.slice().reverse().map((user, index) => {
  return (
    <View key={index} style={{position: 'absolute', top: 0}}>
      <UserCard
        navigation={navigation}
        userId={user}
        onSwipe={onSwipe}
        cards={user}
      />
    </View>
  );
})}
      </View>
    </View>
  );
};

export default Home;
