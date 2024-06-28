import axios from 'axios';
import {baseUrl} from '../assets/Utils/BaseUrl';

export const handleNotification = async token => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${baseUrl}/user/notify-ifUser-like`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.request(config);
    const responseData = res.data.data;
    const newData = responseData.map(area => ({
      id: area._id,
      name: area.name,
      ProfilePic: `https://www.yourappdemo.com/happyeverafter/${area.image}`,
    }));
    return newData;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};
