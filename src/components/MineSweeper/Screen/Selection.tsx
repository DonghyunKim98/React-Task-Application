import React from 'react';
import {levels} from '../MineSweeperData';
interface SelectionProp {
    currentLevel : string,
    onLevelChangeListener: Function,
}

function Selection({currentLevel,onLevelChangeListener}: SelectionProp) {
    const levelItemComponents = [];
    for(const level in levels) {
        levelItemComponents.push(
            <option
                key={level}
            > {level}
            </option>
        )
    }
    return (
        <select 
            id="level_select"
            onChange={(e)=>onLevelChangeListener(e.currentTarget.value)}
        >
            {levelItemComponents}
        </select>
    );
}

export default Selection;