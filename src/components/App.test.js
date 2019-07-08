import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import App from './App'

describe('<App/>', () => {
  const exchangeRates = {
    data: {},
    error: null,
    loading: false,
  }
  const defaultProps = {
    exchangeRates,
    fetchExchangeRates: () => {},
  }

  it('renders without crashing', () => {
    render(<App {...defaultProps} />)
  })

  it('should call fetchExchangeRates() on Button click', () => {
    const fetchExchangeRatesMockFn = jest.fn()
    const props = {
      ...defaultProps,
      fetchExchangeRates: fetchExchangeRatesMockFn,
    }
    const { getByTestId } = render(<App {...props} />)
    const btn = getByTestId('get-rates-btn')

    fireEvent.click(btn)

    expect(fetchExchangeRatesMockFn).toHaveBeenCalled()
  })

  it('should disable Button and show "Loading..." as a label if `loading` is TRUE', () => {
    const props = {
      ...defaultProps,
      exchangeRates: { ...exchangeRates, loading: true },
    }

    const { getByTestId } = render(<App {...props} />)
    const btn = getByTestId('get-rates-btn')

    expect(btn.textContent).toBe('Loading...')
    expect(btn.disabled).toBe(true)
  })

  it('should render <ExchangeRates/> if exchange rates data is not empty', () => {
    const data = {
      rates: { USD: 1.234 },
      date: '2019-07-04',
      base: 'EUR',
    }
    const props = {
      ...defaultProps,
      exchangeRates: { ...exchangeRates, data },
    }

    const { getByTestId } = render(<App {...props} />)

    expect(getByTestId('exchange-rates')).toBeTruthy()
  })

  it('should render Error message on error', () => {
    const props = {
      exchangeRates: { ...exchangeRates, error: 'Internal Server Error' },
    }

    const { getByTestId, rerender } = render(<App {...defaultProps} />)
    rerender(<App {...props} />)

    expect(getByTestId('app-modal')).toBeTruthy()
  })

  it('should close modal on Modal Close button click', () => {
    const props = {
      ...defaultProps,
      exchangeRates: { ...exchangeRates, error: 'Internal Server Error' },
    }

    const { getByTestId, queryByTestId } = render(<App {...props} />)
    expect(getByTestId('app-modal')).toBeTruthy()

    fireEvent.click(getByTestId('btn-modal-close'))

    expect(queryByTestId('app-modal')).toBeNull()
  })
})
