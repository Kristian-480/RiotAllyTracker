import React from 'react'
import { useState,useEffect } from "react";

import{
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

import {Doughnut} from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)

import './UserRank.css'

export const Winrate = ({rankwins, ranklosses, comp, loc}) => {
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

        const data ={
            // labes: ['Yes','No'],
            datasets: [{
                // label : ['Wins','Losses'],
                data: [rankwins,rankwins+ranklosses],
                backgroundColor : ['#4f4ff8','rgb(255, 91, 91)'],
                borderColor: ['#2D2831','#2D2831']
            }]
        }

        const options = {}

  return (
    <> 
    {loc != "home"? 
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
    :
    <div className="wr">
        <div className='donut'>
            <Doughnut
                data = {data}
                options={options}>
            </Doughnut>
        </div>
            {rankwins+ranklosses>0 ?
            <>
                {rankwinrate}% <br></br>
                {rankwins}W - {ranklosses}L
            </> :
            'No matches Played'
            }
    </div>
    }
    </>
  )
}
