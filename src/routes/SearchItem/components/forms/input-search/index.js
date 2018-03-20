import React from 'react';

import Autosuggest from 'react-autosuggest';
import './styles/react-autosuggest.scss';
//import './styles/searchbox.scss';

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = (value, itemNames) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : itemNames.filter(itemName =>
    itemName.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);

export const InputSearch = (props) => {

  const {
    setInputSearchValue,
    getAutocompleteItemNames,
    search,
    setSuggestions
  } = props;



  const onChange = (event, { newValue }) => {
    props.setInputSearchValue(newValue);
  };

  const onKeyDown = (event) => {
    const { keyCode } = event;
    if(keyCode == 13) {
      console.log('goto : props.search()');
      props.search();
    }
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = ({ value }) => {
    console.log('onSuggestionsFetchRequested')

    let promise = props.getAutocompleteItemNames();

    promise.then((itemNames)=>{
      props.setSuggestions(getSuggestions(value, itemNames))
    });

  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    console.log('onSuggestionsClearRequested')
    props.setSuggestions([])
  };

  const onSuggestionSelected = () => {
    console.log('onSuggestionSelected')
    console.log('goto : props.search()');
    props.search();
  };


///
  const value = props.inputSearchValue || '';
  const suggestions = props.suggestions || [];

  // Autosuggest will pass through all these props to the input.
  const inputProps = {
    placeholder: 'Type a name',
    value,
    onChange,
    onKeyDown
  };

  // Finally, render it!
  return (
    <div>
      <div className="row">
        <div className="col-sm-4">&nbsp;</div>
        <div className="col-sm-4">
          <div className="container-4">
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              onSuggestionSelected={onSuggestionSelected}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
            />
            <button className="icon" onClick={(e)=>{
                props.search();
              }}>
              <i className="fa fa-search"onClick={(e)=>{
                props.search();
              }}></i>
            </button>
          </div>
        </div>
        <div className="col-sm-5">&nbsp;</div>
      </div>
    </div>
  );
}

export default InputSearch;
