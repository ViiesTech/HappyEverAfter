import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import TinderCard from 'react-tinder-card';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import { useSelector } from 'react-redux';

const UserCard = ({ onSwipe, cards, userId, userData }) => {
  const userDetails = useSelector((state) => state.user.user);
  // const user_Id = userDetails.id
  const [like, setLike] = useState()
  const [lastPressTime, setLastPressTime] = useState(0);

  const cardRef = useRef(null);
  const handleNotify = (id) => {
    if (id.isLiked) {
      id.isLiked = !id.isLiked
      setLike(false)
    } else {
      setLike(!like)
    }

    // if (id.isLiked) {
    //   console.log('true condition');
    //   setLike(!id.isLiked);
    // } else {
    //   console.log('false condition');
    //   setLike(!id.isLiked);
    // }


    let data = '';

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://appsdemo.pro/happyeverafter/user/like-user/${id._id}`,
      headers: {
        'Authorization': `Bearer ${userDetails.token}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log('response', JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <TinderCard
      className="swipe"
      preventSwipe={['up', 'down']}
      style={styles.tinderCard}
      flickOnSwipe={true}
      onSwipe={(direction) => {
        onSwipe(direction)
      }}
      ref={cardRef}
    >
      <TouchableOpacity
        onPress={() => {
          const currentTime = new Date().getTime();
          const delay = 500; // Adjust the delay time as needed (in milliseconds)
          if (currentTime - lastPressTime < delay) {
            // Double press detected, trigger swipe right action
            // cardRef.current.swipe('right');
            handleNotify(userId)
          }
          setLastPressTime(currentTime);
        }}

        activeOpacity={0.9} style={styles._card}>
        <FastImage
          style={{
            width: wp('90%'),
            height: hp('65%'),
            borderRadius: 30,
          }}
          source={cards.withSticker}
          resizeMode={FastImage.resizeMode.stretch}
        />
        <View
          style={{
            position: 'absolute',
            width: wp('90%'),
            height: hp('65%'),
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              height: 60,
              width: 60,
              backgroundColor: 'transparent',
              alignSelf: 'flex-end',
              borderRadius: 100,
              bottom: 10,
              left: 10,
            }}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.9)']}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: hp('65'),
              borderRadius: 30,
            }}
          />
          <View style={{ alignSelf: 'center', marginBottom: 30 }}>
            <View style={{ width: wp('70%'), justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
              <View>
                <Text style={{ fontSize: 26, fontWeight: 'bold', color: 'white' }}>
                  {cards?.name}
                </Text>
                <Text style={{ color: 'white' }}>
                  {cards?.occupation}
                </Text>
              </View>
              <View style={{ padding: 10, borderWidth: 1, borderColor: 'white', paddingVertical: 0, borderRadius: 3 }}>
                <Text style={{ color: 'white' }}>
                  1 KM
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', position: 'absolute', bottom: hp('-5%'), width: wp('50%'), alignSelf: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            // console.log('hello', userData.length -1)
            
            cardRef.current.swipe('left')
          }
          }
          style={{ height: 50, width: 50, zIndex: 200, borderRadius: 200, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'white', backgroundColor: 'black' }}>
          <Entypo
            name={'cross'}
            color={'white'}
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}


          onPress={() => handleNotify(userId)}
          style={{ height: 70, width: 70, borderRadius: 200, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'white', backgroundColor: 'black' }}>
          {userId.isLiked || like ?
            (
              <AntDesign
                name={'heart'}
                color={'red'}
                size={30}
              />
            ) : (
              <AntDesign
                name={'heart'}
                color={'white'}
                size={30}
              />
            )}

        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{ height: 50, width: 50, borderRadius: 200, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'white', backgroundColor: 'black' }}>
          <AntDesign


            name={'star'}
            color={'white'}
            size={25}
          />
        </TouchableOpacity>
      </View>
    </TinderCard>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    width: wp('90%'),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  alignRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alignIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('90%'),
    height: 50,
  },
  userInfo: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
  },
  cardItem: {
    backgroundColor: '#E5E5E5',
    borderRadius: 50,
    color: '#000000',
    paddingHorizontal: 20,
    height: 40,
    textAlignVertical: 'center',
    fontSize: 18,
    marginTop: 10,
    marginRight: 10,
  },
  container: {
    backgroundColor: '#FFF9F0',
  },
  _card: {
    width: wp('90%'),
    height: hp('65%'),
    marginTop: -30,
    borderRadius: 30,
    justifyContent: 'center',
    backgroundColor: 'gray',
    alignSelf: 'center',
    borderWidth: 1,
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent',
  },
});
