import React from 'react'
import { useState,useEffect } from "react";
import { ComparisonPlayer } from './ComparisonPlayer';

import './ComparisonFrame.css'
import { MatchHistory } from './MatchHistory';


export const ComparisonFrame = ({results,compareplayer,matches}) => {
    const [compMatches,setCompMatches] = useState([])
    const[players,setPlayers] = useState([])
    const[compwins,setcompwins] = useState(0)
    const[compsdwins,setcompsdwins] = useState(0)
    const[compsdgames,setcompsdgames] = useState(0)
    const[compflexwins,setcompflexwins] = useState(0)
    const[compflexgames,setcompflexgames] = useState(0)

    const getPlayers = () =>{
        setPlayers([results[0].puuid,compareplayer])
    }
    const getMatches = () =>{
        const tempMatches=[] // for consistency of map functions
        for(let i=0;i<matches.length;i++){
            for(let k=0;k<matches[i].metadata.participants.length;k++){
                if(matches[i].metadata.participants[k]==compareplayer){
                    tempMatches.push(matches[i])
                }
            }
        }
        setCompMatches(tempMatches)
    }

    const countWins = () =>{
        let playerpos=0;
        let tempcompwins=0;
        let tempcompsdgames=0;
        let tempcompsdwins=0;
        let tempcompflexgames=0;
        let tempcompflexwins=0;
        for(let match in compMatches){
            for(let player in compMatches[match].metadata.participants){
                if(compMatches[match].metadata.participants[player]===results[0].puuid)
                    playerpos=player
            }

            if(compMatches[match].info.participants[playerpos].win){
                tempcompwins++
                if(compMatches[match].info.queueId==420)
                    tempcompsdwins++
                else if(compMatches[match].info.queueId==440)
                    tempcompflexwins++
            }

            if(compMatches[match].info.queueId==420)
                tempcompsdgames++
             else if(compMatches[match].info.queueId==440)
                tempcompflexgames++
        }
        setcompwins(tempcompwins)
        setcompsdwins(tempcompsdwins)
        setcompflexwins(tempcompflexwins)
        setcompsdgames(tempcompsdgames)
        setcompflexgames(tempcompflexgames)
    }
    useEffect(()=>{
        getPlayers()
        getMatches()
    },[])

    useEffect(()=>{
        if(compMatches.length>=1)
            countWins()
    },[compMatches])

  return (
    <>
    <div className='comparison-container'>
        {players.map((compPlayer,index)=>{
                return <ComparisonPlayer results={results} player={compPlayer} key={index}/>
            }) 
        }
    </div>
    <div className='comparison-winrate'>
        <div className='comparison-winrate-box overall'>
            Combined Winrate<br></br>
            {compMatches.length>0 ?
            <>
                {Math.round((compwins/(compMatches.length)*100))}%<br></br>
                {compwins}W - {compMatches.length-compwins}L
            </> :
            'No matches found'
            }
            </div>
        <div className='comparison-winrate-box sd'>
            Combined Winrate<br></br>
            {compsdgames>0 ?
            <>
                {Math.round((compsdwins/(compsdgames)*100))}%<br></br>
                {compsdwins} - {compsdgames-compsdwins}
            </> :
            'No matches found'
            }
        </div>
        <div className='comparison-winrate-box flexQ'>
            Combined Winrate<br></br>
            {compflexgames>0 ?
            <>
                {Math.round((compflexwins/(compflexgames)*100))}%<br></br>
                {compflexwins} - {compflexgames-compflexwins}
            </> :
            'No matches found'
            }
        </div>
    </div>
    <div className='comparison-matchhistory'>
        {compMatches && compMatches.length>0 && <MatchHistory matches={compMatches} userID={results[0].puuid}/>}
    </div>
    </>
  )
}
