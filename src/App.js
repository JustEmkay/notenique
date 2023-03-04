import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./components/Welcome";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./components/Home";
import Test from "./components/Test";
import Note from "./components/Note";
import Node from "./components/Comps/Node";
import { Error404, Forgot404 } from "./components/Comps/Error404";
import Profile from "./components/Profile";
import Todo from "./components/Todo";
var u_email = localStorage.getItem("email");
// import DisplayNote from "./components/DisplayNote";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />}></Route>
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={u_email ? (<Home />):(<Register />)}></Route>
      <Route path="/test" element={<Test />}>
        <Route index element={<Home />} />
        <Route path="/test/home" element={u_email ? (<Home />):(<Error404 />)} />
        <Route path="/test/note" element={u_email ? (<Note />):(<Error404 />)} />
        <Route path="/test/node" element={u_email ? (<Node />):(<Error404 />)} />
        <Route path="/test/profile" element={u_email ? (<Profile />):(<Error404 />)} />
        <Route path="/test/todo" element={u_email ? (<Todo />):(<Error404 />)} />
      </Route>
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default App;
