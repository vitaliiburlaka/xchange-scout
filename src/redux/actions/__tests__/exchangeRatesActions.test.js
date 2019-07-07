import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import fetchExchangeRates from '../exchangeRatesActions'
import actionTypes from '../../../constants/actionTypes'
import getExchangeRates from '../../../api/getExchangeRates'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const dataMock = {
  rates: { USD: 1.123 },
  date: '2019-07-04',
  base: 'EUR',
}
jest.mock('../../../api/getExchangeRates')
getExchangeRates.mockImplementationOnce(() => Promise.resolve(dataMock))

describe('async exchangeRatesActions*', () => {
  it('creates GET_EXCHANGE_RATES_REQUEST and GET_EXCHANGE_RATES_SUCCESS', async () => {
    const expectedActions = [
      { type: actionTypes.GET_EXCHANGE_RATES_REQUEST },
      {
        type: actionTypes.GET_EXCHANGE_RATES_SUCCESS,
        payload: { data: dataMock },
      },
    ]
    const store = mockStore({})

    await store.dispatch(fetchExchangeRates())

    expect(store.getActions()).toEqual(expectedActions)
  })

  it('creates GET_EXCHANGE_RATES_REQUEST and GET_EXCHANGE_RATES_FAILURE', async () => {
    const errorMsg = { message: 'Network Error' }
    getExchangeRates.mockImplementationOnce(() => Promise.reject(errorMsg))
    const expectedActions = [
      { type: actionTypes.GET_EXCHANGE_RATES_REQUEST },
      {
        type: actionTypes.GET_EXCHANGE_RATES_FAILURE,
        payload: { error: errorMsg },
      },
    ]
    const store = mockStore({})

    await store.dispatch(fetchExchangeRates())
    expect(store.getActions()).toEqual(expectedActions)
  })
})
