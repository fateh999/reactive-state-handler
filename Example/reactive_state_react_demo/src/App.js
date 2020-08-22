import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AppStateHandler, { useAppState } from "./AppStateHandler";

function App() {
  const [{ counter1, counter2 }] = useAppState(["counter1", "counter2"]);

  console.log(counter1, counter2);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button
          onClick={() => AppStateHandler.setState({ counter1: counter1 - 1 })}
        >
          -
        </button>
        {counter1}
        <button
          onClick={() => AppStateHandler.setState({ counter1: counter1 + 1 })}
        >
          +
        </button>
        <br />
        <button
          onClick={() => AppStateHandler.setState({ counter2: counter2 - 1 })}
        >
          -
        </button>
        {counter2}
        <button
          onClick={() => AppStateHandler.setState({ counter2: counter2 + 1 })}
        >
          +
        </button>
      </header>
    </div>
  );
}

export default App;
