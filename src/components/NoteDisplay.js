import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { NodeDisplayList, SubNodeDisplayList } from "./Comps/NodeDisplay";
var u_email = localStorage.getItem("email");
const NoteDisplay = () => {
  const { register, handleSubmit } = useForm();
  const [notes, setNotes] = useState([]);
  const [noteid, setNoteId] = useState("");
  const [noteUpdate, setNoteUpdate] = useState("");
  const [showModal, setShowModal] = useState(false);
  var note = [];
  useEffect(() => {
    fetch("http://localhost:4000/users/note/" + u_email)
      .then((response) => response.json())
      .then((data) => setNotes(data));

    // console.log(note)
    // data.map((note,idx) => <Notes item={note} key={idx}/>  )
  }, []);
  let count = notes.length;
  const removeElement = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to remove this note?");
    if(confirmDelete){
      fetch("http://localhost:4000/users/note/" + id + "/" + u_email, {
        method: "DELETE",
      }).then(() => window.location.reload());
    }
    
  };

  const updateRequest = () => {
    const div1 = document.getElementById("content");
    console.log(div1);
  };

  const UpdateModel = () => {
    // const div1 = document.getElementById("content");
    // console.log(div1)
    const obj = JSON.parse(noteUpdate);
    setNoteId(obj.id);

    const noteUp = async (data) => {
      try {
        const url =
          "http://localhost:4000/users/note/update/" + noteid + "/" + u_email;
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
          // setLoginMsg(err.msg);
          return;
        } else {
          alert("successfull");
          window.location.reload("");
        }
      } catch (err) {
        console.log(err);
      }
    };

    return (
      <>
        <div className="justify-center items-center flex flex-wrap overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-full my-6 mx-auto max-w-2xl">
            {/*content*/}
            <div className="rounded-xl border-black border-2 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-4xl font-Montserrat font-extrabold">
                  View/Update
                </h3>
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none"></span>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <form
                  onSubmit={handleSubmit(noteUp)}
                  className="bg-white border-1 border-gray-800  "
                >
                  <input
                    className="w-full border-2 border-black p-2 rounded-lg focus:outline-none focus:border-indigo-500"
                    type="hidden"
                    id="email"
                    name="email"
                    value={u_email}
                    // {...register("email", { required: true })}
                    placeholder="Enter Note title"
                  />
                  {/* <input
                    className="w-full border-2 border-black p-2 rounded-lg focus:outline-none focus:border-indigo-500"
                    type="hidden"
                    id="note-id"
                    name="id"
                    value={obj.id}
                    // {...register("email", { required: true })}
                    placeholder="Enter Note title"
                  /> */}
                  <div className="mb-4 flex gap-2">
                    <input
                      className=" border border-black rounded-sm p-2 placeholder:text-black"
                      type="text"
                      id="title"
                      // value={obj.title}
                      name="title"
                      aria-label="readonly input example"
                      {...register("title", { required: true })}
                      placeholder={obj.title}
                    />
                    <input
                      className="border border-black rounded-sm "
                      type="date"
                      // value={obj.date}
                      id="date"
                      {...register("date", { required: true })}
                      placeholder={obj.date}
                    />
                  </div>
                  <div className="mb-4 flex">
                    <div className="flex gap-1 mb-2">
                      <div>
                        <label for="node"></label>
                        <select
                          className=" border border-black rounded-xl bg-red-200"
                          name="node"
                          id="node"
                          {...register("node")}
                        >
                          <option className="bg-red-400" value="others">
                            NODE
                          </option>
                          <NodeDisplayList />
                        </select>
                      </div>
                      <div>
                        <label for="s_node"></label>
                        <select
                          className=" rounded-xl bg-yellow-200 "
                          name="s_node"
                          id="s_node"
                          {...register("s_node")}
                        >
                          <option className="bg-red-400" value="others">
                            SUBNODE
                          </option>
                          <SubNodeDisplayList />
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-medium mb-2"
                      htmlFor="phone"
                    >
                      Note
                    </label>
                    <input
                      className="p-4 w-full border border-gray-400 rounded-lg resize-none focus:outline-none focus:border-indigo-500"
                      rows={10}
                      type="text"
                      // value={obj.content}
                      id="content"
                      // onChange={(text) => setNoteText(text) }
                      {...register("content", { required: true })}
                      placeholder={obj.content}
                    />
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                      // onClick={() => updateRequest()}
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    );
  };

  const handleClick = (e, idx) => {
    console.log(e.target.getAttribute("data-id"));
    console.log(e.target.getAttribute("data-title"));
    var notes = {
      id: e.target.getAttribute("data-id"),
      title: e.target.getAttribute("data-title"),
      date: e.target.getAttribute("data-date"),
      content: e.target.getAttribute("data-content"),
    };
    const jsonNote = JSON.stringify(notes);
    setNoteUpdate(jsonNote);
    setShowModal(true);
  };

  return (
    <section className="m-4">
      {showModal ? <UpdateModel /> : null}
      <div className="overflow-visible w-full">
        <i>
          <pre className="text-gray-400">note-count({count})↓↓</pre>
        </i>
        <hr></hr>
        {notes &&
          notes.length >= 1 &&
          notes.map((n, idx) => (
            <div className="w-full flex flex-wrap p-3 m-1 rounded-lg border-2 border-black justify-between">
              <div className="flex-row">
                <h2 className="text-xl font-medium text-gray-900"><label className="text-sm text-gray-400">Title: </label>{n.title}</h2>
                <p><label className="text-sm text-gray-400">Created On: </label>{n.date}</p>
                <span className="text-xs px-3 mr-1 bg-red-200 rounded-full">
                  {n.node}
                </span>
                <span className="text-xs px-3 bg-yellow-200  rounded-full">
                  {n.s_node}
                </span>
                {/* <p className="text-gray-600 my-2">{n.content}</p> */}
              </div>
              <span class="inline-flex flex-wrap my-5 divide-x overflow-hidden rounded-md border bg-white shadow-sm">
                <button
                  class="inline-block p-3 text-gray-700 hover:bg-gray-50 focus:relative"
                  title="View/Edit Note"
                  data-id={n.id}
                  data-title={n.title}
                  data-date={n.date}
                  data-content={n.content}
                  onClick={(e) => handleClick(e, idx)}
                  key={idx}
                  // onClick={(e) => handleClick(e)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-4 w-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </button>
                <button
                  class="inline-block p-3 text-gray-700 hover:bg-gray-50 focus:relative"
                  title="Delete Note"
                  type="button"
                  onClick={() => removeElement(n.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-4 w-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </span>
            </div>
          ))}
      </div>
    </section>
  );
};

export default NoteDisplay;
