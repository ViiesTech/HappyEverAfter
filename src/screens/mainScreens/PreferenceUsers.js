import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import UserCard from '../../Components/UserCard'
import { ShowToast } from '../../globalFunctions/ShowToast'
import { useSelector } from 'react-redux'
import axios from 'axios'

const PreferenceUsers = ({navigation,route}) => {
  const {data} = route?.params
const token = useSelector(state => state.user.token)
const [users,setAllUsers] = useState([])
  // const onSwipe = direction => {
  //   allUsers.pop();
  //   if (allUsers.length == 0) {
  //     ShowToast('info', 'User List Finished');
  //   }
  // };
  console.log('data',data)
const getUsers = () => {
  let data = JSON.stringify({
    "gender": data?.gender,
    "occupation": data?.occupation,
    "interests": data?.interest,
    "age": data?.age
  });
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://www.yourappdemo.com/happyeverafter/user/searching',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}`
    },
    data : data
  };
  
  axios.request(config)
  .then((response) => {
    
    console.log(JSON.stringify(response.data));

  })
  .catch((error) => {
    console.log(error);
  });
  
}
  useEffect(()=>{
getUsers()
  })
  // {allUsers.slice().reverse().map((user, index) => {
    return (
      <View  style={{position: 'absolute', top: 0}}>
        {/* <UserCard
          navigation={navigation}
          userId={user}
          onSwipe={onSwipe}
          cards={user}
        /> */}
        <Text>Preference Screen</Text>
      </View>
    );
  // })}
}

export default PreferenceUsers