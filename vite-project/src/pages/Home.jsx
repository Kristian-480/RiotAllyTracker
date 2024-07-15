import {React,useState,useEffect } from 'react'
import { SearchBar } from '../components/SearchBar'
import { SearchResultsList } from '../components/SearchResultList'

import logo from '../assets/logo.svg'

const Home = ({ setResults, results, rank, setRank }) => {
  const [input1, setInput1] = useState("");
  const [focused,setfocused] = useState(false)

  return (
    <div className="home">
      <div className='welcome-area-container'>
        <div className='welcome-area'>
          <div className='welcome-header'>
            Start by searching for your account
          </div>
          <div className="search-bar-container">
              <SearchBar setResults={setResults} input={input1} setInput={setInput1} setfocused={setfocused}/>
              {results && results.length > 0 && <SearchResultsList results={results} rank={rank} setRank={setRank} focused={focused} type="/result"/>}
            </div>
        </div>
      </div>
    </div>
  )
}

export default Home;

