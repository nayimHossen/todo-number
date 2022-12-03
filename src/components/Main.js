import React, { useState, useEffect } from "react";

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
    console.log(checkArray);
  }, [checkArray]);

  return (
    <section className="flex gap-5">
      <div className="w-[60%]">
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
                className="flex justify-between items-center border rounded my-3 p-2"
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
                  <span className="font-bold text-sm">{todo.value}</span>
                </div>

                {editForm === false && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(todo, index)}
                      className="bg-[blue] p-[2px] text-sm rounded text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="bg-[blue] p-[2px] text-sm rounded text-white"
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

      <div className="w-[40%]">
        <div className="p-3 bg-[blue] text-white">
          <h2 className="text-center">Total Number</h2>
        </div>
      </div>
    </section>
  );
};

export default Main;
