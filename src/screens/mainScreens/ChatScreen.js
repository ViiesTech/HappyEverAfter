import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore, {
  collection,
  query,
  where,
  onSnapshot,
  db,
  orderBy,
} from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';

const ChatScreen = ({navigation, route}) => {
  const [messageIdCounter, setMessageIdCounter] = useState(1); // Counter for message IDs
  const usersCollection = firestore().collection('chats');
  const [messageValue, setMessageValue] = useState('');
  const userDetails = route?.params?.userDetails;
  const selectedUser = route?.params?.userDetails;

  const currentUser = useSelector(state => state.user.user._id);
  const [chatId, setChatId] = useState(`${currentUser}_${selectedUser._id}`);
  // const selectedUser = userDetails._id;
  const UserData = useSelector(state => state.user.user);
  console.log('selectedUser', selectedUser);
  console.log('UserData', UserData);
  const [startChat, setStartChat] = useState();
  const [data, setData] = useState([]);
  const formatTime = date => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)

    // Pad single-digit minutes with leading zero
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${minutes} ${ampm}`;
  };
  const generateRandomId = length => {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }

    return result;
  };

  let randomId = generateRandomId(24);

  const handleStartChat = () => {
    usersCollection
      // .collection('chats')
      .doc(chatId)
      .set({
        messages: [
          {
            message: messageValue,
            senderId: currentUser,
            receiverId: selectedUser._id,
            timeStamp: new Date(),
          },
        ],
        Both_User_Data: [
          {
            name: UserData.name,
            _id: currentUser,
            image: `https://www.yourappdemo.com/happyeverafter/${UserData.image}`,
          },
          {
            name: selectedUser.name,
            _id: selectedUser._id,
            image: selectedUser.withSticker.uri,
          },
        ],
        ID: [currentUser, selectedUser._id],
        lastMessageTime: new Date(),
        lastMessageText: messageValue,
      })
      .then(() => {
        setMessageValue('');
        console.log('Initial message sent successfully');
      })
      .catch(error => console.error('Error sending initial message:', error));
  };

  const sendMessage = () => {
    usersCollection
      .doc(chatId)
      .get()
      .then(docSnapshot => {
        if (docSnapshot.exists) {
          usersCollection
            .doc(chatId)
            .update({
              messages: firestore.FieldValue.arrayUnion({
                message: messageValue,
                senderId: currentUser,
                receiverId: selectedUser._id,
                timeStamp: new Date(),
              }),
              lastMessageTime: new Date(),
              lastMessageText: messageValue,
            })
            .then(() => {
              setMessageValue('');
              console.log('Message appended successfully');
            })
            .catch(error => console.error('Error appending message:', error));
        } else {
        }
      })
      .catch(error =>
        console.error('Error checking document existence:', error),
      );
  };

  const getAllMessages = () => {
    const DocId = `${currentUser}_${selectedUser._id}`;
    const alternateDocId = `${selectedUser._id}_${currentUser}`;
    usersCollection.doc(DocId).onSnapshot(
      querySnapshot => {
        if (querySnapshot.exists) {
          console.log('querySnapshottt', querySnapshot._data.messages);
          setData(querySnapshot._data.messages);
          setChatId(DocId);
          setStartChat(false);
        } else {
          usersCollection.doc(alternateDocId).onSnapshot(
            alternateSnapshot => {
              if (alternateSnapshot.exists) {
                console.log(
                  'alternateSnapshot',
                  alternateSnapshot._data.messages,
                );
                setData(alternateSnapshot._data.messages);
                setChatId(alternateDocId);
                setStartChat(false);
              } else {
                setStartChat(true);
                console.log('Both documents do not exist');
              }
            },
            error => {
              console.error('Error fetching alternate document:', error);
            },
          );
        }
      },
      error => {
        console.error('Error fetching current user document:', error);
      },
    );
  };

  console.log('data', data);

  useEffect(() => {
    getAllMessages();
  }, []);

  const renderItem = ({item}) => {
    const date = new Date(
      item.timeStamp.seconds * 1000 + item.timeStamp.nanoseconds / 1000000,
    );
    let time = formatTime(date);
    console.log('time', time);
    return item.senderId == currentUser ? (
      <View style={styles.myText}>
        <View style={styles.myTextContainer}>
          <Text style={{color: 'white'}}>{item.message}</Text>
        </View>

        <View style={{flexDirection: 'row', paddingRight: 10, gap: 5}}>
          <Text style={{color: 'gray'}}>{time}</Text>
          <AntDesign name="check" color={'lightgray'} size={20} />
        </View>
      </View>
    ) : (
      <View style={styles.friendText}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{marginRight: 10}}>
            {/* <Image style={{ height: 25, width: 25, borderRadius: 12.5 }} source={require('../../assets/images/profile6.jpg')} /> */}
          </View>
          <View style={{}}>
            <View style={styles.friendTextContainer}>
              <Text style={styles.chatText}>{item.message}</Text>
            </View>
            <Text>{time}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      {/* F2F2F2 */}
      <KeyboardAvoidingView style={{flex:1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 20,
          backgroundColor: '#C8AFC8',
        }}>

        <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={25} color={'white'} />
          </TouchableOpacity>
          <View style={{marginLeft: 10}}>
            <Image
              style={{height: 35, width: 35, borderRadius: 17.5}}
              source={{
                uri: userDetails.image
                  ? userDetails.image
                  : selectedUser.withSticker.uri,
              }}
            />
          </View>
          <View style={{marginLeft: 10}}>
            <Text style={{color: 'white', fontWeight: '700', fontSize: 16}}>
              {userDetails.name}
            </Text>
            <Text style={{color: 'white'}}>Online</Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', gap: 25}}>
          <TouchableOpacity>
            <Feather name="video" color={'white'} size={20} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call-outline" color={'white'} size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 10,
          zIndex: 2,
          flexDirection: 'row',
          gap: 10,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TextInput
          value={messageValue}
          onChangeText={changedText => setMessageValue(changedText)}
          style={{
            height: 50,
            borderRadius: 10,
            padding: 10,
            width: '78%',
            backgroundColor: 'lightgray',
          }}
          placeholder="Type Your Message"
        />
        <TouchableOpacity
          onPress={() => {
            console.log('startChat', startChat);
            startChat ? handleStartChat() : sendMessage();
          }}
          style={{
            backgroundColor: '#FFC0CB',
            height: 37,
            width: 37,
            borderRadius: 17.5,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 5,
          }}>
          <Ionicons name="send" color={'white'} size={20} />
        </TouchableOpacity>
      </View>

      <View>
        <FlatList
          data={data}
          // keyExtractor={(item) => item.id.toString()} // Use id as the key
          renderItem={renderItem}
          style={{
            height: 600,
            paddingBottom: 100,
          }}
        />
      </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatScreen;

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

    // flexDirection: 'row',
    // alignItems:'center',
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
});
