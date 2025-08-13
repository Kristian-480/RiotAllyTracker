import React from 'react'
import { useState,useEffect } from "react";

import { Winrate } from './Winrate,';

import './UserRank.css'

export const UserRank = ({queue, tier, div, showwr, rankwins, ranklosses, comp, loc}) => {
    const[queuetype,setQueuetype]= useState("")
   
    useEffect(() => {
        if(queue=='RANKED_SOLO_5x5')
            setQueuetype('Ranked Solo/Duo')
        else if(queue=='RANKED_FLEX_SR')
            setQueuetype('Ranked Flex')
      }, []);


  return (
    <>
    {loc != "home" ?
    <div className="rank-data">
        <div className='rank-title'>{queuetype}</div>
        <img src={`/src/assets/Ranked Emblems Latest/Rank=${tier}.png`} alt="rank-wings"/>
        <div className='rank-tier'>
            {div}
        </div>
        {showwr && 
            <Winrate rankwins={rankwins} ranklosses={ranklosses} comp={comp} loc={loc}></Winrate>
        }
    </div>
    :
     <div className="rank-data" style={{background:'#40374780', borderInline:'1px solid black'}}>
        <div className='rank-title'>{queuetype}</div>
        <div className='home-wr-rank'>{tier}  {div}</div>
        {showwr && 
            <Winrate rankwins={rankwins} ranklosses={ranklosses} comp={comp} loc={loc}></Winrate>
        }
    </div>
    }
    </>
  )
}
