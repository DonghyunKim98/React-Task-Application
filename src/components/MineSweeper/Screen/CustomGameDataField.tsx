import React from 'react';
import { customDataInterface } from './../MineSweeperData';

function CustomGameDataField({customData, onChangeListener}: {customData: customDataInterface, onChangeListener: Function}) {
    return (
        <div id="custom_Game_Field">
            <div id="custom_Width">
                <span className="custom_Game_Field_Title">가로</span>   
                <input
                    type="number"
                    id="rowInput"
                    onChange={(e)=>{
                        onChangeListener({
                        ...customData,
                        row: parseInt(e.currentTarget.value),
                    })}}
                />
            </div>
            <div id="custom_Height">
                <span className="custom_Game_Field_Title">세로</span>   
                <input
                    type="number"
                    id="heightInput"
                    onChange={(e)=>onChangeListener({
                        ...customData,
                        col: parseInt(e.currentTarget.value),
                    })}
                />
            </div>
            <div id="custom_Bomb">
                <span className="custom_Game_Field_Title">폭탄</span>   
                <input
                    type="number"
                    id="bombInput"
                    onChange={(e)=>onChangeListener({
                        ...customData,
                        bombCnt: parseInt(e.currentTarget.value),
                    })}
                />
            </div>
        </div>
    );
}

export default CustomGameDataField;