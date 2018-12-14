import axios from 'axios';
import { GET_STOCK_DATA } from './types';

export const fetchStocks = (companySym) => async dispatch => {
    try {
        let res = await axios.get(`/api/alpha/daily/`, {
            params:{
                sym: companySym.toUpperCase()
            }
        })
        console.log(res);
        dispatch({type: GET_STOCK_DATA, payload: res.data})
    } catch(er) {
        console.log(er);
    }
}