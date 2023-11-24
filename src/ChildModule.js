import React, { useState, useEffect } from "react";
import './moduleCard.css';
import Module from "./Modules";
import { v4 as uuidv4 } from 'uuid';

export default function ChildModule({ module, onChange }) {
    // Create a single state object that contains all properties
    const [localModuleState, setLocalModuleState] = useState({ ...module });
    const [moduleCount, setModuleCount] = useState(0);
    const [children, setChildren] = useState({});
    // This effect will update the parent component whenever the local state changes
    useEffect(() => {
        onChange(module.id, localModuleState);
    }, [localModuleState]);

    useEffect(() => {
        createChildModules()

    }, [moduleCount]);

    const createChildModules = () => {

        const childModules = {};
        for (let i = 0; i < moduleCount; i++) {
            const id = uuidv4();

            childModules[id] = new Module(id);
        }
        setChildren(childModules);
        localModuleState.modules =childModules;
        onChange(module.id, localModuleState)
    }

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
            return updatedState;
        });
    };
    const handleModuleChange = (e) => {
        const updatedModules = e.target.value;
        setModuleCount(updatedModules);


    };
    const handleChildModuleUpdate = (childModuleId, childModuleData) => {

        setLocalModuleState(prevModule => ({
          ...prevModule,
          modules: {
            ...prevModule.modules,
            [childModuleId]: childModuleData
          }
    
        }));
        onChange(localModuleState);
      };
    return (
        <div className="n-child-container">
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
                    name="moduleCount"
                    value={moduleCount|| ""}
                    onChange={handleModuleChange}
                    placeholder="Module Count"
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

            <div style={{display:"flex"}}>
                {
                    Object.keys(children).length === 0
                        ?
                        null
                        // Render this if `children` is empty
                        : Object.entries(children).map(([id, module]) => (
                            <div className="child-modules" key={id}>

                                <ChildModule module={module} onChange={handleChildModuleUpdate} />
                            </div>
                        )
                    )
                }
            </div>
        </div>



    );
}
