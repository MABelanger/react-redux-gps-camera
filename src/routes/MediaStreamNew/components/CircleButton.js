import React from 'react'
import PropTypes from 'prop-types'

import './styles/CircleButton.scss';

export const CircleButton = ({ onClickVideo }) => (
  <div onClick={onClickVideo} id="outer-circle">
    <div onClick={onClickVideo} id="inner-circle">
    </div>
  </div>
)
CircleButton.propTypes = {

};

export default CircleButton;
