import { useState,useEffect } from 'react'
import './App.css'
import axios from 'axios'
import { SearchBar } from './components/SearchBar'
import { SearchResultsList } from './components/SearchResultList'

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link  } from "react-router-dom";

import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import ResultPage from './pages/ResultPage'
import Comparison from './pages/Comparison'


function App() {
  
  const [results, setResults] = useState([]);
  const [compareResult,setCompareResults] = useState([])
  const [compareRank,setCompareRank] = useState([])
  const [matches,setMatches] = useState([])
  const [compareplayer,setComparePlayer] = useState("")
  const [rank, setRank] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Home setResults={setResults} results={results} rank={rank} setRank={setRank}/>} />
          
          <Route path="/result" element={<ResultPage setResults={setCompareResults} results={results} compareResult={compareResult} 
                                          setMatches={setMatches} matches={matches} setComparePlayer={setComparePlayer} rank={rank} 
                                          setRank={setRank} setCompareRank={setCompareRank} compareRank={compareRank} />}/>
          <Route path="/comparison" element={<Comparison setResults={setCompareResults} results={results} compareResult={compareResult} 
                                              compareplayer={compareplayer} matches={matches} setCompareRank={setCompareRank} 
                                              compareRank={compareRank}/>}/>
          <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
