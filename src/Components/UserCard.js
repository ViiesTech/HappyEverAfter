import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import TinderCard from 'react-tinder-card';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';


const UserCard = ({ onSwipe, cards, userData, }) => {





  return (
    <TinderCard
      className="swipe"
      preventSwipe={['up', 'down']}
      style={styles.tinderCard}
      onSwipe={(direction) => {
        onSwipe(direction)

      }}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles._card}
        // onPress={() => {
        //   navigation.navigate('DisCoverProfile', { profileInfo: cards });
        // }}
      >
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

                <Text
                  style={{ fontSize: 26, fontWeight: 'bold', color: 'white' }}>
                  {cards?.name}
                </Text>

                <Text style={{ color: 'white' }}>
                  Fashion Designer
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
