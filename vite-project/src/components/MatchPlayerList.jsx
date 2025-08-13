import { BrowserRouter, Routes, Route, Link  } from "react-router-dom";
import React from 'react'
import './Match.css'
import { filename } from '../assets/dragon-tail-ver.json'

export const MatchPlayerList = ({gameparticipant, setComparePlayer}) => {
  const handleClick = () =>{
    setComparePlayer(gameparticipant[9])
  }
  return (
    <div className='player-list-info'>
      <p><img src={`${filename}/img/champion/${gameparticipant[1]}.png`} alt="profile-icon"/>
      {gameparticipant[2] === true ? <b>{gameparticipant[0]}</b>  : 
      <Link to='/comparison' style={{ textDecoration: 'none',color: "#bdbdd3" }} onClick={handleClick}>
        {gameparticipant[0]} 
      </Link>
      }
      </p>
    </div>
  )
}
