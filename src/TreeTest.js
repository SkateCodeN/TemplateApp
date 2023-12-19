//What we wnat to achieve is for the parent to pass state to its children
import React, { useState } from "react";
export default function TestTree() {
    //what it knows and keeps track of and what we initialize it to be.
    const [parent, setParent] = useState({});


    //what functions does it have?
    //1.Pass its state to child, or from its child we call this function
    //in: the child to updates id
    // We will pass setParent to update state
    const UpdateParent = (childID, childData) => {
        const updatedTemplate = {
            ...parent,
            modules: {
                ...parent.modules,
                [childID]: childData
            }
        };
        setParent(updatedTemplate);
    }

    const createChildren = (count, parent) => {

    }
    const handleInputChange = (e, moduleID,updateParentState) => {
        const { name, value } = e.target;
        // Update the local state with the new value for the input field
        updateParentState(prevState => {
            if (prevState[name] === value) {
                // Value is the same, no need to update the state and re-trigger the effect
                return prevState;
            }
            
            const updatedState = { ...prevState, [name]: value };
            return updatedState;
        });
    };
    //what it renders to the DOM
    return (
        <div>
            <p>Parent Data: </p>

            <p>Parent ID:</p>
            <input
                type="text"
                name="id"
                value={template.id || ""}
                placeholder="Name" 
            />

            <p>Parent Name: </p>
            <input
                type="text"
                name="name"
                value={updatedModule.name || ""}
                placeholder="Name" 
            />
            <div>
                <p>Child Modules</p>
            </div>
        </div>

    );
}

function Child() {

}