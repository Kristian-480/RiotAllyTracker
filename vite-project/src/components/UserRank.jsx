import React from 'react'
import { useState,useEffect } from "react";

import './UserRank.css'

export const UserRank = ({queue, tier, div, showwr, rankwins, ranklosses, comp}) => {
    const[queuetype,setQueuetype]= useState("")
    const[rankwinrate,setrankwinrate] = useState("")
    const[wrclass,setwrclass] = useState("")

    const getwinrate = () =>{
        setrankwinrate(Math.round((rankwins/(rankwins + ranklosses)*100)))
    }
    const getwrclass = () =>{
        if(comp)
            setwrclass("rank-wr comp")
        else
            setwrclass("rank-wr")
    }

    useEffect(()=>{
        getwinrate()
        getwrclass()
    },[])
    useEffect(() => {
        if(queue=='RANKED_SOLO_5x5')
            setQueuetype('Solo/Duo')
        else if(queue=='RANKED_FLEX_SR')
            setQueuetype('Flex')
      }, []);


  return (
    <div className="rank-data">
        <div className='rank-title'>{queuetype}</div>
        <img src={`/src/assets/Ranked Emblems Latest/Rank=${tier}.png`} alt="rank-wings"/>
        <div className='rank-tier'>
            {div}
        </div>
        {showwr && 
            <div className={wrclass}>
                Individual Winrate<br></br>
            {rankwins+ranklosses>0 ?
            <>
                {rankwinrate}% <br></br>
                {rankwins}W - {ranklosses}L
            </> :
            'No matches Played'
            }
            </div>
        }
    </div>
  )
}
