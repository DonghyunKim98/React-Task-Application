import React, { useEffect, useState } from 'react';
import CustomGameDataField from './Screen/CustomGameDataField';
import "./MineSweeper.css";
import { initGameData, gameDataInterface, levels, dir } from './MineSweeperData';
import Selection from './Screen/Selection';
import StartBtn from './Screen/StartBtn';
import GameInfo from './Screen/GameInfo';
import Game from './Screen/Game';

function MineSweeper() {
    const [gameData, setGameData]: [gameDataInterface, Function] = useState(initGameData);
    useEffect(()=>{
        const timeSet = () => {
            return setInterval(()=>{
                setGameData({
                    ...gameData,
                    time: gameData.time+1,
                },1000)
            });
        };
        const checkGameOver : () => boolean =()=>{
            if(gameData.isGameOver) return true;
            const unPressedGrid : number = gameData.row*gameData.col-gameData.blankCnt;
            
            if(gameData.bombCnt=== unPressedGrid) {
                setGameData({
                    ...gameData,
                    isGameOver: true,
                })
                return true;
            }
            return false;
        }
        if(checkGameOver()) {
            clearInterval(timeSet());
        }
        if(gameData.isGameStart) {
            timeSet();
            return;
        }

    },[gameData]);
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
        const textNode =currentTarget.childNodes[0];
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
            <section>
                {
                    gameData.isGameStart === true &&
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