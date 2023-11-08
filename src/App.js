
import './App.css';
import { useState } from 'react';
import Template from './Template';
import Module from './Modules';
import createUUID from "./uuid";
import JSONView from "./JSONView";
import ModuleCard from "./ModuleCard";

function App() {
  const [modules, setModules] = useState(new Map());
  const [template, setTemplate] = useState({});


  //Lifted function that will be sent to 
  const createModules = (mainTemplate) => {

    const { moduleCount } = mainTemplate;
    const childModules = new Map();
    for (let i = 0; i < moduleCount; i++) {
      const id = createUUID();

      childModules.set(id, Module(id));


    }
    /*
    console.log(`App.JS(line 37) 
        var childModules: ${JSON.stringify(Object.fromEntries(childModules))}
        state modules: ${JSON.stringify(Object.fromEntries(modules))}`);
    */
    setModules(childModules);

    mainTemplate.modules = Object.fromEntries(childModules);

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
    /*
    console.log(`App.JS ModuleCard updated
      module ID: [ ${updatedModule.id} ]
      name: [${updatedModule.name}] description: [ ${updatedModule.description}]
      template modules datatype: ${JSON.stringify(updatedTemplate.modules[updatedModule.id])}`
    );
    */
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
        {//console.log(`App.JS(line 73) 
          //state modules size: ${modules.size} 
          //state modules: ${JSON.stringify(Object.fromEntries(modules))} `)
        }

        {
          modules.size === 0
            ? <p>No modules to display.</p> // Render this if `modules` is empty
            : Array.from(modules.entries()).map(([id, module]) => (
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
