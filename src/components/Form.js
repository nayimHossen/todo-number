// we need useState and useEffect hooks
import React, { useState, useEffect } from "react";

// icons from react icons kit
// main Icon component
import { Icon } from "react-icons-kit";

// icons themselves
import { plus } from "react-icons-kit/feather/plus";
import { edit2 } from "react-icons-kit/feather/edit2";
import { trash } from "react-icons-kit/feather/trash";

//get todos from local storage
const getTodosFromsLS = () => {
  const data = localStorage.getItem("Todos");

  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

export const Form = () => {
  //todo value state
  const [todoValue, setTodoValue] = useState("");

  //todos array of objects
  const [todos, setTodos] = useState(getTodosFromsLS());
  console.log(todos);

  const handleSubmit = (e) => {
    e.preventDefault();

    //creating a id for every todo
    const date = new Date();
    const time = date.getTime();

    //createing a todo object
    let todoObject = {
      ID: time,
      TodoValue: todoValue,
      completed: false,
    };

    //updateing todo state
    setTodos([...todos, todoObject]);
    //clearing input field
    setTodoValue("");
  };

  //saving data to local storage

  useEffect(() => {
    localStorage.setItem("Todos", JSON.stringify(todos));
  }, [todos]); //useEffect will render whenever todos state change

  //delete item form localstorage
  const hendleDelete = (id) => {
    const filtered = todos.filter((todo) => {
      return todo.ID !== id;
    });
    setTodos(filtered);
  };

  return (
    <>
      {/* form component */}
      <div className="form">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="input-and-button">
            <input
              type="text"
              placeholder="Add an Item"
              required
              onChange={(e) => setTodoValue(e.target.value)}
              value={todoValue}
            />
            <div className="button">
              <button type="submit">
                <Icon icon={plus} size={20} />
              </button>
            </div>
          </div>
        </form>

        {/* show data form local storage */}
        {todos.length > 0 && (
          <>
            {todos.map((todo, index) => (
              <div className="todo" key={todo.ID}>
                {/* check and value div */}
                <div>
                  <input type="checkbox" />
                  <span>{todo.TodoValue}</span>
                </div>

                {/* edit and delete icon dev */}
                <div className="edit-and-delete">
                  <div style={{ marginRight: "7px" }}>
                    <Icon icon={edit2} size={18} />
                  </div>
                  <div onClick={() => hendleDelete(todo.ID)}>
                    <Icon icon={trash} size={18} />
                  </div>
                </div>
              </div>
            ))}

            <div>
              <button onClick={() => setTodos([])} className="delete-all">
                Delete All
              </button>
            </div>
          </>
        )}
      </div>
      {/* end of form component */}
    </>
  );
};
