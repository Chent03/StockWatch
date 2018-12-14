import { combineReducers } from 'redux';

import stocksReducers from './stocksReducer';

export default combineReducers({
    stockData: stocksReducers
})