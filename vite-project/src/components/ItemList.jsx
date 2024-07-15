import React from 'react'

export const ItemList = ({player, games}) => {
  return (
    <>
        <div className='item'>
            {player && <img src={`/src/assets/dragontail-14.11.1/14.11.1/img/item/${games.info.participants[player-1].item0}.png`} alt="profile-icon"/>}
        </div>
        <div className='item'>
            {player && <img src={`/src/assets/dragontail-14.11.1/14.11.1/img/item/${games.info.participants[player-1].item1}.png`} alt="profile-icon"/>}
        </div>
        <div className='item'>
            {player && <img src={`/src/assets/dragontail-14.11.1/14.11.1/img/item/${games.info.participants[player-1].item2}.png`} alt="profile-icon"/>}
        </div>
        <div className='item'>
            {player && <img src={`/src/assets/dragontail-14.11.1/14.11.1/img/item/${games.info.participants[player-1].item3}.png`} alt="profile-icon"/>}
        </div>
        <div className='item'>
            {player && <img src={`/src/assets/dragontail-14.11.1/14.11.1/img/item/${games.info.participants[player-1].item4}.png`} alt="profile-icon"/>}
        </div>
        <div className='item'>
            {player && <img src={`/src/assets/dragontail-14.11.1/14.11.1/img/item/${games.info.participants[player-1].item5}.png`} alt="profile-icon"/>}
        </div>
        <div className='item'>
            {player && <img src={`/src/assets/dragontail-14.11.1/14.11.1/img/item/${games.info.participants[player-1].item6}.png`} alt="profile-icon"/>}
        </div>
        </>
  )
}
