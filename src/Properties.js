import React, { useState, useEffect } from "react";
import "./properties.css";
import InputProps from "./InputProps";
import LabelProps from "./LabelProps";
export default function Properties({ handlePropsUpdate }) {
    const [updatedProps, setUpdatedProps] = useState({
        name: "",
        className: "",
        dateFormat: "MM dd, yyyy",
        startDateName: "",
        endDateName: "",
        value: "",
        suffix: "",
        selectsStart: false,
        selectsEnd: false,
        showArrowAfter: false,
        large: false,
        defaultExpanded: false
    });
    const [isVisible, setIsVisible] = useState(false);
    const [labelProps,setLabelProps] = useState({});
    const [inputProps,setInputProps] = useState({});
    useEffect(() => {

        handlePropsUpdate(updatedProps);
    }, [updatedProps])

    const toggleVisibility = () => {
        setIsVisible(prev => !prev);
    };

    //Handle label props
    const handleLabelPropsUpdate =(newProps) => {
        setLabelProps(newProps);
        const updatedLabelProps = {...updatedProps, labelProps: newProps}
        setUpdatedProps(updatedProps);
        handlePropsUpdate(updatedLabelProps);
    };

    const handleInputPropsUpdate =(newProps) => {
        setInputProps(newProps);
        const updatedInputProps = {...updatedProps, inputProps: newProps}
        setUpdatedProps(updatedProps);
        handlePropsUpdate(updatedInputProps);
    };
    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        let finalValue = value;
        // Update the local state with the new value for the input field
        setUpdatedProps(prevState => {
            if (prevState[name] === value) {
                // Value is the same, no need to update the state and re-trigger the effect
                return prevState;
            }

            if (type === "radio") {
                finalValue = value === 'true';
            }
            // Value has changed, update the state
            const updatedState = { ...prevState, [name]: finalValue };
            return updatedState;
        });
    };

    //Toggle display for properties 
    const propertiesStyle = {
        display: isVisible ? 'block' : 'none' 
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>Properties:</p>
                <button className="properties-toggle-button"
                    onClick={toggleVisibility}
                >
                    {isVisible ? 'Hide' : 'Show'}
                </button>
            </div>

            <div style={propertiesStyle}>
                <input
                    type="text"
                    name="name"
                    value={updatedProps.name || ""}
                    onChange={handleInputChange}
                    placeholder="Name"
                />
                <input
                    type="text"
                    name="className"
                    value={updatedProps.className || ""}
                    onChange={handleInputChange}
                    placeholder="ClassName"
                />
                <input
                    type="text"
                    name="dateFormat"
                    value={updatedProps.dateFormat || ""}
                    onChange={handleInputChange}
                    placeholder="Date Format"
                />
                <input
                    type="text"
                    name="startDateName"
                    value={updatedProps.startDateName || ""}
                    onChange={handleInputChange}
                    placeholder="Start Date Name"
                />
                <input
                    type="text"
                    name="endDateName"
                    value={updatedProps.endDateName || ""}
                    onChange={handleInputChange}
                    placeholder="End Date Name"
                />
                <input
                    type="text"
                    name="value"
                    value={updatedProps.value || ""}
                    onChange={handleInputChange}
                    placeholder="Value"
                />
                <input
                    type="text"
                    name="suffix"
                    value={updatedProps.suffix || ""}
                    onChange={handleInputChange}
                    placeholder="suffix"
                />

                <div style={{ display: "flex", gap: "20px" }}>

                    <div >
                        <p>Selects Start:</p>
                        <input
                            type="radio"
                            value="true"
                            name="selectsStart"
                            checked={updatedProps.selectsStart === true}
                            onChange={handleInputChange}

                        />
                        <label>True</label>
                        <input
                            type="radio"
                            value="false"
                            name="selectsStart"
                            checked={updatedProps.selectsStart === false}
                            onChange={handleInputChange}
                        />
                        <label>False</label>
                    </div>

                    <div>
                        <p>Selects End:</p>
                        <input
                            type="radio"
                            value="true"
                            name="selectsEnd"
                            checked={updatedProps.selectsEnd === true}
                            onChange={handleInputChange}

                        />
                        <label>True</label>
                        <input
                            type="radio"
                            value="false"
                            name="selectsEnd"
                            checked={updatedProps.selectsEnd === false}
                            onChange={handleInputChange}
                        />
                        <label>False</label>
                    </div>

                </div>
                <hr />


                {/* SHOW ARROR AFTER Radio Button */}
                <div style={{ display: "flex", gap: "20px" }}>

                    <div>
                        <p>Show Arrow After:</p>
                        <input
                            type="radio"
                            value="true"
                            name="showArrowAfter"
                            checked={updatedProps.showArrowAfter === true}
                            onChange={handleInputChange}

                        />
                        <label>True</label>
                        <input
                            type="radio"
                            value="false"
                            name="showArrowAfter"
                            checked={updatedProps.showArrowAfter === false}
                            onChange={handleInputChange}
                        />
                        <label>False</label>
                    </div>
                    <div>
                        <p>Large:</p>
                        <input
                            type="radio"
                            value="true"
                            name="large"
                            checked={updatedProps.large === true}
                            onChange={handleInputChange}

                        />
                        <label>True</label>
                        <input
                            type="radio"
                            value="false"
                            name="large"
                            checked={updatedProps.large === false}
                            onChange={handleInputChange}
                        />
                        <label>False</label>
                    </div>

                </div>
                <hr />

                {/* DEFAULT EXPANDED Radio Button */}
                <div style={{ display: "flex", alignItems: "baseline" }}>
                    <p>Default Expanded:</p>
                    <div>
                        <input
                            type="radio"
                            value="true"
                            name="defaultExpanded"
                            checked={updatedProps.defaultExpanded === true}
                            onChange={handleInputChange}

                        />
                        <label>True</label>
                        <input
                            type="radio"
                            value="false"
                            name="defaultExpanded"
                            checked={updatedProps.defaultExpanded === false}
                            onChange={handleInputChange}
                        />
                        <label>False</label>
                    </div>

                </div>

                {/* INPUT||LABEL PROPS */}
                <div style={{ display: "flex" }}>

                    <InputProps handleInputPropsUpdate={handleInputPropsUpdate} />

                    <LabelProps handleLabelPropsUpdate={handleLabelPropsUpdate} />
                </div>
            </div>


        </div>
    );
}