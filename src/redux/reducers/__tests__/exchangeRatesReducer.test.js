import exchangeRatesReducer, { initialState } from '../exchangeRatesReducer'
import actionTypes from '../../../constants/actionTypes'

describe('exchangeRatesReducer', () => {
  it('should return initial state', () => {
    const actions = {}

    const nextState = exchangeRatesReducer(undefined, actions)

    expect(nextState).toEqual(initialState)
  })

  it('should handle GET_EXCHANGE_RATES_REQUEST', () => {
    const actions = {
      type: actionTypes.GET_EXCHANGE_RATES_REQUEST,
    }
    const expectedState = { ...initialState, loading: true }

    const nextState = exchangeRatesReducer(initialState, actions)

    expect(nextState).toEqual(expectedState)
  })

  it('should handle GET_EXCHANGE_RATES_SUCCESS', () => {
    const data = {
      rates: { USD: 1.123 },
      date: '2019-07-04',
      base: 'EUR',
    }
    const actions = {
      type: actionTypes.GET_EXCHANGE_RATES_SUCCESS,
      payload: { data },
    }
    const expectedState = { ...initialState, data }

    const nextState = exchangeRatesReducer(initialState, actions)

    expect(nextState).toEqual(expectedState)
  })

  it('should handle GET_EXCHANGE_RATES_FAILURE', () => {
    const error = { message: 'Network Error' }
    const actions = {
      type: actionTypes.GET_EXCHANGE_RATES_FAILURE,
      payload: { error },
    }
    const expectedState = { ...initialState, error }

    const nextState = exchangeRatesReducer(initialState, actions)

    expect(nextState).toEqual(expectedState)
  })
})
