"use strict";

// Vendor modules
const React = require('react');
import Autocomplete from 'react-autocomplete';

function sortStates(a, b, value) {
  const aLower = a.name.toLowerCase()
  const bLower = b.name.toLowerCase()
  const valueLower = value.toLowerCase()
  const queryPosA = aLower.indexOf(valueLower)
  const queryPosB = bLower.indexOf(valueLower)
  if (queryPosA !== queryPosB) {
    return queryPosA - queryPosB
  }
  return aLower < bLower ? -1 : 1
}

function matchStateToTerm(state, value) {
  return (
    state.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
  )
}

function selectValue(setInputSearchValue, search, searchValue){
  setInputSearchValue({searchValue:searchValue, isSelected:true});
  search();
}

function changeValue(event, setInputSearchValue, getAutocompleteItemNames, searchValue){
  console.log('changeValue', event.target.value)
  setInputSearchValue({searchValue:searchValue, isSelected:false});
  getAutocompleteItemNames();
}

function handleKeyDown(event, search){
  if(event.key == 'Enter') {
    search();
  }
  console.log('handleKeyDown', event.key)
}

const mctaItems = [
  {"name":"Pennine"},
  {"name":"Spaghetti"},
  {"name":"Fettucini"}
]

const styles = {
  item: {
    padding: '2px 6px',
    cursor: 'default'
  },

  highlightedItem: {
    color: 'white',
    background: 'hsl(200, 50%, 50%)',
    padding: '2px 6px',
    cursor: 'default'
  },

  menu: {
    border: 'solid 1px #ccc'
  }
};

export const TextForm = ({ search,
    setInputSearchValue,
    getAutocompleteItemNames,
    searchValue,
    itemNames}) => {
  let itemName;

  itemNames = itemNames || mctaItems;

  const inputProps = {
    onKeyDown: handleKeyDown
  };

  return (
  <div>
    <Autocomplete
      value={searchValue}
      inputProps={{ name: 'US state', id: 'states-autocomplete', onKeyDown: (event)=> {handleKeyDown(event,search)} }}
      items={mctaItems}
      getItemValue={(item) => item.name}
      shouldItemRender={matchStateToTerm}
      sortItems={sortStates}
      onChange={(event, searchValue) => changeValue(event, setInputSearchValue, getAutocompleteItemNames, searchValue)}
      onSelect={searchValue => selectValue(setInputSearchValue, search, searchValue)}
      renderItem={(item, isHighlighted) => (
        <div
          style={isHighlighted ? styles.highlightedItem : styles.item}
          key={item.name}
        >{item.name}</div>
      )}
    />
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>

    <button onClick={(e)=>{
      search();
    }}>
    Search
    </button>
  </div>
)};

export default TextForm;
