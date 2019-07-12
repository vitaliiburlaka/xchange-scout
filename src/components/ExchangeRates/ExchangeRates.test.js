import React from 'react'
import { render } from '@testing-library/react'

import ExchangeRates from './ExchangeRates'

describe('<ExchangeRates/>', () => {
  const defaultProps = {
    rates: { USD: 1.245 },
    base: 'EUR',
    date: '2019-07-04',
  }

  it('renders without crashing', () => {
    render(<ExchangeRates {...defaultProps} />)
  })
})
