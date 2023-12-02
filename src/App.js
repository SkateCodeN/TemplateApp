
import './App.css';
import { useEffect, useState } from 'react';
import Template from './Template';
import Module from './Modules';
import JSONView from "./JSONView";
import ModuleCard from "./ModuleCard";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [modules, setModules] = useState({});
  const [template, setTemplate] = useState({});
  const [copySuccess, setCopySuccess] = useState('');
  const modifiedID = (template.id) ? template.id.slice(-5) : "";
  const [viewModule, setViewModule] = useState(null);

  const copyTemplateToClipboard = async () => {
    try {
      // Stringify the template object to make it ready for copying
      const templateStr = JSON.stringify(template, null, 2);
      await navigator.clipboard.writeText(templateStr);
      setCopySuccess('Template copied to clipboard!');
    } catch (err) {
      setCopySuccess('Failed to copy template.');
      console.error('Failed to copy text to clipboard: ', err);
    }
  };

  //Lifted function that will be sent to 
  useEffect(() => {
    setCopySuccess("");
  }, [template])

  const createModules = (mainTemplate, moduleCount) => {

    //if module count is 0, make sure to erase viewMod state
    if(moduleCount === 0 ) setViewModule(null);

    const childModules = {};
    for (let i = 0; i < moduleCount; i++) {
      const id = uuidv4();

      childModules[id] = new Module(id);
    }

    setModules(childModules);
    mainTemplate.modules = childModules;
    setTemplate(mainTemplate);

  }
  const handleViewModuleButton = (module) => {
    console.log(`Module id${module.id} clicked`)
    setViewModule(module);
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

      <div className="card-container" >
        <div className="spaceBackground" >
          <Template id={modifiedID}
            createModules={createModules}
            copy={copyTemplateToClipboard}
            copySuccess={copySuccess}
            childModules={modules}
            handleViewModuleButton={handleViewModuleButton}
          />
        </div>

        <JSONView template={template} />
      </div>

      <div className="modules-div">
        <h4>Modules:</h4>
        {
          Object.keys(modules).length === 0
            ?
            null

            : Object.entries(modules).map(([id, module]) => (
              <div key={id}>

                <ModuleCard module={module} onChange={handleModuleUpdate} />
              </div>
            ))
        }
      </div>

      <div className='modules-div'>
        <p>Testing Preview</p>
        {
          viewModule && <ModuleCard module={viewModule} onChange={handleModuleUpdate} />
        }
      </div>

    </div>

  );
}

export default App;
