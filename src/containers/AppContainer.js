import { connect } from 'react-redux'

import App from '../components/App'
import fetchExchangeRates from '../redux/actions/exchangeRatesActions'

export const mapStateToProps = ({ exchangeRates }) => ({ exchangeRates })

export default connect(
  mapStateToProps,
  { fetchExchangeRates }
)(App)
