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
export const levels: { [index: string]: Array<number> } = {
  초급: [10, 10, 10],
  중급: [15, 15, 20],
  고급: [20, 20, 40],
  "사용자 설정": [0, 0, 0],
};
export const width: number = 300,
  height: number = 300;
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

export let MineSweeperData: string[][];

export const createMineSweeperData = (row : number, col : number, MineCnt: number) => {
  const processMine = (arr: Array<any>) => {
    for (let i = 0; i < row; i++)
      for (let j = 0; j < col; j++) {
        if (arr[i][j] === "💣") continue;
        let cnt = 0;
        dir.forEach((value) => {
          let ny = i + value[0],
            nx = j + value[1];
          if (0 <= ny && ny < row && 0 <= nx && nx < col)
            if (arr[ny][nx] === "💣") cnt++;
        });
        arr[i][j] = cnt ? `${cnt}` : "0";
      }
  };
  let temp = new Array<string>();
  for (let i = 0; i < MineCnt; i++) temp.push("💣");
  for (let i = 0; i < row * col - MineCnt; i++) temp.push("0");
  for (let i = temp.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [temp[i], temp[j]] = [temp[j], temp[i]];
  }
  let ret = Array.from(Array<string>(row), () => new Array<string>(col));
  temp.forEach((value, idx) => (ret[Math.floor(idx / row)][idx % row] = value));
  processMine(ret);
  MineSweeperData = ret;
};
