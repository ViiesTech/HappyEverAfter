import axios from "axios";
import { baseUrl } from "../assets/Utils/BaseUrl";

export const Searching = async (gender,interest,occupation,age,userToken) => {
  let data = JSON.stringify({
    gender: gender.toLowerCase(),
    occupation: occupation.toLowerCase(),
    interests: interest.toLowerCase(),
    age: age,
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${baseUrl}/user/searching`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
    data: data,
  };

  
  try{

  const response = await axios.request(config)
  console.log('response.dataa',response.data.data)
  return response.data.data
  }catch(error){
    console.log('error',error)
    throw error
  }
 

}