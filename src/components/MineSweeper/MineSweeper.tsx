import React, { useState } from 'react';
import CustomGameDataField from './CustomGameDataField';
import "./MineSweeper.css";
import {initGameData, gameDataInterface} from './MineSweeperData';
import Selection from './Selection';
import StartBtn from './StartBtn';

function MineSweeper() {
    const [gameData,setGameData] : [gameDataInterface,Function] = useState(initGameData);
    
    const onLevelChangeListener=(newLevel : string)=>{
        setGameData({
            ...gameData,
            selectLevel: `${newLevel}`
        });
    };
    const onStartBtnClickListener=()=>{
        console.log("시작!");
    }

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
                {
                    gameData.selectLevel === "사용자 설정" &&
                    <CustomGameDataField/>
                }
                <StartBtn
                    onStartBtnClickListener={onStartBtnClickListener}
                />
            </nav>
        </div>
    )
}

export default MineSweeper;