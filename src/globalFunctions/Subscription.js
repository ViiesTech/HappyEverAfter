import axios from "axios";
import { baseUrl } from "../assets/Utils/BaseUrl";
import { ShowToast } from "./ShowToast";

export const BuySubscription = async (token, subscriptionPlan) => {

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${baseUrl}//subscription/add-subscription/${subscriptionPlan}`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    try {
        const res = await axios.request(config)
        if (res.data.success) {
            ShowToast('success', res.data.message)
        } else {
            ShowToast('error', res.data.message)
        }
        return res.data
    } catch (error) {
        ShowToast('error', error.message)
        throw error
    }

}