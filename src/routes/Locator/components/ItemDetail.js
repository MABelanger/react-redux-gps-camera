'use strict';

const React = require('react');

const TextForm = require('./forms/TextForm').default;

export const ItemDetail = function ({saveForm, itemDetail, mediaStream}) {

  return (
    <div>
      {itemDetail.itemName}
      <TextForm saveForm={saveForm}/>
    </div>
  );
}

export default ItemDetail;
