import React, { useEffect, useState } from 'react';
import CustomGameDataField from './Screen/CustomGameDataField';
import "./MineSweeper.css";
import { initGameData, gameDataInterface, customDataInterface, levels, dir, initcustomData, gameProcessDataInterface, gameDefaultDataInterface, initgameProcessData, initGameDefaultData, createMineSweeperData, MineSweeperData} from './MineSweeperData';
import Selection from './Screen/Selection';
import StartBtn from './Screen/StartBtn';
import GameInfo from './Screen/GameInfo';
import Game from './Screen/Game';

function MineSweeper() {
    const [gameData, setGameData]: [gameDataInterface, Function] = useState(initGameData);
    const [gameDefaultData, setGameDefaultData]: [gameDefaultDataInterface, Function] = useState(initGameDefaultData)
    const [customData, setCustomData]: [customDataInterface, Function] = useState(initcustomData);
    const [gameProcessData, setGameProcessData]: [gameProcessDataInterface, Function] = useState(initgameProcessData);
    // 시간 경과를 체크하기 위한 useEffect
    useEffect(() => {
        if (gameProcessData.isGameOver) {
            if (gameProcessData.isPlayerWinGame) {
                alert("모든 폭탄을 찾아냈다! 최고야!");
            } else {
                alert("저런 폭탄을 밟아버렸네 ㅠㅠ");
            }
            setGameProcessData({
                ...gameProcessData,
                isGameOver: false,
                isGameStart: false,
            });
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
    }, [gameProcessData, gameData]);
    const onLevelChangeListener = (newLevel: string) => {
        const [newRow, newCol, newBombAndFlagCnt]: Array<number> = levels[`${newLevel}`];

        setGameDefaultData({
            selectLevel: `${newLevel}`,
            row: newRow,
            col: newCol,
            bombCnt: newBombAndFlagCnt,
        });
        setGameData({
            ...gameData,
            flagCnt: newBombAndFlagCnt,
        })
    };

    const checkValidGame: () => boolean = () => {
        const isBombCntOver: number = customData.row * customData.col - customData.bombCnt;
        return isBombCntOver > 0 ? true : false;
    };

    const onStartBtnClickListener = () => {
        if (gameDefaultData.selectLevel === "사용자 설정") {
            if (!checkValidGame()) {
                alert("너무 폭탄이 많아요!!");
                return;
            }
            createMineSweeperData(customData.row,customData.col,customData.bombCnt);
            setGameDefaultData({
                ...gameDefaultData,
                row: customData.row,
                col: customData.col,
                bombCnt: customData.bombCnt,
            });
            setGameData({
                ...gameData,
                flagCnt: customData.bombCnt,
            });
            setGameProcessData({
                ...gameProcessData,
                isGameStart: true,
            });
            return;
        }
        createMineSweeperData(gameDefaultData.row,gameDefaultData.col,gameDefaultData.bombCnt);
        setGameProcessData({
            ...gameProcessData,
            isGameStart: true,
        });
    };

    const gridRightClickListener = (e : any) => {
        e.preventDefault();
        if (gameData.flagCnt <= 0 || e.currentTarget.innerText === '🚩') return;
        e.currentTarget.innerText = `🚩`;
        setGameData({
            ...gameData,
            flagCnt: gameData.flagCnt - 1,
        });
    };

    const gridClickListener = (currentTarget: any) => {
        const isClicked: boolean = currentTarget.style.backgroundColor === "white";
        const isRightClicked: boolean = currentTarget.innerText === '🚩';

        if (isClicked || isRightClicked) return;
        currentTarget.style.backgroundColor = "white";
        const textNode = currentTarget.childNodes[0];

        setGameData({
            ...gameData,
            blankCnt: gameData.blankCnt + 1,
        });
        textNode.innerText = textNode.getAttribute('custom-value');
        if (textNode.innerText === "💣") {
            setGameProcessData({
                ...gameProcessData,
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
                    currentLevel={gameDefaultData.selectLevel}
                    onLevelChangeListener={onLevelChangeListener}
                />
                {
                    (gameDefaultData.selectLevel === "사용자 설정") &&
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