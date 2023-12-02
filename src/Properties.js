import React, { useState, useEffect } from "react";
import "./properties.css";
import InputProps from "./InputProps";
import LabelProps from "./LabelProps";
import ToggleSwitch from "./ToggleSwitch";
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
    const [labelProps, setLabelProps] = useState({});
    const [inputProps, setInputProps] = useState({});
    const [defaultExpandedState, setDefaultExpandedState] = useState(false);
    useEffect(() => {

        handlePropsUpdate(updatedProps);
    }, [updatedProps])

    const toggleVisibility = () => {
        setIsVisible(prev => !prev);
    };

    //Handle label props
    const handleLabelPropsUpdate = (newProps) => {
        setLabelProps(newProps);
        const updatedLabelProps = { ...updatedProps, labelProps: newProps }
        setUpdatedProps(updatedProps);
        handlePropsUpdate(updatedLabelProps);
    };

    const handleInputPropsUpdate = (newProps) => {
        setInputProps(newProps);
        const updatedInputProps = { ...updatedProps, inputProps: newProps }
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
            /*
            if (type === "radio") {
                finalValue = value === 'true';
            }
            */
            if(type ==="checkbox")
            {
                switch(name)
                {
                    case("defaultExpanded"):
                        finalValue = !updatedProps.defaultExpanded;
                    break;
                    case("selectsEnd"):
                        finalValue = !updatedProps.selectsEnd;
                    break;
                    case("showArrowAfter"):
                        finalValue = !updatedProps.showArrowAfter;
                    break;
                    case("large"):
                        finalValue = !updatedProps.large;
                    break;
                    case("selectsStart"):
                        finalValue = !updatedProps.selectsStart;
                    break;
                    
                }

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
            <div style={{display: "flex", justifyContent: "space-between"}}>
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
                    placeholder="Suffix"

                />
               
                <div>
                    <div className="radio-group">
                        <div className="radio-option">
                            <p >Show Arrow After:</p>
                            <ToggleSwitch 
                                checkName={"showArrowAfter"} 
                                isOn={updatedProps.showArrowAfter} 
                                handleToggle={handleInputChange}
                                
                            />
                        </div>

                        <div className="radio-option">
                            <p>Large:</p>
                            <ToggleSwitch 
                                checkName={"large"} 
                                isOn={updatedProps.large} 
                                handleToggle={handleInputChange} 
                                
                            />
                        </div>
                        <div className="radio-option">
                            <p>Selects Start:</p>
                            <ToggleSwitch 
                                checkName={"selectsStart"} 
                                isOn={updatedProps.selectsStart} 
                                handleToggle={handleInputChange} 
                                
                            />
                        </div>
                    </div>
                </div>
                <hr />
                <div>
                    <div className="radio-group">
                        <div className="radio-option">
                            <p >Default Expanded:</p>
                            <ToggleSwitch 
                                checkName={"defaultExpanded"} 
                                isOn={updatedProps.defaultExpanded} 
                                handleToggle={handleInputChange}
                            />
                        </div>

                        <div className="radio-option">
                            <p>Selects End:</p>
                            <ToggleSwitch 
                                checkName={"selectsEnd"} 
                                isOn={updatedProps.selectsEnd} 
                                handleToggle={handleInputChange} 
                            />
                        </div>
                    </div>
                </div>
                <hr />
                {/* INPUT||LABEL PROPS */}
                <div style={{ display: "flex", alignItems: "baseline" }}>

                    <InputProps 
                        handleInputPropsUpdate={handleInputPropsUpdate} 
                       
                    />

                    <LabelProps handleLabelPropsUpdate={handleLabelPropsUpdate} />
                </div>
            </div>


        </div>
    );
}