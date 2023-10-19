import { useState } from "react";

import { Input, Button } from "antd";

function App() {
  function randomId() {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  }
  const [inputValue, setInputValue] = useState("");
  const [inputValueBace, setInputValueBace] = useState("");
  const [todoList, setTodoList] = useState([
    {
      id: randomId(),
      name: "so1",
      status: "not done",
    },
  ]);
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleClick = () => {
    setTodoList([
      ...todoList,
      {
        id: randomId(),
        name: inputValue,
        status: "not done",
      },
    ]);
  };
  const handleDelete = (item) => {
    for (let i = 0; i < todoList.length; i++) {
      const toDo = todoList[i];
      const newTodolist = todoList.filter((item) => item.id != toDo.id);
      setTodoList(newTodolist);
    }
  };
  const handleEdit = (item) => {
    setTodoList((old) => {
      return old.map((oldItem) => {
        if (oldItem.id === item.id) {
          oldItem.status = "done";
        }
        return oldItem;
      });
    });
  };
  return (
    <div>
      {" "}
      <div className="input-btn">
        <Input onChange={handleChange} placeholder="Nhập dữ liệu " />
        <Button onClick={handleClick} type="primary">
          Submit
        </Button>
      </div>
      <ul className="flex">
        <li>Title</li>
        <li>Status</li>
        <li>Action</li>
      </ul>
      {todoList.map((item) => {
        return (
          <div>
            <ul key={item.id} className="flex">
              <li>{item.name}</li>
              <li>{item.status}</li>
              <div>
                <li>
                  <button
                    onClick={() => {
                      handleEdit(item);
                    }}
                  >
                    Update
                  </button>
                </li>
                <li>
                  <button onClick={handleDelete}>Delete</button>
                </li>
              </div>
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default App;
