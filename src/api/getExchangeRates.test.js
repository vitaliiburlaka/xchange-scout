import getExchangeRates from './getExchangeRates'

describe('getExchangeRates request', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  it('should handle successful call', async () => {
    const data = {
      rates: { USD: 1.234 },
      date: '2019-07-04',
      base: 'EUR',
    }
    fetch.mockResponseOnce(JSON.stringify(data))

    await expect(getExchangeRates()).resolves.toEqual(data)
  })
})
