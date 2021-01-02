import React from 'react';
import { gameDataInterface } from '../MineSweeperData';

function GameInfo({gameData}: {gameData: gameDataInterface}) {
    return (
        <div id="game_info">
            <div id="flag_data">
                {`🚩 ${gameData.flagCnt}`}
            </div>
            <div id="bomb_data">
                {`💣 ${gameData.bombCnt}`}
            </div>
            <div id="time_data">
                {`시간 ${gameData.time}`}
            </div>
        </div>
    );
}

export default GameInfo;