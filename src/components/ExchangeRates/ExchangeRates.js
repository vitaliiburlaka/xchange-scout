import React from 'react'
import PropTypes from 'prop-types'

import './ExchangeRates.scss'

function ExchangeRates({ rates, base, date }) {
  return (
    <div className="ExchangeRates">
      <h2>Currency Exchange Rates at {date}</h2>

      <div className="exchange-rates-list">
        <div className="exchange-rates-list__header">
          <div className="exchange-rates-list__header-cell">Currency</div>
          <div className="exchange-rates-list__header-cell">
            Exchange Rate = 1 {base}
          </div>
        </div>
        <div className="exchange-rates-list__content">
          {Object.keys(rates).map(key => (
            <div className="exchange-rates-list__row" key={key}>
              <div className="exchange-rates-list__cell">{key}</div>
              <div className="exchange-rates-list__cell">{rates[key]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

ExchangeRates.propTypes = {
  rates: PropTypes.object.isRequired,
  base: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
}

export default ExchangeRates
