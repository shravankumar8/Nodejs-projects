import React, { useState } from "react";
import "./App.css";

function App() {
  
  const [joke, setJokes] = useState([{
    
  }]);

  return (
    <>
      <h1>Chai and Full Stack</h1>
      <p>Jokes {joke.length}</p>
      <div>
        {jokes.map((joke, index) => (
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
