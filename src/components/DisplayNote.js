import React, { useState, useEffect } from "react";

function DisplayNote() {
  const [note, setNote] = useState(null);

  useEffect(() => {
    const url = "http://localhost:4000/users/note";
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
  //  body: JSON.stringify(data),
  //   })
      .then((res) => res.json())
      .then((data) => setNote(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {note !== null ? <p>{note}</p> : <p>No note added</p>}
    </div>
  );
}

export default DisplayNote;
