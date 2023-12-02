import React from "react";


export default function JSONView({template}){

    return(
        <div className="viewCard">
        <h3>JSON View</h3>
        <div style={{ height: "400px", overflow: "hidden", overflowY: "scroll", overflowX: "scroll" }}>
          <pre>{JSON.stringify(template, null, "\t")}</pre>
        </div>
      </div>
    );
}