import Diagram, { createSchema, useSchema } from "beautiful-react-diagrams";
import React, { useState, useEffect } from "react";
import "beautiful-react-diagrams/styles.css";
import {NodeData, SubNodeData} from "./NodeData";
import OverviewFlow from "./Flow";
var u_email = localStorage.getItem("email");

const Node = () => {  
  
  return (
    <>
    <div className="h-screen flex-col flex-wrap ">
      <div className="m-4 p-4 flex bg-blue-300  border-2 border-black rounded-xl justify-center gap-4">
        <div><NodeData /></div>
        <div><SubNodeData /></div>
      </div>
      <div className="border-2 border-black m-4 rounded-md">
        <OverviewFlow />
      </div>
    </div>
    </>
  );
};
export default Node;
