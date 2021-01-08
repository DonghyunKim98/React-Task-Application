import React, { useEffect, useState } from 'react';
import CustomGameDataField from './Components/CustomGameDataField';
import "./MineSweeper.css";
import { createMineSweeperData } from './static/MineSweeperData';
import Selection from './Components/Selection';
import StartBtn from './Components/StartBtn';
import GameInfo from './Components/GameInfo';
import Game from './Components/Game';
import { customDataInterface, gameDataInterface, gameDefaultDataInterface, gameProcessDataInterface, initCustomData, initGameData, initGameDefaultData, initgameProcessData } from './static/hookStateData';
import { dir, levels } from './static/StaticData';

function MineSweeper() {
    const [gameData, setGameData]: [gameDataInterface, Function] = useState(initGameData);
    const [gameDefaultData, setGameDefaultData]: [gameDefaultDataInterface, Function] = useState(initGameDefaultData)
    const [customData, setCustomData]: [customDataInterface, Function] = useState(initCustomData);
    const [gameProcessData, setGameProcessData]: [gameProcessDataInterface, Function] = useState(initgameProcessData);
    // 시간 경과 및 게임 성공을 체크하기 위한 useEffect
    useEffect(() => {
        const checkGameSuccess: () => boolean = () => {
            const gridCnt: number = gameDefaultData.row * gameDefaultData.col;
            const isMineFinedAll: boolean = gridCnt - gameData.blankCnt === gameDefaultData.MineCnt;
            return isMineFinedAll;
        }

        if (checkGameSuccess() && !gameProcessData.isPlayerWinGame) {
            setGameProcessData({
                ...gameProcessData,
                isGameOver: true,
                isPlayerWinGame: true,
            })
            return;
        }
        if (gameProcessData.isGameOver) {
            if (gameProcessData.isPlayerWinGame) {
                alert("모든 폭탄을 찾아냈다! 최고야!");
            } else {
                alert("저런 폭탄을 밟아버렸네 ㅠㅠ");
            }
            setGameProcessData({
                ...initgameProcessData,
            });
            setGameData({
                ...initGameData,
            })
            setCustomData({
                ...initCustomData,
            })
            return;
        }
        if (gameProcessData.isGameStart) {
            const tick = setInterval(() => {
                setGameData({
                    ...gameData,
                    time: gameData.time + 1,
                })
            }, 1000);
            return () => clearInterval(tick);
        }
        return;
    }, [gameProcessData, gameData, gameDefaultData]);


    const onLevelChangeListener = (newLevel: string) => {
        const [newRow, newCol, newMineAndFlagCnt]: Array<number> = levels[`${newLevel}`];

        setGameDefaultData({
            selectLevel: `${newLevel}`,
            row: newRow,
            col: newCol,
            MineCnt: newMineAndFlagCnt,
        });
        setGameData({
            ...gameData,
            flagCnt: newMineAndFlagCnt,
        })
    };

    const checkValidGame: () => boolean = () => {
        const isMineCntOver: number = customData.row * customData.col - customData.MineCnt;
        return isMineCntOver > 0 ? true : false;
    };

    const onStartBtnClickListener = () => {
        if (gameDefaultData.selectLevel === "사용자 설정") {
            if (!checkValidGame()) {
                alert("너무 지뢰가 많아요!!");
                return;
            }
            createMineSweeperData(customData.row, customData.col, customData.MineCnt);
            setGameDefaultData({
                ...gameDefaultData,
                row: customData.row,
                col: customData.col,
                MineCnt: customData.MineCnt,
            });
            setGameData({
                ...gameData,
                flagCnt: customData.MineCnt,
            });
            setGameProcessData({
                ...gameProcessData,
                isGameStart: true,
            });
            return;
        }
        createMineSweeperData(gameDefaultData.row, gameDefaultData.col, gameDefaultData.MineCnt);
        setGameProcessData({
            ...gameProcessData,
            isGameStart: true,
        });
    };

    const gridRightClickListener = (e: any) => {
        e.preventDefault();
        if (gameData.flagCnt <= 0 || e.currentTarget.innerText === '🚩' || e.currentTarget.style.backgroundColor === "white") return;
        e.currentTarget.innerText = `🚩`;
        setGameData({
            ...gameData,
            flagCnt: gameData.flagCnt - 1,
        });
    };

    const gridClickListener = (currentTarget: any) => {
        const isClicked: boolean = currentTarget.style.backgroundColor === "white";
        const isRightClicked: boolean = currentTarget.innerText === '🚩';

        if (isClicked || isRightClicked) return 0;
        currentTarget.style.backgroundColor = "white";
        const textNode = currentTarget.childNodes[0];
        textNode.innerText = textNode.getAttribute('custom-value');
        if (textNode.innerText === "💣") {
            setGameProcessData({
                ...gameProcessData,
                isGameOver: true,
            })
            return;
        }
        let clickedCnt: number = 1;
        if (textNode.innerText === "0") {
            textNode.innerText = '';
            setTimeout(() => {
                const idName = currentTarget.id.split("_");
                const ypos = parseInt(idName[0]);
                const xpos = parseInt(idName[1]);

                dir.forEach((value) => {
                    const ny = value[0] + ypos,
                        nx = value[1] + xpos;

                    if (0 <= ny && ny < gameDefaultData.row && 0 <= nx && nx < gameDefaultData.col) {
                        const nextNode = document.getElementById(`${ny}_${nx}`);

                        if (nextNode != null && nextNode.innerText !== '🚩') {
                            const nextTextNode = nextNode.childNodes[0] as Element;

                            if (nextTextNode.getAttribute('custom-value') !== "💣") {
                                gridClickListener(nextNode);
                            }
                        }
                    }
                })
            }, 10);
        }
        setGameData({
            ...gameData,
            blankCnt: gameData.blankCnt + clickedCnt,
        });
        return;
    }

    return (
        <div>
            <header id="header">
                <h1>지뢰찾기</h1>
            </header>
            <nav id="nav">
                <Selection
                    currentLevel={gameDefaultData.selectLevel}
                    onLevelChangeListener={onLevelChangeListener}
                />
                {
                    (gameDefaultData.selectLevel === "사용자 설정" && gameProcessData.isGameStart !== true) &&
                    <CustomGameDataField
                        customData={customData}
                        onChangeListener={setCustomData}
                    />
                }
                {
                    gameProcessData.isGameStart === true &&
                    <GameInfo
                        gameData={gameData}
                        gameDefaultData={gameDefaultData}
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
                        row={gameDefaultData.row}
                        col={gameDefaultData.col}
                        gridRightClickListener={gridRightClickListener}
                        gridClickListener={gridClickListener}
                    />
                }
            </section>
        </div>
    )
}


export default MineSweeper;