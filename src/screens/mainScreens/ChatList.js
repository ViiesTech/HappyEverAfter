import { View, Text, TouchableOpacity, TextInput, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Plus from 'react-native-vector-icons/AntDesign'
import SearchIcon from 'react-native-vector-icons/AntDesign'
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { ShowToast } from '../../globalFunctions/ShowToast';

const Chat = ({ navigation }) => {
  const currentUserId = useSelector(state => state.user.user._id);
  const subscriptionPlan = useSelector(state => state.user.subscriptionPlan);

  console.log('currentUserId', currentUserId)
  const chatsCollection = firestore().collection('chats')
  const userCollection = firestore().collection('Users')
  // console.log('current user',currentUser)
  const [data, setData] = useState([]);


  useEffect(() => {
    const sub = navigation.addListener('focus', () => {
      FetchChatList()
    })
    return sub
  }, [navigation])

  const FetchChatList = () => {
    firestore()
      .collection("chats")
      .where("ID", "array-contains", currentUserId)
      .get()
      .then((doc) => {

        const temp = []
        doc.docs.forEach((res) => {
          temp.push(res.data())
        })

        setData(temp)

      })
  }



  const renderItem = ({ item }) => {
    console.log('item', item.lastMessageTime)


    const timestamp = item.lastMessageTime.seconds * 1000 + item.lastMessageTime.nanoseconds / 1000000;
    const timeAgo = moment(timestamp).fromNow();

    const filterMyData = item.Both_User_Data.filter((res) => {
      return res._id != currentUserId
    })


    const userDetails = {
      _id: filterMyData[0]._id,
      name: filterMyData[0].name,
      email: filterMyData[0].email,
      image: filterMyData[0].image
    }
    console.log("filtered Data", filterMyData)
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => {
            // console.log('item', item)
            if(subscriptionPlan == "Basic"){
              ShowToast('error', "Buy a subscription to start a chat")
            }else{

              navigation.navigate('ChatScreen', { userDetails: userDetails })
            }
          }}
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View>
              <Image source={{uri: filterMyData[0].image}} style={{ height: 60, width: 60, borderRadius: 30 }} />
            </View>
            <View>
              <Text style={{ color: 'black', fontSize: 18, fontWeight: '600' }}>{filterMyData[0].name}</Text>
              <Text style={{ fontSize: 16, color: 'gray', fontWeight: 'bold' }}>{item.lastMessageText}</Text>
            </View>
          </View>
          <View style={{ alignItems: 'center', gap: 5 }}>
            {/* <View style={{ backgroundColor: 'limegreen', height: 22, width: 22, borderRadius: 11, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'white' }}>
                1
              </Text>
            </View> */}
            <Text style={{ color: 'gray', marginTop: 27 }}>
              {timeAgo}
            </Text>
          </View>

        </TouchableOpacity>

        <View style={{ height: 1, backgroundColor: 'lightgray', width: '100%' }}></View>

      </View>
    )
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', padding: 20, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: 'black', fontSize: 22, fontWeight: 600 }}>Chats</Text>
        {/* <TouchableOpacity onPress={() => navigation.navigate('ChatScreen')} style={{ position: 'absolute', right: 10 }}>
          <Plus name='plus' color='blue' size={30} />
        </TouchableOpacity> */}
      </View>
      <View>
        <TouchableOpacity style={{ position: 'absolute', justifyContent: 'center', top: 15, left: 20, zIndex: 10, paddingLeft: 10 }}>
          <SearchIcon name='search1' size={20} color={'gray'} />
        </TouchableOpacity>

        <TextInput placeholderTextColor={'gray'} style={{ height: 50, width: '90%', alignSelf: 'center', backgroundColor: 'lightgray', borderRadius: 5,color:'gray', paddingHorizontal: 40, padding: 10 }} placeholder='Search' />
        <View style={{ marginTop: 20, height: 1, backgroundColor: 'lightgray', width: '100%' }}></View>
        <FlatList
          data={data}
          renderItem={renderItem}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 150 }}
        />
      </View>
    </View>
  )
}

export default Chat