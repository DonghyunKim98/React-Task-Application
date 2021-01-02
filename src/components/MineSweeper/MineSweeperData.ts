export interface gameDataInterface {
    selectLevel: string,
    flagCnt: number,
    bombCnt: number,
    time: number,
    blankCnt: number,
    row: number,
    col: number,
    isGameStart: boolean,
}
export const levels : Object = {
    "초급": [10, 10, 10],
    "중급": [15, 15, 20],
    "고급": [20, 20, 40],
    "사용자 설정": null,
  };
export const width : number =300, height : number =300;
export const initGameData : gameDataInterface = {
    selectLevel: "초급",
    flagCnt: 0,
    bombCnt: 0,
    time: 0,
    blankCnt: 0,
    row: 0,
    col: 0,
    isGameStart: false,
}