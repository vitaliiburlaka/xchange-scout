import React from 'react'
import { shallow } from 'enzyme'

import ExchangeRates from './ExchangeRates'

describe('<ExchangeRates/>', () => {
  const defaultProps = {
    rates: { USD: 1.245 },
    base: 'EUR',
    date: '2019-07-04',
  }

  it('renders without crashing', () => {
    shallow(<ExchangeRates {...defaultProps} />)
  })
})
