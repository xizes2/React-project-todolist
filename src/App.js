import "./App.css";

import { useState, useEffect } from "react";
import { BsTrash, BsBookmarkCheck, BsBookmarkCheckFill } from "react-icons/bs";

import FirstComponent from "./components/FirstComponent";

const API = "http://localhost:5000";

function App() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load todolist on page load

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

    setTitle("");
    setTime("");
  };

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
              placeholder="Task estimated time (in hours)"
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
        {todos.length === 0 && <p>No tasks registered!</p>}
      </div>
    </div>
  );
}

export default App;
