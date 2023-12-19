import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import './Template.css'
import ModulePreview from "./ModulePreview";


export default function Template({ template,testUpdate}) {
  const [moduleCount, setModuleCount] = useState(0);
  const [path,setPath] = useState("template.modules")
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  
const handlePropInput = (e) =>{
  let lvl=0;
  //const {name,value} = e.target;
  //let updated = {[name]:value};
  //console.log("Debug #1 - Template handlePropInput function - var e= ", JSON.stringify(e.target))
  testUpdate(e,template.id,lvl)
}

  return (
    <div className="template-container">

      <div className="template-heading">
        <p className="test-background">Template ID: {""}</p>
      </div>
      <input
        className="input-field"
        type="text"
        placeholder="Name"
        name="name"
        onChange={handlePropInput} />

      <textarea
        className="input-field"
        type="text"
        name="description"
        placeholder="Description"
        onChange={handlePropInput}
      />

      <input
        className="input-field"
        type="text"
        name="moduleCount"
        onChange={handlePropInput}
        placeholder="Module Number"
      />
      
      { /*<ModulePreview childModules={childModules} handleViewModuleButton={handleViewModuleButton}/> */}

    </div>
  );
}