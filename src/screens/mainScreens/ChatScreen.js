import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, TextInput } from 'react-native'
import React from 'react'
import Arrow from 'react-native-vector-icons/AntDesign'
import VideoIcon from 'react-native-vector-icons/Feather'
import AudioIcon from 'react-native-vector-icons/Ionicons'
import Mic from 'react-native-vector-icons/Feather'
import CheckIcon from 'react-native-vector-icons/AntDesign'
const ChatScreen = ({ navigation }) => {
  const data = [
    {
      id: 1,
      time: '2:15 pm',
      text: 'Hey what are you doing',
      myText: true
    },
    {
      id: 2,
      time: '2:15 pm',
      text: 'I am at office,busy at the moment',
      myText: false
    },
    {
      id: 3,
      time: '2:15 pm',
      text: 'When you will be free',
      myText: true
    },
    {
      id: 4,
      time: '2:15 pm',
      text: 'Minimum 3 to 4 hours',
      myText: false
    },

    {
      id: 5,
      time: '2:15 pm',
      text: 'Oh, hoooo!',
      myText: true
    },


    {
      id: 6,
      time: '2:15 pm',
      text: 'What happened?',
      myText: false
    },



    {
      id: 7,
      time: '2:15 pm',
      text: 'Nothing , just call me when you are free',
      myText: true
    },




    {
      id: 8,
      time: '2:15 pm',
      text: 'Ok i will call you at 5 pm',
      myText: false
    },




    {
      id: 9,
      time: '2:15 pm',
      text: 'Ok Sure, Dont forget ok',
      myText: true
    },



    {
      id: 10,
      time: '2:15 pm',
      text: 'No no, dont worry',
      myText: false
    },


    {
      id: 11,
      time: '2:15 pm',
      text: 'Ok',
      myText: true
    },
  ]

  const renderItem = ({ item }) => {
    return item.myText ? (

      <View style={styles.myText}>
        <View style={styles.myTextContainer}>
          <Text style={{ color: 'white' }}>{item.text}</Text>
        </View>
        <View style={{ flexDirection: 'row', paddingRight: 10, gap: 5 }}>
          <Text style={{ color: 'gray' }}>{item.time}</Text>
          <CheckIcon name='check' color={'lightgray'} size={20} />
        </View>
      </View>
    ) : (
      <View style={styles.friendText}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ marginRight: 10 }}>
            <Image style={{ height: 25, width: 25, borderRadius: 12.5 }} source={require('../../assets/images/profile6.jpg')} />


          </View>
          <View style={{}}>
            <View style={styles.friendTextContainer}>

              <Text style={styles.chatText}>{item.text}</Text>
            </View>
            <Text>10:15 pm</Text>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      {/* F2F2F2 */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: '#C8AFC8' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Arrow name='arrowleft' size={25} color={'white'} />
          </TouchableOpacity>
          <View>
            <Image style={{ height: 35, width: 35, borderRadius: 17.5 }} source={require('../../assets/images/profile6.jpg')} />
          </View>
          <View>
            <Text style={{ color: 'white', fontWeight: '700', fontSize: 16 }}>Amelia Davis</Text>
            <Text style={{ color: 'white' }}>Online</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', gap: 25 }}>
          <TouchableOpacity>
            <VideoIcon name='video' color={'white'} size={20} />
          </TouchableOpacity>
          <TouchableOpacity>
            <AudioIcon name='call-outline' color={'white'} size={20} />
          </TouchableOpacity>

        </View>
      </View>

      <View style={{ position: 'absolute', bottom: 10, zIndex: 2, flexDirection: 'row', gap: 10, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <TextInput
          style={{ height: 50, borderRadius: 10, padding: 10, width: '78%', backgroundColor: 'lightgray', }}
          placeholder='Type Your Message'
        />
        <TouchableOpacity style={{ backgroundColor: '#FFC0CB', height: 35, width: 35, borderRadius: 17.5, justifyContent: 'center', alignItems: 'center' }}>
          <Mic name='mic' color={'white'} size={20} />
        </TouchableOpacity>
      </View>

      <View>
        <FlatList
          data={data}
          renderItem={renderItem}
          style={{
            height: 600, paddingBottom: 100
          }
          }

        />

      </View>



    </View>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
  friendText: {
    flexDirection: 'row',
    // alignItems:'center',
    alignItems: 'flex-start',
    padding: 10,
    justifyContent: 'flex-start',
  },
  friendTextContainer: {
    backgroundColor: '#E0E0E0',


    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  myText: {
    alignItems: 'flex-end',
    padding: 10,
    justifyContent: 'flex-end',

  },
  myTextContainer: {
    backgroundColor: '#FFC0CB',

    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  chatText: {
    maxWidth: 250,

    color: 'black',
  },
})