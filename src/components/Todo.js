import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
var u_email = localStorage.getItem("email");

function Todo({ item }) {
  const { register, handleSubmit } = useForm();
  // const [note, setNote] = useState("");
  const todoInsert = async (data) => {
    try {
      const url = "http://localhost:4000/users/todo";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      window.location.reload();
      if (!response.ok) {
        const err = await response.json();
        console.log("Looks like there was a problem.", err);
        //setLoginMsg(err.msg);
        return;
      } else {
        const data = await response.json();
        // setNote(data);
        alert("todo added");
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [todoComp, setTodoComp] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/users/gettodo/" + u_email)
      .then((response) => response.json())
      .then((data) => setTodoComp(data));
  }, []);
  console.log(todoComp);
  const [todo, setTodo] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/users/todo/" + u_email)
      .then((response) => response.json())
      .then((data) => setTodo(data));
  }, []);

  const todos = [];

  for (let i = 0; i < todo.length; i += 2) {
    const todoX = todo[i];
    const timestamp = parseInt(todo[i + 1]);
    const date = new Date(timestamp * 1000);
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    todos.push({
      todos2: todoX,
      date2: date.toLocaleDateString("en-GB", options),
    });
  }
  const uniqueDates = todos //unique dates
    .map((item) => item.date2)
    .filter((date, index, array) => {
      return array.indexOf(date) === index;
    });
  console.log(uniqueDates);
  console.log(todos);
  const removeElement = (item) => {
    console.log(item);
    fetch("http://localhost:4000/users/POPtodo/" + u_email + "/" + item, {
      method: "GET",
    }).then(() => window.location.reload());
  };
  const [isChecked, setIsChecked] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const handleCheckboxChange = (index, item) => (event) => {
    setIsChecked(event.target.checked);
    console.log(item.todos2);
    if (event.target.checked) {
      const id = setTimeout(() => {
        removeElement(item.todos2);
      }, 3000);
      setTimeoutId(id);
      setIsChecked(item.todos2);
    } else {
      clearTimeout(timeoutId);
      setIsChecked("");
    }
  };

  return (
    <div className="flex bg-yellow-400 gap-2 h-screen fixed w-full  ">
      <div className="w-4/12 p-2">
        <section className="p-6">
          <form
            onSubmit={handleSubmit(todoInsert)}
            className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid"
          >
            <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm border-2 border-black">
              <legend className="font-bold">Add Task</legend>
              <div className="space-y-2  text-centerrounded-md col-span-full lg:col-span-1">
                <p className="font-medium">Create</p>
                <p className="text-xs">Enter your tasks here</p>
              </div>
              <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                <div className="col-span-full">
                  <input
                    type="hidden"
                    id="email"
                    name="email"
                    value={u_email}
                    {...register("email", { required: true })}
                    placeholder="Enter Note title"
                  />
                  <input
                    id="todo"
                    name="todo"
                    rows={15}
                    {...register("todo", { required: true })}
                    placeholder="what to do today"
                    className="w-full rounded-md  mb-2 p-1 border-2 border-black dark:text-gray-900"
                    spellcheck="false"
                  ></input>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-white border-2 rounded-md border-black hover:bg-black hover:text-white"
                  >
                    add
                  </button>
                </div>
              </div>
            </fieldset>
          </form>
        </section>
        <section className="p-6">
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm border-2 border-black">
            <legend className="font-bold">Statistics</legend>
            <div className="grid grid-cols-6 gap-4 col-span-full text-center lg:col-span-3">
              <div className="col-span-full">
                <div className="bg-black text-white  border border-black m-1 p-1 rounded-md">
                  In Progress:{todos.length}
                </div>
                <div className="bg-black text-white border border-black m-1 p- rounded-md">
                  To Be Completed:{todoComp}
                </div>
              </div>
            </div>
          </fieldset>
        </section>
      </div>
      <div className="w-8/12 bg-white border-2 rounded-xl border-black m-4 overflow-y-auto p-2">
        <section className="text-black">
          <div className="container max-w-5xl px-4 py-12 mx-auto">
            <div className="grid gap-4 mx-4 sm:grid-cols-12">
              <div className="col-span-12 sm:col-span-3">
                <div className="text-center sm:text-left mb-14 before:block before:w-24 before:h-3 before:mb-5 before:rounded-md before:mx-auto sm:before:mx-0 before:dark:bg-black">
                  <h3 className="text-3xl font-semibold">TODO</h3>
                  <span className="text-sm font-bold tracking-wider uppercase dark:text-gray-400">
                   <hr></hr>
                  </span>
                </div>
              </div>
              <div className="relative col-span-12 px-4 space-y-6 sm:col-span-9">
                <div className="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:dark:bg-gray-400">
                  //lazy bakka
                  <hr />
                  {uniqueDates.map((x) => (
                    <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:dark:bg-black">
                      <time className="text-xl tracking-wide font-bold uppercase dark:text-gray-600">
                        {x}
                        {todos
                          .filter((todos) => todos.date2 === x)
                          .map((item, index, array) => (
                            <form className="border border-black rounded-md mb-1 p-1">
                              <time className="text-xs tracking-wide uppercase dark:text-gray-400">
                                Task:({index + 1} of {array.length})
                                <div className="flex justify-between">
                                  <h3 className="text-sm font-semibold text-black tracking-wide">
                                    {item.todos2}
                                  </h3>
                                  <div>
                                    <input
                                      className="mr-2 rounded-xl"
                                      type="checkbox"
                                      name={item.todos2}
                                      value={item.todos2}
                                      // onClick={() => removeElement(item.todos2)}
                                      onChange={handleCheckboxChange(
                                        index,
                                        item
                                      )}
                                    />
                                  </div>
                                </div>
                                {isChecked === item.todos2 ? (
                                  <div className="animate-pulse text-red-500">
                                    Completed:
                                    <pre className="text-red-800">
                                      Are you sure?? Deleting in 5s
                                    </pre>
                                  </div>
                                ) : (
                                  <div className="animate-pulse text-green-500">
                                    InProgress
                                  </div>
                                )}
                              </time>
                            </form>
                          ))}
                      </time>
                    </div>
                  ))}
                  <div className="flex flex-col   sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-bl-lg sm:before:rounded-br-lg sm:before:left-[-35px] sm:before:z-[1] before:dark:bg-black"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Todo;
