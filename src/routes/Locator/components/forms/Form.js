"use strict";

// Vendor modules
const React = require('react');
import './styles.scss'

export const Form = ( {apply} ) => {
  let timeout, maximumAge, enableHighAccuracy;
  return (
  <div>
    <label>timeout: </label>
    <input ref={node => {
      if(node && node.value === ""){
        node.value = '5000';
      }
      timeout = node;
    }}/><br/>
    <label>maximumAge: </label>
    <input ref={node => {
      if(node && node.value === ""){
        node.value = '0';
      }
      maximumAge = node;
    }}/><br/>
    <label>enableHighAccuracy:</label>
    <input type='checkbox' ref={node => {
      enableHighAccuracy = node;
    }}/><br/>
    <button onClick={(e)=>{
      let values = {
        timeout : parseInt(timeout.value),
        maximumAge : parseInt(maximumAge.value),
        enableHighAccuracy: enableHighAccuracy.checked
      };
      apply(values);
    }}>
    Apply
    </button>
  </div>
)};

export default Form;
