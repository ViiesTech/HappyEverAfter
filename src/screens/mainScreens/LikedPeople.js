import { View, Text, Image } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native'
const LikedPeople = () => {
  const data = [
    {
      id: 1,
      name: 'James',
      ProfilePic: require('../../assets/images/profile.png'),
    },
    {
      id: 2,
      name: 'John',
      ProfilePic: require('../../assets/images/profile.png'),
    },
    {
      id: 3,
      name: 'Michael',
      ProfilePic: require('../../assets/images/profile.png'),
    },
    {
      id: 4,
      name: 'Harry',
      ProfilePic: require('../../assets/images/profile.png'),
    },
    {
      id: 5,
      name: 'Franklin',
      ProfilePic: require('../../assets/images/profile.png'),
    },
    {
      id: 6,
      name: 'Brown',
      ProfilePic: require('../../assets/images/profile.png'),
    },
    {
      id: 7,
      name: 'Julia',
      ProfilePic: require('../../assets/images/profile.png'),
    },
    {
      id: 8,
      name: 'Alexa',
      ProfilePic: require('../../assets/images/profile.png'),
    },
  ]

  const renderItem = ({ item }) => {
    return (
      <View style={{
        borderWidth: 1, borderColor: 'white', paddingVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5, padding: 5, borderRadius: 10, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', gap: 10, justifyContent: 'space-between', paddingHorizontal: 15
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Image style={{ height: 60, width: 60, borderRadius: 30 }} source={item.ProfilePic}></Image>
          <View>
            <Text >
              <Text style={{ fontWeight: 'bold',color:'red' }}>
                {item.name}{'\t'}
              </Text>
              <Text style={{color:'black'}}>Likes You</Text>
            </Text>
          </View>
        </View>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>❤️</Text>
      </View>
    )
  }
  return (
    <View style={{ flex: 1 }}>
      <Text style={{backgroundColor:'black',padding:15,fontSize:25,color:'red',fontWeight:'bold',textAlign:'center'}}>Notifications ❤️</Text>
      <FlatList
      showsVerticalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        contentContainerStyle={{ marginTop: 10, gap: 20, padding: 10, paddingBottom: 30 }}
      />
    </View>
  )
}

export default LikedPeople