import React from 'react';
import { height, width, dir } from '../MineSweeperData';
interface GameProp {
  row: number,
  col: number,
  bombCnt: number,
  gridRightClickListener: Function,
  gridClickListener: Function,
}

const Game = React.memo(function Game({ row, col, bombCnt, gridClickListener, gridRightClickListener }: GameProp) {
  const tdWidth: number = width / col;
  const tdHeight: number = height / row;
  const createBomb : () => string[][] = () => {
    let temp = new Array<string>();
    for (let i = 0; i < bombCnt; i++) temp.push("💣");
    for (let i = 0; i < row * col - bombCnt; i++) temp.push("0");
    for (let i = temp.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [temp[i], temp[j]] = [temp[j], temp[i]];
    }
    let ret = Array.from(Array<string>(row), () => new Array<string>(col));
    temp.forEach((value, idx) => (ret[Math.floor(idx / row)][idx % row] = value));
    processBomb(ret);
    return ret;
  };
  const processBomb = (arr: Array<any>) => {
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
  const bombArr = createBomb();
  const TableItems : JSX.Element[] = [];
  for (let ypos = 0; ypos < row; ypos++) {
    const trItems = [];
    for (let xpos = 0; xpos < col; xpos++) {
      const tdElement = <td
        height={`${tdHeight}`}
        width={`${tdWidth}`}
        id={`${ypos}_${xpos}`}
        key={`${ypos}_${xpos}`}
        onContextMenu={(e) => gridRightClickListener(e)}
        onClick={(e) => gridClickListener(e.currentTarget)}
      >
        <span custom-value={`${bombArr[ypos][xpos]}`} />
      </td>;
      trItems.push(tdElement);
    }
    TableItems.push(
      <tr key={ypos}>
        {trItems}
      </tr>
    )
  };
  return (
    <table>
      <tbody>
        {TableItems}
      </tbody>
    </table>
  );
}, (currProps, nextProps) => {
  return currProps !== nextProps;
})



export default Game;