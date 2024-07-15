import "./SearchResultList.css";
import { BrowserRouter, Routes, Route, Link  } from "react-router-dom";

import { SearchResult } from "./SearchResult";
import { useEffect, useState } from "react";

export const SearchResultsList = ({ results, rank, setRank, focused,type,setComparePlayer }) => {
  const [overElement,setOverElement] = useState(true)

  return (
    <div className="results-list" onMouseEnter={()=>setOverElement(true)} onMouseLeave={()=>setOverElement(false)}>
    {((focused===true) || (overElement===true)) &&
      <>
      {results.map((result, id) => {
        return <SearchResult result={result} key={id} rank={rank} setRank={setRank} type={type} setComparePlayer={setComparePlayer}/>;
      })}
      </>
    }
    </div>
  );
};