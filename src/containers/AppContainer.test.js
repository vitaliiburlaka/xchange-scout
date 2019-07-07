import { mapStateToProps } from './AppContainer'

describe('<AppContainer/>', () => {
  it('should select `exchangeRates` from state', () => {
    const state = {
      exchangeRates: { data: {}, error: null, loading: false },
    }

    expect(mapStateToProps(state)).toEqual({
      exchangeRates: state.exchangeRates,
    })
  })
})
