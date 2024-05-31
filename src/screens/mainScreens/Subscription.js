import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Arrow from 'react-native-vector-icons/AntDesign'
import { BuySubscription } from '../../globalFunctions/Subscription'
import { useDispatch, useSelector } from 'react-redux'
import { ShowToast } from '../../globalFunctions/ShowToast'
import { setSubscription } from '../../redux/Slices'

const Subscription = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [subscriptionPlan, setSubscriptionPlan] = useState()
  const token = useSelector(state => state.user.token)
  const dispatch = useDispatch()
  const handleSubscription = async () => {
    setIsLoading(true);
    try {
      if (!subscriptionPlan) {
        setIsLoading(false)
        ShowToast('error', 'Please Select Subscription Category')
        return
      } else if (subscriptionPlan == 'Basic') {
        dispatch(setSubscription(subscriptionPlan))
      } else {
        const res = await BuySubscription(token, subscriptionPlan);
        dispatch(setSubscription(subscriptionPlan))
      }

      navigation.navigate('BottomStack')
      setIsLoading(false);
    } catch (error) {
      ShowToast('error', error.message)
      setIsLoading(false);
    }
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, padding: 20, backgroundColor: 'white' }}>
      <View style={{  alignItems: 'center' }}>
       
          <Text style={{ fontSize: 22, bottom: 3, fontWeight: '600', }}>Buy Subscription Plan</Text>
      
      </View>
      <View style={{ flex: 1, justifyContent: 'center', gap: 10, marginTop: 20 }}>
        <View style={{ gap: 25 }}>
          <TouchableOpacity
            onPress={() => setSubscriptionPlan('Basic')}
            style={{
              borderColor: subscriptionPlan == 'Basic' ? 'black' : null,
              borderWidth: subscriptionPlan == 'Basic' ? 2 : null,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5, backgroundColor: 'white', overflow: 'hidden', width: '100%', alignSelf: 'center', borderRadius: 10
            }}>
            <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', backgroundColor: '#00875f', padding: 5 }}>Basic</Text>
            <View style={{ gap: 5, padding: 10 }}>
              <Text style={{ fontSize: 16, color: 'black' }}>
                Enjoy essential features tailored for your needs.
              </Text>
              <Text style={{ fontSize: 16, color: 'black' }}>
                Ideal for individuals or small teams.
              </Text>
              <Text style={{ fontSize: 16, color: 'black', marginBottom: 25 }}>
                Note: Basic plan does not include video calling or chatting features.
              </Text>
            </View>

          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSubscriptionPlan('Premium')}
            style={{
              borderColor: subscriptionPlan == 'Premium' ? 'black' : null,
              borderWidth: subscriptionPlan == 'Premium' ? 2 : null,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5, backgroundColor: 'white', overflow: 'hidden', width: '100%', alignSelf: 'center', borderRadius: 10
            }}>
            <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', backgroundColor: '#261455', padding: 5 }}>Premium</Text>
            <View style={{ gap: 5, padding: 10 }}>
              <Text style={{ fontSize: 16, color: 'black' }}>
                Elevate your communication experience with advanced features.
              </Text>
              <Text style={{ fontSize: 16, color: 'black' }}>
                Designed for professionals seeking enhanced collaboration tools.
              </Text>
              <Text style={{ fontSize: 16, color: 'black' }}>
                Note: Premium plan includes chat functionality but does not support video calling.
              </Text>
            </View>
            <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', paddingHorizontal: 10 }}>
              <Text style={{ fontSize: 25, fontWeight: 'bold', }}>$70</Text>
            </View>

          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSubscriptionPlan('Gold')}
            style={{
              borderColor: subscriptionPlan == 'Gold' ? 'black' : null,
              borderWidth: subscriptionPlan == 'Gold' ? 2 : null,

              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5, overflow: 'hidden', backgroundColor: 'white', width: '100%', alignSelf: 'center', overflow: 'hidden', borderRadius: 10
            }}>

            <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', backgroundColor: '#D7B55C', padding: 5, }}>Gold</Text>
            <View style={{ gap: 5, padding: 10 }}>
              <Text style={{ fontSize: 16, color: 'black' }}>
                Experience the pinnacle of communication excellence.
              </Text>

              <Text style={{ fontSize: 16, color: 'black' }}>
                Enjoy the benefits of both chat and video calling functionalities.
              </Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 25, fontWeight: 'bold', bottom: 10, paddingHorizontal: 10 }}>$120</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => handleSubscription()} style={{}}>

          <LinearGradient style={{ height: 60, marginTop: 40, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: '#2E8B57', borderRadius: 20, width: '80%', }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['red', 'orange']} >
            {isLoading ? (
              <ActivityIndicator size={'large'} color={'white'} />
            ) : (
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
                Subscribe
              </Text>
            )}

          </LinearGradient>
        </TouchableOpacity>


      </View>
    </ScrollView>
  )
}

export default Subscription