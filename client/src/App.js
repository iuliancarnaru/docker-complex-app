import logo from "./logo.svg";
import "./App.css";
import Fib from "./Fib";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Fib />
      </header>
    </div>
  );
}

export default App;
