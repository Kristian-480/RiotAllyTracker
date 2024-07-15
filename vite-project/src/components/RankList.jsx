import React, { useEffect, useState } from 'react'
import { UserRank } from './UserRank'


export const RankList = ({rank, showwr, comp}) => {
  const[formatted,setformatted] = useState(false)
  const[trimmed,settrimmed] = useState(false)

  const rankTrim = () =>{
    for(let l in rank){
      if(rank[l].queueType==="CHERRY")
        rank.splice(l,1)
    }
    settrimmed(true)
  }

  const rankFormat = () =>{

    if(rank.length==0){
      rank.push({queueType:'RANKED_SOLO_5x5',tier:'None',rank:'Unranked'})
      rank.push({queueType:'RANKED_FLEX_SR',tier:'None',rank:'Unranked'})
    }
    else if(rank.length==1){
      if(rank[0].queueType=='RANKED_FLEX_SR')
        rank.push({queueType:'RANKED_SOLO_5x5',tier:'None',rank:'Unranked'})
      else
        rank.push({queueType:'RANKED_FLEX_SR',tier:'None',rank:'Unranked'})
    }
    setformatted(true)
  }

  useEffect(()=>{
    rankTrim()
    rankFormat()
  },[])

  return (
    <>
      {formatted && trimmed && <>
      {rank.map((userRank,id) => {
          return(
            <UserRank queue={userRank.queueType} tier={userRank.tier} div={userRank.rank} showwr={showwr} rankwins={userRank.wins} ranklosses={userRank.losses} comp ={comp}key={id}/>
          )
        }
      )}
      </>}
    </>
  )
}
