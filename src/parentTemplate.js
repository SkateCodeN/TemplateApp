import React, { useState, useEffect } from "react";
import "./Template.css";

export default function ParentTemplate({ TemplateState, updateAppState }) {
    const [updatedTemplate, setUpdatedTemplate] = useState(TemplateState);
    // templateState is global state
    const [moduleCount, setModuleCount] = useState(0);
    //re render everytime our moduleCount changes
    useEffect(() => {
        createModules(moduleCount)
    }, [moduleCount])
    // Update current Data user inputs to 
    // the rendered properties
    // 
    const handleInput = (e, level = 0,id = TemplateState.id) => {
       if(level === 1){

       }

    };

    const getPathFromLevel = (level,moduleID) =>{
        let path = "template";
        const appendModules = `.modules`;
        if(level === 0) return path;
        else{
            for(let i = 1; i<= level; i++){
                path += appendModules;
            }
        }
    }
    //Create Child Modules, update template state
    // This is called when our children module count changes
    const createModules = (module_count, level = 0, moduleID) => {
        //create childModules
        const childModules = {};
        for (let i = 0; i < moduleCount; i++) {
            const id = uuidv4();

            childModules[id] = new Module(id);
        }

        //updateGlobal State( saved in App.js)
        updateAppState(level,childModules);
    };

    //this is the global state we pass to children to 
    //maintain its module state
    // level - Tells you how far nested we update the modules:
    //          child = level 1, 
    //          grandChild = lvl2 great...nGrandChild = level 3..n
    // data - module data to update
    // id - of 
    const updateModules = (level = 0, data, id) => {

    }

    return (

        <div>
            {/* Property Inputs*/}
            <div>
                <div className="template-heading">
                    <p className="test-background">Template ID: {TemplateState.id || ""}</p>
                </div>
                <input
                    className="input-field"
                    type="text"
                    placeholder="Name"
                    onChange={(e) => handleInput(e)} />

                <textarea
                    className="input-field"
                    type="text"
                    placeholder="Description"
                    onChange={(e) => handleInput(e)}
                />

                <input
                    className="input-field"
                    type="text"
                    onChange={(e) => setModuleCount(Number(e.target.value))}
                    placeholder="Module Number"
                />
            </div>
            {/* Child Module Cards */}
            <div>

            </div>
            {/* Copy To clipboard button */}
            <div>

            </div>
        </div>
    )
}