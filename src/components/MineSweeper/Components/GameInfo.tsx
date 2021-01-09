import React from "react";
import {gameDataInterface, gameDefaultDataInterface} from "../static/HookStateData";


function GameInfo({gameData, gameDefaultData, time}: {gameData: gameDataInterface, gameDefaultData: gameDefaultDataInterface, time: number}) {
	return (
		<div id="game_info">
			<div id="flag_data">
				{`🚩 ${gameData.flagCnt}`}
			</div>
			<div id="Mine_data">
				{`💣 ${gameDefaultData.MineCnt}`}
			</div>
			<div id="time_data">
				{`시간 ${time}`}
			</div>
		</div>
	);
}

export default GameInfo;
