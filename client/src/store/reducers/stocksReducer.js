import { GET_STOCK_DATA, LOADING_DATA, LOADING_ERROR } from '../actions/types';

const initialState = {
    loading: false,
    loadingError: false,
    priceFeed: [],
    company: []

}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case LOADING_DATA: 
            return loadingData(state);
        case LOADING_ERROR:
            return loadingError(state);
        case GET_STOCK_DATA:
            return getStockData(state, action);
        default:
            return state;
    }
}

const getStockData = (state, action) => {
    const {company, priceFeed } = action.payload;
    return {
        ...state,
        company,
        priceFeed
    }
}

const loadingData = (state) => {
    return {
        ...state,
        loading: true,
        loadingError: false 
    }
}

const loadingError = (state) => {
    return {
        ...state,
        loading: false,
        loadingError: true
    }
}

export default reducer;