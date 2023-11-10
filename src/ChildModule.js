import React, { useState, useEffect } from "react";
import ChildModules from "./ChildModules";
import './moduleCard.css';

export default function ChildModule({ module, onChange }) {

    const [updatedModule, setUpdatedModule] = useState(module);

    const [name, setName] = useState(module.name);
    const [description, setDescription] = useState(module.description);
    const [type, setType] = useState(module.type);
    const [order, setOrder] = useState(module.order);
    const [properties, setProperties] = useState(module.properties);
    const [showInList, setShowInList] = useState(module.showInList);
    const [value, setValue] = useState(module.value);
    /*
        useEffect(() => {
    
           // const updatedChild = new ChildModules(module.id, name, description, type, order, properties, showInList, value);
            //console.log(`UpdatedModule JSON object ${JSON.stringify(updatedChild)}`);
            const updatedChild = {
                id:module.id,
                name:name,
                type:type,
                description:description,
                order:order,
                properties:properties,
                showInList:showInList,
                value:value
            }
            onChange(updatedChild);
    
        }, [name, type, description, order, properties, showInList, value]);
    */
    useEffect(() => {

        onChange(module.id,updatedModule);

    }, [updatedModule]);

    const handleModuleUpdate = (updatedModules) => {
        // Create a new object for the updated template
        const newChildModules = {

            ...updatedModule,
            modules: {
                ...updatedModule.modules,
                [updatedModule.id]: updatedModules
            }
        };

        setUpdatedModule(newChildModules);
        //onChange(updatedModule);
    };


    // Handle change for each input
    const handleNameChange = (e) => {
        const updatedName = e.target.value;
        setName(updatedName);
        setUpdatedModule ( prevModule => ({
            ...prevModule,
            name:updatedName
          }));
    };

    const handleDescriptionChange = (e) => {
        const updatedDescription = e.target.value;
        setDescription(updatedDescription);

    };

    const handleTypeChange = (e) => {
        const updatedType = e.target.value;
        setType(updatedType);

    };
    const handleOrderChange = (e) => {
        const updatedOrder = e.target.value;
        setOrder(updatedOrder);
        //onUpdate({ description: updatedDescription }); // Update parent state
        //console.log("ModuleCard.js (line 18): Module Child Description -", description);
    };
    const handlePropertiesChange = (e) => {
        const updatedProperties = e.target.value;
        setProperties(updatedProperties);
        //onUpdate({ description: updatedDescription }); // Update parent state
        //console.log("ModuleCard.js (line 18): Module Child Description -", description);
    };

    const handleShowInListChange = (e) => {
        const updatedShowInList = e.target.value;
        setShowInList(updatedShowInList);
        //onUpdate({ description: updatedDescription }); // Update parent state
        //console.log("ModuleCard.js (line 18): Module Child Description -", description);
    };
    const handleValueChange = (e) => {
        const updatedValue = e.target.value;
        setValue(updatedValue);
        //onUpdate({ description: updatedDescription }); // Update parent state
        //console.log("ModuleCard.js (line 18): Module Child Description -", description);
    };
    return (
        <div className="module-cards-container">
            <div className="child-card">
                <input
                    type="text"
                    name="name"
                    value={name || ""}
                    onChange={handleNameChange}
                    placeholder="Name"
                />
                <textarea
                    name="description"
                    value={description || ""}
                    onChange={handleDescriptionChange}
                    placeholder="Description"
                />
                <input
                    type="text"
                    name="type"
                    value={type || ""}
                    onChange={handleTypeChange}
                    placeholder="Type"
                />
                <input
                    type="text"
                    name="order"
                    value={order || ""}
                    onChange={handleOrderChange}
                    placeholder="Order"
                />

                <input
                    type="text"
                    name="properties"
                    value={properties || ""}
                    onChange={handlePropertiesChange}
                    placeholder="Properties"
                />
                <input
                    type="text"
                    name="showInList"
                    value={showInList || ""}
                    onChange={handleShowInListChange}
                    placeholder="Show In List?"
                />
                <input
                    type="text"
                    name="value"
                    value={value || ""}
                    onChange={handleValueChange}
                    placeholder="Value"
                />
                <div>
                    <p>uuid: {module.id}</p>
                </div>
            </div>
        </div>


    );
}
