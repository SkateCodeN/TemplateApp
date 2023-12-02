import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import './Template.css'
import ModulePreview from "./ModulePreview";


export default function Template({ createModules, copy, copySuccess, id,childModules,handleViewModuleButton }) {
  const [moduleCount, setModuleCount] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");


  //each time we change the name, we re-render and update obj
  useEffect(() => {

    const updatedTemplate = {
      id: uuidv4(),
      name: name,
      description: description
    }
    //setTemplate(updatedTemplate);
    createModules(updatedTemplate, moduleCount);
  }, [name, description, moduleCount]);

  return (
    <div className="template-container">

      <div className="template-heading">
        <p className="test-background">Template ID: {id || ""}</p>
      </div>
      <input
        className="input-field"
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)} />

      <textarea
        className="input-field"
        type="text"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        className="input-field"
        type="text"
        onChange={(e) => setModuleCount(Number(e.target.value))}
        placeholder="Module Number"
      />
      
      <ModulePreview childModules={childModules} handleViewModuleButton={handleViewModuleButton}/>

      <button className="copy-button" type="button" onClick={copy}>Copy</button>
      {copySuccess && <div className="copy-success" >{copySuccess}</div>}
    </div>
  );
}