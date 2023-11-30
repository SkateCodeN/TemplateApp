import React, { useState, useEffect } from "react";

export default function InputProps({handleInputPropsUpdate}) {
    const [updatedProps, setUpdatedProps] = useState({
        name: "",
        required:false,
        placeholder:""
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

            if (type === "radio") {
                finalValue = value === 'true';
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
                value={updatedProps.name ||""}
                onChange={handleInputChange}
                placeholder="Name"
            />
            <input
                type="text"
                name="required"
                value={updatedProps.required ||""}
                onChange={handleInputChange}
                placeholder="Required"
            />
            <input
                type="text"
                name="placeHolder"
                value={updatedProps.placeholder ||""}
                onChange={handleInputChange}
                placeholder="Place Holder"
            />
        </div>
    );
}