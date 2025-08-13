import React from 'react'
import { useState,useEffect } from "react";
import axios from 'axios'

import { filename } from '../assets/dragon-tail-ver.json'
import { filename1 } from '../assets/dragon-tail-ver.json'

// import {summonerdata} from '/src/assets/dragontail-14.11.1/14.11.1/data/en_US/summoner.json'

import './Match.css';
import { MatchPlayerList } from './MatchPlayerList';
import { ItemList } from './ItemList';
import { ExpandedPlayerList } from './ExpandedPlayerList';

export const Match = ({games, userID, setComparePlayer}) => {
    const[player, setPlayer] = useState("")
    const[matchResult, setmatchResult] = useState(false)
    const[gameTime, setGameTime] = useState("")
    const[gameType, setGameType] = useState("")
    const[gameparticipants,setGameParticipants] = useState([])
    const[kda,setKda] = useState("")
    const[summs,setsumms] = useState([])
    const[freqplayers,setFreqPlayers] = useState([])
    const[cln,setCln] = useState("")
    const[isexpanded,setIsexpanded] = useState(false)
    const[topdmg,setTopdmg] = useState(0)

    const findUserPlayer = () =>{
        for(let i=0; i<games.metadata.participants.length;i++){
            if(games.metadata.participants[i]===userID){
                setPlayer(i+1)
            }
        }
    }

    const getMatchResult = (player,games) =>{
        if(games.info.participants[player-1].win)
            setmatchResult(true)
        else
            setmatchResult(false)
    }

    const getGameTime = (games) =>{
        const date = new Date(null);
        date.setSeconds(games.info.gameDuration); // specify value for SECONDS here
        const result = date.toISOString().slice(14, 16) + 'm ' + date.toISOString().slice(17, 19) + 's';
        setGameTime(result)
    }

    const getGameType = (games) =>{
        if(games.info.queueId==420)
            setGameType("Solo/Duo")
        else if(games.info.queueId==440)
            setGameType("Ranked Flex")
        else if(games.info.queueId==450)
            setGameType("ARAM")
        else if(games.info.queueId==400)
            setGameType("Normal")
        else
            setGameType("RGM")
    }

    const getGameParticipants = (games) =>{
        let partiGold=0;
        const partiArray=[];
        for(let i=0;i<games.metadata.participants.length;i++){

            let isuser;
            const partiName=games.info.participants[i].riotIdGameName;
            const partiChamp = games.info.participants[i].championName;
            const pos = i;

            const partiKDA = games.info.participants[i].kills + '/'+games.info.participants[i].deaths+'/'+games.info.participants[i].assists
            const partiCS = games.info.participants[i].neutralMinionsKilled + games.info.participants[i].totalMinionsKilled
            const partiDmg = games.info.participants[i].totalDamageDealtToChampions
            
            if(partiDmg>topdmg){
                setTopdmg(partiDmg);
            }
            
            if(games.info.participants[i].goldEarned > 1000)
                partiGold = Math.round((games.info.participants[i].goldEarned/1000)*10)/10
            else
                partiGold = games.info.participants[i].goldEarned

            const partiWards = games.info.participants[i].wardsPlaced
            const partiID = games.metadata.participants[i]
            
            if(i===player-1)
                isuser=true;
            else
                isuser=false;

            partiArray.push([partiName,partiChamp,isuser,pos, partiKDA, partiCS, partiDmg, partiGold, partiWards,partiID]);
        }
        setGameParticipants(partiArray)
        
    }

    const getKda = (games,player) =>{

       setKda(games.info.participants[player-1].kills + '/'+games.info.participants[player-1].deaths+'/'+games.info.participants[player-1].assists)
    }

    const getsumms = async (games,player) =>{
        const summoners = await axios.get('/src/assets/dragontail-15.13.1/15.13.1/data/en_US/summoner.json')
        const summoner1 = games.info.participants[player-1].summoner1Id
        const summoner2 = games.info.participants[player-1].summoner2Id

        const res_array = []; 
        let sum1
        let sum2
         for(let i in summoners.data.data) { 
            if(summoners.data.data[i].key == summoner1)
                sum1 = summoners.data.data[i].id
            if(summoners.data.data[i].key == summoner2)
                sum2 = summoners.data.data[i].id
         }; 

         setsumms(prevsumms=>[...prevsumms,[sum1,sum2]])
    }

    const getcln = () =>{
        if(matchResult)
            setCln("user-match victory")
        else
            setCln("user-match defeat")
    }

    const handleDropdown = () =>{
        if(!isexpanded){
            setIsexpanded(true)
        }
        else{
            setIsexpanded(false)
        }
    }

    useEffect(() =>{
        findUserPlayer();
    },[games])

    useEffect(() =>{
        if(player){
            console.log("player updated")
            getMatchResult(player,games);
            getGameTime(games)
            getGameType(games)
            getGameParticipants(games)
            getKda(games,player)
            getsumms(games,player)
            getcln(games,player)
        }
    },[player,games])

    useEffect(()=>{
        getcln()
    },[matchResult])

  return (
    <div className='match-container'>
        <div className={cln}>
            <div className='match-results'>
                <div className='match-type'><p>{gameType}</p></div>
                <div className='match-result'><p>{matchResult ? "Victory":"Defeat"}</p></div>
                <div className='match-time'><p>{gameTime}</p></div>
            </div>
            <div className='player-frame'>
                <div className='img-kda-wrapper'>
                    <div className='user-champ-thumb'>
                        {player && <img src={`${filename}/img/champion/${games.info.participants[player-1].championName}.png`} alt="profile-icon"/>}
                    </div>
                    <div className='summoner-spells'>
                    {player && summs.length>0 &&<img src={`${filename}/img/spell/${summs[0][0]}.png`} alt="profile-icon"/>}
                    {player && summs.length>0 &&<img src={`${filename}/img/spell/${summs[0][1]}.png`} alt="profile-icon"/>} 
                    </div>
                    <div className='kda'>
                        {kda}
                    </div>
                </div>
                <div className='item-list'>
                    {player && <ItemList player={player} games={games}/>}
                </div>
            </div>
            <div className='player-list'>
                {gameparticipants.map((gameparticipant,id) => {
                    return player && <MatchPlayerList gameparticipant={gameparticipant} key={id} setComparePlayer={setComparePlayer}/>
                })}
            </div>
                <span className='dropdown-btn' onClick={handleDropdown}>
                {!isexpanded?
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <g fill="currentColor" fillRule="evenodd">
                        <g fill="currentColor" fillRule="nonzero">
                            <g fill="currentColor">
                                <path d="M12 13.2L16.5 9 18 10.4 12 16 6 10.4 7.5 9z" transform="translate(-64 -228) translate(64 228)" fill="currentColor"></path>
                            </g>
                        </g>
                    </g>
                </svg>
                    :
                <div className='expanded-list-btn'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <g fill="currentColor" fillRule="evenodd">
                        <g fill="currentColor" fillRule="nonzero">
                            <g fill="currentColor">
                                <path d="M12 13.2L16.5 9 18 10.4 12 16 6 10.4 7.5 9z" transform="translate(-64 -228) translate(64 228)" fill="currentColor"></path>
                            </g>
                        </g>
                    </g>
                </svg>
                </div>
                }
            </span>
        </div>
        {isexpanded &&
        <div className='expanded-info'>
            <div className='expanded-info-header-wrapper'>
                <div className='expanded-info-header' style={{width:150}}>Player</div>
                <div className='expanded-info-header' style={{width:100}}>KDA</div>
                <div className='expanded-info-header' style={{width:125}}>CS</div>
                <div className='expanded-info-header' style={{width:120}}>Damage</div>
                <div className='expanded-info-header' style={{width:50,marginLeft:15}}>Gold</div>
                <div className='expanded-info-header' style={{width:50,marginLeft:15}}>Wards</div>
                <div className='expanded-info-header' style={{width:200}}>Items</div>
            </div>

         {gameparticipants.map((gameparticipant,id) => {
                return (
                    <ExpandedPlayerList gameparticipant={gameparticipant} games={games} player={player-1} matchResult={matchResult} topdmg={topdmg} key={id} setComparePlayer={setComparePlayer}/>
                )
        
        })}
        </div>
        }
    </div>
    
  )
}
