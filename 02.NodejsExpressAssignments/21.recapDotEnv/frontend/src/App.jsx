import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/joke").then((response) => {
      setJokes(response.data);
    });
  }, []);

  return (
    <>
      <h1>Chai and Full Stack</h1>
      <p>Jokes {jokes.length}</p>
      <div>
        {jokes.map((joke) => (
          <div key={joke.id}>
            <h3>{joke.title}</h3>
            <p>{joke.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
