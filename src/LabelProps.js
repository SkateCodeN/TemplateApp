import React, { useState, useEffect } from "react";

export default function LabelProps({handleLabelPropsUpdate}) {
    const [updatedProps, setUpdatedProps] = useState({
        name: "",
        label:"",
        placeholder:""
    });

    useEffect(() => {

        handleLabelPropsUpdate(updatedProps);
    }, [updatedProps])
    const handleInputChange = (e) => {
        const { name, value} = e.target;
        
        // Update the local state with the new value for the input field
        setUpdatedProps(prevState => {
            if (prevState[name] === value) {
                // Value is the same, no need to update the state and re-trigger the effect
                return prevState;
            }

            // Value has changed, update the state
            const updatedState = { ...prevState, [name]: value };
            return updatedState;
        });
    };
    return (
        <div>
            <p> Label Props:</p>
            <input
                type="text"
                name="name"
                value={updatedProps.name ||""}
                onChange={handleInputChange}
                placeholder="Name"
            />
            <input
                type="text"
                name="label"
                value={updatedProps.label ||""}
                onChange={handleInputChange}
                placeholder="Label"
            />
            <input
                type="text"
                name="placeholder"
                value={updatedProps.placeholder ||""}
                onChange={handleInputChange}
                placeholder="Place Holder"
            />
        </div>
    );
}