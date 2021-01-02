import React, { useState } from 'react';
import "./MineSweeper.css";
import {initGameData, gameDataInterface} from './MineSweeperData';
import Selection from './Selection';
function MineSweeper() {
    const [gameData,setGameData] : [gameDataInterface,Function] = useState(initGameData);
    
    const onLevelChangeListener=(newLevel : string)=>{
        setGameData({
            ...gameData,
            selectLevel: `${newLevel}`
        });
    };

    return (
        <div>
            <header id="header">
                <h1>지뢰찾기</h1>
            </header>
            <nav id="nav">
                <Selection
                    currentLevel={gameData.selectLevel}
                    onLevelChangeListener={onLevelChangeListener}
                />
                <button id="startBtn">시작</button>
            </nav>
        </div>
    )
}

export default MineSweeper;