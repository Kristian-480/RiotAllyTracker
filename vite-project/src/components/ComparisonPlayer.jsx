import React, { useState,useEffect } from 'react'
import './ComparisonPlayer.css'
import axios from 'axios'
import { Tilt } from "react-tilt";
import { RankList } from './RankList'


export const ComparisonPlayer = ({results,player}) => {
    const [playername,setPlayerName] = useState("")
    const[playerinfo,setPlayerInfo] = useState("")
    const [rank, setRank] = useState([]);
  
    const fetchRank = async (playerinfo) => {
      const userRank = await axios.get(`http://127.0.0.1:8080/userRank/${playerinfo.puuid}`);
      
      const sortedranks = sortRank(userRank.data)
      setRank(sortedranks);
    }
  
    const sortRank = (ranks) =>{
      const sortedranks = ranks.sort(
        (a, b) => (a.queueType < b.queueType) ? 1 : (a.queueType > b.queueType) ? -1 : 0);
      return(sortedranks)
    }

    const fetchPlayer = async () => {
        const response = await axios.get(`http://127.0.0.1:8080/users-by-id/${player}`);
        setPlayerInfo(response.data);
      }

    // const getPlayerName = async () =>{
    //     const response = await axios.get(`http://127.0.0.1:8080/users-by-id/${player}`);
    //     setPlayerName(response.data.gameName + ' #' + response.data.tagLine)
    // }

    useEffect(()=>{
        // getPlayerName()
        fetchPlayer()
    },[])

    useEffect(()=>{
        if(playerinfo){
            fetchRank(playerinfo)
        }
    },[playerinfo])
  return (
    <>
      <Tilt style={{width:400}}>
        <div className='compare-character'>
          <div className='compare-character-container'>
            <div className='compare-character-thumb'>
                {playerinfo && <img src={`/src/assets/dragontail-15.13.1/15.13.1/img/profileicon/${playerinfo.profileIconId}.png`}/>}
            </div>
            <div className='compare-character-level'>
                {playerinfo.summonerLevel}
            </div>
            {playerinfo.gameName} #{playerinfo.tagLine}
            <div className='separator'>
                <hr></hr>
            </div>
            {playerinfo && playerinfo.puuid===results[0].puuid &&
            <div className='compare-character-ranks'>   
                {rank && rank.length > 0 && <RankList rank={rank} showwr={true} comp={false}/>}
            </div>}
            {playerinfo && playerinfo.puuid!==results[0].puuid &&
            <div className='compare-character-ranks'>   
                {rank && rank.length > 0 && <RankList rank={rank} showwr={true} comp={true}/>}
            </div>}
          </div>
        </div>
      </Tilt>
    </>
  )
}
