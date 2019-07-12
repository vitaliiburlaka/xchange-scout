import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import NProgress from 'nprogress'
import { format, subDays } from 'date-fns'

import ExchangeRates from './ExchangeRates/ExchangeRates'
import AppModal from './AppModal/AppModal'

import './App.scss'

function App({ exchangeRates, fetchExchangeRates }) {
  const [isOpen, setIsOpen] = useState(false)
  const { data, error, loading } = exchangeRates

  useEffect(() => {
    if (!!error) {
      setIsOpen(true)
    }
    if (loading) {
      NProgress.start()
    } else {
      NProgress.done()
    }
  }, [error, loading])

  const handleModalClose = () => {
    setIsOpen(false)
  }

  const getPrevDate = date => {
    const prevDate = subDays(new Date(date), 1)
    const formatedPrevDate = format(prevDate, 'YYYY-MM-DD')

    return formatedPrevDate
  }

  return (
    <div className="App">
      <header className="App__header">
        <h1>
          XChange Scout{' '}
          <span
            className="icon"
            role="img"
            aria-label="Currency Exchange emoji"
          >
            💱
          </span>
        </h1>
      </header>
      <div className="App__content">
        <div className="App__topbar">
          <button
            className="btn"
            onClick={() => fetchExchangeRates(getPrevDate(data.date))}
            disabled={loading || !data.date}
            data-testid="get-previous-rates-btn"
          >
            Get Previous Rates
          </button>
          <button
            className="btn"
            onClick={() => fetchExchangeRates()}
            disabled={loading}
            data-testid="get-rates-btn"
          >
            Get Rates
          </button>
        </div>

        {data.rates && <ExchangeRates {...data} />}
      </div>

      {isOpen && (
        <AppModal onClose={handleModalClose}>{error.message}</AppModal>
      )}
    </div>
  )
}

App.propTypes = {
  exchangeRates: PropTypes.shape({
    data: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.any]),
  }).isRequired,
}

export default App
