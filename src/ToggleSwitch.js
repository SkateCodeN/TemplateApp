import React from 'react';
import './ToggleSwitch.css'; // Make sure to create this CSS file

function ToggleSwitch({ isOn, handleToggle, checkName,size }) {
    return (
        <div>
            <label className={`toggle-switch ${size}`}>
                <input
                    type="checkbox"
                    checked={isOn}
                    onChange={handleToggle}
                    name={checkName}
                />
                <span className="slider round"></span>
            </label>
        </div>

    );
}

export default ToggleSwitch;