import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import AppModal from './AppModal'

describe('<AppModal/>', () => {
  const defaultProps = {
    onClose: () => {},
  }

  it('renders without crashing', () => {
    render(<AppModal {...defaultProps} />)
  })

  it('should call onClose() on Button click', () => {
    const onCloseMockFn = jest.fn()
    const props = {
      ...defaultProps,
      onClose: onCloseMockFn,
    }
    const { getByTestId } = render(<AppModal {...props} />)
    const btn = getByTestId('btn-modal-close')

    fireEvent.click(btn)

    expect(onCloseMockFn).toHaveBeenCalled()
  })
})
