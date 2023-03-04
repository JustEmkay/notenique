import React, { useCallback, useState, useEffect } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";

import {
  nodes as initialNodes,
  edges as initialEdges,
} from "./initial-elements";
import CustomNode from "./CustomNode";

import "reactflow/dist/style.css";
import "./overview.css";
var u_email = localStorage.getItem("email");

const nodeTypes = {
  custom: CustomNode,
};

const minimapStyle = {
  height: 120,
};

const onInit = (reactFlowInstance) =>
  console.log("flow loaded:", reactFlowInstance);

const OverviewFlow = () => {
  //------------------------------------------------------------------
  const [array, setArray] = useState([]);
  const myArray = [];
  useEffect(() => {
    fetch("http://localhost:4000/users/getnode/" + u_email)
      .then((response) => response.json())
      .then((data) => setArray(data));
  }, []);
  let k = 300;
  array.map((i) => {
    var arr = {
      id: i,
      type: "input",
      data: {
        label: (
          <>
            <label className="uppercase font-bold">{i}</label>
          </>
        ),
      },
      style: {
        background: "red",
        color: "white",
        width: 100,
      },
      position: { x: k, y: 100 },
    };
    k = k + 300;
    myArray.push(arr);
  });
  //------------------------------------------------------------------
  const [sarray, setSarray] = useState([]);
  const mySArray = [];
  useEffect(() => {
    fetch("http://localhost:4000/users/getsnode/" + u_email)
      .then((response) => response.json())
      .then((data) => setSarray(data));
  }, []);
  //----note-----
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/users/note/" + u_email)
      .then((response) => response.json())
      .then((data) => setNotes(data));
  }, []);
  //--------------
  const [s_notes, setSnote] = useState([]);
  const sub_note = [];
  useEffect(() => {
    fetch("http://localhost:4000/users/note/" + u_email)
      .then((response) => response.json())
      .then((data) => setSnote(data));
  }, []);
  let l = 100;
  let m = 400;
  s_notes.filter((s_notes) => s_notes.s_node && s_notes.node !== "others")
    .map((i) => {
      var notearr = {
        id: i.title,
        type: "output",
        data: {
          label: (
            <>
              <label className="uppercase">{i.title}</label>
              <br />
              <span className="bg-red-400 px-2 mr-1 rounded-full">
                {i.node}
              </span>
              <span className="bg-blue-800 px-2 rounded-full">{i.s_node}</span>
            </>
          ),
        },
        style: {
          background: "#000000",
          color: "white",
          width: 150,
          padding: "10px",
          textAlign: "left",
          paddingLeft: "6px",
        },
        position: { x: l, y: m },
      };
      l = l + 300;
      m = m + 50;
      sub_note.push(notearr);
      console.log(sub_note);
    });
  //-------------
  let j = 100;
  sarray.map((i) => {
    var sarr = {
      id: i,
      style: {
        background: "#63B3ED",
        color: "white",
        width: 200,
        padding: "10px",
        textAlign: "left",
        paddingLeft: "8px",
      },
      data: {
        label: (
          <>
            <dl>
              <dt>
                <h6>
                  subnode : <b>{i}</b>
                </h6>
              </dt>
              <hr></hr>
              {notes.filter((note) => note.s_node === i).length === 0 ? (
                <dd>
                  <i>//Empty Subnode</i>
                </dd>
              ) : (
                notes
                  .filter((notes) => notes.s_node === i)
                  .map((n) => <dd>{n.title}</dd>)
              )}
            </dl>
          </>
        ),
      },
      position: { x: j, y: 250 },
    };
    j = j + 300;
    mySArray.push(sarr);
    console.log(mySArray);
  });
  //------------------------------------------------------------------
  const [oData, setDatao] = useState([]);
  const others = [];
  useEffect(() => {
    fetch("http://localhost:4000/users/getsnode/" + u_email)
      .then((response) => response.json())
      .then((data) => setDatao(data));
  }, []);

  oData.map((i) => {
    var oarr = {
      id: "null",
      type: "default",
      className: "annotation",
      data: {
        label: (
          <>
            <dl>
              <dt>
                <h6>
                  <b>others:</b>
                </h6>
              </dt>
              <hr></hr>
              {notes.filter((note) => note.s_node !== i).length === 0 ? (
                <dd>
                  <i>//Empty</i>
                </dd>
              ) : (
                notes
                  .filter((notes) => notes.s_node === "others")
                  .map((n) => <dd>{n.title}</dd>)
              )}
            </dl>
          </>
        ),
      },
      position: { x: 100, y: 500 },
      draggable: true,
    };
    others.push(oarr);
  });
  //------------------------------------------------------------------

  var bothNode = [...myArray, ...mySArray, ...others, ...sub_note];
  console.log(bothNode); //combine snode and node here
  //------------------------------------------------------------------
  var earr1;
  var earr2;
  const edgeArray = [];
  array.map((i) => {
    earr1 = {
      id: i,
      source: i,
    };
    sarray.map((i) => {
      earr2 = {
        target: i,
        label: i,
        animated: true,
      };
      var edgeArr = { ...earr1, ...earr2 };
      edgeArray.push(edgeArr);
    });
  });
  const edgeNote = [];
  var earr3;
  notes
    .filter((note) => note.s_node && note.node !== "others")
    .map((n) => {
      earr3 = {
        id: n.s_node,
        source: n.s_node,
        target: n.title,
        label: n.s_node,
        animated: true,
      };
      edgeNote.push(earr3);
    });
  var bothEdge = [...edgeArray, ...edgeNote];
  console.log(edgeNote);
  console.log(edgeArray);

  console.log(bothEdge);
  // we are using a bit of a shortcut here to adjust the edge type
  // this could also be done with a custom edge for example
  const edgesWithUpdatedTypes = bothEdge.map((edge) => {
    if (edge.sourceHandle) {
      const edgeType = bothNode.find((node) => node.type === "custom").data
        .selects[edge.sourceHandle];
      edge.type = edgeType;
    }

    return edge;
  });

  return (
    <>
      <div className="h-screen ">
        <ReactFlow
          nodes={bothNode}
          edges={edgesWithUpdatedTypes}
          onInit={onInit}
          fitView
          attributionPosition="top-right"
          nodeTypes={nodeTypes}
        >
          <MiniMap style={minimapStyle} zoomable pannable />
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </div>
    </>
  );
};

export default OverviewFlow;
