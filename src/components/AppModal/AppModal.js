import React from 'react'
import PropTypes from 'prop-types'

import './AppModal.scss'

function AppModal({ onClose, children = null }) {
  return (
    <div className="App-modal" data-testid="app-modal">
      <div className="App-modal__content">
        <div className="App-modal__header">
          <button
            className="btn-modal-close"
            data-testid="btn-modal-close"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="App-modal__body">{children}</div>
      </div>
    </div>
  )
}

AppModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.any,
}

export default AppModal
