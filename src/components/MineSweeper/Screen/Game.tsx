import React from 'react';
import { height, width, MineSweeperData } from '../MineSweeperData';
interface GameProp {
  row: number,
  col: number,
  gridRightClickListener: Function,
  gridClickListener: Function,
}

function Game({ row, col, gridClickListener, gridRightClickListener }: GameProp) {
  const tdWidth: number = width / col;
  const tdHeight: number = height / row;
  const TableItems: JSX.Element[] = [];
  for (let ypos = 0; ypos < row; ypos++) {
    const trItems = [];
    for (let xpos = 0; xpos < col; xpos++) {
      const tdElement = <td
        height={`${tdHeight}`}
        width={`${tdWidth}`}
        id={`${ypos}_${xpos}`}
        key={`${ypos}_${xpos}`}
        onContextMenu={(e) => gridRightClickListener(e)}
        onClick={(e) => gridClickListener(e.currentTarget, 1)}
      >
        <span custom-value={`${MineSweeperData[ypos][xpos]}`} />
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
};



export default Game;