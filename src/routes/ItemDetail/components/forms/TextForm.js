"use strict";

// Vendor modules
const React = require('react');
import { IndexLink, Link } from 'react-router';

require('./styles/styles.scss');

export const TextForm = ( {saveForm} ) => {
  let name;
  return (
  <div>
    <div className="row">
      <div className="col-sm-12">
      <label>item name :</label>
         <input ref={node => {
          name = node;
        }}/>
      </div>
    </div>
    <div className="row">
      <div className="col-sm-12">
        &nbsp;
        <br/>
        &nbsp;
        <Link
          type="button"
          className="btn btn-default btn-next"
          to='/sendItem'onClick={(e)=>{
            let itemDetail = {
              itemName : name.value
            };
            name.value = '';
            saveForm(itemDetail);
          }}>
          Save ->
        </Link>
      </div>
    </div>
  </div>
)};

export default TextForm;
