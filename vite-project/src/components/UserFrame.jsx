import React, { useEffect, useState } from 'react'
import './UserFrame.css'
import { RankList } from './RankList'
import { filename } from '../assets/dragon-tail-ver.json'
import { filename1 } from '../assets/dragon-tail-ver.json'

import axios from 'axios'

export const UserFrame = ({ results,rank }) => {
  // console.log(results)

  const [profilebg,setProfilebg] = useState("")

  const getTopChamp = async () =>{
    // const topchamp = await axios.get(`http://127.0.0.1:8080/topchamp/${results[0].puuid}`)
    const champID = results[0].tc

    const champdata = await axios.get(`${filename}/data/en_US/champion.json`)

    for(let l in champdata.data.data)
        if(champdata.data.data[l].key == champID)
          setProfilebg(champdata.data.data[l].id)
}
useEffect(()=>{
  getTopChamp();
},[])

useEffect(()=>{
  document.querySelector('.user-frame-bg').style.background = `url(${filename1}/img/champion/centered/${profilebg}_0.jpg) no-repeat 100% 0%/55%`
},[profilebg])

  return (
    <div className="user-frame-container">
      <div className='user-frame-bg'></div>
        <div className='icon-container'>
            <div className='profile-icon'>
                <img src={`${filename}/img/profileicon/${results[0].profileIconId}.png`} alt="profile-icon"/>
            </div>
            <div className='profile-level'>
                    {results[0].summonerLevel}
            </div>
        </div>

        <div className='profile-name'>
          {results[0].gameName} 
          <div className='profile-tag'>
           #{results[0].tagLine}
          </div>
          <br></br>
        </div>
        <div className='swap-btn'>
          <button>Swap accounts</button>
        </div>
        <div className='profile-rank'>
          {rank && rank.length > 0 && <RankList rank={rank} showwr={false} comp={false}/>}
        </div>
    </div>
  )
}
