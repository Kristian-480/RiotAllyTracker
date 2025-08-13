import React from 'react'
import axios from 'axios'
import { BrowserRouter, Routes, Route, Link  } from "react-router-dom";

import { useState,useEffect } from "react";
import  './FrequentPlayer.css'


export const FrequentPlayer = ({frequentPlayer, setComparePlayer}) => {
    // console.log(frequentPlayer)
    const [player, setPlayer] = useState("");
    const[playerid,setPlayerID] = useState("")
    const[gamescount,setGamesCount] = useState("")
    const[wins,setWins] = useState("")

    const fetchPlayer = async (playerid) => {
        const response = await axios.get(`http://127.0.0.1:8080/users-by-id/${playerid}`);
        setPlayer(response.data);
      }

    const getPlayerInfo = () =>{
        setPlayerID(frequentPlayer[0])
        setGamesCount(frequentPlayer[1])
    }

    const getWins = () =>{
        setWins(frequentPlayer[2])
    }

    const handleClick = () =>{
        setComparePlayer(frequentPlayer[0])
    }

    useEffect(()=>{
        getPlayerInfo()
        getWins()
  },[])

    useEffect(() =>{
        if(playerid){
            fetchPlayer(playerid)
        }
    },[playerid])
  return (
    <Link to='/comparison' style={{ textDecoration: 'none' }}>
        <div className='freq-player' onClick={handleClick}>
            <div className='freq-player-thumb'>
                {player && <img src={`/src/assets/dragontail-15.13.1/15.13.1/img/profileicon/${player.profileIconId}.png`}/>}
            </div>
            <div className='freq-player-name'>
                {player.gameName}
                #{player.tagLine}
            </div>
            <div className='freq-player-games'>
                {gamescount}
            </div>
            <div className='freq-player-wl'>
                {wins} - {gamescount-wins}
            </div>
            <div className='freq-player-wr'>
                {Math.round(wins/gamescount*100)*100/100}%
            </div>
        </div>
    </Link>
  )
}
