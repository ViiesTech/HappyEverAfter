import {View, Text, Image, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import {baseUrl} from '../../assets/Utils/BaseUrl';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Notifications = ({navigation, route}) => {
  const userDetails = useSelector(state => state.user.user);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log('stateChange', route?.params);

  useEffect(() => {
    const sub = navigation.addListener('focus', () => {
      getNoti();
    });
    return sub;
  }, [navigation]);

  const getNoti = () => {
    setLoading(true);
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${baseUrl}/user/notify-ifUser-like`,
      headers: {
        Authorization: `Bearer ${userDetails.token}`,
      },
    };

    axios
      .request(config)
      .then(response => {
        setLoading(false);
        console.log('response', JSON.stringify(response.data.data));
        const responseData = response.data.data;
        const newData = responseData.map(area => ({
          id: area._id,
          name: area.name,
          ProfilePic: `https://www.yourappdemo.com/happyeverafter/${area.image}`,
        }));
        setData(newData); 
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: 'white',
          paddingVertical: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          padding: 5,
          borderRadius: 10,
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          justifyContent: 'space-between',
          paddingHorizontal: 15,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <Image
            style={{height: 60, width: 60, borderRadius: 30}}
            source={{uri: item.ProfilePic}}/>
          <View>
            <Text>
              <Text style={{fontWeight: 'bold', color: 'red'}}>
                {item.name}
                {'\t'}
              </Text>
              <Text style={{color: 'black'}}>{'\t'}Likes You</Text>
            </Text>
          </View>
        </View>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>❤️</Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
            
      <View style={{backgroundColor: 'black',alignItems:'center',flexDirection:'row',justifyContent:'space-between',padding:15}}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <AntDesign name="arrowleft" color={'white'} size={25} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 25,
            color: 'white',
            fontWeight: 'bold',
          }}>
          Notifications ❤️
        </Text>
        <Text style={{color:'black'}}>hi</Text>
      </View>
      {loading && (
        <View
          style={{
            height: '100%',
            justifyContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size={'25'} />
        </View>
      )}
      {data.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={renderItem}
          contentContainerStyle={{
            marginTop: 10,
            gap: 20,
            padding: 10,
            paddingBottom: 30,
          }}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
          }}>
          <MaterialCommunityIcons name="bell" size={30} color={'lightgrey'} />
          <Text style={{fontSize: 16, color: 'grey'}}>No Notifications</Text>
        </View>
      )}
    </View>
  );
};

export default Notifications;
