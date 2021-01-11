import React from "react";

function StartBtn({onStartBtnClickListener}:{onStartBtnClickListener: Function}) {
	return (
		<button
			id="startBtn"
			onClick={() => onStartBtnClickListener()}
		>
            시작
		</button>
	);
}

export default StartBtn;
