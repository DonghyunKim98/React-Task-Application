import React, { useState } from 'react';
import CustomGameDataField from './Screen/CustomGameDataField';
import "./MineSweeper.css";
import {initGameData, gameDataInterface} from './MineSweeperData';
import Selection from './Screen/Selection';
import StartBtn from './Screen/StartBtn';
import GameInfo from './Screen/GameInfo';

function MineSweeper() {
    const [gameData,setGameData] : [gameDataInterface,Function] = useState(initGameData);
    
    const onLevelChangeListener=(newLevel : string)=>{
        setGameData({
            ...gameData,
            selectLevel: `${newLevel}`
        });
    };
    const onStartBtnClickListener=()=>{
        setGameData({
            ...gameData,
            isGameStart: true,
        })
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
                    (gameData.selectLevel === "사용자 설정"&& gameData.isGameStart === false) &&
                    <CustomGameDataField/>
                }
                {
                    gameData.isGameStart === true && 
                    <GameInfo
                        gameData={gameData}
                    /> 
                }
                <StartBtn
                    onStartBtnClickListener={onStartBtnClickListener}
                />
            </nav>
        </div>
    )
}

export default MineSweeper;