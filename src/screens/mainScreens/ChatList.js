import { View, Text, TouchableOpacity, TextInput, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Plus from 'react-native-vector-icons/AntDesign'
import SearchIcon from 'react-native-vector-icons/AntDesign'
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';

const Chat = ({ navigation }) => {
  const currentUserId = useSelector(state => state.user.user._id);
  console.log('currentUserId', currentUserId)
  const chatsCollection = firestore().collection('chats')
  const userCollection = firestore().collection('Users')
  // console.log('current user',currentUser)
  const [data, setData] = useState([
     {
       id: 1,
       profilePic: require('../../assets/images/profile6.jpg'),
       name: 'William Johnson',
       text: 'Gather Together for',
       time: 'Today',
       totalMsgs: '4'
     },
     {
       id: 2,
       profilePic: require('../../assets/images/profile7.jpg'),
       name: 'William Johnson',
       text: 'Gather Together for',
       time: 'Today',
       totalMsgs: '5'
     },
     {
       id: 3,
       profilePic: require('../../assets/images/profile4.png'),
       name: 'William Johnson',
       text: 'Gather Together for',
       time: 'Today',
       totalMsgs: '5'
     },
     {
       id: 4,
       profilePic: require('../../assets/images/profile.png'),
       name: 'William Johnson',
       text: 'Gather Together for',
       time: 'Today',
       totalMsgs: '5'
     },
     {
       id: 5,
       profilePic: require('../../assets/images/profile6.jpg'),
       name: 'William Johnson',
       text: 'Gather Together for',
       time: 'Today',
       totalMsgs: '5'
     },
     {
       id: 6,
       profilePic: require('../../assets/images/profile7.jpg'),
       name: 'William Johnson',
       text: 'Gather Together for',
       time: 'Today',
       totalMsgs: '5'
     },
     {
       id: 7,
       profilePic: require('../../assets/images/profile.png'),
       name: 'William Johnson',
       text: 'Gather Together for',
       time: 'Today',
       totalMsgs: '5'
     },
  ]);


  // useEffect(() => {
  //   // const unsubscribe = navigation.addListener('focus', () => {
  //   getAllChats();
  //   // handleSearchTextChange('')
  //   // });
  //   // return unsubscribe;
  // }, []);


  // const getAllChats = () => {
  //   chatsCollection
  //     .where('ID', 'array-contains', currentUserId)
  //     .orderBy('lastMessageTime', 'desc')
  //     .onSnapshot(snapshot => {
  //       const chatsData = [];
  //       snapshot?.forEach(eachChat => {
  //         console.log('eachChat', eachChat)
  //         const chatId = eachChat.data().ID.find(id => id === currentUserId); // Use find instead of filter
  //         chatsData.push({
  //           ...eachChat.data(),
  //           chatId,
  //         });
  //       });
  //       // console.log('chatsData',chatsData)

  //       Promise.all(
  //         chatsData.map(async chat => {
  //           console.log('chatId', chat.chatId)
  //           const userSnapshot = await userCollection
  //             .doc(chat.chatId)
  //             .get();

  //           return {
  //             ...userSnapshot.data(),
  //             lastMessageText: chat.lastMessageText,
  //             lastMessageTime: chat.lastMessageTime,
  //           };
  //         }),
  //       )

  //         .then(userData => {
  //           setData(userData);
  //           console.log('userData', userData)
  //         })
  //         .catch(error => {
  //           console.error(error);
  //         });
  //     });

  // };



  const renderItem = ({ item }) => {
    console.log('item', item)
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          // onPress={() => {
          //   // console.log('item', item)
          //   navigation.navigate('ChatScreen', { _id: item._id })
          // }}
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View>
              <Image source={item.profilePic} style={{ height: 60, width: 60, borderRadius: 30 }} />
            </View>
            <View>
              <Text style={{ color: 'black', fontSize: 18, fontWeight: '600' }}>{item.name}</Text>
              <Text style={{ fontSize: 16, color: 'gray', fontWeight: 'bold' }}>{item.text}</Text>
            </View>
          </View>
          <View style={{ alignItems: 'center', gap: 5 }}>
            <Text style={{ color: 'gray' }}>
              {item.time}
            </Text>
            <View style={{ backgroundColor: 'limegreen', height: 22, width: 22, borderRadius: 11, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'white' }}>
                1
              </Text>
            </View>
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
        <TouchableOpacity onPress={() => navigation.navigate('ChatScreen')} style={{ position: 'absolute', right: 10 }}>
          <Plus name='plus' color='blue' size={30} />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={{ position: 'absolute', justifyContent: 'center', top: 15, left: 20, zIndex: 10, paddingLeft: 10 }}>
          <SearchIcon name='search1' size={20} color={'gray'} />
        </TouchableOpacity>

        <TextInput style={{ height: 50, width: '90%', alignSelf: 'center', backgroundColor: 'lightgray', borderRadius: 5, paddingHorizontal: 40, padding: 10 }} placeholder='Search' />
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