import axios from 'axios';
import {baseUrl} from '../assets/Utils/BaseUrl';
import {ShowToast} from './ShowToast';

export const BuySubscription = async (
  subscriptionName,
  cardNumber,
  cvc,
  expiry,
  token,
) => {
  let data = JSON.stringify({
    subscriptionName: subscriptionName,
    cardNumber: cardNumber,
    cvc: cvc,
    expirationDate: expiry,
    usd: 70,
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${baseUrl}/subscription/add-subscription`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    console.log('respose', response.data.message);
    if(response.data.success){
      ShowToast('success', response.data.message);
    }else{
      ShowToast('error', response.data.errorMessage);

    }
    return response.data;
  } catch (error) {
    console.log('error', error.response.data);
    ShowToast('error', error.response.data.message);
    throw error;
  }
};
