// import axios from 'axios'

function getExchangeRates() {
  return fetch('https://api.exchangeratesapi.io/latest').then(res => res.json())
}

export default getExchangeRates
