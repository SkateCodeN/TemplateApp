
import './App.css';
import { useState } from 'react';
import Template from './Template';
import Module from './Modules';
import JSONView from "./JSONView";
import ModuleCard from "./ModuleCard";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [modules, setModules] = useState({});
  const [template, setTemplate] = useState({});


  //Lifted function that will be sent to 
  const createModules = (mainTemplate) => {

    const { moduleCount } = mainTemplate;
    const childModules = {};
    for (let i = 0; i < moduleCount; i++) {
      const id = uuidv4();

      childModules[id] = new Module(id);
    }

    setModules(childModules);

    mainTemplate.modules = childModules;

    setTemplate(mainTemplate);

  }

  const handleModuleUpdate = (updatedModule) => {
    // Create a new object for the updated template
    const updatedTemplate = {
      ...template,
      modules: {
        ...template.modules,
        [updatedModule.id]: updatedModule
      }
    };

    setTemplate(updatedTemplate);

  };
  return (

    <div className="App">

      <div style={{ width: "100vw", display: "flex", gap: "20px," }}>

        <div className="card">
          <h4>Template:</h4>
          <Template createModules={createModules} />
        </div>

        <JSONView template={template} />
      </div>

      <div className="modules-div">
        <h4>Modules:</h4>
        {
          Object.keys(modules).length === 0
            ? <p>No modules to display.</p> // Render this if `modules` is empty
            : Object.entries(modules).map(([id, module]) => (
              <div key={id}>

                <ModuleCard module={module} onChange={handleModuleUpdate} />
              </div>
            ))
        }
      </div>

    </div>


  );
}

export default App;
