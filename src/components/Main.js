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
      return todo.ID !== id;
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

  const [checkArray, setCheckArray] = useState([]);

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
    <>
      {/* form component */}
      {editForm === false && (
        <div className="form">
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="input-and-button">
              <input
                type="number"
                placeholder="Input a number"
                required
                onChange={(e) => setTodoValue(e.target.value)}
                value={todoValue}
              />
              <div className="button">
                <button type="submit">ADD</button>
              </div>
            </div>
          </form>
        </div>
      )}
      {/* end of form component */}

      {/* edit form component */}
      {editForm === true && (
        <div className="form">
          <form autoComplete="off" onSubmit={handleEditSubmit}>
            <div className="input-and-button">
              <input
                type="text"
                placeholder="Edit your Item"
                required
                onChange={(e) => setTodoValue(e.target.value)}
                value={todoValue}
              />
              <div className="button edit">
                <button type="submit">UPDATE</button>
              </div>
            </div>
          </form>
        </div>
      )}
      {/* end of edit form component */}

      {/* start of rendering todos depending on
          if we have length of todos greater than 0 */}
      {todos.length > 0 && (
        <>
          {todos.map((todo, index) => (
            <div className="todo" key={todo.id}>
              <div>
                {/* we dont need to show checkbox when edit
                      button is clicked */}
                {editForm === false && (
                  <input
                    type="checkbox"
                    value={todo.value}
                    onChange={(e) => handleCheck(e)}
                  />
                )}
                <span
                  style={
                    todo.completed === true
                      ? { textDecoration: "line-through" }
                      : { textDecoration: "none" }
                  }
                >
                  {todo.value}
                </span>
              </div>

              {/* we dont need to show edit and delete icons when edit
                  button is clicked */}
              {editForm === false && (
                <div className="edit-and-delete">
                  <div
                    style={{ marginRight: 7 + "px" }}
                    onClick={() => handleEdit(todo, index)}
                  >
                    Edit
                  </div>
                  <div onClick={() => handleDelete(todo.ID)}>Delete</div>
                </div>
              )}
            </div>
          ))}
        </>
      )}
      {/* end of rendering todos depending on
          if we have length of todos greater than 0 */}
    </>
  );
};

export default Main;
