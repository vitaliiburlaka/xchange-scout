function getExchangeRates(date = 'latest') {
  return fetch(`https://api.exchangeratesapi.io/${date}`).then(res =>
    res.json()
  )
}

export default getExchangeRates
