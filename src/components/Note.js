import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Footer } from "./Comps/Footer";
import Navbar from "./Comps/Navbar";
import { NodeDisplayList, SubNodeDisplayList } from "./Comps/NodeDisplay";
import NoteDisplay from "./NoteDisplay";

const Note = () => {
  const { register, handleSubmit } = useForm();
  const [loginMsg, setLoginMsg] = useState("");
  var u_email = localStorage.getItem("email");
  const [note, setNote] = useState("");

  const [isInArray, setIsInArray] = useState(false);

  const regauth = async (data) => {
    // const formdata=JSON.stringify(data);
    // console.log(data.title)
    const tarray = ["c++", "java"];

    if (tarray.includes(data.title) === true) {
      setIsInArray(tarray.includes(data.title));
    } else {
      setIsInArray(false);
      try {
        const url = "http://localhost:4000/users/note";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const data = await response.json();
          setNote(data);
          alert("Note created successfully");
          window.location.reload("");
        } else {
          const err = await response.json();
          console.log("Looks like there was a problem.", err);
          setLoginMsg(err.msg);
          return;
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="font-Montserrat flex-col h-full">
      <div className="flex">
        <div className="w-2/5">
          <NoteDisplay />
        </div>
        <div className="w-screen h-screen border-2 rounded-xl bg-black  overflow-hidden border-black p-2 m-2">
          <div className="bg-green-400   border-2 rounded-xl border-black  p-5 m-1 ">
            <h2 className="text-4xl font-Montserrat font-extrabold">Note.</h2>
            <h2 className="text-lg font-Montserrat font-light mb-4">
              Write it downn!!!
            </h2>
            <form
              onSubmit={handleSubmit(regauth)}
              className="border-2 border-black p-2 rounded-xl bg-white"
            >
              <input
                className=""
                type="hidden"
                id="email"
                name="email"
                value={u_email}
                {...register("email", { required: true })}
              />

              <div className="bg-white">
                <div className="fulltextarea">
                  <div className="w-full flex gap-1">
                    <div className="mb-2">
                      <input
                        className="w-full p-2 border-2 border-black rounded-md"
                        type="text"
                        id="title"
                        name="title"
                        {...register("title", { required: true })}
                        placeholder="Enter Note title"
                        required
                      />
                      {isInArray ? (
                        <div
                          role="alert"
                          class="rounded border-l-4 border-red-500 bg-red-50 p-2 mt-1"
                        >
                          <div class="flex items-center gap-2 text-red-800">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="h-5 w-5"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                clip-rule="evenodd"
                              />
                            </svg>

                            <strong class="block font-medium">
                              Cannot use NODE or SUBNODE as title, please change
                              it!!
                            </strong>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1 mb-2">
                    <div>
                      <label for="node"></label>
                      <select
                        className="border-2 border-black rounded-md"
                        name="node"
                        id="node"
                        {...register("node")}
                      >
                        <option className="bg-red-400" value="others">
                          *nil
                        </option>
                        <NodeDisplayList />
                      </select>
                    </div>
                    <div>
                      <label for="s_node"></label>
                      <select
                        className="border-2 border-black rounded-md"
                        name="s_node"
                        id="s_node"
                        {...register("s_node")}
                      >
                        <option className="bg-red-400" value="others">
                          *nil
                        </option>
                        <SubNodeDisplayList />
                      </select>
                    </div>
                  </div>
                  <div className="mb-1">
                    <input
                      className="border-2 border-black rounded-md "
                      type="date"
                      id="date"
                      {...register("date", { required: true })}
                      placeholder="date"
                      required
                    />
                  </div>
                </div>
                <textarea
                  className="p-4 w-full border-2 border-black rounded-lg resize-none"
                  rows={10}
                  type="text"
                  id="content"
                  {...register("content", { required: true })}
                  placeholder="Enter your notes"
                  required
                />
              </div>
              <button
                class="group relative inline-block text-sm font-medium text-black outline-none focus:ring active:text-black"
                type="submit"
              >
                 <span class="absolute  rounded-lg inset-0 translate-x-0 translate-y-0 bg-black outline-none transition-transform group-hover:translate-y-0.5 group-hover:translate-x-0.5"></span>
              <span class="relative  rounded-lg block border-2 outline-none border-current bg-white px-8 py-3">           Create
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Note;
