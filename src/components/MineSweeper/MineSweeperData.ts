export interface gameDataInterface {
  selectLevel: string;
  flagCnt: number;
  bombCnt: number;
  time: number;
  blankCnt: number;
  row: number;
  col: number;
}
export interface customDataInterface {
  row: number;
  col: number;
  bombCnt: number;
}
export interface gameProcessDataInterface {
  isGameStart: boolean;
  isGameOver: boolean;
  isPlayerWinGame: boolean;
}
export const levels: { [index: string]: Array<number> } = {
  초급: [10, 10, 10],
  중급: [15, 15, 20],
  고급: [20, 20, 40],
  "사용자 설정": [0, 0, 0],
};
export const width: number = 300,
  height: number = 300;
export const initGameData: gameDataInterface = {
  selectLevel: "초급",
  flagCnt: 10,
  bombCnt: 10,
  time: 0,
  blankCnt: 0,
  row: 10,
  col: 10,
};
export const initcustomData: customDataInterface = {
  row: 10,
  col: 10,
  bombCnt: 10,
};
export const initgameProcessData: gameProcessDataInterface = {
  isGameStart: false,
  isGameOver: false,
  isPlayerWinGame: false,
};
export const dir = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];
