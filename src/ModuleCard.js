import React, { useState, useEffect } from "react";
import './moduleCard.css';
import { v4 as uuidv4 } from 'uuid';
import Module from "./Modules";
import ChildModule from "./ChildModule";

export default function ModuleCard({ module, onChange }) {

  const [updatedModule, setUpdatedModule] = useState({ ...module });

  const [modules, setModules] = useState(new Map());
  const [moduleCount, setModuleCount] = useState(0);


  useEffect(() => {
    onChange(updatedModule);
  }, [updatedModule])


  useEffect(() => {
    createChildModules()

  }, [moduleCount]);

  const handleChildModuleUpdate = (childModuleId, childModuleData) => {

    setUpdatedModule(prevModule => ({
      ...prevModule,
      modules: {
        ...prevModule.modules,
        [childModuleId]: childModuleData
      }

    }));
    onChange(updatedModule);
  };

  
  //whenerver our module count changes we create new child modules
  const createChildModules = () => {

    const childModules = new Map();
    for (let i = 0; i < moduleCount; i++) {
      const id = uuidv4();

      childModules[id] = new Module(id);
    }
    setModules(childModules);

  }


  const handleModuleChange = (e) => {
    const updatedModules = e.target.value;
    setModuleCount(updatedModules);


  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the local state with the new value for the input field
    setUpdatedModule(prevState => {
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
    <div className="module-cards-container">
      <div className="card">

        <input
          type="text"
          name="name"
          value={updatedModule.name || ""}
          onChange={handleInputChange}
          placeholder="Name"
        />
        <textarea
          name="description"
          value={updatedModule.description || ""}
          onChange={handleInputChange}
          placeholder="Description"
        />
        <input
          type="text"
          name="type"
          value={updatedModule.type || ""}
          onChange={handleInputChange}
          placeholder="Type"
        />
        <input
          type="text"
          name="order"
          value={updatedModule.order || ""}
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
          name="properties"
          value={updatedModule.properties || ""}
          onChange={handleInputChange}
          placeholder="Properties"
        />
        <input
          type="text"
          name="showInList"
          value={updatedModule.showInList || ""}
          onChange={handleInputChange}
          placeholder="Show In List?"
        />
        <input
          type="text"
          name="value"
          value={updatedModule.value || ""}
          onChange={handleInputChange}
          placeholder="Value"
        />
        <div>
          <p>uuid: {module.id}</p>
        </div>
      </div>

      <div className="child-module-container">
        {
          Object.keys(modules).length === 0
            ?
            <p>Empty</p>
            // Render this if `modules` is empty
            : Object.entries(modules).map(([id, module]) => (
              <div className="child-modules" key={id}>

                <ChildModule module={module} onChange={handleChildModuleUpdate} />
              </div>
            ))
        }

      </div>
    </div>


  );
}
