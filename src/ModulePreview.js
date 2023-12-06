import React from "react";
import "./ModulePreview.css"
export default function ModulePreview({ childModules,handleViewModuleButton }) {
    
    return (
        <div className="module-preview">
            {
                Object.keys(childModules).length === 0
                    ?
                    null

                    : Object.entries(childModules).map(([id, module]) => (
                        <button className="module-button-block" 
                            onClick={() => handleViewModuleButton(module,id)}
                            key={id}
                        >
                            ID: {id.slice(-5)}
                            
                        </button>
                    ))
            }

        </div>
    );
}