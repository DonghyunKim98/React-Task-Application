import React from "react";
import {customDataInterface} from "../static/hookStateData";

function CustomGameDataField({customData, onChangeListener}: {customData: customDataInterface, onChangeListener: Function}) {
	return (
		<div id="custom_Game_Field">
			<div id="custom_Width">
				<span className="custom_Game_Field_Title">가로</span>
				<input
					type="number"
					id="rowInput"
					onChange={e => {
						onChangeListener({
							...customData,
							row: parseInt(e.currentTarget.value, 10),
						});
					}}
				/>
			</div>
			<div id="custom_Height">
				<span className="custom_Game_Field_Title">세로</span>
				<input
					type="number"
					id="heightInput"
					onChange={e => onChangeListener({
						...customData,
						col: parseInt(e.currentTarget.value, 10),
					})}
				/>
			</div>
			<div id="custom_Mine">
				<span className="custom_Game_Field_Title">폭탄</span>
				<input
					type="number"
					id="MineInput"
					onChange={e => onChangeListener({
						...customData,
						MineCnt: parseInt(e.currentTarget.value, 10),
					})}
				/>
			</div>
		</div>
	);
}

export default CustomGameDataField;
