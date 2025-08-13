import { useState,useEffect } from "react";
import axios from 'axios'

import { SearchBar } from '../components/SearchBar'
import { SearchResultsList } from '../components/SearchResultList'
import { UserFrame } from "../components/UserFrame";
import { MatchHistory } from "../components/MatchHistory";
import { FrequentPlayerList } from "../components/FrequentPlayerList";
import { RankList } from "../components/RankList";

const ResultPage = ({ setResults, results,compareResult, setMatches, matches, setComparePlayer, 
  rank, setRank, setCompareRank, compareRank }) => {
  const [frequentPlayers,setFrequentPlayers] = useState([])
  const [matchSortType,setMatchSortType] = useState("all")
  const [focused,setfocused] = useState(false)
  const [input1, setInput1] = useState("");
  const [loaded, setLoaded] = useState(0)
  const [toLoad, setToLoad] = useState(10)

  const fetchMatches = async (type) =>{
    const macthHistory = await axios.get(`http://127.0.0.1:8080/history/${results[0].puuid}/${type}`);

    setMatches(macthHistory.data);
    setLoaded(loaded+10)
    console.log(loaded)
    console.log(matches.length) 
  }

  const getFreqPlayers = (matches,results) => {
    let freqPlayers=[]
    let found=false
    let wins=0;
    for(let i in matches){
      const gameparticipants = matches[i].metadata.participants

      for(let l in gameparticipants){
        wins=0;
        found=false
        for(let k in freqPlayers){
          if(freqPlayers[k][0]==gameparticipants[l]){
            freqPlayers[k][1]++
            found=true
            if(matches[i].info.participants[l].win)
            freqPlayers[k][2]++
          }
        }
        if(found===false){
          if(matches[i].info.participants[l].win)
              wins++
          freqPlayers.push([gameparticipants[l],1 ,wins])
        }
      }
    }
    freqPlayers.sort(function(a, b) {
      return b[1] - a[1];
    });
    for(let p in freqPlayers){
      if(freqPlayers[p][0]==results[0].puuid)
        freqPlayers.splice(p,1)
    }
    setFrequentPlayers(freqPlayers.slice(0,5))
  }

  const handleSort = (sortType) =>{
    const sortOptions = document.querySelectorAll(".match-type-option")
    sortOptions.forEach((element)=>{
      element.classList.remove("selected")
      if(element.classList.contains(sortType)){
        element.classList.add("selected")
      }
    })
    setMatchSortType(sortType)
  }

  // useEffect(() => {
  //     fetchMatches(matchSortType);
  // },[matchSortType]);

  useEffect(() =>{
    if(loaded<toLoad){
      // console.log("dont load")
      fetchMatches(matchSortType);
    }
  },[])

  useEffect(() => {
    if(matches.length>0){
      getFreqPlayers(matches,results)
    }
  },[matches]);

  return (
  <>
      <div className="result-search">
        <div className="result-search-text">Search for someone to compare to: </div>
        <div className="result-search-bar"><SearchBar setResults={setResults} input={input1} setInput={setInput1} setfocused={setfocused}/></div>
        <div className="result-search-text">or pick from your games...</div>
      </div>
      <div className="compare-result">
        {compareResult && compareResult.length > 0 && <SearchResultsList results={compareResult} rank={compareRank} setRank={setCompareRank} focused={focused} setComparePlayer={setComparePlayer} type="/comparison"/>}
      </div>
      <UserFrame results={results} rank={rank}/>
      <div className="winrates-container">
           <RankList rank={rank} showwr={true} comp={false} loc="home"/>
      </div>
      <div className="frequent-players">
      <div className="frequent-players-title">
        <h3>Frequent Players</h3>
        {matches && matches.length>0 && <h3>({matches.length} games)</h3>}
      </div>
        <div className="frequent-players-header">
          <div className="frequent-players-header-name">Player</div>
          <div className="frequent-players-header-games">Played</div>
          <div className="frequent-players-header-wl">W-L</div>
          <div className="frequent-players-header-wr">Winrate</div>
        </div>
        {matches && matches.length >0 && frequentPlayers && frequentPlayers.length>0 && <FrequentPlayerList frequentPlayers={frequentPlayers} setComparePlayer={setComparePlayer}/>}
      </div>
      <div className="match-history">
        <div className="match-type-selector">
          {/* <div classname="match-type-selecor-title">Match Type:</div> */}
          <div className="match-type-option all selected" onClick={()=>handleSort("all")}>All</div>
          <div className="match-type-option solo" onClick={()=>handleSort("solo")}>Ranked Solo/Duo</div>
          <div className="match-type-option flex" onClick={()=>handleSort("flex")}>Ranked Flex</div>
        </div>
        {matches && matches.length >0 && <MatchHistory matches={matches} userID={results[0].puuid} setComparePlayer={setComparePlayer}/>}
      </div>

  </>
  )
}

export default ResultPage;