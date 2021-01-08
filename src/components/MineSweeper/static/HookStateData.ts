export interface gameDefaultDataInterface {
  selectLevel: string;
  row: number;
  col: number;
  MineCnt: number;
}
export interface gameDataInterface {
  flagCnt: number;
  time: number;
  blankCnt: number;
}
export interface customDataInterface {
  row: number;
  col: number;
  MineCnt: number;
}
export interface gameProcessDataInterface {
  isGameStart: boolean;
  isGameOver: boolean;
  isPlayerWinGame: boolean;
}
export const initGameDefaultData: gameDefaultDataInterface = {
	selectLevel: "초급",
	row: 10,
	col: 10,
	MineCnt: 10,
};
export const initGameData: gameDataInterface = {
	flagCnt: 10,
	time: 0,
	blankCnt: 0,
};
export const initCustomData: customDataInterface = {
	row: 10,
	col: 10,
	MineCnt: 10,
};
export const initgameProcessData: gameProcessDataInterface = {
	isGameStart: false,
	isGameOver: false,
	isPlayerWinGame: false,
};
