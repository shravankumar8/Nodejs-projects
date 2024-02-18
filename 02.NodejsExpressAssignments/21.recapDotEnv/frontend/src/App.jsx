import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/todo").then((response) => {
      setTodos(response.data);
      console.log(response.data);
    });
  },[]);

  return (
    <>
      <h1>Chai and Full Stack</h1>
      <p>todos {todos.length}</p>
      <div>
        {todos.map((todo) => (
          <div key={todo._id}>
            <h3>{todo.todo}</h3>
            <p>{todo.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
