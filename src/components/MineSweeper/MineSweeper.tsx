import React, { useState } from 'react';
import "./MineSweeper.css";
import { initGameData, gameDataInterface, level, width, height } from './MineSweeperData';
function MineSweeper() {
    const [gameData,setGameData] : [gameDataInterface,Function] = useState(initGameData);
    
    return (
        <div>
            <header id="header">
                <h1>지뢰찾기</h1>
            </header>
            <nav id="nav">
                <select id="level_select"></select>
                <button id="startBtn">시작</button>
            </nav>
        </div>
    )
}

export default MineSweeper;