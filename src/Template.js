import React from "react";
import { useState,useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';


export default function Template({createModules}){
  const [moduleCount, setModuleCount] = useState(0);
  const [name,setName] = useState("");
  const[description,setDescription] = useState("");
  

  //each time we change the name, we re-render and update obj
  useEffect (() =>{
    
    const updatedTemplate = {
      id:uuidv4(),
      name:name,
      description: description,
      moduleCount:moduleCount
    }
    //setTemplate(updatedTemplate);
    createModules(updatedTemplate);
  },[name,description,moduleCount]);

  const handleClick = () => 
  {
    
    console.log(`current Data: name: ${name}, 
      description: ${description}, 
      module count: ${moduleCount}`);

    //createModules(template);
  };

  return (
    <div style={{display:"flex", flexDirection:"column", width:"60%", margin:"20px 0"}}>

      <input style={{margin:"10px 0"}} 
        type="text" 
        placeholder="Name" 
        onChange={(e) => setName(e.target.value)} />

      <input style={{margin:"10px 0",padding:"30px 0"}}
        type="text" 
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)} />

      <input style={{margin:"10px 0"}}
        type="text" 
        onChange={(e) => setModuleCount(Number(e.target.value))}
        placeholder="Module Number" 
      />

      <button type="button" onClick={handleClick}>Create/Save</button>
    </div>
  );
}