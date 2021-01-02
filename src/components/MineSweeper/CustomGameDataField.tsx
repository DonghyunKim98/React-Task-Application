import React from 'react';

function CustomGameDataField() {
    return (
        <div id="custom_Game_Field">
            <div id="custom_Width">
                <span className="custom_Game_Field_Title">가로</span>   
                <input
                    type="number"
                    id="rowInput"
                    value={10}
                />
            </div>
            <div id="custom_Height">
                <span className="custom_Game_Field_Title">세로</span>   
                <input
                    type="number"
                    id="heightInput"
                    value={10}
                />
            </div>
            <div id="custom_Bomb">
                <span className="custom_Game_Field_Title">폭탄</span>   
                <input
                    type="number"
                    id="bombInput"
                    value={10}
                />
            </div>
        </div>
    );
}

export default CustomGameDataField;