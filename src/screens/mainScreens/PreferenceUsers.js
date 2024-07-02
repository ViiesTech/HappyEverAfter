import {ActivityIndicator, Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import UserCard from '../../Components/UserCard';
import {ShowToast} from '../../globalFunctions/ShowToast';
import {useSelector} from 'react-redux';
import {Searching} from '../../globalFunctions/Searching';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { heightPercentageToDP as hp} from 'react-native-responsive-screen';

const PreferenceUsers = ({navigation, route}) => {
  const {userData} = route?.params;
  const token = useSelector(state => state.user.token);
  const userDetails = useSelector(state => state.user.user);
  const userId = userDetails._id;
  const [allUsers, setAllUsers] = useState([]);
  const [listFinished,setListFinished] = useState()
  const [isLoading,setIsLoading] = useState(false)
  console.log('allusers', allUsers);
  const [noUsers, setNoUsers] = useState();
  const onSwipe = direction => {
    allUsers.pop();
    if (allUsers.length == 0) {
      setListFinished(true)
      ShowToast('info', 'User List Finished');
    }
  };
  
  const checkLiked = (isLikeArray, userIdToCheck) => {
    return isLikeArray.includes(userIdToCheck);
  };
  const {gender, interest, occupation} = userData;
  console.log(noUsers)
  let age = Number(userData.age);
const formattedOccupation =   occupation.charAt(0).toUpperCase() + occupation.slice(1);
console.log(formattedOccupation)
  const getUsers = async () => {
    try {
      setIsLoading(true)
      const res = await Searching(gender, interest, formattedOccupation, age, token);
      setIsLoading(false) 
      if(res.length === 0){
     console.log('hello')
        setNoUsers(true)
        return ShowToast('error','No Users Found Of This Category')
      }

      res?.map((area, index) => {
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
    } catch (error) {
      setIsLoading(false) 
      console.log('error', error);
     return ShowToast('error',error.message)
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <View style={{flex: 1,padding:20}}>


      <View
        style={{
          flex: 1,
          alignItems: 'center',
          zIndex: 150,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
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
          <TouchableOpacity
            onPress={() => navigation.navigate('Notifications')}>
            <EvilIcons name={'bell'} color={'black'} size={30} />
          </TouchableOpacity>
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
        {/* {noUsers === true && (
          <View
            style={{
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'black', fontSize: 25, gap: 10}}>
             No Users Of Your Desired Category
            </Text>
          </View>
        )}  */}
        {listFinished && (
          <View
            style={{
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'black', fontSize: 25, gap: 10}}>
             Users list Finished
            </Text>
          </View>
        )} 
        {allUsers.slice().reverse().map((user, index) => {
  return (
    <View key={index} style={{}}>
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

export default PreferenceUsers;
