import React, { useState } from 'react';
import CustomGameDataField from './Screen/CustomGameDataField';
import "./MineSweeper.css";
import { initGameData, gameDataInterface, levels } from './MineSweeperData';
import Selection from './Screen/Selection';
import StartBtn from './Screen/StartBtn';
import GameInfo from './Screen/GameInfo';
import Game from './Screen/Game';

function MineSweeper() {
    const [gameData, setGameData]: [gameDataInterface, Function] = useState(initGameData);

    const onLevelChangeListener = (newLevel: string) => {
        const [newRow, newCol, newBombCnt]: Array<number> = levels[`${newLevel}`];

        setGameData({
            ...gameData,
            row: newRow,
            col: newCol,
            bombCnt: newBombCnt,
            selectLevel: `${newLevel}`
        });
    };

    const checkValidGame: () => boolean = () => {
        if (gameData.selectLevel !== "사용자 설정") return true;
        const isBombCntOver: number = gameData.row * gameData.col - gameData.bombCnt;
        return isBombCntOver ? true : false;
    };

    const onStartBtnClickListener = () => {
        if (!checkValidGame()) return;
        setGameData({
            ...gameData,
            isGameStart: true,
        })
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
                    (gameData.selectLevel === "사용자 설정" && gameData.isGameStart === false) &&
                    <CustomGameDataField />
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
            {
                gameData.isGameStart === true &&
                <Game
                    row={gameData.row}
                    col={gameData.col}
                    bombCnt={gameData.bombCnt}
                />
            }
        </div>
    )
}

export default MineSweeper;