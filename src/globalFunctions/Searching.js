import axios from "axios";
import { baseUrl } from "../assets/Utils/BaseUrl";

export const Searching = async (gender,occupation,interest,age,userToken) => {
  console.log(gender,occupation,interest,age)
  let data = JSON.stringify({
    "gender": 'male',
    "occupation": 'occupation',
    "interests": 'innterest',
    "age": 'age'
  });
  
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://www.yourappdemo.com/happyeverafter/user/searching`,
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${userToken}`
    },
    data : data
  };
  try{

  const response = await axios.request(config)
  console.log('response.dataa',response.data.data)
  return response.data
  }catch(error){
    console.log('error',error)
    throw error
  }
 

}