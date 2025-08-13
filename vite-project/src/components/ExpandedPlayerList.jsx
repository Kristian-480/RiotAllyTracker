import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link  } from "react-router-dom";
import { filename } from '../assets/dragon-tail-ver.json'
import { ItemList } from './ItemList'
import './ExpandedPlayerList.css'

export const ExpandedPlayerList = ({gameparticipant, games, player, matchResult, topdmg, setComparePlayer}) => {
    // console.log(topdmg)
    const[csm,setCsm]= useState("")
    const[dmgpercent,setDmgpercemt] = useState("")

    const handleClick = () =>{
        setComparePlayer(gameparticipant[9])
      }

    const getCsm = () => {
        setCsm(Math.round((gameparticipant[5]/60)*10)/10)
    }

    const getdmgpercent = () =>{
        const per=Math.round((gameparticipant[6]/topdmg)*100)*100/100
        setDmgpercemt(per)
        console.log(dmgpercent)
    }

    useEffect(()=>{
        getCsm();
        getdmgpercent();
    },[])
    let bgColor="";
    if(matchResult){
        if(player<5)
            bgColor = gameparticipant[3]<5 ? "#44449780":"#7e333380";
        else
            bgColor = gameparticipant[3]>=5 ? "#44449780":"#7e333380";

        if(player===gameparticipant[3])
            bgColor = "rgba(114, 114, 252,.5)"
    }
    else{
        if(player<5)
            bgColor = gameparticipant[3]<5 ? "#7e333380":"#44449780";
        else
            bgColor = gameparticipant[3]>=5 ? "#7e333380":"#44449780";
    
            if(player===gameparticipant[3])
            bgColor = "rgba(255, 115, 115,.3)"    
    }
    


  return (
    <div className='expanded-list'  style={{backgroundColor:bgColor}}>
        <div className='expanded-list-user'>
            <div className='expanded-list-thumb'>
                <img src={`${filename}/img/champion/${gameparticipant[1]}.png`} alt="profile-icon"/>
            </div>
            <div className='expanded-list-name'>
                {gameparticipant[2] === true ? <b>{gameparticipant[0]}</b>  : 
                <Link to='/comparison' style={{ textDecoration: 'none',color: "#bdbdd3" }} onClick={handleClick}>
                    {gameparticipant[0]} 
                </Link>
                }
            </div>
        </div>
        <div className='expanded-list-kda'>
            {gameparticipant[4]}
        </div>
        <div className='expanded-list-cs'>
            {gameparticipant[5]}  <br></br>({csm} /m)
        </div>
        <div className='expanded-list-dmg'>
            {gameparticipant[6]}
            <div className='bar'><div className='dmg' style={{width:dmgpercent}}></div></div>
        </div>
        <div className='expanded-list-gold'>
            {gameparticipant[7]}k
        </div>
        <div className='expanded-list-wards'>
            {gameparticipant[8]}
        </div>
        <div className='expanded-list-items item-list'>
            <ItemList player = {gameparticipant[3]+1} games={games}/>
        </div>
    </div>
  )
}
