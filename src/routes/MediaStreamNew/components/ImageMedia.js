'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { IndexLink, Link } from 'react-router';

import './styles/ImageMedia.scss';
export const ImageMedia = ({ dataUri, closeImage }) => (
  <div id="parent">
    <div id="container-picture-parent">
      <div id="container-picture">
          <Link type="button" className="btn btn-default btn-next" to='/placeLocator'>
            Next ->
          </Link>

          <div
            id="button-close"
            onClick={ (e)=>{closeImage()} }
            >X</div>
          <img className="img-responsive center-block" src={dataUri}/>
      </div>
    </div>
  </div>
)
ImageMedia.propTypes = {
  dataUri: PropTypes.string.isRequired
}

export default ImageMedia
