import axios from 'axios';
import {ShowToast} from './ShowToast';
import {baseUrl} from '../assets/Utils/BaseUrl';

export const HandleChangePassword = async (
  currPass,
  newPass,
  confirmNewPass,
  token,
) => {
  let data = JSON.stringify({
    currentPassword: currPass,
    newPassword: newPass,
    confirmNewPassword: confirmNewPass,
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${baseUrl}/user/update-password`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };
  try {
    const res = await axios.request(config);
    console.log('response', res.data);
    if (res.data.success) {
      ShowToast('success', res.data.message);
    } else {
      ShowToast('error', res.data.message);
    }
    return res.data;
  } catch (error) {
    console.log('errorr', error);
    ShowToast('error', error.message);
    throw error;
  }
};
