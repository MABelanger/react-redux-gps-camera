'use strict';
import React from 'react';
import RcSlider from 'rc-slider';

import './styles/rc-slider.scss';

const style = { margin: 50 };
const marks = {
  1: '1km',
  2: '7km',
  3: '30km',
  4: '230km'
};

function log(value) {
  console.log(value); //eslint-disable-line
}

// TODO solution to value ...
const Slider = function ({setItemsRadiusSearch}) {
  function _setRealRadiusValue(value){
    let realValue = null
    if(value == 1){
      realValue = 1;
    }else if(value == 2){
      realValue = 7;
    }else if(value == 3){
      realValue = 30;
    }else if(value == 4){
      realValue = 230;
    }
    setItemsRadiusSearch(realValue);
  }

  return (
    <div className="row">
      <div className="col-sm-12">
        <div style={style}>
          <p>Choose your radius</p>
          <RcSlider min={1} max={4} marks={marks} step={null} onChange={_setRealRadiusValue} defaultValue={3} />
        </div>
      </div>
    </div>
  );
}

export default Slider;
