import {React,useState,useEffect } from 'react'
import { SearchBar } from '../components/SearchBar'
import { SearchResultsList } from '../components/SearchResultList'
import { ComparisonFrame } from '../components/ComparisonFrame'

import { useNavigate, Link } from 'react-router-dom'

const Comparison = ({ setResults,results,compareResult,compareplayer,matches }) => {
  console.log(compareplayer)
  const navigate = useNavigate();


  return (
    <>
      <Link
        to={'..'}
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      >
      <div className='back-btn'>
        Go Back
        </div>
      </Link>

    <div className="search-bar-container-result">
        <SearchBar setResults={setResults} />
    </div>
    <ComparisonFrame results={results} compareplayer={compareplayer} matches={matches}/>
    </>
  )
}

export default Comparison;

