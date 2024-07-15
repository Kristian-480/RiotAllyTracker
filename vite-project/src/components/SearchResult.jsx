import { BrowserRouter, Routes, Route, Link  } from "react-router-dom";
import axios from 'axios'


import "./SearchResult.css";
import { useEffect, useState } from "react";

export const SearchResult = ({ result, rank, setRank,type,setComparePlayer }) => {

  const fetchRank = async () => {
    const userRank = await axios.get(`http://127.0.0.1:8080/userRank/${result.id}`);
    
    const sortedranks = sortRank(userRank.data)
    setRank(sortedranks);
  }

  const sortRank = (ranks) =>{
    const sortedranks = ranks.sort(
      (a, b) => (a.queueType < b.queueType) ? 1 : (a.queueType > b.queueType) ? -1 : 0);
    return(sortedranks)
  }

  const displayRank = () =>{
    if (rank.length>0){
      if(rank[0].queueType==="CHERRY")
        rank.splice(0,1)
        return `${rank[0].tier[0]}${rank[0].tier.slice(1).toLowerCase()} ${rank[0].rank} - ${rank[0].leaguePoints} LP`
    }
      else
      return ''
  }

  useEffect(() =>{
    fetchRank();
  },[])

  useEffect(()=>{
    if(type==="/comparison")
      setComparePlayer(result.puuid)
  },[])

  useEffect(()=>{
    if( rank.length>=1){
      document.querySelector('.search-result').style.display="flex"
      document.querySelector('.loader').style.display="none"
    }
    else{
      document.querySelector('.search-result').style.display="none"
      document.querySelector('.loader').style.display="block"
    }
  },[rank])

  return (
    <>
      <div className="loader"></div>
      <Link to={type} style={{ textDecoration: 'none', color: 'black' }}>
        <div className="search-result">
            <div className="result-thumb">
              <img src={`/src/assets/dragontail-14.11.1/14.11.1/img/profileicon/${result.profileIconId}.png`} alt="profile-icon"/>
            </div>
            <div className="result-name">
              {result.gameName} #{result.tagLine}
              <div className="result-data">
                Level : {result.summonerLevel}<br></br>
                {displayRank()}
              </div>
            </div>
        </div>
      </Link>
    </>
  );
};