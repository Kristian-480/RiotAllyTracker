import { useState,useEffect,createRef } from "react";
import { FaSearch } from "react-icons/fa";
import Select from 'react-select'
import React from "react";

import axios from 'axios'

import "./SearchBar.css";

export const SearchBar = ({ setResults, input, setInput, setfocused }) => {
  
  const handleChange = (value) => {
    setInput(value);
  };

  const fetchAPI = async () => {
    const response = await axios.get(`http://127.0.0.1:8080/users/${input.split(' ')[0]}/${input.split(' #')[1]}`);
    if(!response.data.status)
      setResults(prevresults => [...prevresults, response.data]);
    else{
        alert("User not found!")
    }
  }
  const onSearch = () =>{
    fetchAPI();
    document.getElementById("search-bar").focus()
  };

  const options = [
    { value: 'NA', label: 'NA' },
    { value: 'EUW', label: 'EUW' },
    { value: 'KR', label: 'KR' }
  ]

  return (
  <>
    <div className="search-wrapper">
      <div className="input-wrapper"  >
        <div className="server-choice">
          <Select  unstyled defaultValue={options[0]} options={options} />
        </div>
        <input placeholder="Game Name + #Tagline" value={input} id="search-bar"
           onChange={(e) => handleChange(e.target.value)}
           onFocus={()=>setfocused(true)}
           onBlur={()=>setfocused(false)}
        />
         <FaSearch id="search-icon" onClick={onSearch}/>
      </div>
    </div>
  </>
  );
};