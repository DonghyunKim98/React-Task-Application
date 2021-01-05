import React, { useEffect, useState } from 'react';
import CustomGameDataField from './Screen/CustomGameDataField';
import "./MineSweeper.css";
import { initGameData, gameDataInterface, customDataInterface, levels, dir, initcustomData, gameProcessDataInterface, initgameProcessData } from './MineSweeperData';
import Selection from './Screen/Selection';
import StartBtn from './Screen/StartBtn';
import GameInfo from './Screen/GameInfo';
import Game from './Screen/Game';

function MineSweeper() {
    const [gameData, setGameData]: [gameDataInterface, Function] = useState(initGameData);
    const [customData, setCustomData]: [customDataInterface, Function] = useState(initcustomData);
    const [gameProcessData, setGameProcessData]: [gameProcessDataInterface, Function] = useState(initgameProcessData);
    // 시간 경과를 체크하기 위한 useEffect
    useEffect(()=>{
        if(gameProcessData.isGameStart){
            const tick = setTimeout(()=>{
                setGameData({
                    ...gameData,
                    time: gameData.time+1,
                })
            },1000);
            return () => clearInterval(tick);
        }
        return;
    },[gameProcessData,gameData]);
    const onLevelChangeListener = (newLevel: string) => {
        const [newRow, newCol, newBombAndFlagCnt]: Array<number> = levels[`${newLevel}`];

        setGameData({
            ...gameData,
            row: newRow,
            col: newCol,
            flagCnt: newBombAndFlagCnt,
            bombCnt: newBombAndFlagCnt,
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
        if (gameData.selectLevel === "사용자 설정") {
            setGameData({
                ...gameData,
                row: customData.row,
                col: customData.col,
                bombCnt: customData.bombCnt,
                flagCnt: customData.bombCnt,
            });
            return;
        }
        setGameProcessData({
            ...gameProcessData,
            isGameStart: true,
        });
    };

    const gridRightClickListener = (e: any) => {
        e.preventDefault();
        if (gameData.flagCnt <= 0) return;
        e.currentTarget.innerText = `🚩`;
        setGameData({
            ...gameData,
            flagCnt: gameData.flagCnt - 1,
        });
    };

    const gridClickListener = (currentTarget: any) => {
        if (currentTarget.style.backgroundColor === "white") return;
        currentTarget.style.backgroundColor = "white";
        const textNode = currentTarget.childNodes[0];
        setGameData({
            ...gameData,
            blankCnt: gameData.blankCnt + 1,
        });
        textNode.innerText = textNode.getAttribute('custom-value');
        if (textNode.innerText === "💣") {
            setGameData({
                ...gameData,
                isGameOver: true,
            })
            return;
        }
        if (textNode.innerText === "0") {
            textNode.innerText = '';
            const idName = currentTarget.id.split("_");
            const ypos = parseInt(idName[0]);
            const xpos = parseInt(idName[1]);
            dir.forEach((value) => {
                const ny = value[0] + ypos,
                    nx = value[1] + xpos;
                if (0 <= ny && ny < gameData.row && 0 <= nx && nx < gameData.col) {
                    const nextNode = document.getElementById(`${ny}_${nx}`);
                    if (nextNode != null) {
                        const nextTextNode = nextNode.childNodes[0] as Element;
                        if (nextTextNode.getAttribute('custom-value') !== "💣") {
                            gridClickListener(nextNode);
                        }
                    }
                }
            })
        }
        return;
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
                {
                    (gameData.selectLevel === "사용자 설정") &&
                    <CustomGameDataField
                        customData={customData}
                        onChangeListener={setCustomData}
                    />
                }
                {
                    gameProcessData.isGameStart === true &&
                    <GameInfo
                        gameData={gameData}
                    />
                }
                <StartBtn
                    onStartBtnClickListener={onStartBtnClickListener}
                />
            </nav>
            <section>
                {
                    gameProcessData.isGameStart === true &&
                    <Game
                        row={gameData.row}
                        col={gameData.col}
                        bombCnt={gameData.bombCnt}
                        gridRightClickListener={gridRightClickListener}
                        gridClickListener={gridClickListener}
                    />
                }
            </section>
        </div>
    )
}

export default MineSweeper;