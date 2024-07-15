import React from 'react'
import { Match } from './Match'

export const MatchHistory = ({matches, userID,setComparePlayer}) => {
        return matches.map((games,id) => {
                return(
                   <Match games={games} userID={userID} key={id} setComparePlayer={setComparePlayer}/>
                )
            })
          
      
}
