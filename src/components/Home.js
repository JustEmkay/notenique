import React, { useState,useEffect } from "react";
import mMap from "./Image/mindmap.svg";
import toDo from "./Image/todo.svg";
import noTe from "./Image/note.svg";

const Home = () => {

  useEffect(() => {
    const hasRefreshed = localStorage.getItem("hasRefreshed");

    if (!hasRefreshed) {
      localStorage.setItem("hasRefreshed", "true");
      window.location.reload();
    }
  }, []);

  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-2 grid-rows-2 m-2 p-5 h-screen mx-auto text-center">
        <div className="bg-yellow-400 py-20 m-4 border-4 text-left border-black row-span-2 rounded-2xl">
          <div className="m-4">
            <h1 className="text-6xl font-extrabold">welcome</h1>
            <p className="text-xl text-yellow-800 font-bold ">
              <q>When you write something down, you remember it twice</q>-
              Anonymous
            </p>
          </div>
        </div>
        <div className="bg-white m-4 py-4 text-left border-4 flex flex-col md:flex-wrap justify-between border-black rounded-2xl">
          <div
            className="w-2/4 p-4
          "
          >
            <h1 className="text-4xl font-extrabold">mindmap</h1>
            <p>
              <q>
                A mind map is like a visual springboard for your ideas – it can
                help you jump higher and further than you ever thought possible.
              </q>
              - Tony Buzan
            </p>
          </div>
          <img src={mMap} className="p-4 w-2/4 h-full right-1"></img>
        </div>
        <div className="grid grid-cols-2 rounded-2xl">
          <div className="bg-green-500 text-left m-4 rounded-2xl border-4 border-black">
            <div className="m-4 p-4">
              <h1 className="text-4xl font-extrabold pb-4">notes</h1>
              <img src={noTe} className=""></img>
            </div>
          </div>
          <div className="bg-blue-500 text-left m-4 rounded-2xl border-4 border-black">
          <div className="m-4 p-4 ">
              <h1 className="text-4xl font-extrabold pb-4">todo</h1>
              <img src={toDo} className="w-full h-36"></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
