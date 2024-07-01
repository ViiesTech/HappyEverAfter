import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Arrow from 'react-native-vector-icons/AntDesign';
import {BuySubscription} from '../../globalFunctions/Subscription';
import {useDispatch, useSelector} from 'react-redux';
import {ShowToast} from '../../globalFunctions/ShowToast';
import {setSubscription} from '../../redux/Slices';

const Subscription = ({navigation}) => {
  const [subscriptionPlan, setSubscriptionPlan] = useState();
  const currentSubscriptionPlan = useSelector(
    state => state.user.subscriptionPlan,
  );
  console.log('subscription plan', currentSubscriptionPlan);
  const handleSubscription = () => {
      if (!subscriptionPlan) {
        ShowToast('error', 'Please Select Subscription Category');
        return;

      }else if(subscriptionPlan === 'Basic'){
        navigation.navigate('BottomStack')
      }
       else {
        navigation.navigate('Payment',{subscriptionPlan:subscriptionPlan})
      }
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        padding: 20,
        backgroundColor: 'white',
      }}>
      <View style={{alignItems: 'center'}}>
        <Text
          style={{fontSize: 22, bottom: 3, fontWeight: '600', marginTop: 20}}>
          Buy Subscription Plan
        </Text>
      </View>
      <View style={{flex: 1, gap: 10, marginTop: 30}}>
        <View style={{gap: 25}}>
          <TouchableOpacity
            onPress={() => {
              currentSubscriptionPlan == 'Basic'
                ? setSubscriptionPlan('Basic')
                : ShowToast('error', 'You Have Subscribed To Premium Package');
            }}
            style={{
              borderColor: subscriptionPlan == 'Basic' ? 'black' : null,
              borderWidth: subscriptionPlan == 'Basic' ? 2 : null,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              backgroundColor: 'white',
              overflow: 'hidden',
              width: '100%',
              alignSelf: 'center',
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontSize: 20,
                color: 'white',
                fontWeight: 'bold',
                backgroundColor: '#00875f',
                padding: 5,
              }}>
              Basic
            </Text>
            <View style={{gap: 5, padding: 10}}>
              <Text style={{fontSize: 16, color: 'black'}}>
                Enjoy essential features tailored for your needs.
              </Text>
              <Text style={{fontSize: 16, color: 'black'}}>
                Ideal for individuals or small teams.
              </Text>
              <Text style={{fontSize: 16, color: 'black', marginBottom: 25}}>
                Note: This plan allows you to view users from your country only.
                It does not include video calling or chat features.
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSubscriptionPlan('Premium')}
            style={{
              borderColor: subscriptionPlan == 'Premium' ? 'black' : null,
              borderWidth: subscriptionPlan == 'Premium' ? 2 : null,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
              backgroundColor: 'white',
              overflow: 'hidden',
              width: '100%',
              alignSelf: 'center',
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontSize: 20,
                color: 'white',
                fontWeight: 'bold',
                backgroundColor: '#261455',
                padding: 5,
              }}>
              Premium
            </Text>
            <View style={{gap: 5, padding: 10}}>
              <Text style={{fontSize: 16, color: 'black'}}>
                Elevate your communication experience with advanced features.
              </Text>
              <Text style={{fontSize: 16, color: 'black'}}>
                Designed for professionals seeking enhanced collaboration tools.
              </Text>
              <Text style={{fontSize: 16, color: 'black'}}>
                Note: This plan allows you to view users worldwide.
                It also includes video calling or chat features.
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                paddingHorizontal: 10,
              }}>
              <Text style={{fontSize: 25, fontWeight: 'bold'}}>$70</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => handleSubscription()}
          style={{
            marginTop:30,
            // alignSelf: 'center',
            width: '100%',
          }}>
          <LinearGradient
            style={{
              height: 60,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#2E8B57',
              borderRadius: 20,
              width: '90%',
            }}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['red', 'orange']}>
           
              <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                Continue
              </Text>
            
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Subscription;
