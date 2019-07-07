import actionTypes from '../../constants/actionTypes'

export const initialState = {
  data: {},
  loading: false,
  error: null,
}

const exchangeRatesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_EXCHANGE_RATES_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }
    case actionTypes.GET_EXCHANGE_RATES_SUCCESS: {
      const { data } = action.payload
      return {
        ...state,
        data,
        loading: false,
      }
    }
    case actionTypes.GET_EXCHANGE_RATES_FAILURE: {
      const { error } = action.payload
      return {
        ...state,
        loading: false,
        error,
      }
    }
    default:
      return state
  }
}

export default exchangeRatesReducer
