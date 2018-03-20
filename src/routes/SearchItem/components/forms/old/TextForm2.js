"use strict";

// Vendor modules
const React = require('react');
import Autosuggest from 'react-autosuggest';

function selectValue(setInputSearchValue, search, searchValue){
  setInputSearchValue({searchValue:searchValue, isSelected:true});
  search();
}

function changeValue(event, searchValue){
  setInputSearchValue({searchValue:searchValue, isSelected:false});
  getAutocompleteItemNames();
}

function handleKeyDown(event, search){
  if(event.key == 'Enter') {
    search();
  }
}


export const TextForm = ({ search,
    setInputSearchValue,
    getAutocompleteItemNames,
    searchValue,
    itemNames,
    suggestions,
    setSuggestions}) => {

  const languages = [
    {
      name: 'C',
      year: 1972
    },
    {
      name: 'Elm',
      year: 2012
    }
  ];

  // Teach Autosuggest how to calculate suggestions for any given input value.
  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : languages.filter(lang =>
      lang.name.toLowerCase().slice(0, inputLength) === inputValue
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

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  function _onSuggestionsFetchRequested ({ searchValue }) {
    setSuggestions(getSuggestions(searchValue))
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  function _onSuggestionsClearRequested () {
    setSuggestions([])
  };

  // Autosuggest will pass through all these props to the input.
  const inputProps = {
    placeholder: 'Type a programming language',
    value: searchValue,
    onChange: (event, searchValue) => changeValue(searchValue)
  };

  suggestions = suggestions || [];
  return (
  <div>
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={_onSuggestionsFetchRequested}
      onSuggestionsClearRequested={_onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />


    <button onClick={(e)=>{
      search();
    }}>
    Search
    </button>
  </div>
)};

export default TextForm;
