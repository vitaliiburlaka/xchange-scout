import actionTypes from '../../constants/actionTypes'
import getExchangeRates from '../../api/getExchangeRates'

const getExchangeRatesRequest = () => ({
  type: actionTypes.GET_EXCHANGE_RATES_REQUEST,
})

const getExchangeRatesSuccess = data => ({
  type: actionTypes.GET_EXCHANGE_RATES_SUCCESS,
  payload: { data },
})

const getExchangeRatesFailure = error => ({
  type: actionTypes.GET_EXCHANGE_RATES_FAILURE,
  payload: { error },
})

const fetchExchangeRates = date => async dispatch => {
  dispatch(getExchangeRatesRequest())

  try {
    const response = await getExchangeRates(date)
    dispatch(getExchangeRatesSuccess(response))
  } catch (error) {
    dispatch(getExchangeRatesFailure(error))
  }
}

export default fetchExchangeRates
