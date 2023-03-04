import React, { useState, useEffect } from "react";
import { MarkerType, Position } from 'reactflow';
var u_email = localStorage.getItem("email");



export const nodes = [
  {
    id: '1',
    type: 'input',
    data: {
      label: 'Input Node',
    },
    position: { x: 250, y: 0 },
  },
  {
    id: '2',
    type: 'output',
    data: {
      label: 'Default Node',
    },
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    type: 'output',
    data: {
      label:'output',
    },
    position: { x: 400, y: 100 },
  },
  {
    id: '4',
    type: 'custom',
    position: { x: 100, y: 200 },
    data: {
        label:'output',
    },
  },
//   {
//     id: '5',
//     type: 'output',
//     data: {
//       label: 'custom style',
//     },
//     className: 'circle',
//     style: {
//       background: '#2B6CB0',
//       color: 'white',
//     },
//     position: { x: 400, y: 200 },
//     sourcePosition: Position.Right,
//     targetPosition: Position.Left,
//   },
//   {
//     id: '6',
//     type: 'output',
//     style: {
//       background: '#63B3ED',
//       color: 'white',
//       width: 100,
//     },
//     data: {
//       label: 'Node',
//     },
//     position: { x: 400, y: 325 },
//     sourcePosition: Position.Right,
//     targetPosition: Position.Left,
//   },
//   {
//     id: '7',
//     type: 'default',
//     className: 'annotation',
//     data: {
//       label: (
//         <>
//           On the bottom left you see the <strong>Controls</strong> and the bottom right the{' '}
//           <strong>MiniMap</strong>. This is also just a node 🥳
//         </>
//       ),
//     },
//     draggable: false,
//     selectable: false,
//     position: { x: 150, y: 400 },
//   }
];

export const edges = [
  { id: 'bca', source: 'bca', target: 'java', label: 'this is an edge label' },
  { id: 'bca', source: 'bca', target: 'c++', animated: true ,},
// //   {
//     id: 'e4-5',
//     source: '4',
//     target: '5',
//     type: 'smoothstep',
//     sourceHandle: 'handle-0',
//     data: {
//       selectIndex: 0,
//     },
//     markerEnd: {
//       type: MarkerType.ArrowClosed,
//     },
//   },
//   {
//     id: 'e4-6',
//     source: '4',
//     target: '6',
//     type: 'smoothstep',
//     sourceHandle: 'handle-1',
//     data: {
//       selectIndex: 1,
//     },
//     markerEnd: {
//       type: MarkerType.ArrowClosed,
//     },
//   },
];
