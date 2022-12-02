// we need useState and useEffect hooks
import React, { useState, useEffect } from "react";

// icons from react icons kit
// main Icon component
import { Icon } from "react-icons-kit";

// icons themselves
import { plus } from "react-icons-kit/feather/plus";
import { edit2 } from "react-icons-kit/feather/edit2";
import { trash } from "react-icons-kit/feather/trash";

export const Form = () => {
  //todo value state
  const [todoValue, setTodoValue] = useState("");

  //todos array of objects
  const [todos, setTodos] = useState([]);
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
      </div>
      {/* end of form component */}
    </>
  );
};
