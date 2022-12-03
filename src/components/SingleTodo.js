import React, { useEffect, useState } from "react";

const SingleTodo = ({
  todo,
  todos,
  index,
  setTodos,
  todoValue,
  setTodoValue,
}) => {
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");

  //delete item form localstorage
  const hendleDelete = (id) => {
    const filtered = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(filtered);
  };

  //update todo
  const hendleEdit = (todo, index) => {
    setEdit(true);
    setId(index);
    setTodoValue(todo.TodoValue);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    let items = [...todos];

    let item = items[id];

    item.TodoValue = todoValue;
    items[id] = item;

    setTodos(items);
    setTodoValue("");
    setEdit(false);
  };

  const [dataArray, setdataArray] = useState([]);

  const handleChange = (e) => {
    // setisChecked(e.target.checked);
    if (e.target.checked === true) {
      setdataArray([...dataArray, e.target.value]);
    } else if (e.target.checked === false) {
      let freshArray = dataArray.filter((val) => val !== e.target.value);
      setdataArray([...freshArray]);
    }
  };

  useEffect(() => {
    console.log(dataArray);
  }, [dataArray]);

  return (
    <div className="flex justify-between my-2 border rounded p-2">
      {edit === true ? (
        <div className="flex justify-center items-center">
          <form
            autoComplete="off"
            onSubmit={handleEditSubmit}
            className="flex justify-between"
          >
            <input
              type="number"
              onChange={(e) => setTodoValue(e.target.value)}
              placeholder={todo.TodoValue}
              className="mr-2 p-2 w-full"
            />

            <button
              type="submit"
              className="btn bg-[blue] text-white p-1 rounded"
            >
              Update
            </button>
          </form>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <input
            type="checkbox"
            value={todo.TodoValue}
            onChange={(e) => handleChange(e)}
          />
          <span>{todo.TodoValue}</span>
        </div>
      )}

      {!edit && (
        <div className="flex gap-3">
          <button
            className="btn bg-[blue] text-white p-1 rounded"
            onClick={() => hendleEdit(todo, index)}
          >
            Edit
          </button>
          <button
            className="btn bg-[blue] text-white p-1 rounded"
            onClick={() => hendleDelete(todo.id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default SingleTodo;
