import React, { useState, useEffect } from "react";
import './moduleCard.css';
import { v4 as uuidv4 } from 'uuid';
import ChildModules from "./ChildModules";
import ChildModule from "./ChildModule";

export default function ModuleCard({ module, onChange }) {
  const [updatedModule, setUpdatedModule] = useState(module);
  const [name, setName] = useState(module.name);
  const [description, setDescription] = useState(module.description);

  const [type, setType] = useState(module.type);
  const [order, setOrder] = useState(module.order);
  const [modules, setModules] = useState(new Map());
  const [moduleCount, setModuleCount] = useState(0);
  const [properties, setProperties] = useState(module.properties);
  const [showInList, setShowInList] = useState(module.showInList);
  const [value, setValue] = useState(module.value);

  useEffect(() => {

    onChange(updatedModule);

  }, [updatedModule]);
  
  useEffect(() => {
    createChildModules();

  }, [moduleCount]);

  const handleChildModuleUpdate4 = (childModuleId, childModuleData) => {
    setModules(prev => new Map(prev).set(childModuleId, childModuleData));
    setUpdatedModule ( prevModule => ({
      ...prevModule,
      modules:Object.fromEntries(modules)
      
    }));
  };

  //whenerver our module count changes we create new child modules
  const createChildModules = () => {

    const childModules = new Map();
    for (let i = 0; i < moduleCount; i++) {
      const id = uuidv4();

      childModules.set(id, ChildModules(id, "", "", "", "", {}, "", ""));
    }
    /*
    console.log(`ModuleCard.js (line 55) 
      var childModules: ${JSON.stringify(Object.fromEntries(childModules))}
      state module: ${JSON.stringify(module)}`);
    */
    setModules(childModules);
    //handleModuleUpdate(Object.fromEntries(childModules));
    //module.modules = Object.fromEntries(childModules);

    //setUpdatedModule(module);

  }

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
    setUpdatedModule ( prevModule => ({
      ...prevModule,
      value:updatedValue
    }));
  };
  return (
    <div className="module-cards-container">
      {/* These are the module cards ie parent modules*/}
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

      {/* Child Modules className= {modules.size ===0 ? "test-child" :"child-module-container"} */}
      <div className="child-module-container">
        {
          modules.size === 0
            ?
            <p>no children</p>
            // Render this if `modules` is empty
            : Array.from(modules.entries()).map(([id, module]) => (
              <div className="child-modules" key={id}>

                <ChildModule module={module} onChange={handleChildModuleUpdate4} />
              </div>
            ))
        }

      </div>
    </div>


  );
}
