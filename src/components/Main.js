import React, { useState, useEffect } from "react";
import SelectedCart from "./SelectedCart";

// getting todos from local storage
const getTodosFromLS = () => {
  const data = localStorage.getItem("Todos");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

const Main = () => {
  // todo value state
  const [todoValue, setTodoValue] = useState("");

  // todos array of objects
  const [todos, setTodos] = useState(getTodosFromLS());

  //check todo array
  const [checkArray, setCheckArray] = useState([]);

  //total number count
  const [total, setTotal] = useState(0);

  // form submit event
  const handleSubmit = (e) => {
    e.preventDefault();

    const date = new Date();
    const time = date.getTime();

    // creating a todo object
    let todoObject = {
      id: time,
      value: todoValue,
    };
    // end of creating a todo object
    setTodos([...todos, todoObject]);
    setTodoValue("");
  };

  // saving data to local storage
  useEffect(() => {
    localStorage.setItem("Todos", JSON.stringify(todos));
  }, [todos]);

  // delete todo
  const handleDelete = (id) => {
    // console.log(id);
    const filtered = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(filtered);
    setCheckArray([]);
  };

  // edit form
  const [editForm, setEditForm] = useState(false);

  // id state
  const [id, setId] = useState();

  // edit todo
  const handleEdit = (todo, index) => {
    setEditForm(true);
    setTodoValue(todo.value);
    setId(index);
    setCheckArray([]);
  };

  // edit todo submit
  const handleEditSubmit = (e) => {
    e.preventDefault();
    // copying todos state in items variable
    let items = [...todos];
    // storing the element at a particular index in item variable
    let item = items[id];
    // manipulating the item (object) keys
    item.value = todoValue;
    // after manipulating item, saving it at the same index in items
    items[id] = item;
    // updating todos with items
    setTodos(items);
    setEditForm(false);
    setTodoValue("");
  };

  const handleCheck = (e) => {
    // setisChecked(e.target.checked);
    if (e.target.checked === true) {
      setCheckArray([...checkArray, e.target.value]);
    } else if (e.target.checked === false) {
      let freshArray = checkArray.filter((val) => val !== e.target.value);
      setCheckArray([...freshArray]);
    }
  };

  useEffect(() => {
    let sum = checkArray.reduce(function (a, b) {
      return Number(a) + Number(b);
    }, 0);
    setTotal(sum);
  }, [checkArray]);

  return (
    <section className="sm:flex gap-5">
      <div className="sm:w-[60%]">
        {/* form component */}
        {editForm === false && (
          <form autoComplete="off" onSubmit={handleSubmit}>
            <input
              type="number"
              placeholder="Input a number"
              required
              onChange={(e) => setTodoValue(e.target.value)}
              value={todoValue}
              className="p-3 w-[70%]"
            />
            <button
              type="submit"
              className="bg-[blue] text-white p-3 w-[30%] font-bold"
            >
              ADD
            </button>
          </form>
        )}
        {/* end of form component */}

        {/* edit form component */}
        {editForm === true && (
          <form autoComplete="off" onSubmit={handleEditSubmit}>
            <input
              type="text"
              placeholder="Edit your Item"
              required
              onChange={(e) => setTodoValue(e.target.value)}
              value={todoValue}
              className="p-3 w-[70%]"
            />

            <button
              type="submit"
              className="bg-[blue] text-white p-3 w-[30%] font-bold"
            >
              UPDATE
            </button>
          </form>
        )}
        {/* end of edit form component */}

        {/* start of rendering todos depending on
          if we have length of todos greater than 0 */}
        {todos.length > 0 && (
          <>
            {todos.map((todo, index) => (
              <div
                className="flex justify-between items-center border rounded my-3 p-2 bg-white"
                key={todo.id}
              >
                <div className="flex gap-3">
                  {editForm === false && (
                    <input
                      type="checkbox"
                      value={todo.value}
                      onChange={(e) => handleCheck(e)}
                      className="w-5 cursor-pointer"
                    />
                  )}
                  <span className="font-bold">{todo.value}</span>
                </div>

                {editForm === false && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(todo, index)}
                      className="bg-[blue] p-[2px] rounded text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="bg-[blue] p-[2px] rounded text-white"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>

      <div className="sm:w-[40%]">
        <div className="p-3 bg-[blue] text-white flex justify-center items-center gap-2">
          <h2 className="text-center">Total Number</h2>
          <span className="text-white bg-red-500 rounded-full px-2">
            {checkArray.length}
          </span>
        </div>
        {checkArray.map((number, index) => (
          <SelectedCart key={index} number={number} index={index} />
        ))}

        <div className="my-3">
          <div className="flex justify-between items-center font-bold">
            <p>Total -</p>
            <span className="bg-white px-20 border py-2 rounded">{total}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;
