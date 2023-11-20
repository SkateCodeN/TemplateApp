import React, { useState, useEffect } from "react";
import './moduleCard.css';

export default function ChildModule({ module, onChange }) {
    // Create a single state object that contains all properties
    const [localModuleState, setLocalModuleState] = useState({ ...module });

    // This effect will update the parent component whenever the local state changes
    useEffect(() => {
        onChange(module.id, localModuleState);
    }, [localModuleState]);

    // This function will be called for every input change and updates the local state
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Update the local state with the new value for the input field
        setLocalModuleState(prevState => {
            if (prevState[name] === value) {
            // Value is the same, no need to update the state and re-trigger the effect
            return prevState;
        }
        // Value has changed, update the state
        const updatedState = { ...prevState, [name]: value };
        return updatedState;});
    };

    return (
        <div className="module-cards-container">
            <div className="child-card">
                <input
                    type="text"
                    name="name"
                    value={localModuleState.name || ""}
                    onChange={handleInputChange}
                    placeholder="Name"
                />
                <textarea
                    name="description"
                    value={localModuleState.description || ""}
                    onChange={handleInputChange}
                    placeholder="Description"
                />
                <input
                    type="text"
                    name="type"
                    value={localModuleState.type || ""}
                    onChange={handleInputChange}
                    placeholder="Type"
                />
                <input
                    type="text"
                    name="order"
                    value={localModuleState.order || ""}
                    onChange={handleInputChange}
                    placeholder="Order"
                />

                <input
                    type="text"
                    name="properties"
                    value={localModuleState.properties || ""}
                    onChange={handleInputChange}
                    placeholder="Properties"
                />
                <input
                    type="text"
                    name="showInList"
                    value={localModuleState.showInList || ""}
                    onChange={handleInputChange}
                    placeholder="Show In List?"
                />
                <input
                    type="text"
                    name="value"
                    value={localModuleState.value || ""}
                    onChange={handleInputChange}
                    placeholder="Value"
                />
                <div>
                    <p>uuid: {module.id}</p>
                </div>
            </div>
        </div>


    );
}
