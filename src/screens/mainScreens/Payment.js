import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {BuySubscription} from '../../globalFunctions/Subscription';
import {useDispatch, useSelector} from 'react-redux';
import { setSubscription } from '../../redux/Slices';
const Payment = ({navigation, route}) => {
  const token = useSelector(state => state.user.token);
  const {subscriptionPlan} = route.params;
  const [loading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [form, setForm] = useState({
    cardNumber: '',
    cvc: '',
    expiry: '',
  });
  const onChangeText = (changedText, key) => {
    setForm(oldForm => {
      return {...oldForm, [key]: changedText};
    });
  };
  const dispatch = useDispatch()
  useEffect(() => {
    if (!form.cardNumber || !form.cvc || !form.expiry) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [form]);
  const handleSubscription = async () => {
    setIsLoading(true);
    try {
      const response = await BuySubscription(
        subscriptionPlan,
        form.cardNumber,
        form.cvc,
        form.expiry,
        token,
      );
      console.log('responssssseeee', response);
      if(response.success){
        dispatch(setSubscription('Premium'))
        navigation.navigate('BottomStack')
      }
      setIsLoading(false);
    } catch (error) {
      console.log('errrrrror', error);
      setIsLoading(false);
    }
  };
  return (
    <ScrollView contentContainerStyle={{padding: 20, flex: 1}}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={25} color={'black'} />
      </TouchableOpacity>
      <View style={{justifyContent: 'center', flex: 1, marginBottom: 20}}>
        <View
          style={{
            padding: 30,
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },

            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            borderRadius: 10,

            elevation: 5,
          }}>
          <View style={{flexDirection: 'row', gap: 15, alignSelf: 'center'}}>
            <Image
              style={{height: 80, width: 80}}
              source={require('../../assets/images/visa.png')}
            />
            <Image
              style={{height: 80, width: 80}}
              source={require('../../assets/images/mastercard.png')}
            />
            <Image
              style={{height: 80, width: 80}}
              source={require('../../assets/images/discover.png')}
            />
          </View>
          <View style={{marginTop: 20}}>
            <Text style={{fontSize: 18, fontWeight: '500', color: 'black'}}>
              Payment Amount
            </Text>
            <Text style={{color: 'gray', fontSize: 16, fontWeight: '500'}}>
              70$
            </Text>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={{fontSize: 18, fontWeight: '500', color: 'black'}}>
              Subscription Name
            </Text>
            <Text style={{color: 'gray', fontSize: 16, fontWeight: '500'}}>
              Premium
            </Text>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={{fontSize: 18, fontWeight: '500', color: 'black'}}>
              Card Number
            </Text>
            <TextInput
              placeholder="123-45-6789"
              onChangeText={changedText =>
                onChangeText(changedText, 'cardNumber')
              }
              keyboardType="number-pad"
              style={{
                padding: 10,
                marginTop: 10,
                height: 55,
                width: '100%',
                borderRadius: 5,
                borderWidth: 2,
                borderColor: 'gray',
              }}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{marginTop: 10}}>
              <Text style={{fontSize: 18, fontWeight: '500', color: 'black'}}>
                cvc
              </Text>
              <TextInput
                placeholder="123"
                onChangeText={changedText => onChangeText(changedText, 'cvc')}
                keyboardType="number-pad"
                style={{
                  padding: 10,
                  marginTop: 5,
                  height: 55,
                  width: 80,
                  borderRadius: 5,
                  borderWidth: 2,
                  borderColor: 'gray',
                }}
              />
            </View>
            <View style={{marginTop: 15}}>
              <Text style={{fontSize: 18, fontWeight: '500', color: 'black'}}>
                Expiration Date
              </Text>
              <TextInput
                placeholder="eg...  2025-12"
                onChangeText={changedText =>
                  onChangeText(changedText, 'expiry')
                }
                keyboardType="number-pad"
                style={{
                  marginTop: 5,
                  padding: 10,
                  height: 55,
                  width: 150,
                  borderRadius: 5,
                  borderWidth: 2,
                  borderColor: 'gray',
                }}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => handleSubscription()}
            disabled={disabled}
            style={{
              marginTop: 30,
              backgroundColor: '#53C5C3',
              justifyContent: 'center',
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
              borderRadius: 10,
              height: 60,
              width: '90%',
              alignSelf: 'center',
            }}>
            {loading ? (
              <ActivityIndicator size={'large'} color={'white'} />
            ) : (
              <>
                <Fontisto name="locked" color={'white'} size={20} />
                <Text style={{color: 'white', fontSize: 20}}>Pay</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Payment;
