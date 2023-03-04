import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import {NodeDisplay,SubNodeDisplay} from "./NodeDisplay"; 
var u_email = localStorage.getItem('email'); 

const NodeData = () => {
   
  const { register, handleSubmit } = useForm();
  const [note, setNote] = useState("");
  const nodeInsert = async (data) => {
    try {
      const url = "http://localhost:4000/users/node";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const err = await response.json();
        console.log("Looks like there was a problem.", err);
        //setLoginMsg(err.msg);
        return;
      } else {
        const data = await response.json();
        setNote(data);
        alert("Node added to list");
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [notes, setNotes] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/users/getnode/" + u_email)
      .then((response) => response.json())
      .then((data) => setNotes(data));
  }, []);

  return (
    <div className="mt-4 p-2 flex-col">
      <div>
      <label className="font-bold">MainNode:</label>
      <form onSubmit={handleSubmit(nodeInsert)}>
        {notes.length === 0 ? (<><input
          type="hidden"
          id="email"
          name="email"
          value={u_email}
          {...register("email", { required: true })}
          placeholder="Enter Note title"
        />
        <input
          className="bg-transparent placeholder-black"
          type="text"
          id="node"
          name="node"
          {...register("node", { required: true })}
          placeholder="create a main node"
        />
        <button type="submit" className="pl-1">
          [+]
        </button> </>) : (<i>cannot add more main node</i>)}
        
      </form></div>
      <NodeDisplay />
    </div>
  );
};


//---SUB-NODE---------///
const SubNodeData = () => {
  const { register, handleSubmit } = useForm();
  const [note, setNote] = useState("");
  const snodeInsert = async (data) => {
    try {
      const url = "http://localhost:4000/users/snode";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const err = await response.json();
        console.log("Looks like there was a problem.", err);
        //setLoginMsg(err.msg);
        return;
      } else {
        const data = await response.json();
        setNote(data);
        alert("Sub-Node added to list");
        window.location.reload("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mt-4 p-2 flex-col">
         <form onSubmit={handleSubmit(snodeInsert)}>
       <div><label className="font-bold">SubNode:</label></div>
        <input
          type="hidden"
          id="email"
          name="email"
          value={u_email}
          {...register("email", { required: true })}
          placeholder="Enter Note title"
        />
        <input
          className="bg-transparent placeholder-black"
          type="text"
          id="snode"
          name="snode"
          {...register("snode", { required: true })}
          placeholder="Enter Sub-node here"
        />
        <button type="submit" className="pl-1">
          [+]
        </button>
      </form>
      
     <div><SubNodeDisplay /></div>
      
    </div>
  );
};


export {NodeData,SubNodeData}
