import {dir} from "./StaticData";

export let MineSweeperData: string[][];
export const createMineSweeperData = (
	row: number,
	col: number,
	MineCnt: number,
) => {
	const processMine = (arr: string[][]) => {
		for (let i : number = 0; i < row; i++) {
			for (let j : number = 0; j < col; j++) {
				if (arr[i][j] === "💣") continue;
				let cnt = 0;

				dir.forEach(value => {
					const ny = i + value[0];
					const nx = j + value[1];

					if (ny >= 0 && ny < row && nx >= 0 && nx < col) { if (arr[ny][nx] === "💣") cnt++; }
				});
				arr[i][j] = cnt > 0 ? `${cnt}` : "0";
			}
		}
	};
	const temp : string[] = [];

	for (let i = 0; i < MineCnt; i++) temp.push("💣");
	for (let i = 0; i < row * col - MineCnt; i++) temp.push("0");
	for (let i = temp.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));

		[temp[i], temp[j]] = [temp[j], temp[i]];
	}
	MineSweeperData = Array.from(Array<string>(row), () => new Array<string>(col));

	temp.forEach((value, idx) => (MineSweeperData[Math.floor(idx / row)][idx % row] = value));
	processMine(MineSweeperData);
};
