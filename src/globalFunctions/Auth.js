import axios from 'axios';
import {baseUrl} from '../assets/Utils/BaseUrl';
import { UserLogin } from '../redux/Slices';

export const Registeration = async (
  userData,
  formattedDateTime,
  fcmToken,
  mySelected,
) => {
  let data = new FormData();
  data.append('name', userData.name);
  data.append('email', userData.email);
  data.append('password', userData.password);
  data.append('dob', JSON.stringify(formattedDateTime));
  data.append('country', userData.country);
  data.append('phone', userData.phone);
  data.append('occupation', userData.occupation);
  data.append('gender', userData.gender);
  data.append('fcm_token', fcmToken);
  data.append('interests', JSON.stringify(mySelected));
  data.append('image', {
    uri: userData?.pic?.path,
    name: 'Profile',
    type: userData?.pic?.mime,
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${baseUrl}/user/register`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    return response;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};


export const HandleLogin = async (email,password,fcmToken,dispatch) => {
  let data = JSON.stringify({
    email: email,
    password: password,
    fcm_token: fcmToken,
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${baseUrl}/user/login`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };
  dispatch(UserLogin(config));
}