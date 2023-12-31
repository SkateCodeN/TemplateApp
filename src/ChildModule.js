import React, { useState, useEffect } from "react";
import './moduleCard.css';
import Module from "./Modules";
import { v4 as uuidv4 } from 'uuid';
import Properties from "./Properties";

export default function ChildModule({ pColor, parentID, module, onChange }) {
    // Create a single state object that contains all properties
    const [localModuleState, setLocalModuleState] = useState({ ...module });
    const [moduleCount, setModuleCount] = useState(0);
    const [children, setChildren] = useState({});
    const [properties, setProperties] = useState({});
    const [parentColor, setParentColor] = useState("")
    const modID = module.id;
    const modifiedID = modID.slice(-5);



    // This effect will update the parent component whenever the local state changes
    useEffect(() => {
        onChange(module.id, localModuleState);
    }, [localModuleState]);

    useEffect(() => {
        createChildModules()

    }, [moduleCount]);

    useEffect(() => {

        setParentColor(pColor);
    }, []); // This will run every time cardColor changes

    const createChildModules = () => {

        const childModules = {};
        for (let i = 0; i < moduleCount; i++) {
            const id = uuidv4();

            childModules[id] = new Module(id);
        }
        setChildren(childModules);
        localModuleState.modules = childModules;
        onChange(module.id, localModuleState)
    }

    //Handles the state change of Properties component
    const handlePropsUpdate = (newProps) => {
        setProperties(newProps);
        const updatedProps = { ...localModuleState, properties: newProps }
        setLocalModuleState(updatedProps);
        onChange(localModuleState);
    };
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
            if (name === "order") {
                const newVal = Number(value);
                console.log(`value for ${name}: ${newVal}`)
                const newState = { ...prevState, [name]: newVal }
                return newState;
            }
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

    const childModuleStyle = { backgroundColor: parentColor };

    return (
        <div className="n-child-container">

            <div className="child-card" style={childModuleStyle}>
                <div className="module-id">
                    <p>Parent ID: {parentID.slice(-5)}</p>
                    <p>Child ID: {modifiedID}</p>

                </div>
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
                    value={moduleCount || ""}
                    onChange={handleModuleChange}
                    placeholder="Module Count"
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

                <Properties handlePropsUpdate={handlePropsUpdate} />
            </div>

            <div style={{ display: "flex" }}>
                {
                    Object.keys(children).length === 0
                        ?
                        null
                        // Render this if `children` is empty
                        : Object.entries(children).map(([id, module]) => (
                            <div className="child-modules" key={id}>

                                <ChildModule pColor={parentColor} parentID={modID} module={module} onChange={handleChildModuleUpdate} />
                            </div>
                        )
                        )
                }
            </div>
        </div>



    );
}
