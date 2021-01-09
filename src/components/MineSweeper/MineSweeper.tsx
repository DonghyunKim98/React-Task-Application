import React, {useEffect, useState} from "react";
import CustomGameDataField from "./Components/CustomGameDataField";
import "./MineSweeper.css";
import {createMineSweeperData} from "./static/MineSweeperData";
import Selection from "./Components/Selection";
import StartBtn from "./Components/StartBtn";
import GameInfo from "./Components/GameInfo";
import Game from "./Components/Game";
import {customDataInterface, gameDataInterface, gameDefaultDataInterface, gameProcessDataInterface, initCustomData, initGameData, initGameDefaultData, initgameProcessData} from "./static/HookStateData";
import {dir, levels} from "./static/StaticData";

function MineSweeper() {
	const [gameData, setGameData]: [gameDataInterface, Function] = useState(initGameData);
	const [gameDefaultData, setGameDefaultData]: [gameDefaultDataInterface, Function] = useState(initGameDefaultData);
	const [customData, setCustomData]: [customDataInterface, Function] = useState(initCustomData);
	const [gameProcessData, setGameProcessData]: [gameProcessDataInterface, Function] = useState(initgameProcessData);

	// 시간 경과 체크를 위한 useEffect
	useEffect(() => {
		if (gameProcessData.isGameStart) {
			const tick = setInterval(() => {
				setGameData({
					...gameData,
					time: gameData.time + 1,
				});
			}, 1000);

			// eslint-disable-next-line consistent-return
			return () => clearInterval(tick);
		}
		return undefined;
	}, [gameData, gameProcessData]);
	// 게임 성공을 체크하기 위한 useEffect
	useEffect(() => {
		const checkGameSuccess: () => boolean = () => {
			const gridCnt: number = gameDefaultData.row * gameDefaultData.col;
			const isMineFinedAll: boolean = gridCnt - gameData.blankCnt === gameDefaultData.MineCnt;

			return isMineFinedAll;
		};

		if (checkGameSuccess() && !gameProcessData.isPlayerWinGame) {
			setGameProcessData({
				...gameProcessData,
				isGameOver: true,
				isPlayerWinGame: true,
			});
		}
	}, [gameProcessData, gameData, gameDefaultData]);
	// 게임이 끝난 이후 alert를 위한 useEffect
	useEffect(() => {
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
			});
			setCustomData({
				...initCustomData,
			});
		}
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
		});
	};

	const checkValidGame: () => boolean = () => {
		const isMineCntOver: number = customData.row * customData.col - customData.MineCnt;

		return isMineCntOver > 0;
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

	const gridRightClickListener = (e: Event) => {
		if (e.currentTarget === null) return;
		e.preventDefault();
		const target = e.currentTarget as HTMLElement;

		if (gameData.flagCnt <= 0 || target.innerText === "🚩" || target.style.backgroundColor === "white") return;
		target.innerText = `🚩`;
		setGameData({
			...gameData,
			flagCnt: gameData.flagCnt - 1,
		});
	};

	const gridClickListener = (currentTarget: HTMLElement) => {
		const isClicked: boolean = currentTarget.style.backgroundColor === "white";
		const isRightClicked: boolean = currentTarget.innerText === "🚩";

		if (isClicked || isRightClicked) return 0;
		currentTarget.style.backgroundColor = "white";
		const textNodeElement = currentTarget.childNodes[0] as Element;
		const textNodeHTMLElement = currentTarget.childNodes[0] as HTMLElement;

		textNodeHTMLElement.innerText = textNodeElement.getAttribute("custom-value")!;
		if (textNodeHTMLElement.innerText === "💣") {
			setGameProcessData({
				...gameProcessData,
				isGameOver: true,
			});
			return true;
		}
		const clickedCnt: number = 1;

		if (textNodeHTMLElement.innerText === "0") {
			textNodeHTMLElement.innerText = "";
			setTimeout(() => {
				const idName : Array<string> = currentTarget.id.split("_");
				const ypos : number = parseInt(idName[0], 10);
				const xpos : number = parseInt(idName[1], 10);

				dir.forEach(value => {
					const ny = value[0] + ypos;
					const nx = value[1] + xpos;

					if (ny >= 0 && ny < gameDefaultData.row && nx >= 0 && nx < gameDefaultData.col) {
						const nextNode : HTMLElement = document.getElementById(`${ny}_${nx}`)!;

						if (nextNode.innerText !== "🚩") {
							const nextTextNode = nextNode.childNodes[0] as Element;

							if (nextTextNode.getAttribute("custom-value") !== "💣") {
								gridClickListener(nextNode);
							}
						}
					}
				});
			}, 10);
		}
		setGameData({
			...gameData,
			blankCnt: gameData.blankCnt + clickedCnt,
		});
		return true;
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
	);
}


export default MineSweeper;
