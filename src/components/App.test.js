import React from 'react'
import { shallow, mount } from 'enzyme'

import App from './App'
import ExchangeRates from './ExchangeRates/ExchangeRates'

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
    shallow(<App {...defaultProps} />)
  })

  it('should call fetchExchangeRates() on Button click', () => {
    const fetchExchangeRatesMockFn = jest.fn()
    const props = {
      ...defaultProps,
      fetchExchangeRates: fetchExchangeRatesMockFn,
    }
    const wrapper = shallow(<App {...props} />)
    const btn = wrapper.find('[data-testid="get-rates-btn"]')

    btn.simulate('click')

    expect(fetchExchangeRatesMockFn).toHaveBeenCalled()
  })

  it('should disable Button and show "Loading..." as a label if `loading` is TRUE', () => {
    const props = {
      ...defaultProps,
      exchangeRates: { ...exchangeRates, loading: true },
    }

    const wrapper = shallow(<App {...props} />)
    const btn = wrapper.find('[data-testid="get-rates-btn"]')

    expect(btn.text()).toEqual('Loading...')
    expect(btn.prop('disabled')).toEqual(true)
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

    const wrapper = shallow(<App {...props} />)

    expect(wrapper.find(ExchangeRates).length).toEqual(1)
  })

  it('should render Error message on error', () => {
    const wrapper = mount(<App {...defaultProps} />)

    wrapper.setProps({
      exchangeRates: { ...exchangeRates, error: 'Internal Server Error' },
    })
    const errorEl = wrapper.find('[data-testid="app-modal"]')

    setTimeout(() => {
      expect(errorEl.length).toEqual(1)
    }, 0)
  })

  it('should close modal on Modal Close button click', () => {
    const props = {
      ...defaultProps,
      exchangeRates: { ...exchangeRates, error: 'Internal Server Error' },
    }

    const wrapper = mount(<App {...props} />)
    const errorEl = wrapper.find('[data-testid="app-modal"]')
    const btn = wrapper.find('[data-testid="btn-modal-close"]')
    expect(errorEl.length).toEqual(1)

    btn.simulate('click')

    setTimeout(() => {
      expect(errorEl.length).toEqual(0)
    }, 0)
  })
})
