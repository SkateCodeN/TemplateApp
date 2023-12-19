
import './App.css';
import { useEffect, useState } from 'react';
import Template from './Template';
import Module from './Modules';
import JSONView from "./JSONView";
import ModuleCard from "./ModuleCard";
import { v4 as uuidv4 } from 'uuid';

function App() {

    const [template, setTemplate] = useState({
        id: uuidv4(),
        name: "test name",
        modules: {},
        description: "the last supper"
    });

    const modifiedID = (template.id) ? template.id.slice(-5) : "";

    const updateModuleById33 = (moduleId, depth, updatedData) => {
        const {name, value} = updatedData.target;
        console.log(`Debug #4- App component - updatedModuleId: name=[${name} : value=[${value}]]`)
        //console.log(`Debug #5- App component - updatedModuleId: updatedData var=${updatedData}`)
        if (depth === 0) {
            if (template.id === moduleId) {
                setTemplate((prevState =>{
                    const newState = {...prevState, [name]:value}
                    return newState;
                }));
                // Update the module properties here
                //let updatedModule = { ...template, [name]:value }
                //setTemplate(updatedModule)
                return template;
            }
           // console.log("current Template state", template)
            return template;
        }
    }
    const updateModuleById = (moduleId, depth, updatedData) => {
        const { name, value } = updatedData.target;
      
        // Function to recursively update the object
        const recursiveUpdate = (obj, currentDepth) => {
          if (currentDepth === depth) {
            if (obj.id === moduleId) {
              return { ...obj, [name]: value }; // Update at the target depth
            }
            return obj;
          }
      
          // Assuming 'modules' is the key where nested modules are stored
          if (obj.modules) {
            return {
              ...obj,
              modules: Object.keys(obj.modules).reduce((acc, key) => {
                acc[key] = recursiveUpdate(obj.modules[key], currentDepth + 1);
                return acc;
              }, {})
            };
          }
      
          return obj; // Return the object unchanged if not at the correct depth
        };
      
        // Update the template state
        setTemplate(prevTemplate => recursiveUpdate(prevTemplate, 0));
      };
    const updateTemplate33 = (updatedData, id, depth) => {
        //console.log("Debug #2 - App component - updateTemplate33 function: ", updatedData.target)
        let prevTemplate = updateModuleById(id,depth,updatedData)

        console.log("Debug #3 - App component - Template State: ", template)
           // console.log("Level 0 Object:",JSON.stringify(template))
            //find the module based on id and level is the upperbound
            /*
            setTemplate(prevTemplate => {
                let keys = path.split('.');
                let temp = { ...prevTemplate };
                let current = temp;
                console.log(
                    `keys: ${keys}
                
            `)

                for (let i = 0; i < keys.length - 1; i++) {
                    let key = keys[i];
                    if (!current[key]) current[key] = {};
                    current = current[key];
                }

                current[keys[keys.length - 1]] = updatedData;

                return temp;
            }); */
        };

        return (

            <div className="App">

                <div className="card-container" >
                    <div className="spaceBackground" >
                        <Template template={template} testUpdate={updateTemplate33} />
                    </div>

                    <JSONView template={template} />
                </div>

                <div className='modules-div'>
                    <p>Template.Modules</p>

                </div>

            </div>

        );
    }

    export default App;
