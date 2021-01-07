import React from 'react';
import { gameDataInterface,gameDefaultDataInterface } from '../MineSweeperData';

function GameInfo({gameData, gameDefaultData}: {gameData: gameDataInterface, gameDefaultData: gameDefaultDataInterface}) {
    return (
        <div id="game_info">
            <div id="flag_data">
                {`🚩 ${gameData.flagCnt}`}
            </div>
            <div id="bomb_data">
                {`💣 ${gameDefaultData.bombCnt}`}
            </div>
            <div id="time_data">
                {`시간 ${gameData.time}`}
            </div>
        </div>
    );
}

export default GameInfo;