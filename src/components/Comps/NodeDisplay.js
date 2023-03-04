import React, { useState, useEffect } from "react";
var u_email = localStorage.getItem("email");

const NodeDisplay = () => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/users/getnode/" + u_email)
      .then((response) => response.json())
      .then((data) => setNotes(data));
  }, []);

  const removeElement = (item) => {
    fetch("http://localhost:4000/users/POPnode/" + u_email + "/" + item, {
      method: "GET",
    }).then(() => window.location.reload());
  };

  return (
    <div className="border-2 bg-white rounded-md border-black mt-4">
      {notes.length === 0 ? (
        <p>List is empty</p>
      ) : (
        <ol className="ml-4">
          {notes.map((item) => (
            <li key="{item}">
              {item}
              <button
                className="text-black hover:text-red-700"
                type="button"
                onClick={() => removeElement(item)}
              >
                [-]
              </button>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

const NodeDisplayList = () => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/users/getnode/" + u_email)
      .then((response) => response.json())
      .then((data) => setNotes(data));
  }, []);

  return (
    <>
      {notes.map((item) => (
        <option className="m-4" key="{item}" value={item}>
          {item}
        </option>
      ))}
    </>
  );
};

const SubNodeDisplay = () => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/users/getsnode/" + u_email)
      .then((response) => response.json())
      .then((data) => setNotes(data));
  }, []);
  
  const removeElement = (item) => {
    fetch("http://localhost:4000/users/POPsnode/" + u_email + "/" + item, {
      method: "GET",
    }).then(() => window.location.reload());
  };

  return (
    <div className="border-2 border-black mt-4 bg-white  rounded-md">
      {notes.length === 0 ? (
        <p>List is empty</p>
      ) : (
        <ol className="ml-4">
          {notes.map((item) => (
            <li key="{item}">
              {item}
              <button
                className="text-black hover:text-red-700"
                type="button"
                onClick={() => removeElement(item)}
              >
                [-]
              </button>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

const SubNodeDisplayList = () => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/users/getsnode/" + u_email)
      .then((response) => response.json())
      .then((data) => setNotes(data));
  }, []);

  return (
    <>
      {notes.map((item) => (
        <option key="{item}" value={item}>
          {item}
        </option>
      ))}
    </>
  );
};

const NodeDisplayComp = () => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/users/getnode/" + u_email)
      .then((response) => response.json())
      .then((data) => setNotes(data));
  }, []);

  return <>{notes.map((item) => ({ item }))}</>;
};

export {
  NodeDisplay,
  SubNodeDisplay,
  NodeDisplayList,
  SubNodeDisplayList,
  NodeDisplayComp,
};
