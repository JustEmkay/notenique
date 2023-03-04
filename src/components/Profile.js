import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";

const Profile = () => {
  var u_email = localStorage.getItem("email");
  var u_name = localStorage.getItem("username");
  var u_phone = localStorage.getItem("phone");

  //-----logout
  const [logoutMessage, setLogoutMessage] = useState("");
  const navigate = useNavigate();
  const logout = async () => {
    try {
      // const response = await fetch('http://localhost:4000/users/logout');
      // const data = await response.json();
      localStorage.clear();
      setLogoutMessage("successfull");
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1500);
    } catch (err) {
      console.error(err);
      setLogoutMessage("Logout failed");
    }
  };
  //------todo
  const [todoComp, setTodoComp] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/users/gettodo/" + u_email)
      .then((response) => response.json())
      .then((data) => setTodoComp(data));
  }, []);

  //-----note
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/users/note/" + u_email)
      .then((response) => response.json())
      .then((data) => setNotes(data));
  }, []);

  let count = notes.length;

  //-----odata
  const [oData, setDatao] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/users/getsnode/" + u_email)
      .then((response) => response.json())
      .then((data) => setDatao(data));
  }, []);
  let non_count;
  oData.map((i) => {
    non_count = notes.filter((notes) => notes.s_node !== i).length;
  });
  let snode_count = oData.length;
  console.log(non_count);
  const [popup, setPopUp] = useState(false);
  const [popup2, setPopUp2] = useState(false);
  const removeAccount = (item) => {
    console.log(item);
    const confirmDelete = window.confirm("Are you sure you want to remove this account?");
    if(confirmDelete)
    {
      fetch("http://localhost:4000/users/POPaccount/" + u_email + "/" + item, {
        method: "GET",
      }).then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      }).catch((error) => {
        console.error(error);
        if (error.message === "Error deleting user account") {
          setPopUp(true);
          alert("An error occurred while removing the account.");
        } else {
          setPopUp2(true);
          setTimeout(() => {
          localStorage.clear();
          window.location.href = "/";
          },3000)
        }
      });
    }
    
  };

  const DeativateModel = () => {
    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("");
    
    const handleSubmit = () => {
      if (value1 === value2) {
        removeAccount(value1);
        console.log("Values are equal");
      } else {
        setPopUp(true);
      }
    };

    return (
      <>
        <div className="fixed bottom-1 left-0 right-0  overflow-x-hidden bg-gray-600/50 overflow-y-auto md:inset-0 h-modal md:h-full">
          <div className="absolute bottom-0 right-6 h-full  md:h-auto">
            <div className="relative w-full h-full bg-white rounded-lg border border-black m-4 p-4 shadow">
              <div className="border border-black rounded-md p-4">
                <div className="flex flex-col h-full w-full">
                  <div className="m-2 text-red-700 font-bold">
                    Are you sure you want to deactivate your account?
                    <br /> All of your data will be permanently removed.
                    <br /> This action cannot be undone!!
                  </div>
                  <div className="flex gap-1">
                    <input
                      className="border border-black p-3"
                      placeholder="Enter your password"
                      type="text"
                      value={value1}
                      onChange={(e) => setValue1(e.target.value)}
                      required
                    />

                    <input
                      className="border border-black p-3"
                      placeholder="Confirm password"
                      type="text"
                      value={value2}
                      onChange={(e) => setValue2(e.target.value)}
                      required
                    />
                  </div>
                  {popup ? (
                    <div
                      class="bg-red-100 border my-2 border-red-400 text-red-700 px-4 py-3 rounded relative"
                      role="alert"
                    >
                      <strong class="font-bold">Holy smokes!</strong>
                      <span class="block sm:inline">
                        Look like you are fake :(
                      </span>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  {popup2 ? (
                    <div
                      class="bg-red-100 border my-2 border-green-400 text-green-700 px-4 py-3 rounded relative"
                      role="alert"
                    >
                      <strong class="font-bold">Bruh!! Why??</strong>
                      <span class="block sm:inline">
                        Bye Bye T-T
                      </span>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
              <div className="flex flex-row-reverse gap-1 m-1">
                <button
                  onClick={handleSubmit}
                  className="bg-transparent hover:bg-red-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded"
                >
                  Confirm
                </button>
                <button
                  className="bg-transparent hover:bg-black text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded"
                  onClick={handleClick}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const [modal, setShowModal] = useState(false);
  const handleClick = () => {
    setShowModal(!modal);
  };

  return (
    <div>
      {modal && <DeativateModel />}
      <div className="bg-white flex justify-between h-screen flex-col">
        {/* <div className="bg-cloud border-black border-b-2 w-100% h-1/5"></div> */}
        <div className="flex border rounded-xl bg-black border-black m-1 mt-12">
          <div className="w-3/5 flex flex-col bg-white  rounded-xl m-1 mt-4 border-black border">
            <div className="my-3 mx-1">
              <label className="text-2xl m-2 font-Montserrat font-extrabold">
                Statistics.
              </label>
              <pre className="text-sm ml-2">
                [{new Date().toLocaleDateString()}]
              </pre>
            </div>
            <div className="grid justify-center h-full align-middle grid-cols-2 w-full md:grid-cols-4">
              <div className="bg-green-400 border border-black rounded-xl m-4 p-2">
                <p className="text-2xl m-2 font-Montserrat font-extrabold">
                  Notes
                  <p className="text-sm font-normal font-Montserrat ">
                    (Notes created)
                  </p>
                </p>
                <p className="text-9xl m-2 font-Montserrat font-extrabold">
                  {count}
                </p>
              </div>
              <div className="bg-red-400 border border-black rounded-xl m-4 p-2 ">
                <p className="text-2xl m-2 font-Montserrat font-extrabold">
                  Subnodes
                  <p className="text-sm font-normal font-Montserrat ">
                    (Subnode of mindmap)
                  </p>
                </p>
                <p className="text-9xl m-2 font-Montserrat font-extrabold">
                  {snode_count}
                </p>
              </div>
              <div className="bg-blue-400 border border-black rounded-xl m-4 p-2">
                <p className="text-2xl m-2 font-Montserrat font-extrabold">
                  Non-mapped
                  <p className="text-sm font-normal font-Montserrat ">
                    (Notes without nodes)
                  </p>
                </p>

                <p className="text-9xl m-2 font-Montserrat font-extrabold">
                  {!non_count ? <>0</> : <>{non_count}</>}
                </p>
                <h6 className="text-3xl font-bold text-deep-purple-accent-400"></h6>
                <p className="font-bold"></p>
              </div>
              <div className="bg-yellow-400 border border-black rounded-xl m-4 p-2">
                <p className="text-2xl m-2 font-Montserrat font-extrabold">
                  Completed
                  <p className="text-sm font-normal font-Montserrat ">
                    (Completed tasks)
                  </p>
                </p>
                <p className="text-9xl m-2 font-Montserrat font-extrabold">
                  {todoComp}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-2/5 p-4 border bg-white rounded-xl justify-between border-black m-1 mb-4">
            <label className="text-2xl font-Montserrat font-extrabold">
              Profile.
            </label>
            <div className="flex flex-col w-full justify-center items-center">
              <img
                className="m-2 w-40 rounded-full"
                src="https://images.unsplash.com/photo-1613064756072-52b429a1e06f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
              />
              <label className="text-4xl font-Montserrat mb-4 font-extrabold">
                {u_name}
              </label>
              <pre>{u_email}</pre>
              <pre>+91 {u_phone}</pre>
            </div>
            <div>
              <hr></hr>[{new Date().toLocaleDateString()}]<hr></hr>
            </div>
          </div>
        </div>
        <div className="flex gap-4 justify-center mx-9 my-2">
          <button
            type="button"
            onClick={handleClick}
            class="w-full inline-block px-6 py-2 border-2 border-red-800 text-red-800 font-medium text-xs leading-normal uppercase rounded hover:bg-red-800 hover:text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          >
            Delete Account
          </button>
          <button
            type="button"
            class="w-full inline-block px-6 py-2 border-2 border-black bg-black text-white font-medium text-xs leading-normal uppercase rounded hover:border-blue-600 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            onClick={logout}
          >
            Logout
          </button>
          {logoutMessage && (
            <p>
              {logoutMessage}
              <SyncLoader color="#36d7b7" />
            </p>
          )}
        </div>
        <div className="bg-cloud border-black border-t-2 w-100% h-1/5"></div>
      </div>
    </div>
  );
};

export default Profile;
