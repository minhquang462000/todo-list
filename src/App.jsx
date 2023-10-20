import { useEffect, useState } from "react";

import { Input, Button, Select } from "antd";

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
  const [filterStatus, setFilterStatus] = useState('all')
  const [todoList, setTodoList] = useState([]);
  const [todoListFilter, setTodolistFilter] = useState([])
  useEffect(() => {
    if (filterStatus === 'all') {
      setTodolistFilter(todoList)
    } else if (filterStatus === 'done') {
      setTodolistFilter(todoList.filter(item => item.status === 'done'))
    } else if (filterStatus !== 'done') {
      setTodolistFilter(todoList.filter(item => item.status !== 'done'))
    }
  }, [filterStatus, todoList])

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClick = () => {

    if (inputValue == '') {
      alert("Bạn chưa có thông tin input value")
    } else {
      setTodoList([
        ...todoList,
        {
          id: randomId(),
          name: inputValue,
          status: "not done",
        },
      ]);
      setInputValue('')
    }
  };
  const handleChangeStatus = (value) => {

    setFilterStatus(value.value)
  }
  const handleDelete = (item) => {
    for (let i = 0; i < todoList.length; i++) {
      const toDo = todoList[i];
      const newTodolist = todoList.filter((item) => item.id != toDo.id);
      setTodoList(newTodolist);
    }
  };
  const handleDone = (item) => {
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
    <>
      <div className="input-btn">
        <Input onChange={handleChange} value={inputValue} placeholder="Nhập dữ liệu " />
        <Button onClick={handleClick} type="primary">
          Submit
        </Button>
        <Select
          labelInValue
          defaultValue={{
            value: 'all',
            label: 'All',
          }}
          style={{
            width: 200,
          }}
          onChange={handleChangeStatus}
          options={[
            {
              value: 'all',
              label: 'All',
            },
            {
              value: 'done',
              label: 'Done',
            },
            {
              value: 'not done',
              label: 'Not Done',
            }
          ]}
        />
      </div>
      <ul className="flex">
        <li>Title</li>
        <li>Status</li>
        <li>Action</li>
      </ul>
      {todoListFilter.map((item) => {
        return (
          <div>
            <ul key={item.id} className="flex">
              <li>{item.name}</li>
              <li>{item.status}</li>
              <li className="btn-action">
                <button
                  onClick={() => {
                    handleDone(item);
                  }}
                >
                  Complate
                </button>
                <button onClick={handleDelete}>Delete</button>
              </li>
            </ul>
          </div>
        );
      })}
    </>
  );
}

export default App;
