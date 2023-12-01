import React, { useState, useEffect } from "react";
import ToggleSwitch from "./ToggleSwitch";

export default function InputProps({ handleInputPropsUpdate }) {
    const [updatedProps, setUpdatedProps] = useState({
        name: "",
        required: false,
        placeholder: ""
    });

    useEffect(() => {

        handleInputPropsUpdate(updatedProps);
    }, [updatedProps])

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        let finalValue = value;
        // Update the local state with the new value for the input field
        setUpdatedProps(prevState => {
            if (prevState[name] === value) {
                // Value is the same, no need to update the state and re-trigger the effect
                return prevState;
            }

            if (type === "checkbox") {
                switch (name) {
                    case ("required"):
                        finalValue = !updatedProps.required;
                        break;
                }
            }
            // Value has changed, update the state
            const updatedState = { ...prevState, [name]: finalValue };
            return updatedState;
        });
    };

    return (
        <div>
            <p>Input Props:</p>
            <input
                type="text"
                name="name"
                value={updatedProps.name || ""}
                onChange={handleInputChange}
                placeholder="Name"
            />
            <input
                type="text"
                name="placeHolder"
                value={updatedProps.placeholder || ""}
                onChange={handleInputChange}
                placeholder="Place Holder"
            />
            <div className="radio-group">
                <div className="radio-option">
                    <p >Required:</p>
                    <ToggleSwitch
                        checkName={"required"}
                        isOn={updatedProps.required}
                        handleToggle={handleInputChange}
                    />
                </div>
            </div>


        </div>
    );
}