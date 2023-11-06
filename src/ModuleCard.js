import React, { useState, useEffect } from "react";
import Module from "./Modules";
import './moduleCard.css';
import createUUID from "./uuid";

export default function ModuleCard({ module, onChange }) {
  const [updatedModule, setUpdatedModule] = useState(module);
  const [name, setName] = useState(module.name);
  const [description, setDescription] = useState(module.description);
  const [type, setType] = useState(module.type);
  const [order, setOrder] = useState(module.order);
  const [modules, setModules] = useState(module.modules);
  const [moduleCount, setModuleCount] = useState(0);
  const [properties, setProperties] = useState(module.properties);
  const [showInList, setShowInList] = useState(module.showInList);
  const [value, setValue] = useState(module.value);

  useEffect(() => {

    const updatedModule = new Module(module.id, name, description, type, order, modules, properties, showInList, value);

    onChange(updatedModule);

  }, [name, type, description, order, modules, properties, showInList, value]);

  useEffect(() => {
    createChildModules()
    
  }, [moduleCount]);


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

  };

  const createChildModules = () => {

    const childModules = new Map();
    for (let i = 0; i < moduleCount; i++) {
      const id = createUUID();

      childModules.set(id, Module(id, "", "", "", "", {}, {}, "", ""));

    }
    console.log(`ModuleCard.js (line 55) 
        var childModules: ${JSON.stringify(Object.fromEntries(childModules))}
        state module: ${JSON.stringify(module)}`);

    //setModules(childModules);
    handleModuleUpdate(Object.fromEntries(childModules));
    //module.modules = Object.fromEntries(childModules);

    //setUpdatedModule(module);

  }
  // Handle change for each input
  const handleNameChange = (e) => {
    const updatedName = e.target.value;
    setName(updatedName);
    //onUpdate({ name: updatedName }); // Update parent state
    //console.log("ModuleCard.js (line 11): Module Child Name -",name);
  };

  const handleDescriptionChange = (e) => {
    const updatedDescription = e.target.value;
    setDescription(updatedDescription);
    //onUpdate({ description: updatedDescription }); // Update parent state
    //console.log("ModuleCard.js (line 18): Module Child Description -", description);
  };

  const handleTypeChange = (e) => {
    const updatedType = e.target.value;
    setType(updatedType);
    //onUpdate({ description: updatedDescription }); // Update parent state
    //console.log("ModuleCard.js (line 18): Module Child Description -", description);
  };
  const handleOrderChange = (e) => {
    const updatedOrder = e.target.value;
    setOrder(updatedOrder);
    //onUpdate({ description: updatedDescription }); // Update parent state
    //console.log("ModuleCard.js (line 18): Module Child Description -", description);
  };
  const handleModuleChange = (e) => {
    const updatedModules = e.target.value;
    setModuleCount(updatedModules);

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
      <div className="card">
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
          name="moduleCount"
          value={moduleCount || ""}
          onChange={handleModuleChange}
          placeholder="Module Count"
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
      <div id={module.id} className="child-module-container">
        <div className="child-module">
          <div><pre>{JSON.stringify(updatedModule.modules,"",'\t')}</pre></div>
        </div>
      </div>
    </div>


  );
}
