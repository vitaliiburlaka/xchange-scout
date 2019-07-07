import React from 'react'
import { shallow } from 'enzyme'

import AppModal from './AppModal'

describe('<AppModal/>', () => {
  const defaultProps = {
    onClose: () => {},
  }

  it('renders without crashing', () => {
    shallow(<AppModal {...defaultProps} />)
  })

  it('should call onClose() on Button click', () => {
    const onCloseMockFn = jest.fn()
    const props = {
      ...defaultProps,
      onClose: onCloseMockFn,
    }
    const wrapper = shallow(<AppModal {...props} />)
    const btn = wrapper.find('[data-testid="btn-modal-close"]')

    btn.simulate('click')

    expect(onCloseMockFn).toHaveBeenCalled()
  })
})
