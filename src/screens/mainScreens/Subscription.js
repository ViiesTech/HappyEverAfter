import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Arrow from 'react-native-vector-icons/AntDesign'

const Subscription = ({ navigation }) => {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Arrow name='arrowleft' size={25} color={'black'} />
      </TouchableOpacity>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 20, textAlign: 'center' }}>Buy A Subscription Plan</Text>
      <View style={{ flex: 1, justifyContent: 'center', gap: 10 }}>
        <View style={{ flexDirection: 'row', gap: 15 }}>
          <TouchableOpacity style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5, height: 200, backgroundColor: 'white', width: '48%', alignSelf: 'center', overflow: 'hidden', borderRadius: 10
          }}>
            <Text style={{ fontSize: 20, padding: 5, fontWeight: 'bold', backgroundColor: 'rgba(255,0,0,0.5)', color: 'white' }}>Basic</Text>
            <Text style={{ fontSize: 14, padding: 8, color: 'grey' }}>Unlock a world of possibilities with our Basic Subscription Plan. Enjoy essential features ....
            </Text>
            <Text style={{ fontSize: 25, fontWeight: 'bold', position: 'absolute', bottom: 10, left: 10 }}>$40</Text>

          </TouchableOpacity>
          <TouchableOpacity style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5, height: 200, backgroundColor: 'white', overflow: 'hidden', width: '48%', alignSelf: 'center', borderRadius: 10
          }}>
            <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', backgroundColor: 'rgba(0,0,255,0.5)', padding: 5 }}>Premium</Text>
            <Text style={{ fontSize: 14, padding: 8, color: 'grey' }}>Elevate your dating experience with our Premium Subscription Plan. Unlock exclusive  .....
            </Text>
            <Text style={{ fontSize: 25, fontWeight: 'bold', position: 'absolute', bottom: 10, left: 10 }}>$70</Text>

          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5, height: 150, overflow: 'hidden', backgroundColor: 'white', width: '100%', alignSelf: 'center', overflow: 'hidden', borderRadius: 10
        }}>

          <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', backgroundColor: 'rgba(0,100,0,0.5)', padding: 5, }}>Gold</Text>
          <Text style={{ fontSize: 14, padding: 8, color: 'grey' }}>Experience dating at its finest with our exclusive Gold Subscription Plan. Enjoy all the benefits of our Premium Plan along with additional perks
          </Text>
          <Text style={{ fontSize: 25, fontWeight: 'bold', position: 'absolute', bottom: 10, left: 10 }}>$120</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{}}>

          <LinearGradient style={{ height: 60, marginTop: 40, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: '#2E8B57', borderRadius: 20, width: '80%', }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['red', 'orange']} >
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
              Subscribe</Text>
          </LinearGradient>
        </TouchableOpacity>


      </View>
    </View>
  )
}

export default Subscription