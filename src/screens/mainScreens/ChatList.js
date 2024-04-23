import { View, Text, TouchableOpacity, TextInput, Image, FlatList } from 'react-native'
import React from 'react'
import Plus from 'react-native-vector-icons/AntDesign'
import SearchIcon from 'react-native-vector-icons/AntDesign'
const Chat = ({ navigation }) => {
  const data = [
    {
      id: 1,
      profilePic: require('../../assets/images/profile7.jpg'),
      name: 'William Johnson',
      text: 'Gather Together for',
      time: 'Today',
      totalMsgs: '5'
    },

    {
      id: 2,
      profilePic: require('../../assets/images/profile.png'),
      name: 'Melissa Morillo',
      text: 'Gather Together for',
      time: 'Today',
      totalMsgs: '3'
    },
    {
      id: 3,
      profilePic: require('../../assets/images/profile.png'),
      name: 'Emily Johnson',
      text: 'Gather Together for',
      time: 'Yesterday',
      totalMsgs: '7'
    },
    {
      id: 4,
      profilePic: require('../../assets/images/profile4.png'),
      name: 'Sophia Wilson',
      text: 'Gather Together for',
      time: 'Yesterday',
      totalMsgs: '8'
    },

    {
      id: 5,
      profilePic: require('../../assets/images/profile6.jpg'),
      name: 'Ella Harris',
      text: 'Gather Together for',
      time: 'Wednesday',
      totalMsgs: '6'
    },


    {
      id: 6,
      profilePic: require('../../assets/images/profile6.jpg'),
      name: 'Grace Walker',
      text: 'Gather Together for',
      time: 'Tuesday',
      totalMsgs: '5'
    },
    {
      id: 7,
      profilePic: require('../../assets/images/profile7.jpg'),
      name: 'James Smith',
      text: 'Gather Together for',
      time: 'Tuesday',
      totalMsgs: '5'
    },

  ]

  const renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => navigation.navigate('ChatScreen')} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View>
              <Image style={{ height: 60, width: 60, borderRadius: 30 }} source={item.profilePic} />
            </View>
            <View>
              <Text style={{ color: 'black', fontSize: 18, fontWeight: '600' }}>{item.name}</Text>
              <Text style={{ fontSize: 16, color: 'gray' }}>{item.text}</Text>
            </View>
          </View>
          <View style={{ alignItems: 'center', gap: 5 }}>
            <Text style={{ color: 'gray' }}>
              {item.time}
            </Text>
            <View style={{ backgroundColor: 'limegreen', height: 22, width: 22, borderRadius: 11, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'white' }}>
                {item.totalMsgs}
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
        <TouchableOpacity style={{ position: 'absolute', right: 10 }}>
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