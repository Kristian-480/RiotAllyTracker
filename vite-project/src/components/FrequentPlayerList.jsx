import React from 'react'
import { FrequentPlayer } from './FrequentPlayer';


export const FrequentPlayerList = ({frequentPlayers,setComparePlayer}) => {
    return (
    frequentPlayers.map((frequentPlayer,index) =>{
        return(
            <FrequentPlayer frequentPlayer={frequentPlayer} setComparePlayer={setComparePlayer} key={index}/>
        )
    })
  )
}
