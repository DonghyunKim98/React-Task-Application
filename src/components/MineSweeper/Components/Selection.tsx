import React from "react";
import {levels} from "../static/StaticData";

interface SelectionProp {
    currentLevel : string,
    onLevelChangeListener: Function,
}

function Selection({currentLevel, onLevelChangeListener}: SelectionProp) {
	// eslint-disable-next-line no-undef
	const levelItemComponents : JSX.Element[] = [];

	for (const level in levels) {
		levelItemComponents.push(
			<option
				key={level}
			> {level}
			</option>,
		);
	}
	return (
		<select
			id="level_select"
			onChange={e => onLevelChangeListener(e.currentTarget.value)}
		>
			{levelItemComponents}
		</select>
	);
}

export default Selection;
