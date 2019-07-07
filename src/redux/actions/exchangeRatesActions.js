import NProgress from 'nprogress'

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

const fetchExchangeRates = () => async dispatch => {
  dispatch(getExchangeRatesRequest())
  NProgress.start()

  try {
    const response = await getExchangeRates()
    dispatch(getExchangeRatesSuccess(response))
    NProgress.done()
  } catch (error) {
    dispatch(getExchangeRatesFailure(error))
    NProgress.done()
  }
}

export default fetchExchangeRates
