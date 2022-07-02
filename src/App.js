import "./App.css";
//import loader from "../public/loading.svg";

import { useState, useEffect } from "react";
import { BsTrash, BsBookmarkCheck, BsBookmarkCheckFill } from "react-icons/bs";

const API = "http://localhost:5000";

function App() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [toDos, setToDos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load todolist on page load
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      const res = await fetch(API + "/todos")
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err));

      setLoading(false);

      setToDos(res);
    };

    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toDoTask = {
      id: Math.random(),
      title,
      time,
      done: false,
    };

    // Send tasks to API
    await fetch(API + "/todos", {
      method: "POST",
      body: JSON.stringify(toDoTask),
      headers: { "Content-Type": "application/json" },
    });

    console.log(toDoTask);

    // Send new toDoTask to previous estate of toDos, so we can keep the 'to do list' always updated
    setToDos((prevState) => [...prevState, toDoTask]);

    setTitle("");
    setTime("");
  };

  const handleDelete = async (id) => {
    await fetch(API + "/todos/" + id, {
      method: "DELETE",
    });

    setToDos((prevState) => prevState.filter((toDo) => toDo.id !== id));
  };

  const handleTaskDone = async (toDo) => {
    toDo.done = !toDo.done;

    const data = await fetch(API + "/todos/" + toDo.id, {
      method: "PUT",
      body: JSON.stringify(toDo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setToDos((prevState) =>
      prevState.map((toDo) => (toDo.id === data.id ? (toDo = data) : toDo))
    );
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="App">
      <div className="todo-header">
        <h1>React To Do</h1>
      </div>

      <div className="form-todo">
        <h2>Insert your task:</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="title">What's your next task?</label>
            <input
              type="text"
              name="title"
              placeholder="Task title"
              onChange={(e) => setTitle(e.target.value)}
              value={title || ""}
              required
            />
          </div>

          <div className="form-control">
            <label htmlFor="time">Time?</label>
            <input
              type="text"
              name="time"
              placeholder="Task estimated time (hours)"
              onChange={(e) => setTime(e.target.value)}
              value={time || ""}
              required
            />
          </div>

          <input type="submit" value="Send" />
        </form>
      </div>

      <div className="list-todo">
        <h2>Lista de Tarefas:</h2>

        {toDos.length === 0 && <p>No tasks registered!</p>}

        {toDos.map((toDo) => (
          <div className="toDo" key={toDo.id}>
            <h3 className={toDo.done ? "toDo-done" : ""}> {toDo.title} </h3>
            <p>Time estimated: {toDo.time}h </p>
            <div className="actions">
              <span onClick={() => handleTaskDone(toDo)}>
                {toDo.done ? <BsBookmarkCheckFill /> : <BsBookmarkCheck />}
              </span>
              <BsTrash onClick={() => handleDelete(toDo.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
