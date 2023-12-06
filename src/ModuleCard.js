import React, { useState, useEffect } from "react";
import './moduleCard.css';
import { v4 as uuidv4 } from 'uuid';
import Module from "./Modules";
import ChildModule from "./ChildModule";
import getRandomColor from "./RandomColorGen";
import Properties from "./Properties";

export default function ModuleCard({ module, onChange }) {

  const [updatedModule, setUpdatedModule] = useState({ ...module });
  const [modules, setModules] = useState({});
  const [moduleCount, setModuleCount] = useState(0);
  const moduleID = module.id;
  const modifiedID = moduleID.slice(-5);
  const [moduleColors, setModuleColors] = useState({});
  const [properties, setProperties] = useState({});

  useEffect(() => {

    onChange(updatedModule);
  }, [updatedModule])

  //Once the mo
  useEffect(() => {
    setUpdatedModule(module)
  }, [module])

  useEffect(() => {
    createChildModules()

  }, [moduleCount]);

  //handles the state of child modules component
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

  //Handles the state change of Properties component
  const handlePropsUpdate = (newProps) => {
    setProperties(newProps);
    const updatedProps = { ...updatedModule, properties: newProps }
    setUpdatedModule(updatedProps);
    onChange(updatedModule);
  };

  //whenerver our module count changes we create new child modules
  const createChildModules = () => {

    const childModules = {};
    const colorObj = {};
    for (let i = 0; i < moduleCount; i++) {
      const id = uuidv4();
      childModules[id] = new Module(id);
      colorObj[id] = getRandomColor();
    }
    setModules(childModules);
    updatedModule.modules = childModules;
    onChange(updatedModule);
    setModuleColors(colorObj);
  }

  //handles the user input of module count
  const handleModuleChange = (e) => {
    const updatedModules = e.target.value;
    setModuleCount(updatedModules);


  };

  //pragmatically handles all the inputs rendered on Module Card
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the local state with the new value for the input field
    setUpdatedModule(prevState => {
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
  

  return (
    <div className="module-cards-container">
      <div className="card">
        <div className="module-id">
          <p>Module</p>
          <p>ID: {modifiedID}</p>
        </div>

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

        <Properties handlePropsUpdate={handlePropsUpdate} />

      </div>

      <div className="child-module-container">
        {
          Object.keys(modules).length === 0
            ?
            null
            // Render this if `modules` is empty
            : Object.entries(modules).map(([id, module]) => (
              <div className="child-modules" key={id}>

                <ChildModule pColor={moduleColors[id]}
                  parentID={moduleID}
                  module={module}
                  onChange={handleChildModuleUpdate} />
              </div>
            ))
        }

      </div>
    </div>


  );
}
